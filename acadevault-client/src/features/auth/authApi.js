import { createApi } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "./authSlice";
import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";

const AUTH_API_URL = "/api/v2/users/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // --------------------- REGISTER ------------------------------
    register: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_API_URL}/signup`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("📩 Activation email sent to:", data.user.email);
        } catch (err) {
          console.error("Registration failed:", err);
        }
      },
    }),

    // --------------------- ACTIVATE ACCOUNT ------------------------------
    activateAccount: builder.mutation({
      query: (token) => ({
        url: `${AUTH_API_URL}/activate-account?token=${encodeURIComponent(
          token
        )}`,
        method: "GET",
      }),
    }),

    // --------------------- RESEND ACTIVATION EMAIL ------------------------------
    resendActivationEmail: builder.mutation({
      query: ({ email }) => ({
        url: `${AUTH_API_URL}/resend-activation`,
        method: "POST",
        body: { email },
      }),
    }),

    // --------------------- LOGIN ------------------------------
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_API_URL}/login`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    // --------------------- REFRESH TOKEN ------------------------------
    refresh: builder.mutation({
      query: () => ({
        url: `${AUTH_API_URL}/refresh-token`,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.tokens.accessToken,
              user: data.user,
            })
          );
        } catch {
          dispatch(clearCredentials());
        }
      },
    }),

    // --------------- GET LOGGED IN USER DETAILS -------------------------
    getCurrentUser: builder.query({
      query: () => ({
        url: `${AUTH_API_URL}/me`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch {
          dispatch(clearCredentials());
        }
      },
    }),

    // --------------------- FORGOT PASSWORD ------------------------------
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: `${AUTH_API_URL}/password/forgot`,
        method: "POST",
        body: { email },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPasswordMessage(data.message));
        } catch (error) {
          console.error("Forgot password failed:", error);
        }
      },
    }),

    // --------------------- RESET PASSWORD ------------------------------
    resetPassword: builder.mutation({
      query: ({ token, password, confirmPassword }) => ({
        url: `${AUTH_API_URL}/password/reset/${token}`,
        method: "PATCH",
        body: { password, confirmPassword },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("✅ Password reset successful");
          dispatch(setPasswordMessage(data.message));
        } catch (err) {
          console.error("Reset password failed:", err);
        }
      },
    }),

    // ------------------ UPDATE PASSWORD ------------------
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: `${AUTH_API_URL}/update/password`,
        method: "PATCH",
        body: { oldPassword, newPassword, confirmPassword },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("🔐 Password updated:", data.message);
        } catch (err) {
          console.error("Password update failed:", err);
        }
      },
    }),

    // ------------------ UPDATE PASSWORD ------------------
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: `${AUTH_API_URL}/update/profile`,
        method: "PUT",
        body: updatedData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
          console.log("👤 Profile updated successfully");
        } catch (err) {
          console.error("Profile update failed:", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    // ------------------ ACCOUNT STATUS ------------------
    getAccountStatus: builder.query({
      query: () => ({
        url: `${AUTH_API_URL}/account/status`,
        method: "GET",
      }),
    }),

    // ------------------ DELETE ACCOUNT ------------------
    deleteAccount: builder.mutation({
      query: () => ({
        url: `${AUTH_API_URL}/account/delete`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          const Cookies = (await import("js-cookie")).default;
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          dispatch(clearCredentials());
        } catch (err) {
          console.error("Account deletion failed:", err);
        }
      },
      invalidatesTags: ["User"],
    }),

    // --------------------- LOGOUT ------------------------------
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_API_URL}/logout`,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          const Cookies = (await import("js-cookie")).default;
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          dispatch(clearCredentials());
        } catch (e) {
          console.error("Logout failed", e);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateAccountMutation,
  useResendActivationEmailMutation,
  useLoginMutation,
  useRefreshMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetAccountStatusQuery,
  useDeleteAccountMutation,
  useLogoutMutation,
} = authApi;
