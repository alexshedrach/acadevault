import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import Order from '../../models/OrderModel.js';
import { APP_URL } from '../../config/index.js';

class InvoiceService {
  /**
   * Generate PDF invoice for the given order and return the invoice URL
   * @param {Object} order - Mongoose order document
   * @returns {Promise<String>} invoiceUrl
   */
  static async generateInvoice(order) {
    if (!order || !order._id) throw new Error('Order is required to generate invoice');

    const invoiceId = `INV-${order.orderId || order._id}`;
    const invoiceFileName = `${invoiceId}-${uuidv4()}.pdf`;
    const invoicePath = path.resolve('public/invoices', invoiceFileName);
    const invoiceUrl = `${APP_URL}/invoices/${invoiceFileName}`;

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(invoicePath);
        doc.pipe(stream);

        // === HEADER ===
        doc.fontSize(20).text('Invoice', { align: 'right' }).moveDown();

        doc
          .fontSize(12)
          .text(`Invoice ID: ${invoiceId}`, { align: 'right' })
          .text(`Date: ${format(new Date(order.createdAt), 'dd MMM yyyy')}`, { align: 'right' });

        doc.moveDown().moveDown();

        // === BILLING INFO ===
        doc
          .fontSize(14)
          .text('Billed To:')
          .fontSize(12)
          .text(order.guestEmail || order.user?.email || 'Unknown')
          .text(order.shippingAddress?.fullName || '')
          .text(order.shippingAddress?.addressLine1 || '')
          .text(order.shippingAddress?.city || '')
          .text(order.shippingAddress?.country || '');

        doc.moveDown();

        // === ORDER SUMMARY ===
        doc.fontSize(14).text('Order Summary', { underline: true });
        doc.moveDown();

        order.items.forEach((item, index) => {
          doc
            .fontSize(12)
            .text(`${index + 1}. ${item.material?.title || 'Material'} - Qty: ${item.quantity}`, {
              continued: true,
            })
            .text(` | Price: ₦${item.unitPrice} | Subtotal: ₦${item.subtotal}`, {
              align: 'right',
            });
        });

        doc.moveDown();

        // === TOTALS ===
        doc.fontSize(12).text(`Subtotal: ₦${order.subtotal}`, { align: 'right' });
        doc.text(`Tax: ₦${order.taxAmount || 0}`, { align: 'right' });
        doc.text(`Shipping Fee: ₦${order.shippingFee || 0}`, { align: 'right' });
        doc.moveDown();
        doc.fontSize(14).text(`Total: ₦${order.grandTotal}`, { align: 'right' });

        doc.end();

        stream.on('finish', async () => {
          // Update invoiceUrl on order
          await Order.findByIdAndUpdate(order._id, { invoiceUrl }, { new: true });
          resolve(invoiceUrl);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default InvoiceService;
