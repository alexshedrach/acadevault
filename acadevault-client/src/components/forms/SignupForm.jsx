"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

import { useRegister } from "@/hooks/useRegister";
import { validateEmail, validatePassword } from "@/utils/formValidation";
import { InputField } from "./fields/InputField";
import { AlertBox } from "../ui/AlertBox";
import { PasswordField } from "./fields/PasswordField";
import { Button } from "../ui/Button";

export default function SignupForm() {
  const { register, isRegistering } = useRegister();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    backend: null,
  });

  const isFormValid = useMemo(() => {
    const { name, email, password, confirmPassword } = form;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== confirmPassword ? "Passwords do not match." : null;

    return (
      name.trim().length > 0 &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !Object.values(errors).some(Boolean)
    );
  }, [form, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    const newErrors = {
      name: name.trim() ? null : "Name is required.",
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword:
        password === confirmPassword ? null : "Passwords do not match.",
      backend: null,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const { success, message, error } = await register({
      name,
      email,
      password,
      confirmPassword,
    });

    if (success) {
      toast.success(message);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      setTimeout(() => {
        router.push("/activate-prompt");
      }, 1500);
    } else {
      const backendMessage = error?.data?.message || "Registration failed.";
      setErrors((prev) => ({ ...prev, backend: backendMessage }));
      toast.error(backendMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {errors.backend && (
        <AlertBox
          status="error"
          message={errors.backend}
          autoDismiss={false}
          role="alert"
          aria-live="assertive"
        />
      )}

      <InputField
        label="Full Name"
        name="name"
        id="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Jane Doe"
        autoComplete="name"
        required
        error={errors.name}
      />

      <InputField
        label="Email"
        name="email"
        id="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        id="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Create a secure password"
        autoComplete="new-password"
        required
        error={errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showToggle
      />

      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        // showToggle
      />

      <Button
        type="submit"
        size="md"
        className="w-full"
        disabled={isRegistering || !isFormValid}
        isLoading={isRegistering}
        loadingText="Submitting..."
      >
        Sign Up
      </Button>
    </form>
  );
}
