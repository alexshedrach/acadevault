"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import zxcvbn from "zxcvbn";
import FormFieldWrapper from "./FormFieldWrapper"; // Adjust path as needed

const levels = [
  { label: "Very Weak", color: "bg-red-500", emoji: "🟥" },
  { label: "Weak", color: "bg-orange-500", emoji: "🟧" },
  { label: "Fair", color: "bg-yellow-400", emoji: "🟨" },
  { label: "Good", color: "bg-blue-500", emoji: "🟦" },
  { label: "Strong", color: "bg-green-600", emoji: "🟩" },
];

const getZxcvbnStrength = (password, userInputs = []) => {
  if (!password) return null;
  const result = zxcvbn(password, userInputs);
  const { score, feedback, crack_times_display } = result;
  return {
    score,
    label: levels[score].label,
    color: levels[score].color,
    emoji: levels[score].emoji,
    suggestions: feedback.suggestions,
    crackTime: crack_times_display.offline_fast_hashing_1e10_per_second,
  };
};

const PasswordStrengthMeter = ({ strength }) => {
  if (!strength) return null;

  return (
    <div id="password-strength" className="mt-2 space-y-1">
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", strength.color)}
          style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
        />
      </div>
      <p
        className={cn(
          "text-xs font-medium flex items-center gap-1",
          strength.color.replace("bg", "text")
        )}
      >
        Strength: {strength.emoji} {strength.label}
        <span className="ml-2 text-gray-500">
          ({strength.crackTime} to crack)
        </span>
      </p>
    </div>
  );
};

export function PasswordField({
  name,
  label = "Password",
  control = null,
  required = true,
  backendError = "",
  placeholder = "",
  autoComplete = "new-password",
  showPassword: propShowPassword,
  setShowPassword: propSetShowPassword,
  showToggle = true,
  className = "",
  inputClassName = "",
  userInputs = [],
  onStrengthChange = () => {},
  value: propValue,
  onChange: propOnChange,
  onBlur: propOnBlur,
  error: externalError,
}) {
  const hookForm = !!control;
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(null);
  const showStrength = name === "password";

  const {
    field: { value, onChange, onBlur } = {},
    fieldState: { error } = {},
  } = hookForm
    ? useController({
        name,
        control,
        defaultValue: "",
      })
    : {};

  const inputValue = hookForm ? value : propValue;
  const inputOnChange = hookForm ? onChange : propOnChange;
  const inputOnBlur = hookForm ? onBlur : propOnBlur;
  const errorMessage = error?.message || backendError || externalError;
  const showValid = !errorMessage && inputValue?.trim()?.length > 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (showStrength && inputValue) {
        const result = getZxcvbnStrength(inputValue, userInputs);
        setStrength(result);
        onStrengthChange(result);
      } else {
        setStrength(null);
        onStrengthChange(null);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [inputValue, showStrength, userInputs, onStrengthChange]);

  const handleToggle = () => {
    if (propSetShowPassword) {
      propSetShowPassword(!propShowPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  const adornmentRight = (
    <>
      {showValid && (
        <CheckCircle className="text-green-500" size={20} aria-hidden="true" />
      )}
      {showToggle && (
        <button
          type="button"
          onClick={handleToggle}
          className="text-gray-500 hover:text-gray-700 ml-2"
          aria-label={
            propShowPassword || showPassword ? "Hide password" : "Show password"
          }
        >
          {propShowPassword || showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      )}
    </>
  );

  return (
    <FormFieldWrapper
      name={name}
      label={label}
      control={control}
      required={required}
      error={errorMessage}
      helpText={
        showStrength && strength?.score < 3 && strength?.suggestions?.length > 0
          ? strength.suggestions.join(" ")
          : undefined
      }
      className={cn("mb-6", className)}
      inputClassName={inputClassName}
      adornmentRight={adornmentRight}
    >
      <input
        type={propShowPassword || showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={inputValue}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
      />
      {showStrength && <PasswordStrengthMeter strength={strength} />}
    </FormFieldWrapper>
  );
}
