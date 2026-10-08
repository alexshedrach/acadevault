"use client";

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { usePricing } from "@/hooks/usePricing";
import { trackEvent } from "@/utils/analytics";

import { AlertBox } from "@/components/ui/AlertBox";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { getDefaultCurrency } from "@/utils/priceUtils";
import { WORDS_PER_PAGE } from "@/config/priceConfiguration";
import { CURRENCIES, MINIMUM_TOTALS } from "@/constants/enums";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import StepperNavigation from "@/components/ui/StepperNavigation";
import SectionHeader from "@/components/common/SectionHeader";

import { customFormsteps } from "@/data/customFormSteps";
import ProjectDetailsStep from "./ProjectDetailsStep";
import WordCountStep from "./WordCountStep";
import PreferencesStep from "./PreferencesStep";
import { PricingStep } from "./PricingStep";
import ConfirmStep from "./ConfirmStep";
import FormFooter from "@/components/forms/FormFooter";
import AcademicSpecsStep from "./AcademicSpecsStep";

export default function CustomQuoteForm({ shouldScrollIntoView }) {
  const router = useRouter();
  const { user } = useAuth();
  const { currency: ctxCurrency } = useContext(CurrencyContext);

  const [activeStep, setActiveStep] = useState("project-details");
  const [captchaToken, setCaptchaToken] = useState(
    process.env.NODE_ENV === "development" ? "mock-captcha-token" : null
  );
  const [formErrors, setFormErrors] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      mode: "custom",
      phone: "",
      email: "",
      topic: "",
      academicType: "Journal",
      institutionName: "",
      unitType: "pages",
      discipline: "",
      unitCount: 1,
      deadline: "",
      level: "bsc",
      instructions: "",
      files: null,
      promoCode: "",
      documentFormats: ["docx"],
      citationStyle: "apa",
      sampleText: "",
      budget: "",
      writerExpertise: "standard",
      currency: "NGN",
      terms: false,
    },
    mode: "onBlur",
  });

  const formData = watch();

  // On first render, set the form field
  useEffect(() => {
    const defaultCurrency =
      ctxCurrency || getDefaultCurrency(user?.countryCode || "NGN");
    if (!formData.currency || !CURRENCIES.includes(formData.currency)) {
      setValue("currency", defaultCurrency);
    }
  }, [ctxCurrency, user, setValue, formData.currency]);

  const unitType = formData.unitType || "pages";
  const quantity =
    unitType === "words"
      ? Math.ceil((formData.unitCount || 0) / WORDS_PER_PAGE)
      : formData.unitCount || 1;
  // const normalizedQuantity =
  //   unitType === "words" ? quantity : formData.unitCount;

  // Inside your component
  const normalizedQuantity =
    unitType === "words"
      ? Math.ceil((formData.unitCount || 0) / WORDS_PER_PAGE)
      : formData.unitCount;

  const stablePricingInput = useMemo(
    () => ({
      ...formData,
      materialType: formData.academicType,
      academicLevel: formData.level,
      // unitCount: normalizedQuantity,
    }),
    [
      formData.academicType,
      formData.level,
      formData.unitCount,
      formData.name,
      formData.phone,
      formData.email,
      formData.topic,
      formData.discipline,
      formData.deadline,
      formData.instructions,
      formData.files,
      formData.promoCode,
      formData.documentFormats,
      formData.citationStyle,
      formData.sampleText,
      formData.budget,
      formData.writerExpertise,
      formData.currency,
      // Add any other fields you want to track
    ]
  );

  const {
    rawBase,
    rawTotal,
    totalAfterDiscount,
    pagesUsed,
    discountAmount,
    promoError,
    handlePromoCodeApply,
  } = usePricing({
    formData: stablePricingInput,
    unitType,
    setValue,
    mode: "custom",
  });

  const [formSectionRef, scrollToTop] = useScrollToTop(80);

  const debouncedPromoApply = useCallback(
    debounce((code) => {
      const normalizedCode = code.toUpperCase(); // Normalize to uppercase
      setValue("promoCode", normalizedCode); // Update formData
      handlePromoCodeApply(); // Call directly, as code is already set
    }, 500),
    [handlePromoCodeApply, setValue]
  );

  const handlePromoCodeChange = (e) => {
    setValue("promoCode", e.target.value); // Update formData immediately
    debouncedPromoApply(e.target.value); // Trigger debounced validation
  };

  useEffect(() => {
    const savedUnitType = localStorage.getItem("unitType") || "pages";
    setValue("unitType", savedUnitType);
    const savedForm = JSON.parse(sessionStorage.getItem("formData") || "{}");
    if (savedForm && Object.keys(savedForm).length > 0) {
      Object.entries(savedForm).forEach(([key, value]) => setValue(key, value));
    }
    const savedDraft = JSON.parse(localStorage.getItem("quoteDraft") || "{}");
    if (savedDraft && Object.keys(savedDraft).length > 0) {
      Object.entries(savedDraft).forEach(([key, value]) =>
        setValue(key, value)
      );
      toast.info("Loaded saved draft.");
    }
  }, [setValue]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("currency", getDefaultCurrency(user.countryCode || "NG"));
    }
  }, [user, setValue]);

  useEffect(() => {
    if (shouldScrollIntoView) {
      scrollToTop();
    }
  }, [activeStep, shouldScrollIntoView, scrollToTop]);

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem("quoteDraft", JSON.stringify(formData));
      toast.info("Draft saved successfully.");
      trackEvent("save_draft", { label: "Quote Draft Saved" });
    } catch {
      toast.error("Failed to save draft.");
    }
  }, [formData]);

  const handleUnitTypeChange = (newType) => {
    const prevType = formData.unitType;
    const prevCount = formData.unitCount || 0;

    const newCount =
      prevType === "pages" && newType === "words"
        ? prevCount * WORDS_PER_PAGE
        : prevType === "words" && newType === "pages"
        ? Math.ceil(prevCount / WORDS_PER_PAGE)
        : prevCount;

    setValue("unitType", newType);
    localStorage.setItem("unitType", newType);
    setValue("unitCount", newCount, { shouldValidate: true });
  };

  const validateForm = (currentStep = activeStep) => {
    const errors = [];
    if (
      [
        "project-details",
        "academic-specs",
        "word-count",
        "preferences",
        "pricing",
        "confirm",
      ].includes(currentStep)
    ) {
      if (!formData.topic) errors.push("Topic is required.");
      if (!user && !formData.name) errors.push("Full name is required.");
      if (!formData.email) errors.push("Email is required.");
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.push("Valid email is required.");
    }
    if (
      [
        "academic-specs",
        "word-count",
        "preferences",
        "pricing",
        "confirm",
      ].includes(currentStep)
    ) {
      if (!formData.academicType) errors.push("Academic type is required.");
      if (!formData.discipline) errors.push("Discipline is required.");
      if (!formData.level) errors.push("Academic level is required.");
      if (!formData.deadline) errors.push("Deadline is required.");
    }
    if (
      ["word-count", "preferences", "pricing", "confirm"].includes(currentStep)
    ) {
      const minCount =
        MINIMUM_TOTALS[unitType] || (unitType === "pages" ? 1 : 275);
      if (
        !formData.unitCount ||
        isNaN(+formData.unitCount) ||
        formData.unitCount < minCount
      )
        errors.push(
          `Valid ${unitType} count is required (minimum ${minCount}).`
        );
    }
    if (["preferences", "pricing", "confirm"].includes(currentStep)) {
      if (!formData.citationStyle) errors.push("Citation style is required.");
      if (!formData.documentFormats?.length)
        errors.push("Select at least one document format.");
      if (!formData.writerExpertise)
        errors.push("Writer expertise is required.");
    }
    if (currentStep === "confirm") {
      if (!user && !captchaToken) errors.push("Please complete the CAPTCHA.");
      // if (!agreeToTerms)
      //   errors.push("You must agree to the terms and conditions.");
    }
    setFormErrors(errors);
    if (errors.length) {
      trackEvent("form_validation_errors", {
        step: currentStep,
        errors: errors.join("; "),
      });
      toast.warn("Please fix errors before proceeding.");
    }
    return errors.length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      const currentIndex = customFormsteps.findIndex(
        (s) => s.id === activeStep
      );
      if (currentIndex < customFormsteps.length - 1) {
        const nextStep = customFormsteps[currentIndex + 1].id;
        setActiveStep(nextStep);
        trackEvent("switch_to_step", { step: nextStep });
        sessionStorage.setItem("formData", JSON.stringify(formData));
      } else {
        handleSubmit(onConfirm)();
      }
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = customFormsteps.findIndex((s) => s.id === activeStep);
    if (currentIndex > 0) {
      const prevStep = customFormsteps[currentIndex - 1].id;
      setActiveStep(prevStep);
      trackEvent("switch_to_step", { step: prevStep });
    } else {
      router.push("/hire-writer");
    }
  };

  const onConfirm = async (data) => {
    if (!validateForm("confirm") || isSubmitting) return;

    if (process.env.NODE_ENV !== "development" && !user && !captchaToken) {
      toast.error("Please complete the CAPTCHA verification.");
      setFormErrors((prev) => [
        ...prev,
        "Please complete the CAPTCHA verification.",
      ]);
      return;
    }

    const payload = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === "files" && val) {
        Array.from(val).forEach((file) => payload.append("files", file));
      } else if (key === "documentFormats") {
        payload.append(key, JSON.stringify(val));
      } else if (key === "academicType") {
        payload.append("materialType", val);
      } else if (key === "level") {
        payload.append("academicLevel", val);
      } else {
        payload.append(key, val);
      }
    });
    payload.append("captcha", captchaToken || "mock-captcha-token");
    payload.append("category", "custom");
    payload.append("totalPrice", totalAfterDiscount);

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
        trackEvent("submit_custom_quote", {
          orderId,
          value: totalAfterDiscount,
          academicType: data.academicType,
          unitCount: data.unitCount,
        });
        localStorage.removeItem("quoteDraft");
        router.push(
          `/hire-writer/payment?orderId=${orderId}&total=${totalAfterDiscount}&email=${encodeURIComponent(
            data.email
          )}`
        );
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/custom-quote`,
        {
          method: "POST",
          headers: {
            Authorization: user
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
          body: payload,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server rejected the request.");
      }
      sessionStorage.setItem(
        "orderData",
        JSON.stringify({
          orderId,
          total: totalAfterDiscount,
          email: data.email,
        })
      );
      trackEvent("submit_custom_quote", {
        orderId,
        value: totalAfterDiscount,
        academicType: data.academicType,
        unitCount: data.unitCount,
      });
      localStorage.removeItem("quoteDraft");
      router.push(
        `/hire-writer/payment?orderId=${orderId}&total=${totalAfterDiscount}&email=${encodeURIComponent(
          data.email
        )}`
      );
    } catch (err) {
      toast.error(err.message || "Submission failed. Please try again.");
      trackEvent("submit_custom_quote_failed", { error: err.message });
    }
  };

  return (
    <motion.section
      ref={formSectionRef}
      className="max-w-5xl mx-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="main"
      aria-busy={isSubmitting}
    >
      <div className="relative h-1 mt-6 mb-2 w-2xl mx-auto">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>

      <SectionHeader
        title="Get a Custom Academic Quote"
        description="Tell us what you need, we will calculate a fair price and match you with a qualified academic expert."
        animate
        className="text-center"
      />

      <form
        onSubmit={handleSubmit(onConfirm)}
        className="bg-white shadow-lg rounded-lg"
      >
        <StepperNavigation
          steps={customFormsteps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
          validateStep={validateForm}
        />

        {formErrors.length > 0 && (
          <AlertBox
            variant="error"
            title="Please fix the following errors:"
            dismissible={true}
            autoDismiss={true}
            duration={5000}
            onDismiss={() => setFormErrors([])}
            className="mb-6"
          >
            <ul className="list-disc pl-5 text-sm">
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertBox>
        )}

        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 px-4 sm:px-8 md:px-12"
        >
          {activeStep === "project-details" && (
            <ProjectDetailsStep
              formData={formData}
              register={register}
              control={control}
              errors={errors}
              user={user}
            />
          )}
          {activeStep === "academic-specs" && (
            <AcademicSpecsStep
              control={control}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}
          {activeStep === "word-count" && (
            <WordCountStep
              control={control}
              errors={errors}
              formData={formData}
              setValue={setValue}
              handleUnitTypeChange={handleUnitTypeChange}
              getValues={getValues}
            />
          )}
          {activeStep === "preferences" && (
            <PreferencesStep
              register={register}
              control={control}
              errors={errors}
              watch={watch}
            />
          )}
          {activeStep === "pricing" && (
            <PricingStep
              formData={formData}
              pagesUsed={pagesUsed}
              rawBase={rawBase}
              rawTotal={rawTotal}
              displayedPrice={totalAfterDiscount}
              discountAmount={discountAmount}
              promoCode={formData.promoCode}
              onPromoChange={handlePromoCodeChange}
              applyPromo={handlePromoCodeApply}
              promoError={promoError}
              unitType={unitType}
              setValue={setValue}
              register={register}
            />
          )}
          {activeStep === "confirm" && (
            <ConfirmStep
              formData={formData}
              displayedPrice={totalAfterDiscount}
              user={user}
              captchaToken={captchaToken}
              setCaptchaToken={setCaptchaToken}
              agreeToTerms={agreeToTerms}
              setAgreeToTerms={setAgreeToTerms}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              control={control}
            />
          )}
        </motion.div>

        <FormFooter
          activeStep={activeStep}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          isSubmitting={isSubmitting}
          agreeToTerms={agreeToTerms}
          setAgreeToTerms={setAgreeToTerms}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          captchaToken={captchaToken}
          user={user}
          onSaveDraft={handleSaveDraft}
          steps={customFormsteps}
          control={control}
        />
      </form>
    </motion.section>
  );
}
