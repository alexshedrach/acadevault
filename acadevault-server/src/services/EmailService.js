import AcademicMaterial from "../api/models/AcademicMaterialModel.js";
import Shop from "../api/models/ShopModel.js";
import AdminEmail from "../helper/AdminEmail.js";
import Email from "../utils/emailUtils.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";

export default class EmailService {
  /**
   * Send digital download email with professionally styled template
   * @param {string} email - Recipient email address
   * @param {Array} downloadCodes - List of purchased materials & download codes
   */
  static async sendDigitalDownload(email, downloadCodes) {
    const subject = "🎓 Your AcadeMate Digital Purchase - Secure Download Code";

    // Prepare download items list in HTML format
    const downloadItemsHtml = downloadCodes
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.materialTitle}</td>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${item.code}</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: red;">Expires: ${new Date(
          item.expiration
        ).toDateString()}</td>
      </tr>`
      )
      .join("");

    // **Use the Email class to send the professionally formatted email**
    const emailService = new Email({ email }, "#");
    await emailService.send("digitalDownload", subject, {
      downloadItemsHtml, // Insert into the HTML template
    });
  }

  /**
   * Send order confirmation email with a professionally designed template
   * @param {string} email - Recipient email address
   * @param {Object} order - Order details
   */
  static async sendOrderConfirmation(email, order) {
    const subject = `🛍️ Order Confirmation - ${order.orderId}`;

    // Format ordered items into an HTML table
    const orderItemsHtml = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.material.title}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">$${item.subtotal.toFixed(2)}</td>
      </tr>`
      )
      .join("");

    // Format delivery details
    const deliveryDetails = order.isDigital
      ? `<p>📩 <strong>Delivery:</strong> Your purchased materials will be available via digital download.</p>`
      : `<p>🚚 <strong>Shipping Address:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>`;

    // Use the Email service to send the email
    const emailService = new Email({ email }, "#");
    await emailService.send("orderConfirmation", subject, {
      orderId: order.orderId,
      orderDate: new Date(order.createdAt).toDateString(),
      orderItemsHtml,
      grandTotal: order.grandTotal.toFixed(2),
      currency: order.currency || "USD",
      deliveryDetails,
    });
  }

  /**
   * Send a refund notification to the admin
   * @param {Object} refund - The refund details
   */
  static async sendAdminRefundNotification(refund) {
    try {
      // Ensure the admin email is available
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) {
        logger.error("Admin email is not set in environment variables.");
        return;
      }

      // Prepare the subject and replacements for the email
      const subject = `🔔 Refund Processed for Order ${refund.orderId}`;

      // Dynamic replacements for the email template
      const replacements = {
        orderId: refund.orderId,
        refundAmount: `${refund.currency || "USD"} ${refund.amount.toFixed(2)}`,
        refundMethod: refund.paymentMethod || "Original Payment Method",
        refundReason: refund.reason || "No reason specified.",
        refundStatus: refund.status || "Processed",
        refundDate: new Date(refund.processedAt).toDateString(),
        userEmail: refund.userEmail || "Guest User",
      };

      // Notify the admin using the AdminEmail class
      const adminNotification = new AdminEmail(adminEmail, subject, null);
      await adminNotification.sendToAdmin(
        "adminRefundNotification",
        replacements
      );

      logger.info("Admin notified of refund successfully:", subject);
    } catch (err) {
      logger.error("Error notifying admin of refund:", err.message);
      // You can decide to throw the error or log it silently
    }
  }

  /**
   * Send refund confirmation email with a professionally designed template
   * @param {string} email - Recipient email address
   * @param {Object} refund - Refund details
   */
  static async sendRefundConfirmation(email, refund) {
    const subject = `💰 Refund Processed - ${refund.orderId}`;

    // Refund Details
    const refundReason = refund.reason || "No reason specified.";
    const refundAmount = `${refund.currency || "USD"} ${refund.amount.toFixed(2)}`;
    const refundMethod = refund.paymentMethod || "Original Payment Method";
    const refundStatus = refund.status || "Processed";
    const refundDate = new Date(refund.processedAt).toDateString();

    // Use the Email service to send the email
    const emailService = new Email({ email }, "#");
    await emailService.send("refundConfirmation", subject, {
      orderId: refund.orderId,
      refundAmount,
      refundMethod,
      refundReason,
      refundStatus,
      refundDate,
    });
  }

  //  * Notify the seller about shop registration initiation by sending an OTP.

  static async sendShopRegistrationInitiation(shopId, otp) {
    try {
      // Retrieve the shop and populate the owner reference with only the needed fields
      const shop = await Shop.findById(shopId).populate("owner", "name email");
      if (!shop) {
        throw new AppError("Shop not found", 404);
      }
      const seller = shop.owner;

      // Define subject and URLs for verification and support
      const subject = "Your Shop Registration Has Started";
      const verificationUrl = "https://acadevault.com/register/verify-otp";
      const supportPageUrl = "https://acadevault.com/support";

      // Instantiate the Email class with the seller's email and name, and the verification URL
      const emailService = new Email(
        { email: seller.email, name: seller.name },
        verificationUrl
      );

      // Send the email using a predefined template
      await emailService.send("shopRegistrationInitiated", subject, {
        name: seller.name, // Assuming the seller object includes firstName
        otp, // OTP to be sent in the email
        verificationUrl, // URL for OTP verification
        supportPageUrl, // Link to your support page
      });

      logger.info(`Shop registration initiation email sent to ${seller.email}`);
    } catch (error) {
      logger.error(
        "Error sending shop registration initiation email:",
        error.message
      );
      throw error;
    }
  }

  /**
   * Notify the shop owner about successful verification
   */
  static async sendShopVerificationConfirmation(shopId) {
    try {
      // Retrieve the shop and populate owner details
      const shop = await Shop.findById(shopId).populate("owner", "name email");
      if (!shop) {
        throw new AppError("Shop not found", 404);
      }
      const seller = shop.owner;

      // Define email subject and URLs
      const subject = `🎉 Congratulations! Your shop "${shop.businessName}" is now live`;
      const shopUrl = `https://yourplatform.com/shops/${shop._id}`;
      const supportPageUrl = "https://yourplatform.com/support";

      // Instantiate the Email class
      const emailService = new Email(
        { email: seller.email, name: seller.name },
        shopUrl
      );

      // Send the verification confirmation email
      await emailService.send("shopVerified", subject, {
        businessName: shop.businessName,
        firstName: seller.name, // Assuming seller has 'name'
        shopId: shop._id.toString(),
        platformUrl: "https://yourplatform.com",
        supportPageUrl: supportPageUrl,
      });

      logger.info(`Shop verification email sent to ${seller.email}`);
    } catch (error) {
      logger.error("Error sending shop verification email:", error.message);
      throw error;
    }
  }

  /**
   * Notify the material creator about the successful approval of their academic material.
   */
  static async sendMaterialApprovalConfirmation(materialId) {
    try {
      // Retrieve seller's name from the populated shop and owner
      // const sellerName = material.shop?.owner?.name || "A seller";

      // Retrieve the academic material and populate the creator's (owner) details
      const material = await AcademicMaterial.findById(materialId).populate(
        "createdBy",
        "name email"
      );

      if (!material) {
        throw new AppError("Academic material not found", 404);
      }

      const creator = material.createdBy;

      // Define email subject and related URLs
      const subject = `🎉 Congratulations! Your material "${material.title}" is now live`;
      const materialUrl = `https://yourplatform.com/materials/${material._id}`;
      const supportPageUrl = "https://yourplatform.com/support";

      // Instantiate the Email class with the creator's details and material URL
      const emailService = new Email(
        { email: creator.email, name: creator.name },
        materialUrl
      );

      // Send the approval confirmation email
      await emailService.send("approvedCreatedMaterial", subject, {
        materialTitle: material.title,
        creatorName: creator.name,
        materialId: material._id.toString(),
        platformUrl: "https://yourplatform.com",
        supportPageUrl: supportPageUrl,
      });

      logger.info(`Material approval email sent to ${creator.email}`);
    } catch (error) {
      logger.error("Error sending material approval email:", error.message);
      throw error;
    }
  }

  static async sendApprovalEmail(creator, materialTitle, adminUser) {
    const email = new Email(creator, "/dashboard/my-materials");
    await email.send(
      "approvedMaterial",
      "Your Academic Material Update Was Approved",
      {
        materialTitle,
        adminName: adminUser.name,
      }
    );
  }

  static async sendRejectionEmail(creator, materialTitle, adminUser, feedback) {
    const email = new Email(creator, "/dashboard/my-materials");
    await email.send(
      "rejectedMaterial",
      "Your Academic Material Update Was Rejected",
      {
        materialTitle,
        adminName: adminUser.name,
        feedback,
      }
    );
  }
}
