"use client";

import AlertBox from "../ui/AlertBox";
import { Button } from "../ui/Button";
import { useRegister } from "@/hooks/useRegister";
import { validateEmail } from "@/utils/formValidation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./fields/InputField";

export default function ResendActivationForm() {
  const { resendActivationEmail, isResending } = useRegister();
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const email = watch("email", "");
  const emailError = validateEmail(email);
  const isEmailValid = !emailError;

  const onSubmit = async ({ email }) => {
    setFeedback(null);
    const result = await resendActivationEmail(email);

    if (result.success) {
      setFeedback({ type: "success", message: result.message });
    } else {
      const message =
        result?.error?.data?.message ||
        "Failed to resend email. Please try again.";
      setFeedback({ type: "error", message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {feedback && (
        <AlertBox
          status={feedback.type}
          message={feedback.message}
          role={feedback.type === "error" ? "alert" : "status"}
        />
      )}

      <InputField
        label="Email Address"
        name="email"
        id="resend-email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        required
        {...register("email", {
          required: "Email is required.",
          validate: (value) => validateEmail(value) || true,
        })}
        error={errors.email?.message || (email && emailError)}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isResending || isSubmitting}
        loadingText="Resending..."
        disabled={!isEmailValid || isResending}
      >
        Resend Email
      </Button>
    </form>
  );
}
