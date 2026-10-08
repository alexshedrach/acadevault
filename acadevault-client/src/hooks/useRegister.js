import {
  useRegisterMutation,
  useResendActivationEmailMutation,
} from "@/features/auth/authApi";
import {
  clearRegistrationMessage,
  setRegistrationMessage,
} from "@/features/auth/authSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useRegister() {
  const dispatch = useDispatch();

  const [registerMutation, { isLoading: registering }] = useRegisterMutation();
  const [resendActivation, { isLoading: resending }] =
    useResendActivationEmailMutation();

  const register = async ({ name, email, password, confirmPassword }) => {
    try {
      const result = await registerMutation({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();

      // store the prompt message in Redux
      dispatch(
        setRegistrationMessage(
          result?.message ||
            "Almost there! Check your inbox and click the activation link to verify your account."
        )
      );

      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error };
    }
  };

  const registrationMessage = useSelector(
    (state) => state.auth.registrationMessage
  );

  const clearError = useCallback(() => {
    dispatch(clearRegistrationMessage());
  }, [dispatch]);

  const resend = async (email) => {
    try {
      await resendActivation({ email }).unwrap();
      return { success: true, message: result?.message };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    register,
    registrationMessage,
    clearRegistrationMessage: clearError,
    resendActivationEmail: resend,
    isRegistering: registering,
    isResending: resending,
  };
}
