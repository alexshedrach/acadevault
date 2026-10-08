"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/utils/formValidation";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { InputField } from "./fields/InputField";
import { PasswordField } from "./fields/PasswordField";
import { AlertBox } from "../ui/AlertBox";
import { Button } from "../ui/Button";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    backend: null,
  });

  const isFormValid = useMemo(() => {
    return !validateEmail(email) && !validatePassword(password);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
      backend: null,
    });

    if (emailError || passwordError) return;

    const result = await login({ email, password, remember: rememberMe });

    if (result.success) {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } else {
      const backendMessage =
        result?.error?.data?.message || "Login failed. Please try again.";
      setErrors((prev) => ({ ...prev, backend: backendMessage }));
      toast.error(backendMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
        label="Email"
        name="email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        error={errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showToggle
        userInputs={[email]}
        onStrengthChange={() => {}} // Optional: can be used for extra logic
      />

      <div className="flex items-center justify-between text-sm text-gray-600">
        <label htmlFor="rememberMe" className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-blue-600"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-blue-600 hover:underline font-medium"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        size="md"
        isLoading={isLoading}
        disabled={isLoading || !isFormValid}
        loadingText="Signing in..."
        className="w-full"
      >
        Sign in
      </Button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative text-center">
          <span className="bg-white px-2 text-sm text-gray-500">OR</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          as="a"
          href="/auth/google"
          variant="outline"
          className="w-full gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>
        <Button
          as="a"
          href="/auth/github"
          variant="outline"
          className="w-full gap-2"
        >
          <FaGithub size={20} />
          Continue with GitHub
        </Button>
      </div>
    </form>
  );
}

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useMemo, useState } from "react";

// import { useAuth } from "@/hooks/useAuth";
// import { validateEmail, validatePassword } from "@/utils/formValidation";

// import InputField from "@/components/form/InputField";
// import { PasswordField } from "@/components/form/PasswordField";
// import { Button } from "@/components/ui/Button";
// import AlertBox from "@/components/ui/AlertBox";

// import { FaGithub } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { toast } from "react-toastify";

// export function LoginForm() {
//   const router = useRouter();
//   const { login, isLoading } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [errors, setErrors] = useState({
//     email: null,
//     password: null,
//     backend: null,
//   });

//   // 🔒 Validates fields fully and disables button accordingly
//   const isFormValid = useMemo(() => {
//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);
//     return !emailError && !passwordError;
//   }, [email, password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);

//     setErrors({
//       email: emailError,
//       password: passwordError,
//       backend: null,
//     });

//     if (emailError || passwordError) return;

//     const result = await login({ email, password, remember: rememberMe });

//     if (result.success) {
//       toast.success("Logged in successfully!");
//       router.push("/dashboard");
//     } else {
//       const backendMessage = result?.error?.data?.message || "Login failed.";
//       setErrors((prev) => ({ ...prev, backend: backendMessage }));
//       toast.error(backendMessage);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-4">
//       {errors.backend && (
//         <AlertBox
//           status="error"
//           message={errors.backend}
//           autoDismiss={false}
//           role="alert"
//           aria-live="assertive"
//         />
//       )}

//       <InputField
//         label="Email"
//         name="email"
//         id="email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="you@example.com"
//         autoComplete="email"
//         required
//         error={errors.email}
//       />

//       <PasswordField
//         label="Password"
//         name="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter your password"
//         autoComplete="current-password"
//         required
//         error={errors.password}
//         showPassword={showPassword}
//         setShowPassword={setShowPassword}
//         showToggle
//       />

//       <div className="flex items-center justify-between text-sm text-gray-600">
//         <label htmlFor="rememberMe" className="flex items-center gap-2">
//           <input
//             id="rememberMe"
//             type="checkbox"
//             checked={rememberMe}
//             onChange={(e) => setRememberMe(e.target.checked)}
//             className="accent-blue-600"
//           />
//           Remember me
//         </label>

//         <Link
//           href="/forgot-password"
//           className="text-blue-600 hover:underline font-medium"
//         >
//           Forgot password?
//         </Link>
//       </div>

//       <Button
//         type="submit"
//         size="md"
//         isLoading={isLoading}
//         disabled={isLoading || !isFormValid}
//         loadingText="Signing in..."
//         className="w-full"
//       >
//         Sign in
//       </Button>

//       <div className="relative mb-4">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300" />
//         </div>
//         <div className="relative text-center">
//           <span className="bg-white px-2 text-sm text-gray-500">
//             OR
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col gap-3">
//         <Button
//           as="a"
//           href="/auth/google"
//           variant="outline"
//           className="w-full gap-2"
//         >
//           <FcGoogle size={20} />
//           Continue with Google
//         </Button>
//         <Button
//           as="a"
//           href="/auth/github"
//           variant="outline"
//           className="w-full gap-2"
//         >
//           <FaGithub size={20} />
//           Continue with GitHub
//         </Button>
//       </div>
//     </form>
//   );
// }
