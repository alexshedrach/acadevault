import PriceService from "../PriceService.js";

export class DefaultPricingResolver {
  async resolveEffectivePrice({
    materialId,
    currency,
    region,
    date = new Date(),
  }) {
    const price = await PriceService.getEffectivePrice(
      materialId,
      null, // or pass materialType if needed
      { currency, region, date }
    );

    if (!price) {
      throw new Error(`No effective price found for material: ${materialId}`);
    }

    return price.amount;
  }
}
