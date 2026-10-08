import { useMemo } from "react";

/**
 * Hook to calculate cart totals across guest or user cart sources.
 * @param cart Server-side cart (user)
 * @param localCart Client-side cart (guest)
 */
export function useCartTotals(cart, localCart = []) {
  return useMemo(() => {
    const items =
      Array.isArray(cart?.items) && cart.items.length > 0
        ? cart.items
        : localCart || [];

    const currency = cart?.currency || items?.[0]?.currency || "USD";

    const subtotal = items.reduce((sum, item) => {
      const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
      const quantity = Number(item.quantity ?? 0);
      return sum + unitPrice * quantity;
    }, 0);

    const shippingFee = parseFloat(cart?.shippingFee) || 0;
    const taxes = parseFloat(cart?.taxes) || 0;
    const discountAmount = parseFloat(cart?.discountAmount) || 0;

    const total = cart?.totalWithShipping
      ? parseFloat(cart.totalWithShipping)
      : subtotal + shippingFee + taxes - discountAmount;

    return {
      items,
      currency,
      subtotal,
      shippingFee,
      taxes,
      discountAmount,
      total,
    };
  }, [cart, localCart]);
}
