import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const ShipmentSchema = new Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "Order", // Links the shipment to the specific order
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true, // Unique tracking number provided by the carrier
    },
    carrier: {
      type: String,
      required: true, // Carrier name (e.g., FedEx, UPS, etc.)
    },
    shippingLabel: {
      type: String,
      required: true, // Base64-encoded shipping label (could also be a URL depending on your integration)
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "InTransit", "Delivered", "Failed"],
      default: "Shipped", // Initial status when the shipment is created
    },
    shipmentDate: {
      type: Date,
      default: Date.now, // The date the shipment was created
    },
    deliveryDate: {
      type: Date,
      default: null, // Will be populated once the shipment is delivered
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null, // Estimated delivery date based on the carrier's data
    },
    shippingAddress: {
      type: Object,
      required: true, // Shipping address for the order
      validate: {
        validator: function (v) {
          // Perform address validation (you can customize this)
          return v && v.line1 && v.city && v.state && v.zipcode && v.country;
        },
        message: "Invalid shipping address.",
      },
    },
    carrierResponse: {
      type: Schema.Types.Mixed,
      default: {}, // Raw response from the shipping carrier API (e.g., tracking info)
    },
    isRefunded: {
      type: Boolean,
      default: false, // Tracks whether the shipment has been refunded
    },
    refundId: {
      type: ObjectId,
      ref: "Refund",
      default: null, // Links to the refund transaction if the shipment was refunded
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Create virtuals for easy reference to delivery address
ShipmentSchema.virtual("deliveryCity").get(function () {
  return this.shippingAddress.city;
});

ShipmentSchema.virtual("deliveryCountry").get(function () {
  return this.shippingAddress.country;
});

// Model export
const Shipment = model("Shipment", ShipmentSchema);

export default Shipment;
