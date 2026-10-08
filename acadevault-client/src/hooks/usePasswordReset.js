import { useDispatch, useSelector } from "react-redux";
import { clearPasswordMessage } from "@/features/auth/authSlice";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/features/auth/authApi";

export const usePasswordReset = () => {
  const dispatch = useDispatch();
  const [forgotPasswordMutation, { isLoading: forgotLoading }] =
    useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: resetLoading }] =
    useResetPasswordMutation();
  const message = useSelector((state) => state.auth.passwordMessage);

  const forgotPassword = async (email) => {
    try {
      await forgotPasswordMutation({ email }).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const resetPassword = async ({ token, password, confirmPassword }) => {
    try {
      await resetPasswordMutation({
        token,
        password,
        confirmPassword,
      }).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const clearMessage = () => {
    dispatch(clearPasswordMessage());
  };

  return {
    forgotPassword,
    resetPassword,
    message,
    clearMessage,
    isLoading: forgotLoading || resetLoading,
  };
};
