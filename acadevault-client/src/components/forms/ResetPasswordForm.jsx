"use client";

import { useResetPasswordMutation } from "@/api/apiSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import AlertBox from "../ui/AlertBox";
import { Button } from "../ui/Button";
import { PasswordField } from "./fields/PasswordField";

export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [serverMessage, setServerMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    setServerMessage(null);
    setServerError(null);

    try {
      const res = await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      setServerMessage(res.message || "Password reset successful.");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setServerError(err?.data?.message || "Password reset failed.");
    }
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {serverMessage && (
        <AlertBox status="success" message={serverMessage} role="status" />
      )}
      {serverError && (
        <AlertBox status="error" message={serverError} role="alert" />
      )}

      <PasswordField
        name="password"
        label="New Password"
        control={control}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showToggle
        userInputs={[confirmPassword]}
        backendError={errors.password?.message}
        onStrengthChange={() => {}}
      />

      <PasswordField
        name="confirmPassword"
        label="Confirm Password"
        control={control}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showToggle
        backendError={
          password && confirmPassword && !passwordsMatch
            ? "Passwords do not match."
            : errors.confirmPassword?.message
        }
        onStrengthChange={() => {}}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isValid || !passwordsMatch || isLoading}
        loadingText="Resetting..."
        className="w-full"
      >
        Change Password
      </Button>
    </form>
  );
}
