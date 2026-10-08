import AcademicMaterial from '../../api/models/AcademicMaterialModel.js';
import Cart from '../../api/models/CartModel.js';
import { CART_STATUS } from '../../constants/enums.js';
import { generateLicenseKey, generateUUID } from '../../utils/generators.js';
import AppError from '../../utils/HandleAppErrors.js';
import { logger } from '../../utils/logger.js';
import { Big } from '../../utils/numberUtils.js';
import CartExpiryService from './CartExpiryService.js';
import CartStockService from './CartStockService.js';
import CartTotalsService from './CartTotalsService.js';
import CartValidationService from './CartValidationService.js';

class CartService {
  /**
   * @param {{ pricingResolver: import("../resolvers/PricingResolver").PricingResolver }} deps
   */
  constructor({ pricingResolver }) {
    if (!pricingResolver) {
      throw new Error('PricingResolver is required.');
    }
    this.pricingResolver = pricingResolver;
  }

  // ─── Shared Helper ─────────────────────────────────────────────────────
  async _prepareCart(ctx) {
    // Finds or creates an active cart
    const cart = await this.findOrCreateCart(ctx);
    return cart;
  }

  /**
   * Fetch the active cart for a user or guest.
   * Uses the hybrid snapshot approach—no material.populate by default.
   *
   * @param {{ userId?: string, guestEmail?: string, guestCartId?: string }} params
   * @param {{ populateDetails?: boolean }} options
   * @returns {Promise<Cart|null>}
   * @throws {AppError} if neither userId nor guestEmail nor guestCartId is provided
   */
  async getActiveCart({ userId, guestEmail, guestCartId }, { populateDetails = false } = {}) {
    // 1️⃣ Validate identifying parameters
    if (!userId && !guestEmail && !guestCartId) {
      throw new AppError(
        'Either userId, guestEmail or guestCartId must be provided to fetch a cart.',
        400
      );
    }

    // 2️⃣ Build the query
    const query = {
      status: CART_STATUS.ACTIVE,
      ...(userId ? { user: userId } : guestEmail ? { guestEmail } : { _id: guestCartId }),
    };

    // 3️⃣ Base findOne—no material.populate
    let cartQuery = Cart.findOne(query);

    // 4️⃣ Conditional shallow-populates
    if (populateDetails) {
      cartQuery = cartQuery
        .populate('shippingAddress')
        .populate('appliedCoupons.couponId', 'code freeShipping');
    }

    const cart = await cartQuery.exec();

    // 5️⃣ If we have items, ensure all totals (and virtuals) are up to date
    if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
      await CartTotalsService.computeTotals(cart);
    }

