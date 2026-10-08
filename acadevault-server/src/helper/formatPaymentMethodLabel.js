// Helper to convert method to user-facing label
export const formatMethodLabel = (method) => {
  const labels = {
    card: "Credit/Debit Card",
    bank_transfer: "Bank Transfer",
    paypal: "PayPal",
    crypto: "Cryptocurrency",
    digital_wallet: "Apple Pay / Google Pay",
    mobile_money: "Mobile Money",
    bnpl: "Buy Now, Pay Later",
    cash_on_delivery: "Cash on Delivery",
    gift_card: "Gift Card",
    in_app_payment: "In-App Purchase",
  };
  return labels[method] || method;
};
