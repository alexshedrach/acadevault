import axios from "axios";
import Email from "../utils/emailUtils.js";
import Order from "../api/models/OrderModel.js";
import AppError from "../utils/HandleAppErrors.js";
import { logger } from "../utils/logger.js";
import Shipment from "../api/models/ShipmentModel.js";

class FulfillmentService {
  /**
   * Creates shipment for an order.
   * @param {String} orderId - The ID of the order.
   * @param {Object} deliveryAddress - The shipping address for the order.
   * @returns {Object} - Returns the shipment details.
   */
  static async createShipment(orderId, deliveryAddress) {
    try {
      // Fetch the order to validate fulfillment items (physical products)
      const order = await Order.findById(orderId).populate("items.material");
      if (!order) throw new AppError("Order not found", 404);

      // Check for physical items that require shipment
      const physicalItems = order.items.filter(
        (item) => item.material.deliveryFormat === "physical"
      );

      if (physicalItems.length === 0) {
        // No physical items, return early (nothing to ship)
        return { message: "No physical items to ship." };
      }

      // Get shipping carrier details - you could use a dynamic method to choose the best carrier based on the user’s location, shipping options, etc.
      const carrier = await this.selectCarrier(deliveryAddress);
      if (!carrier)
        throw new AppError("No available carrier for shipment", 400);

      // Prepare shipment details
      const shipmentDetails = await this.prepareShipmentData(
        order,
        physicalItems,
        deliveryAddress,
        carrier
      );

      // Call the external shipping API (e.g., ShipEngine, UPS, FedEx, etc.)
      const shipmentResponse = await this.createShipmentWithCarrier(
        shipmentDetails,
        carrier
      );

      // Handle successful shipment response
      const shipment = await this.saveShipmentDetails(order, shipmentResponse);

      // Optional: Send notification to the user about the shipment
      await this.notifyUserAboutShipment(order.user, shipment);

      // Return the shipment details
      return shipment;
    } catch (error) {
      // Log and rethrow the error for proper handling upstream
      logger.error(
        `Error creating shipment for order ${orderId}: ${error.message}`
      );
      throw new AppError("Error processing shipment request", 500);
    }
  }

  /**
   * Selects an appropriate carrier for shipment.
   * @param {Object} deliveryAddress - The shipping address.
   * @returns {Object} - The selected carrier.
   */
  static async selectCarrier(deliveryAddress) {
    // Logic to select the carrier based on delivery address and available carriers
    // Example: Choose UPS or FedEx based on the delivery address
    if (!deliveryAddress.zipcode) {
      throw new AppError("Invalid shipping address", 400);
    }

    // Example, add more complex logic for carrier selection
    return {
      name: "FedEx",
      apiKey: process.env.FEDEX_API_KEY,
      service: "ground", // Carrier-specific service (e.g., ground, express)
    };
  }

  /**
   * Prepares shipment data to be sent to the external shipping carrier.
   * @param {Object} order - The order object.
   * @param {Array} physicalItems - The physical items that need to be shipped.
   * @param {Object} deliveryAddress - The shipping address for the order.
   * @param {Object} carrier - The selected carrier object.
   * @returns {Object} - The shipment data for the carrier.
   */
  static async prepareShipmentData(
    order,
    physicalItems,
    deliveryAddress,
    carrier
  ) {
    // Prepare the data required by the shipping carrier API
    const items = physicalItems.map((item) => ({
      weight: item.material.weight, // Example weight field
      quantity: item.quantity,
      description: item.material.name,
    }));

    // Example shipment data format for FedEx
    const shipmentData = {
      from: {
        address: {
          line1: "123 Warehouse St.",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
          countryCode: "US",
        },
      },
      to: {
        address: {
          line1: deliveryAddress.line1,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          postalCode: deliveryAddress.zipcode,
          countryCode: deliveryAddress.country,
        },
      },
      items,
      service: carrier.service, // e.g., 'ground'
    };

    return shipmentData;
  }

  /**
   * Makes an API call to the selected carrier to create the shipment.
   * @param {Object} shipmentData - The prepared shipment data.
   * @param {Object} carrier - The selected carrier details.
   * @returns {Object} - The carrier's response with shipment details (e.g., tracking number, label).
   */
  static async createShipmentWithCarrier(shipmentData, carrier) {
    // Example using FedEx API (you can replace this with ShipEngine, UPS, etc.)
    try {
      const response = await axios.post(
        "https://api.fedex.com/shipment",
        shipmentData,
        {
          headers: {
            Authorization: `Bearer ${carrier.apiKey}`,
          },
        }
      );

      // If the response is successful, return shipment details (e.g., tracking number, shipment label)
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(
          "Carrier API returned an error: " + response.data.errorMessage
        );
      }
    } catch (error) {
      logger.error(
        `Error creating shipment with ${carrier.name}: ${error.message}`
      );
      throw new AppError("Error creating shipment with carrier API", 500);
    }
  }

  /**
   * Saves the shipment details in the database.
   * @param {Object} order - The order object.
   * @param {Object} shipmentResponse - The response from the carrier API.
   * @returns {Object} - The saved shipment object.
   */
  static async saveShipmentDetails(order, shipmentResponse) {
    const shipment = await Shipment.create({
      orderId: order._id,
      trackingNumber: shipmentResponse.trackingNumber,
      carrier: shipmentResponse.carrier,
      shippingLabel: shipmentResponse.shippingLabel, // Base64 encoded shipping label
      status: "Shipped",
      shipmentDate: new Date(),
    });

    return shipment;
  }

  /**
   * Sends a notification to the user about the shipment.
   * @param {Object} user - The user object.
   * @param {Object} shipment - The shipment object.
   */
  static async notifyUserAboutShipment(user, shipment) {
    // Send email or SMS to notify the user about their shipment
    // Example: Send email notification with tracking information
    const emailService = new Email();
    await emailService.sendShipmentNotification(user.email, shipment);
  }
}

export default FulfillmentService;
