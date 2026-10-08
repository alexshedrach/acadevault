"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { GraduationCap } from "lucide-react";

import { useScrollToTop } from "@/hooks/useScrollToTop";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { MATERIAL_TIERS } from "@/config/priceConfiguration";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { useAuth } from "@/hooks/useAuth";
import { usePricing } from "@/hooks/usePricing";
import {
  getDefaultCurrency,
  validateDeadlineFeasibility,
} from "@/utils/priceUtils";

import ConfirmationStep from "./ConfirmationStep";
import PreferencesStep from "./PreferencesStep";
import PriceSummaryCard from "./PriceSummaryCard";
import SubmissionAssetsStep from "./SubmissionAssetsStep";
import PersonalDetailsStep from "./PersonalDetailsStep";

const stepsConfig = [
  {
    key: "personal",
    label: "Personal",
    component: PersonalDetailsStep,
    validateFields: (user) =>
      user
        ? [
            "email",
            "phone",
            "topic",
            "academicLevel",
            "academicDiscipline",
            "institution",
          ]
        : [
            "name",
            "email",
            "phone",
            "topic",
            "academicLevel",
            "academicDiscipline",
            "institution",
          ],
  },
  {
    key: "preferences",
    label: "Preferences",
    component: PreferencesStep,
    validateFields: () => [
      "writerExpertise",
      "citationStyle",
      "selectedAddons",
    ],
  },
  {
    key: "submissionAssets",
    label: "Content & Files",
    component: SubmissionAssetsStep,
    validateFields: () => ["unitCount", "deadline"],
  },
  {
    key: "confirm",
    label: "Confirm",
    component: ConfirmationStep,
    validateFields: () => [],
  },
];

