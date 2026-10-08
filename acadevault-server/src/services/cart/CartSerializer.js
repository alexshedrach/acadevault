export function formatCartForClient(cart, { filterShopId = null } = {}) {
  const filteredItems = filterShopId
    ? cart.items.filter((item) => item.shop?.toString() === filterShopId)
    : cart.items;

  return {
    cartId: cart._id,
    userId: cart.user?._id ?? null,
    gestCartId: cart.guestCartId ?? null,
    guestEmail: cart.guestEmail ?? null,
    guestFullName: cart.guestFullName ?? null,
    guestPhoneNumber: cart.guestPhoneNumber ?? null,
    status: cart.status,
    currency: cart.currency,
    expiresAt: cart.expiresAt,
    exchangeRate: cart.exchangeRate,
    orderId: cart.order ?? null,
    shippingAddress: cart.shippingAddress ?? null,
    paymentGateway: cart.paymentGateway ?? null,
    paymentMethod: cart.paymentMethod ?? null,
    notes: cart.notes || '',
    appliedCoupons:
      cart.appliedCoupons?.map((c) => ({
        code: c.code,
        discountValue: c.discountValue?.toString() ?? '0.00',
        freeShipping: c.couponId?.freeShipping ?? false,
      })) ?? [],
    items: filteredItems.map((item) => ({
      id: item._id,
      quantity: item.quantity,
      unitPrice: item.unitPrice?.toString() ?? '0.00',
      taxAmount: item.taxAmount?.toString() ?? '0.00',
      discountAmount: item.discountAmount?.toString() ?? '0.00',
      finalPrice: item.finalPrice?.toString() ?? '0.00',
      currency: item.currency,
      digitalDownload: item.digitalDownload ?? false,
      licenseKey: item.licenseKey ?? null,
      addedAt: item.addedAt,
      material: {
        id: item.material?._id ?? item.materialSnapshot?.id ?? null,
        title: item.material?.title ?? item.materialSnapshot?.title ?? '',
        slug: item.material?.slug ?? item.materialSnapshot?.slug ?? '',
        isDigital: item.material?.isDigital ?? item.materialSnapshot?.isDigital ?? false,
        price:
          item.material?.price?.toString() ?? item.materialSnapshot?.price?.toString() ?? '0.00',
        summary: item.material?.summary ?? item.materialSnapshot?.summary ?? '',
        shop: item.material?.shop ?? item.materialSnapshot?.shop ?? null,
        deliveryFormat:
          item.material?.deliveryFormat ?? item.materialSnapshot?.deliveryFormat ?? null,
        material: item.material?.materialType ?? item.materialSnapshot?.materialType ?? null,
        categories: item.material?.categories ?? item.materialSnapshot?.categories ?? [],
      },
    })),
    totals: {
      subTotal: cart.subtotal?.toString() ?? '0.00',
      discountTotal: cart.totalDiscount?.toString() ?? '0.00',
      taxTotal: cart.taxes?.toString() ?? '0.00',
      shippingFee: cart.shippingFee?.toString() ?? '0.00',
      grandTotal: cart.totalWithShipping?.toString() ?? '0.00',
    },
    totalPrice: cart.totalPrice?.toString() ?? '0.00',
  };
}
