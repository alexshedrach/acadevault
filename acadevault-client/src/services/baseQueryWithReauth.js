import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const AUTH_API_URL = "/api/v2/users/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include", // Enables secure HTTP-only cookie flows
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isUnauthorized =
    result?.error?.status === 401 || result?.error?.status === 403;

  if (isUnauthorized && !args?.headers?.["x-retry"]) {
    console.warn("[Auth] Access denied. Attempting token refresh...");

    const refreshResult = await baseQuery(
      {
        url: `${AUTH_API_URL}/refresh-token`,
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.user) {
      console.info("[Auth] Session restored via refresh token");

      api.dispatch(
        setCredentials({
          user: refreshResult.data.user,
        })
      );

      const retryArgs = {
        ...args,
        headers: {
          ...args.headers,
          "x-retry": "true", // Prevent infinite refresh loop
        },
      };

      result = await baseQuery(retryArgs, api, extraOptions);
    } else {
      console.error("[Auth] Token refresh failed. Clearing session.");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      api.dispatch(clearCredentials());
    }
  }

  // Normalize error format
  if (result.error) {
    result.error.message =
      result.error.data?.message || "Something went wrong!";
  }

  return result;
};


// export const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   const isUnauthorized =
//     result?.error?.status === 401 || result?.error?.status === 403;

//   if (isUnauthorized) {
//     console.warn("[Auth] Access denied. Attempting token refresh...");

//     const refreshResult = await baseQuery(
//       {
//         url: `${AUTH_API_URL}/refresh-token`,
//         method: "POST",
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult?.data?.user) {
//       console.info("[Auth] Session restored via refresh token");

//       api.dispatch(
//         setCredentials({
//           user: refreshResult.data.user,
//         })
//       );

//       // Retry original request
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       console.error("[Auth] Token refresh failed. Clearing session.");

//       // Clean up stale tokens (if not handled server-side)
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");

//       api.dispatch(clearCredentials());
//     }
//   }

//   return result;
// };
