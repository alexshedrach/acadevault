"use client";

import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetAccountStatusQuery,
  useDeleteAccountMutation,
} from "@/features/auth/authApi";
import { useEffect, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

export function useAuth() {
  const [hasInitialized, setHasInitialized] = useState(false);
  const hasTriedRefresh = useRef(false);

  const { user } = useSelector((state) => state.auth);

  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [refreshMutation, { isLoading: refreshLoading }] = useRefreshMutation();
  const {
    data: currentUserData,
    isFetching: isFetchingUser,
    isError: userFetchError,
    isSuccess: userFetchSuccess,
  } = useGetCurrentUserQuery(undefined, {
    skip: !hasInitialized || !document.cookie.includes("accessToken"),
  });

  const [updatePasswordMutation] = useUpdatePasswordMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const {
    data: accountStatus,
    isLoading: isCheckingStatus,
    isError: statusError,
  } = useGetAccountStatusQuery(undefined, {
    skip: !user,
  });

  /**
   * Attempt silent session refresh once
   */
  const triggerRefresh = useCallback(async () => {
    if (!hasTriedRefresh.current && !refreshLoading) {
      hasTriedRefresh.current = true;
      try {
        await refreshMutation().unwrap();
        console.log("✅ Silent session refresh complete.");
      } catch (err) {
        console.warn("⚠️ Silent session refresh failed. Logging out user.");
        // optional: you could call logoutMutation() here to clear cookies
      } finally {
        setHasInitialized(true); // even on failure, stop further retries
      }
    }
  }, [refreshLoading, refreshMutation]);

  /**
   * Handle user fetch errors to trigger refresh
   */
  useEffect(() => {
    if (userFetchError && !hasTriedRefresh.current) {
      triggerRefresh();
    } else if (!isFetchingUser && !refreshLoading) {
      setHasInitialized(true); // even if no error, mark init after fetch
    }
  }, [userFetchError, isFetchingUser, refreshLoading, triggerRefresh]);

  const login = async (payload) => {
    try {
      const result = await loginMutation(payload).unwrap();
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const updatePassword = async (payload) => {
    try {
      const data = await updatePasswordMutation(payload).unwrap();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  const updateProfile = async (payload) => {
    try {
      const data = await updateProfileMutation(payload).unwrap();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteAccountMutation().unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: loginLoading || refreshLoading || isFetchingUser,
    hasInitialized,
    login,
    logout,
    updatePassword,
    updateProfile,
    deleteAccount,
    accountStatus,
    isCheckingStatus,
    triggerRefresh,
  };
}
