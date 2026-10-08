"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { addDays } from "date-fns";

import { fetchPricing } from "@/lib/writers/fetchPricing";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { orderFormSteps } from "./orderFormSteps";
import { AVAILABLE_ADDONS, MATERIAL_TIERS } from "@/config/priceConfiguration";

import { prefillOrderForm } from "@/utils/prefillOrderForm";
import { usePricing } from "@/hooks/usePricing";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackEvent } from "@/utils/analytics";
import StepperNavigation from "@/components/ui/StepperNavigation";
import FormFooter from "@/components/forms/FormFooter";
import SummarySidebarCard from "./SummarySidebarCard";

export default function OrderForm({
  user,
  writers,
  inferredMode,
  selectedWriter,
  selectedPlan,
}) {
  const router = useRouter();
  const { currency } = useContext(CurrencyContext);
  const [activeStep, setActiveStep] = useState(orderFormSteps(false)[0].id);
  const [captchaToken, setCaptchaToken] = useState(
    process.env.NODE_ENV === "development" ? "mock-captcha-token" : null
  );
  const [formErrors, setFormErrors] = useState([]);
  const [formSectionRef, scrollToTop] = useScrollToTop(80);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      mode: inferredMode || "plan",
      plan: selectedPlan || "",
      writerId: selectedWriter?.id?.toString() || "",
      unitType: "pages",
      unitCount: 0,
      wordCount: 0,
      deadline: "",
      promoCode: "",
      academicType: "",
      academicLevel: "",
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      institutionName: "",
      institutionType: "",
      country: "",
      topic: "",
      department: "",
      academicFormat: "",
      plagiarismTolerance: "",
      referenceSources: "",
      languageStyle: "",
      writerExpertise: "standard",
      specialRequests: "",
      expectedOutcome: "",
      terms: false,
      allowWriterToContactClient: false,
      agreeToNonDisclosure: false,
      selectedAddons: [],
    },
    mode: "onBlur",
  });

  const formData = watch();
  const mode = useWatch({ control, name: "mode" }) || inferredMode || "plan";
  const isPlanMode = mode === "plan";
  const isWriterMode = mode === "writer";

  const steps = useMemo(() => orderFormSteps(isWriterMode), [isWriterMode]);

  //  pull out the active component
  const ActiveStepComponent = useMemo(
    () => steps.find((s) => s.id === activeStep)?.component,
    [steps, activeStep]
  );

  const {
    data: pricingData = {},
    isLoading: isLoadingPricing,
    error: pricingError,
  } = useSWR(
    "allPricing",
    () =>
      Promise.all(["ond", "hnd", "pgd", "masters"].map(fetchPricing)).then(
        ([ond, hnd, pgd, masters]) => ({ ond, hnd, pgd, masters })
      ),
    { revalidateOnFocus: false, shouldRetryOnError: true, errorRetryCount: 3 }
  );

  const allPlans = useMemo(
    () => [
      ...(pricingData.ond || []).map((p) => ({ ...p, category: "ond" })),
      ...(pricingData.hnd || []).map((p) => ({ ...p, category: "hnd" })),
      ...(pricingData.pgd || []).map((p) => ({ ...p, category: "pgd" })),
      ...(pricingData.masters || []).map((p) => ({
        ...p,
        category: "masters",
      })),
    ],
    [pricingData]
  );

  useEffect(() => {
    if (pricingError) {
      toast.error("Failed to load pricing data. Please try again.");
      trackEvent("pricing_load_failed", { error: pricingError.message });
    }
    setValue("context.allPlans", allPlans, { shouldValidate: false });
  }, [allPlans, setValue, pricingError]);

  const selectedPlanDetails = useMemo(
    () =>
      isPlanMode
        ? allPlans.find((p) => p.slug === formData.plan) || null
        : null,
    [allPlans, formData.plan, isPlanMode]
  );

  const writer = useMemo(
    () =>
      isWriterMode
        ? writers.find((w) => String(w.id) === String(formData.writerId)) ||
          selectedWriter ||
          null
        : null,
    [writers, formData.writerId, isWriterMode, selectedWriter]
  );

  useEffect(() => {
    if (
      (isPlanMode && formData.plan && allPlans.length) ||
      (isWriterMode &&
        (formData.writerId || selectedWriter?.id) &&
        writers.length)
    ) {
      console.log("[OrderForm] Calling prefillOrderForm with:", {
        mode,
        planSlug: formData.plan,
        writerId: formData.writerId || selectedWriter?.id,
        selectedAddons: formData.selectedAddons,
      });
      prefillOrderForm({
        mode,
        planSlug: formData.plan,
        writerId: formData.writerId || selectedWriter?.id?.toString(),
        currency,
        allPlans,
        writers,
        setValue,
        getValues,
      });
    }
  }, [
    mode,
    formData.plan,
    formData.writerId,
    selectedWriter,
    currency,
    allPlans,
    writers,
    setValue,
    getValues,
  ]);

  const {
    rawBase,
    addonsTotal,
    rawTotal,
    discountAmount,
    totalAfterDiscount,
    formatted,
    pagesUsed,
    promoError,
    handlePromoCodeApply,
    isMinimumApplied,
    minimumAppliedMessage,
  } = usePricing({
    formData,
    unitType: isWriterMode ? formData.unitType : "pages",
    mode,
    plan: isPlanMode ? selectedPlanDetails : null,
    writer: isWriterMode ? writer : null,
  });

  useEffect(() => {
    setValue("estimatedCost", formatted.formatted, { shouldValidate: true });
  }, [formatted, setValue]);

  useEffect(() => {
    scrollToTop();
  }, [activeStep, scrollToTop]);

  const handleUnitTypeChange = useCallback(
    (newUnit) => {
      if (isPlanMode) return;
      setValue("unitType", newUnit, { shouldValidate: true });
      localStorage.setItem("unitType", newUnit);
      setValue("unitCount", 0, { shouldValidate: true });
      setValue("wordCount", 0, { shouldValidate: true });
      trigger(["unitType", "unitCount", "wordCount"]);
    },
    [setValue, isPlanMode, trigger]
  );

  const handleUrgencyChange = useCallback(
    (days) => {
      const newDeadline = addDays(new Date(), days);
      setValue("deadline", newDeadline.toISOString(), { shouldValidate: true });
      trigger("deadline");
    },
    [setValue, trigger]
  );

  const debouncedApplyPromo = useCallback(
    debounce((code) => handlePromoCodeApply(code), 500),
    [handlePromoCodeApply]
  );

  const validateStep = () => {
    const errs = [];

    if (!formData.mode) {
      errs.push("Please select a mode (plan or writer).");
    }
    if (isPlanMode && !formData.plan) {
      errs.push("Please select a plan.");
    }
    if (isWriterMode && !formData.writerId && !selectedWriter?.id) {
      errs.push("Please select a writer.");
    }

    switch (activeStep) {
      case "project-details":
        if (!formData.deadline) {
          errs.push("Deadline is required.");
        }

        if (!formData.department) {
          errs.push("Department is required");
        }
        break;

      case "word-count":
        if (
          isWriterMode &&
          (!formData.unitCount || Number(formData.unitCount) <= 0)
        ) {
          errs.push(`Please enter a valid ${formData.unitType} count.`);
        }
        break;

      case "review-specs":
        if (!formData.academicLevel && isWriterMode) {
          errs.push("Academic level is required.");
        }
        if (isWriterMode && !formData.academicType) {
          errs.push("Please select a project type.");
        }
        break;

      default:
        break;
    }

    setFormErrors(errs);
    if (errs.length) {
      toast.warn("Please fix errors before proceeding.");
      trackEvent("order_form_validation_failed", {
        step: activeStep,
        errors: errs,
      });
    }

    return errs.length === 0;
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid || !validateStep()) return;
    const idx = steps.findIndex((s) => s.id === activeStep);
    const next = steps[idx + 1];
    if (next) {
      setActiveStep(next.id);
      trackEvent("order_form_step_next", { to: next.id });
    } else {
      handleSubmit(onConfirm)();
    }
  };

  const handleBack = () => {
    const idx = steps.findIndex((s) => s.id === activeStep);
    if (idx > 0) {
      const prev = steps[idx - 1];
      setActiveStep(prev.id);
      trackEvent("order_form_step_back", { to: prev.id });
    } else {
      router.push("/hire-writer");
    }
  };

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem("quoteDraft", JSON.stringify(formData));
      toast.info("Draft saved successfully.");
      trackEvent("save_draft", { label: "Quote Draft Saved" });
    } catch {
      toast.error("Failed to save draft.");
    }
  }, [formData]);

  const onConfirm = async (data) => {
    if (isSubmitting) return;
    const payload = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        payload.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
      }
    });
    payload.append("price", totalAfterDiscount);
    payload.append("promoCode", data.promoCode || "");
    payload.append("captcha", captchaToken || "");
    payload.append(
      "category",
      isWriterMode ? "writer" : selectedPlanDetails?.category || ""
    );
    payload.append(
      "writerId",
      data.writerId || selectedWriter?.id?.toString() || ""
    );
    payload.append("plan", data.plan || selectedPlan || "");

    try {
      const orderId = uuidv4();
      if (process.env.NODE_ENV === "development") {
        sessionStorage.setItem(
          "orderData",
          JSON.stringify({
            orderId,
            total: totalAfterDiscount,
            email: data.email,
          })
        );
        router.push(
          `/hire-writer/payment?orderId=${orderId}&total=${totalAfterDiscount}&email=${encodeURIComponent(
            data.email
          )}`
        );
        trackEvent("order_form_submit_success", { orderId });
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: user ? `Bearer ${localStorage.getItem("token")}` : "",
        },
        body: payload,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Order submission failed.");
      }
      const { orderId: newId } = await res.json();
      router.push(`/order/confirm/${newId}`);
      trackEvent("order_form_submit_success", { orderId: newId });
    } catch (err) {
      toast.error(err.message || "Order submission failed.");
      trackEvent("order_form_submit_failed", { error: err.message });
    }
  };

  if (isLoadingPricing) {
    return <div>Loading plans and writers...</div>;
  }
  if (pricingError) {
    return <div>Error loading pricing data. Please try again later.</div>;
  }
  if (!writers.length) {
    return <div>No writers available. Please try again later.</div>;
  }

  // Common props for all step components
  const stepProps = {
    register,
    control,
    errors,
    watch,
    setValue,
    getValues,
    handleUnitTypeChange,
    formData,
    currency,
    writers,
    formErrors,
    setFormErrors,
    allPlans,
    promo: {
      code: formData.promoCode,
      onChange: (e) => {
        setValue("promoCode", e.target.value);
        debouncedApplyPromo(e.target.value);
        trigger("promoCode");
      },
      apply: handlePromoCodeApply,
      error: promoError,
      discountAmount,
    },
    price: {
      estimated: totalAfterDiscount,
      displayed: formatted.formatted,
    },
    captchaToken,
    setCaptchaToken,
    displayedPrice: formatted.formatted,
    user,
    isSubmitting,
    selectedPlanDetails,
  };

  return (
    <motion.section
      ref={formSectionRef}
      className="grid grid-cols-6 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form
        onSubmit={handleSubmit(onConfirm)}
        className="shadow-lg rounded-lg col-span-4 bg-white h-fit"
      >
        <>
          <StepperNavigation
            steps={steps}
            activeStep={activeStep}
            onStepChange={(id) => {
              if (validateStep()) {
                setActiveStep(id);
                trackEvent("order_form_step_change", { to: id });
              }
            }}
            validateStep={validateStep}
          />

          {formErrors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
              <ul className="list-disc list-inside text-sm">
                {formErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Render the active step as a proper JSX component */}
          <div className="pb-6 px-4 -mt-8">
            {ActiveStepComponent && <ActiveStepComponent {...stepProps} />}
          </div>

          <FormFooter
            activeStep={activeStep}
            steps={steps}
            onPrevious={handleBack}
            onNext={handleNext}
            isSubmitting={isSubmitting}
            captchaToken={captchaToken}
            user={user}
            control={control}
            onSaveDraft={handleSaveDraft}
          />
        </>
      </form>
      <aside className="col-span-2 -mr-10 my-7">
        <SummarySidebarCard
          formData={formData}
          currency={currency}
          price={{
            base: rawBase,
            discount: discountAmount,
            total: totalAfterDiscount,
            addonsTotal,
            isMinimumApplied,
            minimumAppliedMessage,
          }}
          onUrgencyChange={handleUrgencyChange}
          addonsConfig={
            AVAILABLE_ADDONS[
              MATERIAL_TIERS[formData.academicType] || "Tier1"
            ] || []
          }
          features={isPlanMode ? selectedPlanDetails?.features || [] : []}
          disclaimers={isPlanMode ? selectedPlanDetails?.disclaimers || [] : []}
          isLoading={isLoadingPricing}
          selectedPlanDetails={selectedPlanDetails}
          selectedWriter={writer}
          pagesUsed={pagesUsed}
          handlePromoCodeApply={handlePromoCodeApply}
          promoError={promoError}
          control={control}
          setValue={setValue}
        />
      </aside>
    </motion.section>
  );
}
