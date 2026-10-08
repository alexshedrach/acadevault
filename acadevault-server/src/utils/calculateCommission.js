// Utility function: calculateCommission.js
function calculateCommission(saleAmount, commissionRate = 0.1) {
  if (saleAmount <= 0) {
    throw new Error("Sale amount must be greater than zero.");
  }

  if (commissionRate < 0 || commissionRate > 1) {
    throw new Error("Commission rate must be between 0 and 1.");
  }

  return saleAmount * commissionRate; // Returns the commission amount
}

export default calculateCommission;