    // 6️⃣ Return either the cart document or null
    return cart;
  }

  /**
   * Create a new cart for a user or guest.
   * @param {{ userId?: string, guestEmail?: string }} params
   * @returns {Promise<Cart>}
   */
  async createCart({ userId, guestEmail }) {
    const payload = {
      status: CART_STATUS.ACTIVE,
      currency: 'NGN', // You can override this later dynamically
    };

    if (userId) {
      payload.user = userId;
    } else if (guestEmail) {
      payload.guestEmail = guestEmail;
      payload.guestCartId = generateUUID('GUEST-');
    } else {
      throw new AppError('Either userId or guestEmail is required to create a cart', 400);
    }

    try {
      return await new Cart(payload).save();
    } catch (error) {
      logger.error('Error creating cart', {
        userId,
        guestEmail,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Fetch or create an active cart after validating identity.
   * @param {{ userId?: string, guestEmail?: string, guestCartId?: string, shippingAddress?: object, guestFullName?: string, guestPhoneNumber?: string }} ctx
   * @returns {Promise<Cart>}
   */
  async findOrCreateCart(ctx) {
    // Validate identity
    CartValidationService.ensureValidIdentifiers(ctx);

    // Attempt to fetch existing active cart
    let cart = await this.getActiveCart(ctx);

    // Create a new one if not found
    if (!cart) {
      cart = await this.createCart(ctx);
    }

    return cart;
  }

  // ─── 1. ADD A NEW LINE ────────────────────────────────────────────────
  /**
   * Add a new item to the cart, snapshotting material data at add-time.
   *
   * @param {Object} params
   * @param {string} [params.userId]        – Authenticated user ID
   * @param {string} [params.guestEmail]    – Guest’s email
   * @param {string} params.shopId          – ID of the shop selling this material
   * @param {string} params.materialId      – ID of the AcademicMaterial
   * @param {number} params.quantity        – Desired quantity (must ≥ 1)
   * @param {string} params.currency        – Currency code (e.g. 'NGN')
   * @param {string} [params.region]        – Region for pricing rules
   * @returns {Promise<Cart>}               – The updated cart document
   * @throws {AppError} on validation or stock/totals failures
   */
  async addItemToCart({ userId, guestEmail, shopId, materialId, quantity, currency, region }) {
    // 1️⃣ Basic inputs
    if (!shopId || !materialId) {
      throw new AppError('Both shopId and materialId are required.', 400);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new AppError('Quantity must be an integer ≥ 1.', 400);
    }

    // 2️⃣ Load or create the active cart
    const cartCtx = { userId, guestEmail };
    await CartValidationService.ensureValidIdentifiers(cartCtx);
    let cart = await this.getActiveCart(cartCtx, { populate: false });
    if (!cart) cart = await this.createCart(cartCtx);

    // 3️⃣ Prevent duplicates
    if (cart.items.some((i) => i.material.equals(materialId))) {
      throw new AppError('Item already in cart; use updateQuantity instead.', 409);
    }

    // 4️⃣ Fetch live material & snapshot key fields
    const mat = await AcademicMaterial.findById(materialId)
      .select('title price isDigital deliveryFormat slug currency materialType categories shop')
      .lean();
    if (!mat) throw new AppError('Material not found.', 404);

    // 5️⃣ Resolve dynamic pricing if different from snapshot
    const effectivePrice = await this.pricingResolver.resolveEffectivePrice({
      materialId,
      currency,
      region,
    });

    // 6️⃣ Push snapshot line item — now with all required snapshot fields
    cart.items.push({
      material: mat._id,
      materialSnapshot: {
        _id: mat._id,
        slug: mat.slug, // was missing
        title: mat.title,
        shop: mat.shop,
        thumbnail: mat.thumbnail, // if you have one
        isDigital: mat.isDigital,
        deliveryFormat: mat.deliveryFormat,
        materialType: mat.materialType, // was missing
        academicLevel: mat.academicLevel, // optional
        academicDegree: mat.academicDegree, // optional
        departmentName: mat.department, // optional
        shopName: mat.shopName, // optional
        unitPrice: effectivePrice,
        currency: mat.currency, // was missing
        categories: mat.categories,
        // any other snapshot props you require…
      },
      quantity,
      unitPrice: effectivePrice,
      digitalDownload: Boolean(mat.isDigital),
      ...(mat.isDigital && { licenseKey: generateLicenseKey() }),
    });

    // 7️⃣ Enforce stock, recalc totals, extend expiry
    await CartStockService.verifyStock(cart);
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);

    // 8️⃣ Persist & return
    return cart.save();
  }

  /**
   * Update the quantity of a given cart line.
   * If newQuantity === 0, removes the line.
   */
  async updateCartItemQuantity({ userId, guestEmail, cartId, materialId, newQuantity }) {
    if (!Number.isInteger(newQuantity) || newQuantity < 0) {
      throw new AppError('Quantity must be an integer ≥ 0.', 400);
    }

    // 1️⃣ Load the active cart in context (via hybrid getActiveCart)
    const cart = await this.getActiveCart(
      { userId, guestEmail, guestCartId: cartId },
      { populate: false }
    );
    if (!cart) {
      throw new AppError('Cart not found.', 404);
    }

    // 2️⃣ Find the line
    const lineIndex = cart.items.findIndex((i) => i.material.equals(materialId));
    if (lineIndex === -1) {
      throw new AppError('Item not in cart.', 404);
    }

    // 3️⃣ If zero, remove
    if (newQuantity === 0) {
      return this.removeCartItem({ userId, guestEmail, cartId, materialId });
    }

    // 4️⃣ Otherwise set new quantity
    cart.items[lineIndex].quantity = newQuantity;

    // 5️⃣ Business rules: stock, totals, expiry
    await CartStockService.verifyStock(cart);
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);

    // 6️⃣ Persist & return
    return cart.save();
  }

  /**
   * Remove a cart line by materialId.
   */
  async removeCartItem({ userId, guestEmail, cartId, materialId }) {
    // Load the active cart
    const cart = await this.getActiveCart(
      { userId, guestEmail, guestCartId: cartId },
      { populate: false }
    );
    if (!cart) {
      throw new AppError('Cart not found.', 404);
    }

    // Filter out the line
    const originalCount = cart.items.length;
    cart.items = cart.items.filter((i) => !i.material.equals(materialId));
    if (cart.items.length === originalCount) {
      // No change—line didn’t exist
      return cart;
    }

    // Recompute & persist
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);
    return cart.save();
  }
  /**
   * Increment or decrement item quantity using a delta.
   *
   * @param {{ cartId: string, materialId: string, delta: number }} params
   * @returns {Promise<Cart>}
   */
  async adjustItemQuantity({ cartId, materialId, delta }) {
    const cart = await Cart.findById(cartId);
    if (!cart || cart.status !== CART_STATUS.ACTIVE) {
      throw new AppError('Cart not found or inactive.', 404);
    }

    const item = cart.items.find((i) => i.material.equals(materialId));
    if (!item) throw new AppError('Item not in cart.', 404);

    // Calculate new quantity
    const newQuantity = Big(item.quantity).plus(delta).toNumber();

    if (newQuantity < 1) {
      cart.items = cart.items.filter((i) => !i.material.equals(materialId));
    } else {
      item.quantity = newQuantity;
    }

    await CartStockService.verifyStock(cart);
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);

    return await cart.save();
  }

  /**
   * Merges a guest cart into a user's cart upon login.
   * - If both exist → merge line items and clean up guest cart
   * - If only guest exists → convert to user cart
   * - If only user exists → return it
   * - If none exist → create a fresh user cart
   * @param {{ guestEmail: string, userId: string }} params
   * @returns {Promise<Cart>}
   */
  async mergeGuestCart({ guestEmail, userId }) {
    try {
      // Validate input
      if (!guestEmail || !userId) {
        throw new AppError('Both guestEmail and userId are required.', 400);
      }

      // Fetch guest cart
      const guestCart = await this.getActiveCart({ guestEmail });
      if (!guestCart) {
        logger.info('No guest cart found, returning or creating user cart.', {
          userId,
          guestEmail,
        });

        // Try to return existing user cart or create a new one
        const userCart =
          (await this.getActiveCart({ userId, shopId: guestCart?.shop })) ||
          (await this.createCart({ userId, shopId: guestCart?.shop }));

        return userCart;
      }

      // if (!guestCart?.shop) {
      //   throw new AppError('Cannot create cart without shop context.', 400);
      // }

      // Fetch user cart (shop-specific if needed)
      const userCart = await this.getActiveCart({
        userId,
        shopId: guestCart.shop,
      });

      // No existing user cart — transfer ownership
      if (!userCart) {
        guestCart.user = userId;
        guestCart.guestEmail = null;
        guestCart.guestCartId = null;

        await CartStockService.verifyStock(guestCart);
        await CartTotalsService.computeTotals(guestCart);
        await CartExpiryService.extendExpiry(guestCart);

        return await guestCart.save();
      }

      // Merge guest items into user cart
      guestCart.items.forEach((gItem) => {
        const existing = userCart.items.find((uItem) => uItem.material.equals(gItem.material));
        if (existing) {
          // 🎯 Merge quantities
          existing.quantity = Big(existing.quantity).plus(gItem.quantity).toNumber();
        } else {
          const newItem = gItem.toObject();

          // ✅ Ensure licenseKey is regenerated if digital
          if (newItem.digitalDownload) {
            newItem.licenseKey = generateUUID('LIC-');
          }

          userCart.items.push(newItem);
        }
      });

      // Preserve important metadata
      userCart.exchangeRateSnapshot = guestCart.exchangeRateSnapshot;

      await CartStockService.verifyStock(userCart);
      await CartTotalsService.computeTotals(userCart);
      await CartExpiryService.extendExpiry(userCart);

      await userCart.save();
      await guestCart.deleteOne();

      return userCart;
    } catch (error) {
      logger.error('Failed to merge guest cart', {
        userId,
        guestEmail,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Fetches and returns a rich cart summary:
   * - Populates material details
   * - Validates stock for physical items
   * - Recomputes totals & extends expiry
   * - Maps items, groups by shop, and returns aggregate data
   *
   * @param {{ userId?: string, guestEmail?: string, currency: string, region?: string }} params
   * @returns {Promise<Object|null>} summary or null if no cart
   */
  async getCartSummary({ userId, guestEmail, shopId, currency, region }) {
    // 1️⃣ Build the query including shopId
    const query = {
      status: CART_STATUS.ACTIVE,
      // shop: shopId,
      ...(userId ? { user: userId } : {}),
      ...(guestEmail ? { guestEmail: guestEmail } : {}),
    };

    // 2️⃣ Fetch & populate in one shot
    const cart = await Cart.findOne(query)
      .populate({
        path: 'items.material',
        select: 'title shop isDigital physicalContent.stockQty',
      })
      .exec();

    if (!cart) return null;

    // 3️⃣ Stock, totals, expiry
    await CartStockService.verifyStock(cart);
    await CartTotalsService.computeTotals(cart);
    await CartExpiryService.extendExpiry(cart);

    // 4️⃣ Map & group items
    const items = cart.items.map((item) => {
      const mat = item.material;
      return {
        materialId: mat._id.toString(),
        // shopId: mat.shop?.toString(),
        title: mat.title,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: Big(item.unitPrice).times(item.quantity).toNumber(),
        isDigital: mat.isDigital,
        stockQty: mat.isDigital ? null : mat.physicalContent.stockQty,
      };
    });

    // const grouped = items.reduce((acc, it) => {
    //   acc[it.shopId] = acc[it.shopId] || [];
    //   acc[it.shopId].push(it);
    //   return acc;
    // }, {});

    // 5️⃣ Return the final summary
    return {
      cartId: cart._id.toString(),
      userId: cart.user?.toString() || null,
      guestEmail: cart.guestEmail || null,
      shopId,
      items,
      // grouped,
      itemCount: items.length,
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      taxes: cart.taxes,
      shipping: cart.shippingFee,
      total: cart.totalWithShipping,
      currency: cart.currency || currency,
      region: region || null,
      coupons: cart.appliedCoupons || [],
      lastUpdated: cart.updatedAt,
      expiresAt: cart.expiresAt,
    };
  }
}

export default CartService;
