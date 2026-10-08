import Big from "big.js";

const HIGH_VALUE_THRESHOLD = {
  NGN: 100000,
  USD: 500,
  GHS: 7000,
};

export default {
  isHighValue(amountPaid, currency) {
    const threshold = HIGH_VALUE_THRESHOLD[currency] || 100000;
    return Big(amountPaid).gt(threshold);
  },

  requiresManualReview(payment) {
    const highRiskGateways = ["manual", "test_gateway"];
    const suspiciousStatus = ["FAILED", "REVERSED"];

    return (
      this.isHighValue(payment.amountPaid, payment.currency) ||
      highRiskGateways.includes(payment.paymentGateway) ||
      suspiciousStatus.includes(payment.paymentStatus)
    );
  },
};
