import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useMemo, useState } from "react";

import CurrencySelector from "@/components/common/CurrencySelector";
import { MINIMUM_TOTALS, currencySymbols } from "@/constants/enums";
import { getEstimatedDelivery } from "@/helpers/getEstimatedDelivery";
import PriceUrgencySlider from "@/components/common/PriceUrgencySlider";
import { Switch } from "@/components/common/Switch";
import { Badge } from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";

import {
  AVAILABLE_ADDONS,
  MATERIAL_TIERS,
  WORDS_PER_PAGE,
} from "@/config/priceConfiguration";
import {
  calculateUrgencyText,
  calculateWordCountFeedback,
  formatPriceWithSymbol,
} from "@/utils/priceUtils";

export default function SummarySidebarCard({
  formData,
  currency,
  price: {
    base,
    discount,
    total,
    addonsTotal,
    isMinimumApplied,
    minimumAppliedMessage,
  },
  onUrgencyChange,
  addonsConfig,
  features = [],
  disclaimers = [],
  isLoading = false,
  selectedPlanDetails,
  selectedWriter,
  pagesUsed,
  handlePromoCodeApply,
  promoError,
  control,
  setValue,
}) {
  const [urgencyDays, setUrgencyDays] = useState(7);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDisclaimers, setShowDisclaimers] = useState(false);

  const mode = formData.mode || "plan";
  const {
    unitCount = 0,
    wordCount = 0,
    unitType,
    deadline,
    academicType,
  } = formData;

  const addons = useMemo(() => {
    const tier = MATERIAL_TIERS[academicType] || "Tier1";
    return AVAILABLE_ADDONS[tier] || [];
  }, [academicType]);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow space-y-4">
        <Loader
          type="skeleton"
          skeletonCount={5}
          skeletonHeight="h-20"
          skeletonShape="rounded-lg"
        />
      </div>
    );
  }

  const toggleAddon = (addon) => {
    const currentAddons = formData.selectedAddons || [];
    const newAddons = currentAddons.includes(addon.id)
      ? currentAddons.filter((id) => id !== addon.id)
      : [...currentAddons, addon.id];
    setValue("selectedAddons", newAddons, { shouldValidate: true });
    console.log("[SummarySidebarCard] Updated selectedAddons:", newAddons);
  };

  const wordCountDisplay =
    mode === "plan" ? wordCount : unitCount * WORDS_PER_PAGE;
  const pageCountDisplay = mode === "plan" ? unitCount : pagesUsed;
  const { text: urgencyText, color: urgencyColor } =
    calculateUrgencyText(deadline);
  const { text: countFeedback, color: countColor } = calculateWordCountFeedback(
    wordCount || unitCount,
    unitType
  );

  const shouldCalculatePrice = typeof unitCount === "number" && unitCount > 0;
  const isBelowMinimum = total < (MINIMUM_TOTALS[currency] || 0);

  const handleApplyPromoWithLoading = async () => {
    setIsApplyingPromo(true);
    try {
      await handlePromoCodeApply();
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const summaryRows = useMemo(
    () => [
      ["Word Count", `${wordCountDisplay} words`, countColor],
      ["Page Count", `${pageCountDisplay} pages`],
      [
        "Deadline",
        deadline ? new Date(deadline).toLocaleDateString() : "—",
        urgencyColor,
      ],
      ["Base Cost", formatPriceWithSymbol(base, currency)],
      ["Add-ons", formatPriceWithSymbol(addonsTotal, currency)],
      [
        "Discount",
        discount ? `–${formatPriceWithSymbol(discount, currency)}` : "—",
      ],
    ],
    [
      base,
      addonsTotal,
      discount,
      wordCountDisplay,
      pageCountDisplay,
      deadline,
      currency,
      urgencyColor,
      countColor,
    ]
  );

  return (
    <aside
      className="sticky top-24 w-full bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 p-8 shadow-lg transition-shadow hover:shadow-xl"
      role="complementary"
      aria-labelledby="summary-title"
    >
      <header className="border-b-2 border-orange-800 pb-2">
        <p className="text-sm absolute top-0 right-0 rounded-2xl bg-blue-800 text-white py-0.5 px-2">
          {mode === "plan" ? "Plan Mode" : "Writer Mode"}
        </p>
        <h2 id="summary-title" className="text-xl font-semibold text-gray-800">
          <span className="text-orange-500" aria-hidden="true">
            💰
          </span>{" "}
          Order Summary ({currencySymbols[currency] || currency})
        </h2>
      </header>

      <div className="pt-4">
        {mode === "plan" && selectedPlanDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-800">
                {selectedPlanDetails.title}
              </h3>
              <span className="text-sm font-semibold text-green-700">
                {formatPriceWithSymbol(
                  selectedPlanDetails.price[currency] || 0,
                  currency
                )}
              </span>
            </div>
          </div>
        )}

        {mode === "writer" && selectedWriter && (
          <div className="space-y-2">
            <div className="font-medium text-gray-700">
              Writer: {selectedWriter.name}
            </div>
            <p>
              <span className="font-medium text-gray-600">Material:</span>{" "}
              {academicType || "—"}
            </p>
          </div>
        )}
      </div>

      {!shouldCalculatePrice ? (
        <div className="p-3 bg-yellow-50 text-yellow-700 rounded">
          <p className="text-sm">{minimumAppliedMessage}</p>
        </div>
      ) : (
        <motion.div
          key={`${total}-${currency}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-between items-center mt-4 border-t border-gray-200"
          aria-live="polite"
        >
          <p className="items-baseline gap-1 mt-2" aria-live="polite">
            <span className="text-xl text-orange-500">
              {currencySymbols[currency]}
            </span>
            <span className="text-3xl font-bold text-orange-600">
              {total.toLocaleString()}
            </span>
          </p>
          <CurrencySelector
            asDropdown={false}
            buttonClassName="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(value) => setValue("currency", value)}
            value={currency}
          />
        </motion.div>
      )}

      <div>
        <label className="flex justify-between text-sm font-medium text-gray-700 mt-4 border-t border-gray-200">
          <span>Urgency</span>
          <span className={urgencyColor}>{urgencyText}</span>
        </label>
        <PriceUrgencySlider
          value={urgencyDays}
          min={1}
          max={14}
          step={1}
          onChange={(days) => {
            setUrgencyDays(days);
            onUrgencyChange(days);
          }}
          disabled={mode === "plan"}
          tooltip={
            mode === "writer"
              ? "Higher urgency increases cost."
              : "No cost impact in Plan mode"
          }
        />
      </div>

      <div className="space-y-2 mt-3 border-t border-gray-200">
        <p className="text-lg font-bold text-gray-700 pt-2">Add-ons</p>
        {addons.length > 0 ? (
          addons.map((addon) => (
            <label
              key={addon.id}
              className="flex items-center justify-between text-sm text-gray-800"
            >
              <span>
                {addon.label} (
                {formatPriceWithSymbol(
                  addon.price[currency] || addon.price.USD || 0,
                  currency
                )}
                )
              </span>
              <Switch
                checked={formData.selectedAddons?.includes(addon.id)}
                onCheckedChange={() => toggleAddon(addon)}
              />
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No add-ons available for this material.
          </p>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mt-4 border-t border-amber-200 pt-1">
          📅 Estimated Delivery
        </h4>
        <motion.p
          key={deadline || "tbd"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-base font-semibold text-blue-800 mt-1 mb-4 pl-4"
        >
          {getEstimatedDelivery(deadline, formData.urgencyMultiplier || 1.0)}
        </motion.p>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        {summaryRows.map(([label, value, colorClass], i) => (
          <div key={i} className="flex justify-between text-sm text-gray-800">
            <span>{label}</span>
            <span className={colorClass || ""}>{value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-base">Total Due</span>
          <motion.span
            key={total}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold text-green-700"
            aria-live="polite"
          >
            {formatPriceWithSymbol(total, currency)}
          </motion.span>
        </div>
      </div>

      <section className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">
          Why Clients Trust Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "100% Confidential",
            "Plagiarism-Free",
            "Secure Payment",
            "On-Time Delivery",
          ].map((label, index) => (
            <Badge
              key={label}
              icon={<CheckCircle className="w-4 h-4 shrink-0" />}
              iconPosition="left"
              variant="success"
              size="sm"
              className="bg-green-50 text-green-700 border border-green-200 shadow-sm px-3 py-1.5 transition hover:bg-green-100 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {label}
            </Badge>
          ))}
        </div>
      </section>
    </aside>
  );
}