export default function SeminarForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { currency: ctxCurrency } = useContext(CurrencyContext);
  const [step, setStep] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);

  // State for urgency handling for the mutliplying of the price
  const [hasUserOverriddenUrgency, setHasUserOverriddenUrgency] =
    useState(false);
  const [sectionTopRef, scrollToSectionTop] = useScrollToTop(80);

  const isDev = process.env.NODE_ENV === "development";

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      academicLevel: "bsc",
      academicDiscipline: "",
      institution: "",
      additionalInfo: "",
      deadline: "",
      unitCount: "",
      currency: ctxCurrency || "NGN",
      writerExpertise: "standard",
      citationStyle: "apa",
      promoCode: "",
      selectedAddons: [],
      urgencyMultiplier: 1.0,
    },
    mode: "onBlur",
  });

  const watched = watch();

  // Always count pages
  const unitCount = watch("unitCount");
  const pagesUsed = Math.ceil(unitCount || 0); // Seminar = pages

  // Force academicType behind the scenes
  const pricingInput = {
    ...watch(),
    academicType: "Seminar",
    academicLevel: watch("academicLevel"),
    quantity: pagesUsed,
    deadline: watched.deadline,
    urgencyMultiplier: watched.urgencyMultiplier,
  };

  const {
    rawBase,
    addonsTotal,
    totalAfterDiscount,
    discountAmount,
    formatted,
    promoError,
    handlePromoCodeApply,
  } = usePricing({
    formData: pricingInput,
    unitType: "pages",
    mode: "custom",
  });

  // Auto-fill CAPTCHA in dev
  useEffect(() => {
    if (isDev) {
      setCaptchaValue("dev-token");
      toast.info("Dev mode: CAPTCHA auto-filled");
    }
  }, [isDev]);

  // Load saved or user defaults
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("currency", getDefaultCurrency(user.countryCode || "NG"));
    } else {
      const saved = JSON.parse(
        sessionStorage.getItem("seminarFormData") || "{}"
      );
      if (Object.keys(saved).length) {
        Object.entries(saved).forEach(([k, v]) => setValue(k, v));
        toast.info("Loaded saved form data");
      }
    }
    setValue(
      "currency",
      ctxCurrency || getDefaultCurrency(user?.countryCode || "NG")
    );
  }, [user, ctxCurrency, setValue]);

  // Auto-save draft for guests
  useEffect(() => {
    if (user || typeof window === "undefined") return;
    const id = setTimeout(() => {
      sessionStorage.setItem("seminarFormData", JSON.stringify(watch()));
    }, 500);
    return () => clearTimeout(id);
  }, [watch(), user]);

  // Step validation
  const validateStep = useCallback(async () => {
    const fields = stepsConfig[step].validateFields(user);
    // Additional check on content page
    if (stepsConfig[step].key === "submissionAssets") {
      if (unitCount < 1) {
        toast.error("You must request at least 1 page.");
        return false;
      }
      const { isFeasible, message } = validateDeadlineFeasibility(
        pagesUsed,
        watch("deadline"),
        MATERIAL_TIERS["Seminar"]
      );
      if (!isFeasible) {
        toast.error(message);
        return false;
      }
    }
    if (!fields.length) return true;
    const ok = await trigger(fields, { shouldFocus: true });
    if (!ok) toast.error("Please fix highlighted errors.");
    return ok;
  }, [step, trigger, user, unitCount, pagesUsed, watch]);

  const nextStep = useCallback(async () => {
    if (await validateStep()) {
      setStep((s) => {
        const next = Math.min(s + 1, stepsConfig.length - 1);
        setTimeout(scrollToSectionTop, 100);
        return next;
      });
    }
  }, [validateStep, scrollToSectionTop]);

  const prevStep = useCallback(() => {
    setStep((s) => {
      const prev = Math.max(s - 1, 0);
      setTimeout(scrollToSectionTop, 100);
      return prev;
    });
  }, [scrollToSectionTop]);

  // Final submission
  const onSubmit = async (data) => {
    if (!user && !captchaValue) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }
    const orderId = uuidv4();
    const payload = new FormData();

    Object.entries({ ...data, academicType: "Seminar" }).forEach(
      ([key, val]) => {
        if (key === "files" && val) {
          Array.from(val).forEach((f) => payload.append("files", f));
        } else if (key === "selectedAddons") {
          payload.append(key, JSON.stringify(val));
        } else {
          payload.append(key, val);
        }
      }
    );

    payload.append("captcha", captchaValue || "dev-token");
    payload.append("category", "seminar");
    payload.append("materialType", "Seminar");
    payload.append("totalPrice", totalAfterDiscount);
    payload.append("pagesUsed", pagesUsed);

    try {
      if (!isDev) {
        const res = await fetch("/api/seminar-orders", {
          method: "POST",
          headers: {
            Authorization: user
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
          body: payload,
        });
        if (!res.ok)
          throw new Error((await res.json()).message || "Server error");
        toast.success("Order submitted!");
      } else {
        console.log("🎉 [DEV] payload:", [...payload.entries()]);
        toast.success("Dev: simulated submission");
      }

      reset({
        name: "",
        email: "",
        phone: "",
        topic: "",
        academicLevel: "bsc",
        academicDiscipline: "",
        institution: "",
        additionalInfo: "",
        deadline: "",
        unitCount: 1,
        currency: ctxCurrency || "NGN",
        writerExpertise: "standard",
        citationStyle: "apa",
        promoCode: "",
        selectedAddons: [],
        urgencyMultiplier: 1.0,
      });

      router.push(
        `/hire-writer/payment?orderId=${orderId}&total=${totalAfterDiscount}&email=${encodeURIComponent(
          data.email
        )}&currency=${data.currency}`
      );
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(`Submission failed: ${err.message}`);
    }
  };

  const StepComponent = stepsConfig[step].component;

  return (
    <section ref={sectionTopRef} className="max-w-4xl mx-auto relative">
      <div className="relative h-1 mt-6 mb-2 w-xl mx-auto">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>

      <SectionHeader
        title="Elevate Your Seminar Experience"
        description="Hire an expert writer to craft high-quality seminar content tailored to your needs, ensuring top marks and timely delivery."
        icon={<GraduationCap />}
        animate
        className="text-center"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col lg:flex-row bg-gray-50 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex-1 p-10">
          <StepComponent
            control={control}
            errors={errors}
            user={user}
            setCaptchaValue={setCaptchaValue}
            values={{ ...watch(), pagesUsed }}
            onEditStep={setStep}
            estimatedPrice={totalAfterDiscount}
            setValue={setValue}
            handlePromoCodeApply={handlePromoCodeApply}
            promoError={promoError}
          />

          <div className="mt-10 flex justify-between items-center">
            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            {step < stepsConfig.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting || (!user && !captchaValue)}
              >
                Confirm &amp; Submit
              </Button>
            )}
          </div>
        </div>

        <PriceSummaryCard
          estimatedPrice={totalAfterDiscount}
          rawBase={rawBase}
          addonsTotal={addonsTotal}
          discountAmount={discountAmount}
          pagesUsed={pagesUsed}
          promoError={promoError}
          handlePromoCodeApply={handlePromoCodeApply}
          formData={pricingInput}
          setValue={setValue}
          control={control}
          currency={watch("currency")}
          unitType="pages" // matches your billing unit
          hasUserOverriddenUrgency={hasUserOverriddenUrgency}
          setHasUserOverriddenUrgency={setHasUserOverriddenUrgency}
        />
      </form>
    </section>
  );
}
