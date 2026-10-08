import {
  MATERIAL_TIERS,
  academicLevelRates,
  writerTiers,
  AVAILABLE_ADDONS,
  validPromoCodes,
  WORDS_PER_PAGE,
  BASE_RATES,
} from "@/config/priceConfiguration";
import { MINIMUM_TOTALS } from "@/constants/enums";
import { getDynamicRates } from "@/helpers/getDynamicRates";
import {
  formatPriceWithSymbol,
  calculateUrgencyMultiplier,
} from "@/utils/priceUtils";

export class PricingService {
  static normalizeToPages(quantity, unitType) {
    return unitType === "words"
      ? Math.ceil(quantity / WORDS_PER_PAGE)
      : quantity;
  }

  static async calculate({
    mode,
    plan = null,
    writer = null,
    materialType = "",
    academicLevel = "",
    quantity = 0,
    unitType = "pages",
    writerTier = "",
    deadline = null,
    customUrgency,
    currency = "NGN",
    selectedAddons = [],
    promoCode = "",
  }) {
    try {
      const rates = await getDynamicRates();
      const fallbackRates =
        BASE_RATES[materialType] || BASE_RATES["default"] || {};
      const tier = MATERIAL_TIERS[materialType] || "Tier1";
      const normalizedQuantity = this.normalizeToPages(quantity, unitType);

      // Dynamic base rate fallback logic
      const dynamicRate =
        rates[materialType]?.[currency] ?? fallbackRates?.[currency] ?? 0;

      if (!dynamicRate) {
        console.warn(`Missing rate for ${materialType} in ${currency}`);
      }

      let rawBase = 0;

      if (mode === "plan" && plan) {
        const planPrice = plan.price?.[currency];
        const fallbackUSD = plan.price?.USD;

        rawBase =
          planPrice ??
          (fallbackUSD && rates?.USD && rates?.[currency]
            ? fallbackUSD * (rates[currency] / rates.USD)
            : 0);
      } else {
        const academicMultiplier = academicLevelRates[academicLevel] || 1;
        const writerMultiplier = writerTiers[writer?.tier || writerTier] || 1;

        const urgencyMultiplier = calculateUrgencyMultiplier(
          deadline,
          customUrgency,
          tier,
          normalizedQuantity
        );

        rawBase =
          dynamicRate *
          normalizedQuantity *
          academicMultiplier *
          writerMultiplier *
          urgencyMultiplier;

        console.log(`[Pricing Debug]`);
        console.log(`  Base Rate: ${dynamicRate}`);
        console.log(`  Pages: ${normalizedQuantity}`);
        console.log(`  Academic Multiplier: ${academicMultiplier}`);
        console.log(`  Writer Multiplier: ${writerMultiplier}`);
        console.log(`  Urgency Multiplier: ${urgencyMultiplier}`);
        console.log(`  Raw Base Total: ${rawBase.toFixed(2)}`);
      }

      const addonsTotal = (selectedAddons || []).reduce((sum, addonId) => {
        const addon = AVAILABLE_ADDONS[tier]?.find((a) => a.id === addonId);
        if (!addon) return sum;

        const addonRate =
          addon.price?.[currency] ??
          (addon.price?.USD && rates?.USD && rates?.[currency]
            ? addon.price.USD * (rates[currency] / rates.USD)
            : 0);

        return sum + addonRate;
      }, 0);

      let rawTotal = rawBase + addonsTotal;
      let discountAmount = 0;

      const promo = validPromoCodes[promoCode?.toUpperCase()];
      if (
        promo &&
        (promo.eligibleCurrencies.includes(currency) ||
          promo.eligibleCurrencies.includes("all"))
      ) {
        discountAmount = (rawTotal * promo.discount) / 100;
      }

      const totalAfterDiscount = Math.max(
        rawTotal - discountAmount,
        MINIMUM_TOTALS[currency] || 0
      );

      const isMinimumApplied = totalAfterDiscount === MINIMUM_TOTALS[currency];

      const formatted = formatPriceWithSymbol(
        totalAfterDiscount,
        currency,
        rates?.USD
      );

      return {
        rawBase,
        addonsTotal,
        rawTotal,
        discountAmount,
        totalAfterDiscount,
        isMinimumApplied,
        minimumAppliedMessage: isMinimumApplied
          ? `Total adjusted to meet minimum ${formatPriceWithSymbol(
              MINIMUM_TOTALS[currency],
              currency
            )} requirement.`
          : "",
        formatted: {
          formatted,
          symbol: currency === "NGN" ? "₦" : currency.charAt(0),
        },
        pagesUsed: normalizedQuantity,
      };
    } catch (error) {
      console.error("PricingService.calculate error:", error);

      const fallbackTotal = MINIMUM_TOTALS[currency] || 0;
      const fallbackFormatted = formatPriceWithSymbol(fallbackTotal, currency);

      return {
        rawBase: 0,
        addonsTotal: 0,
        rawTotal: 0,
        discountAmount: 0,
        totalAfterDiscount: fallbackTotal,
        formatted: {
          formatted: fallbackFormatted,
          symbol: currency === "NGN" ? "₦" : currency.charAt(0),
        },
        pagesUsed: 0,
      };
    }
  }

  static async validatePromoCode(promoCode, currency) {
    try {
      const code = promoCode?.toUpperCase();
      if (!code) return { discount: 0, message: "" };

      if (process.env.NODE_ENV === "development") {
        const promo = validPromoCodes[code];
        if (!promo) return { discount: 0, message: "Invalid promo code." };

        if (
          promo.eligibleCurrencies.includes("all") ||
          promo.eligibleCurrencies.includes(currency)
        ) {
          return { discount: promo.discount, message: "" };
        }
        return {
          discount: 0,
          message: `Promo not eligible for ${currency}`,
        };
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`);
      if (!res.ok) throw new Error("Failed to fetch promo codes");

      const promoCodes = await res.json();
      const promo = promoCodes[code];
      if (!promo) return { discount: 0, message: "Invalid promo code." };

      if (
        promo.eligibleCurrencies.includes("all") ||
        promo.eligibleCurrencies.includes(currency)
      ) {
        return { discount: promo.discount, message: "" };
      }
      return {
        discount: 0,
        message: `Promo not eligible for ${currency}`,
      };
    } catch (err) {
      console.error("Promo validation error:", err);
      return { discount: 0, message: "Failed to validate promo code." };
    }
  }
}
