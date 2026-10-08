"use client";

import { useForm } from "react-hook-form";

import { validateEmail } from "@/utils/formValidation";
import { useState } from "react";
import { Button } from "../ui/Button";
import { InputField } from "./fields/InputField";
import { useForgotPasswordMutation } from "@/features/auth/authApi";
import { AlertBox } from "../ui/AlertBox";

export default function ForgotPasswordForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [serverMessage, setServerMessage] = useState(null);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Important: enables real-time validation
  });

  const onSubmit = async ({ email }) => {
    setServerMessage(null);
    setServerError(null);

    try {
      const res = await forgotPassword({ email }).unwrap();
      setServerMessage(res.message || "Reset instructions sent to your email.");
      reset();
    } catch (err) {
      setServerError(
        err?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverMessage && (
        <AlertBox status="success" message={serverMessage} role="status" />
      )}
      {serverError && (
        <AlertBox status="error" message={serverError} role="alert" />
      )}

      <InputField
        label="Email address"
        name="email"
        id="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        {...register("email", {
          required: "Email is required.",
          validate: (value) => {
            const error = validateEmail(value);
            return error || true;
          },
        })}
        error={errors.email?.message}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isValid || isLoading}
        loadingText="Sending reset link..."
        className="w-full"
      >
        Send Reset Link
      </Button>
    </form>
  );
}
