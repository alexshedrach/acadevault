import { Cart } from "../models/cartModel";
import { EmailService } from "./emailService";
import cron from "node-cron";
import { getIo } from "../websockets/socketSetup";

// Detect abandoned carts (inactivity > 24 hours)
async function detectAbandonedCarts() {
  const abandonedCarts = await Cart.find({
    status: "active",
    updatedAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last updated 24+ hours ago
  });

  for (const cart of abandonedCarts) {
    await EmailService.sendAbandonedCartEmail(cart.user, cart);
    cart.status = "abandoned";
    cart.abandonedReason = "User inactivity";
    await cart.save();
  }
}

// Cleanup old abandoned carts (older than 30 days)
async function cleanupOldCarts() {
  const deletedCarts = await Cart.deleteMany({
    status: "abandoned",
    updatedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  console.log(`Deleted ${deletedCarts.deletedCount} old abandoned carts.`);
}

// Cron jobs for cleanup and recovery
cron.schedule("0 0 * * *", async () => {
  console.log("🔹 Running cart cleanup job...");
  await cleanupOldCarts();
});

cron.schedule("0 * * * *", async () => {
  console.log("🔹 Running abandoned cart recovery job...");
  await detectAbandonedCarts();
});

/**
 * 🛒 **Check for Cart Abandonment**
 * Detects cart abandonment in real-time. Sends a notification to the user after 15 minutes of inactivity.
 * @param {string} userId - The user ID.
 */
async function checkForCartAbandonment(userId) {
  const cart = await Cart.findOne({ user: userId, status: "active" });

  if (cart && new Date() - cart.updatedAt > 15 * 60 * 1000) { // 15 minutes inactivity
    const io = getIo();
    io.to(userId).emit("abandoned-cart-notification", {
      message: "You left items in your cart! Complete your purchase now.",
    });

    cart.status = "pendingPayment";
    await cart.save();
  }
}

export default {
  detectAbandonedCarts,
  cleanupOldCarts,
  checkForCartAbandonment,
};
