import { useActivateAccountMutation } from "@/features/auth/authApi";
import { useState, useCallback } from "react";

export default function useActivateAccount() {
  const [activateAccountMutation, { isLoading }] = useActivateAccountMutation();

  const [activationMessage, setActivationMessage] = useState(null);
  const [activationError, setActivationError] = useState(null);

  const activate = async (token) => {
    try {
      const result = await activateAccountMutation(token).unwrap();
      setActivationMessage(
        result?.message || "🎉 Your account has been successfully activated!"
      );
      return { success: true, data: result };
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Activation failed.";
      setActivationError(msg);
      return { success: false, error: msg };
    }
  };

  const clear = useCallback(() => {
    setActivationMessage(null);
    setActivationError(null);
  }, []);

  return {
    activate,
    isActivating: isLoading,
    activationMessage,
    activationError,
    clearActivationState: clear,
  };
}
