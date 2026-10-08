module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/acadevault-client/src/features/auth/authSlice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearCredentials": (()=>clearCredentials),
    "clearPasswordMessage": (()=>clearPasswordMessage),
    "clearRegistrationMessage": (()=>clearRegistrationMessage),
    "default": (()=>__TURBOPACK__default__export__),
    "setCredentials": (()=>setCredentials),
    "setPasswordMessage": (()=>setPasswordMessage),
    "setRegistrationMessage": (()=>setRegistrationMessage),
    "toggleSidebar": (()=>toggleSidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    user: null,
    isAuthenticated: false,
    registrationMessage: null,
    passwordMessage: null,
    ui: {
        sidebarOpen: false
    }
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearCredentials: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
        },
        // NEW: after signup, store the message to show on ActivatePromptPage
        setRegistrationMessage: (state, action)=>{
            state.registrationMessage = action.payload;
        },
        // NEW: clear that message (e.g. on mount of the prompt page)
        clearRegistrationMessage: (state)=>{
            state.registrationMessage = null;
        },
        setPasswordMessage: (state, action)=>{
            state.passwordMessage = action.payload;
        },
        clearPasswordMessage: (state)=>{
            state.passwordMessage = null;
        },
        toggleSidebar: (state)=>{
            state.ui.sidebarOpen = !state.ui.sidebarOpen;
        }
    }
});
const { setCredentials, clearCredentials, setRegistrationMessage, clearRegistrationMessage, setPasswordMessage, clearPasswordMessage, toggleSidebar } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}}),
"[project]/acadevault-client/src/features/category/categorySlice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "closeCreateModal": (()=>closeCreateModal),
    "closeEditModal": (()=>closeEditModal),
    "default": (()=>__TURBOPACK__default__export__),
    "openCreateModal": (()=>openCreateModal),
    "openEditModal": (()=>openEditModal),
    "resetCategoryUI": (()=>resetCategoryUI),
    "setActiveTab": (()=>setActiveTab),
    "setSelectedCategoryId": (()=>setSelectedCategoryId)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    selectedCategoryId: null,
    isCreateModalOpen: false,
    isEditModalOpen: false,
    activeTab: "details"
};
const categorySlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "category",
    initialState,
    reducers: {
        setSelectedCategoryId (state, action) {
            state.selectedCategoryId = action.payload;
        },
        openCreateModal (state) {
            state.isCreateModalOpen = true;
        },
        closeCreateModal (state) {
            state.isCreateModalOpen = false;
        },
        openEditModal (state) {
            state.isEditModalOpen = true;
        },
        closeEditModal (state) {
            state.isEditModalOpen = false;
        },
        setActiveTab (state, action) {
            state.activeTab = action.payload;
        },
        resetCategoryUI (state) {
            return initialState;
        }
    }
});
const { setSelectedCategoryId, openCreateModal, closeCreateModal, openEditModal, closeEditModal, setActiveTab, resetCategoryUI } = categorySlice.actions;
const __TURBOPACK__default__export__ = categorySlice.reducer;
}}),
"[project]/acadevault-client/src/features/materials/materialsUiSlice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "resetFilters": (()=>resetFilters),
    "setFilters": (()=>setFilters),
    "setSelectedMaterialId": (()=>setSelectedMaterialId),
    "setSortOrder": (()=>setSortOrder)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    selectedMaterialId: null,
    sortOrder: "latest",
    filters: {
        level: null,
        subject: null
    }
};
const materialsUiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "materialsUi",
    initialState,
    reducers: {
        setSelectedMaterialId: (state, action)=>{
            state.selectedMaterialId = action.payload;
        },
        setSortOrder: (state, action)=>{
            state.sortOrder = action.payload;
        },
        setFilters: (state, action)=>{
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        },
        resetFilters: (state)=>{
            state.filters = initialState.filters;
        }
    }
});
const { setSelectedMaterialId, setSortOrder, setFilters, resetFilters } = materialsUiSlice.actions;
const __TURBOPACK__default__export__ = materialsUiSlice.reducer;
}}),
"[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "baseQueryWithReauth": (()=>baseQueryWithReauth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/auth/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
;
;
;
const AUTH_API_URL = "/api/v2/users/auth";
const baseQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
    baseUrl: ("TURBOPACK compile-time value", "http://localhost:9000"),
    credentials: "include"
});
const baseQueryWithReauth = async (args, api, extraOptions)=>{
    let result = await baseQuery(args, api, extraOptions);
    const isUnauthorized = result?.error?.status === 401 || result?.error?.status === 403;
    if (isUnauthorized && !args?.headers?.["x-retry"]) {
        console.warn("[Auth] Access denied. Attempting token refresh...");
        const refreshResult = await baseQuery({
            url: `${AUTH_API_URL}/refresh-token`,
            method: "POST"
        }, api, extraOptions);
        if (refreshResult?.data?.user) {
            console.info("[Auth] Session restored via refresh token");
            api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
                user: refreshResult.data.user
            }));
            const retryArgs = {
                ...args,
                headers: {
                    ...args.headers,
                    "x-retry": "true"
                }
            };
            result = await baseQuery(retryArgs, api, extraOptions);
        } else {
            console.error("[Auth] Token refresh failed. Clearing session.");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove("accessToken");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove("refreshToken");
            api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
        }
    }
    // Normalize error format
    if (result.error) {
        result.error.message = result.error.data?.message || "Something went wrong!";
    }
    return result;
}; // export const baseQueryWithReauth = async (args, api, extraOptions) => {
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
}}),
"[project]/acadevault-client/src/features/auth/authApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authApi": (()=>authApi),
    "useActivateAccountMutation": (()=>useActivateAccountMutation),
    "useDeleteAccountMutation": (()=>useDeleteAccountMutation),
    "useForgotPasswordMutation": (()=>useForgotPasswordMutation),
    "useGetAccountStatusQuery": (()=>useGetAccountStatusQuery),
    "useGetCurrentUserQuery": (()=>useGetCurrentUserQuery),
    "useLoginMutation": (()=>useLoginMutation),
    "useLogoutMutation": (()=>useLogoutMutation),
    "useRefreshMutation": (()=>useRefreshMutation),
    "useRegisterMutation": (()=>useRegisterMutation),
    "useResendActivationEmailMutation": (()=>useResendActivationEmailMutation),
    "useResetPasswordMutation": (()=>useResetPasswordMutation),
    "useUpdatePasswordMutation": (()=>useUpdatePasswordMutation),
    "useUpdateProfileMutation": (()=>useUpdateProfileMutation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/auth/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
;
;
;
const AUTH_API_URL = "/api/v2/users/auth";
const authApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "authApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: [
        "User",
        "Auth"
    ],
    endpoints: (builder)=>({
            // --------------------- REGISTER ------------------------------
            register: builder.mutation({
                query: (credentials)=>({
                        url: `${AUTH_API_URL}/signup`,
                        method: "POST",
                        body: credentials
                    }),
                async onQueryStarted (_, { queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log("📩 Activation email sent to:", data.user.email);
                    } catch (err) {
                        console.error("Registration failed:", err);
                    }
                }
            }),
            // --------------------- ACTIVATE ACCOUNT ------------------------------
            activateAccount: builder.mutation({
                query: (token)=>({
                        url: `${AUTH_API_URL}/activate-account?token=${encodeURIComponent(token)}`,
                        method: "GET"
                    })
            }),
            // --------------------- RESEND ACTIVATION EMAIL ------------------------------
            resendActivationEmail: builder.mutation({
                query: ({ email })=>({
                        url: `${AUTH_API_URL}/resend-activation`,
                        method: "POST",
                        body: {
                            email
                        }
                    })
            }),
            // --------------------- LOGIN ------------------------------
            login: builder.mutation({
                query: (credentials)=>({
                        url: `${AUTH_API_URL}/login`,
                        method: "POST",
                        body: credentials
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
                            user: data.user
                        }));
                    } catch (err) {
                        console.error("Login failed:", err);
                    }
                }
            }),
            // --------------------- REFRESH TOKEN ------------------------------
            refresh: builder.mutation({
                query: ()=>({
                        url: `${AUTH_API_URL}/refresh-token`,
                        method: "POST"
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
                            accessToken: data.tokens.accessToken,
                            user: data.user
                        }));
                    } catch  {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
                    }
                }
            }),
            // --------------- GET LOGGED IN USER DETAILS -------------------------
            getCurrentUser: builder.query({
                query: ()=>({
                        url: `${AUTH_API_URL}/me`,
                        method: "GET"
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
                            user: data.user
                        }));
                    } catch  {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
                    }
                }
            }),
            // --------------------- FORGOT PASSWORD ------------------------------
            forgotPassword: builder.mutation({
                query: ({ email })=>({
                        url: `${AUTH_API_URL}/password/forgot`,
                        method: "POST",
                        body: {
                            email
                        }
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(setPasswordMessage(data.message));
                    } catch (error) {
                        console.error("Forgot password failed:", error);
                    }
                }
            }),
            // --------------------- RESET PASSWORD ------------------------------
            resetPassword: builder.mutation({
                query: ({ token, password, confirmPassword })=>({
                        url: `${AUTH_API_URL}/password/reset/${token}`,
                        method: "PATCH",
                        body: {
                            password,
                            confirmPassword
                        }
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log("✅ Password reset successful");
                        dispatch(setPasswordMessage(data.message));
                    } catch (err) {
                        console.error("Reset password failed:", err);
                    }
                }
            }),
            // ------------------ UPDATE PASSWORD ------------------
            updatePassword: builder.mutation({
                query: ({ oldPassword, newPassword, confirmPassword })=>({
                        url: `${AUTH_API_URL}/update/password`,
                        method: "PATCH",
                        body: {
                            oldPassword,
                            newPassword,
                            confirmPassword
                        }
                    }),
                async onQueryStarted (_, { queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log("🔐 Password updated:", data.message);
                    } catch (err) {
                        console.error("Password update failed:", err);
                    }
                }
            }),
            // ------------------ UPDATE PASSWORD ------------------
            updateProfile: builder.mutation({
                query: (updatedData)=>({
                        url: `${AUTH_API_URL}/update/profile`,
                        method: "PUT",
                        body: updatedData
                    }),
                async onQueryStarted (_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
                            user: data.user
                        }));
                        console.log("👤 Profile updated successfully");
                    } catch (err) {
                        console.error("Profile update failed:", err);
                    }
                },
                invalidatesTags: [
                    "User"
                ]
            }),
            // ------------------ ACCOUNT STATUS ------------------
            getAccountStatus: builder.query({
                query: ()=>({
                        url: `${AUTH_API_URL}/account/status`,
                        method: "GET"
                    })
            }),
            // ------------------ DELETE ACCOUNT ------------------
            deleteAccount: builder.mutation({
                query: ()=>({
                        url: `${AUTH_API_URL}/account/delete`,
                        method: "DELETE"
                    }),
                async onQueryStarted (_, { dispatch }) {
                    try {
                        const Cookies = (await __turbopack_context__.r("[project]/node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i)).default;
                        Cookies.remove("accessToken");
                        Cookies.remove("refreshToken");
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
                    } catch (err) {
                        console.error("Account deletion failed:", err);
                    }
                },
                invalidatesTags: [
                    "User"
                ]
            }),
            // --------------------- LOGOUT ------------------------------
            logout: builder.mutation({
                query: ()=>({
                        url: `${AUTH_API_URL}/logout`,
                        method: "POST"
                    }),
                async onQueryStarted (_, { dispatch }) {
                    try {
                        const Cookies = (await __turbopack_context__.r("[project]/node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i)).default;
                        Cookies.remove("accessToken");
                        Cookies.remove("refreshToken");
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
                    } catch (e) {
                        console.error("Logout failed", e);
                    }
                },
                invalidatesTags: [
                    "User"
                ]
            })
        })
});
const { useRegisterMutation, useActivateAccountMutation, useResendActivationEmailMutation, useLoginMutation, useRefreshMutation, useGetCurrentUserQuery, useForgotPasswordMutation, useResetPasswordMutation, useUpdatePasswordMutation, useUpdateProfileMutation, useGetAccountStatusQuery, useDeleteAccountMutation, useLogoutMutation } = authApi;
}}),
"[project]/acadevault-client/src/features/category/academicLevelApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "academicLevelApi": (()=>academicLevelApi),
    "useGetAcademicLevelsQuery": (()=>useGetAcademicLevelsQuery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
;
;
const CATEGORY_BASE_URL = "/api/v2/categories";
const academicLevelApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "academicLevelApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: [
        "AcademicLevel"
    ],
    endpoints: (builder)=>({
            // ────────────── Query: Fetch Academic Levels with Degrees ──────────────
            getAcademicLevels: builder.query({
                query: ()=>`${CATEGORY_BASE_URL}/academic/levels`,
                transformResponse: (response)=>response?.data?.academicLevels || [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "AcademicLevel",
                                id
                            })),
                        {
                            type: "AcademicLevel",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "AcademicLevel",
                            id: "LIST"
                        }
                    ]
            })
        })
});
const { useGetAcademicLevelsQuery } = academicLevelApi;
}}),
"[project]/acadevault-client/src/features/category/categoryQueryHelpers.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "buildDepartmentUrl": (()=>buildDepartmentUrl),
    "transformDepartmentResponse": (()=>transformDepartmentResponse)
});
function buildDepartmentUrl(params = {}) {
    const basePath = "/api/v2/categories/departments";
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)){
        if (typeof value === "string" || typeof value === "number") {
            query.set(key, value.toString());
        }
    }
    return `${basePath}?${query.toString()}`;
}
function transformDepartmentResponse(response, params = {}) {
    if (response?.status !== "success" || !response?.data?.departments || !Array.isArray(response.data.departments)) {
        return {
            departments: [],
            pagination: {
                page: Number(params.page) || 1,
                limit: Number(params.limit) || 10,
                totalPages: 0,
                totalResults: 0
            }
        };
    }
    return {
        departments: response.data.departments,
        pagination: response.pagination
    };
}
}}),
"[project]/acadevault-client/src/features/category/categoryApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "categoryApi": (()=>categoryApi),
    "useCreateCategoryMutation": (()=>useCreateCategoryMutation),
    "useDeleteCategoryMutation": (()=>useDeleteCategoryMutation),
    "useGetAcademicLevelsQuery": (()=>useGetAcademicLevelsQuery),
    "useGetCategoriesQuery": (()=>useGetCategoriesQuery),
    "useGetCategoryByIdQuery": (()=>useGetCategoryByIdQuery),
    "useGetCategoryBySlugQuery": (()=>useGetCategoryBySlugQuery),
    "useGetDepartmentsQuery": (()=>useGetDepartmentsQuery),
    "useGetParentCategoriesQuery": (()=>useGetParentCategoriesQuery),
    "useGetSubcategoriesQuery": (()=>useGetSubcategoriesQuery),
    "useLazyGetSubcategoriesQuery": (()=>useLazyGetSubcategoriesQuery),
    "useSoftDeleteCategoryMutation": (()=>useSoftDeleteCategoryMutation),
    "useUpdateCategoryMutation": (()=>useUpdateCategoryMutation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/categoryQueryHelpers.js [app-ssr] (ecmascript)");
;
;
;
const CATEGORY_BASE_URL = "/api/v2/categories";
const categoryApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "categoryApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: [
        "Category",
        "Department",
        "AcademicLevel"
    ],
    endpoints: (builder)=>({
            // ──────────────────── GET ALL CATEGORIES ─────────────────────
            getCategories: builder.query({
                query: (params)=>({
                        url: CATEGORY_BASE_URL,
                        method: "GET",
                        params
                    }),
                transformResponse: (response)=>({
                        categories: response?.data?.categories || [],
                        pagination: response?.pagination || {}
                    }),
                providesTags: (result)=>result?.categories ? [
                        ...result.categories.map(({ _id })=>({
                                type: "Category",
                                id: _id
                            })),
                        {
                            type: "Category",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "Category",
                            id: "LIST"
                        }
                    ]
            }),
            // ──────────────────── GET PARENT CATEGORIES ─────────────────────
            getParentCategories: builder.query({
                query: (params)=>({
                        url: `${CATEGORY_BASE_URL}/parent`,
                        method: "GET",
                        params
                    }),
                transformResponse: (response)=>({
                        parentCategories: response?.data?.categories || [],
                        pagination: response?.pagination || {}
                    }),
                providesTags: (result)=>result?.parentCategories ? [
                        ...result.parentCategories.map(({ _id })=>({
                                type: "Category",
                                id: _id
                            })),
                        {
                            type: "Category",
                            id: "PARENT"
                        }
                    ] : [
                        {
                            type: "Category",
                            id: "PARENT"
                        }
                    ]
            }),
            // ──────────────────── GET SUBCATEGORIES ─────────────────────
            getSubcategories: builder.query({
                query: ({ parentId, params })=>({
                        url: `${CATEGORY_BASE_URL}/${parentId}/subcategories`,
                        method: "GET",
                        params
                    }),
                transformResponse: (response, meta, arg)=>({
                        parentId: arg.parentId,
                        subcategories: response?.data?.subcategories || []
                    }),
                providesTags: (result)=>result.subcategories.length ? [
                        ...result.subcategories.map((c)=>({
                                type: "Category",
                                id: c._id
                            })),
                        {
                            type: "Category",
                            id: `SUB_${result.parentId}`
                        }
                    ] : [
                        {
                            type: "Category",
                            id: `SUB_${result.parentId}`
                        }
                    ]
            }),
            // ──────────────────── GET ACADEMIC LEVELS WITH DEGREES ─────────────────────
            getAcademicLevels: builder.query({
                query: ()=>({
                        url: `${CATEGORY_BASE_URL}/academic/levels`,
                        method: "GET"
                    }),
                transformResponse: (response)=>response?.data?.academicLevels || [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "AcademicLevel",
                                id
                            })),
                        {
                            type: "AcademicLevel",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "AcademicLevel",
                            id: "LIST"
                        }
                    ]
            }),
            // ────────────────────── GET DEPARTMENTS ──────────────────────
            getDepartments: builder.query({
                query: (params)=>({
                        url: `${CATEGORY_BASE_URL}/departments`,
                        method: "GET",
                        params
                    }),
                transformResponse: (response, meta, arg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformDepartmentResponse"])(response, arg),
                providesTags: (result)=>result?.departments?.length ? [
                        ...result.departments.map(({ _id })=>({
                                type: "Department",
                                id: _id
                            })),
                        {
                            type: "Department",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "Department",
                            id: "LIST"
                        }
                    ]
            }),
            // ────────────────────── GET CATEGORY BY ID ──────────────────────
            getCategoryById: builder.query({
                query: ({ categoryId, params })=>({
                        url: `${CATEGORY_BASE_URL}/${categoryId}`,
                        method: "GET",
                        params
                    }),
                transformResponse: (response)=>{
                    const category = response?.data;
                    return {
                        id: category?.id,
                        name: category?.name,
                        slug: category?.slug,
                        description: category?.description,
                        categoryType: category?.categoryType,
                        sortOrder: category?.sortOrder,
                        parent: category?.parent || null,
                        // Subcategories
                        subcategories: category?.subcategories || [],
                        subcategoriesMeta: category?.subcategoriesMeta || {},
                        // Materials (optional, depending on backend implementation)
                        materials: category?.totalMaterials || [],
                        materialsMeta: category?.materialsMeta || {},
                        // Stats
                        totalViews: category?.totalViews ?? 0,
                        totalDownloads: category?.totalDownloads ?? 0,
                        averageRating: category?.averageRating ?? 0,
                        newMaterialsCount: category?.newMaterialsCount ?? 0,
                        // Timestamps
                        createdAt: category?.createdAt,
                        updatedAt: category?.updatedAt
                    };
                },
                providesTags: (result, error, { categoryId })=>{
                    if (!result) return [];
                    return [
                        {
                            type: "Category",
                            id: result.id
                        },
                        {
                            type: "Category",
                            id: categoryId
                        },
                        ...(result.subcategories || []).map((sub)=>({
                                type: "Category",
                                id: sub._id || sub.id
                            }))
                    ];
                },
                keepUnusedDataFor: 60,
                refetchOnMountOrArgChange: true,
                refetchOnReconnect: true
            }),
            // ──────────────────── CREATE CATEGORY ─────────────────────
            createCategory: builder.mutation({
                query: (data)=>({
                        url: CATEGORY_BASE_URL,
                        method: "POST",
                        body: data
                    }),
                invalidatesTags: [
                    {
                        type: "Category",
                        id: "LIST"
                    }
                ]
            }),
            // ──────────────────── UPDATE CATEGORY ─────────────────────
            updateCategory: builder.mutation({
                query: ({ categoryId, updateData })=>({
                        url: `${CATEGORY_BASE_URL}/${categoryId}`,
                        method: "PUT",
                        body: updateData
                    }),
                invalidatesTags: (result, error, { categoryId })=>[
                        {
                            type: "Category",
                            id: categoryId
                        },
                        {
                            type: "Category",
                            id: "LIST"
                        }
                    ]
            }),
            // ───────────────────── SOFT DELETE CATEGORY ─────────────────────
            softDeleteCategory: builder.mutation({
                query: (categoryId)=>({
                        url: `${CATEGORY_BASE_URL}/${categoryId}/soft-delete`,
                        method: "PATCH"
                    }),
                invalidatesTags: (result, error, categoryId)=>[
                        {
                            type: "Category",
                            id: categoryId
                        },
                        {
                            type: "Category",
                            id: "LIST"
                        }
                    ]
            }),
            // ──────────────────── DELETE CATEGORY ─────────────────────
            deleteCategory: builder.mutation({
                query: (categoryId)=>({
                        url: `${CATEGORY_BASE_URL}/${categoryId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: (result, error, id)=>[
                        {
                            type: "Category",
                            id
                        },
                        {
                            type: "Category",
                            id: "LIST"
                        }
                    ]
            })
        })
});
const { useGetCategoriesQuery, useGetParentCategoriesQuery, useGetSubcategoriesQuery, useLazyGetSubcategoriesQuery, useGetDepartmentsQuery, useGetAcademicLevelsQuery, useGetCategoryByIdQuery, useGetCategoryBySlugQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useSoftDeleteCategoryMutation, useDeleteCategoryMutation } = categoryApi;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[project]/acadevault-client/src/features/materials/materialQueryHelpers.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TAG_TYPES": (()=>TAG_TYPES),
    "buildMaterialUrl": (()=>buildMaterialUrl),
    "provideMaterialTags": (()=>provideMaterialTags),
    "transformMaterialResponse": (()=>transformMaterialResponse)
});
const TAG_TYPES = {
    MATERIAL: "Material",
    MATERIAL_LIST: "MaterialList",
    RelatedMaterials: "RelatedMaterials",
    FeaturedMaterials: "FeaturedMaterials",
    PopularTags: "PopularTags"
};
const buildMaterialUrl = (params = {})=>{
    const { categorySlug, shopId, materialId, related, // spread all other keys into a new object; these should be plain strings or numbers:
    ...rest } = params;
    let base = "/api/v2/academic-materials";
    if (typeof categorySlug === "string") {
        base += `/category/${encodeURIComponent(categorySlug)}/materials`;
    } else if (typeof shopId === "string") {
        base += `/shop/${encodeURIComponent(shopId)}/materials`;
    } else if (typeof materialId === "string" && related) {
        base += `/${encodeURIComponent(materialId)}/related`;
    }
    // Only keep keys whose values are string or number
    const safeQueryEntries = Object.entries(rest).filter(([, value])=>typeof value === "string" || typeof value === "number");
    const queryString = safeQueryEntries.length ? `?${new URLSearchParams(Object.fromEntries(safeQueryEntries)).toString()}` : "";
    return `${base}${queryString}`;
};
const transformMaterialResponse = (response, arg = {})=>{
    // If we're fetching “related” materials:
    if (arg.related) {
        return response.data.relatedMaterials;
    }
    // Otherwise:
    const materials = response.data?.materials ?? response.data;
    const pagination = response.pagination ?? response.metadata ?? {
        totalPages: 1,
        currentPage: 1,
        totalResults: Array.isArray(materials) ? materials.length : 0
    };
    return {
        materials,
        pagination
    };
};
const provideMaterialTags = (result, arg)=>{
    if (!result) {
        return [
            {
                type: "MaterialList",
                id: "LIST"
            }
        ];
    }
    // If this was a “related” fetch:
    if (arg?.related) {
        return [
            {
                type: TAG_TYPES.RelatedMaterials,
                id: arg.materialId
            }
        ];
    }
    // If we flagged isFeatured in the arg:
    if (arg?.isFeatured) {
        return [
            {
                type: TAG_TYPES.FeaturedMaterials,
                id: "LIST"
            }
        ];
    }
    // Default: tag each individual material + list
    if (Array.isArray(result.materials)) {
        return [
            ...result.materials.map((m)=>({
                    type: TAG_TYPES.MATERIAL,
                    id: m.id
                })),
            {
                type: TAG_TYPES.MATERIAL_LIST,
                id: "LIST"
            }
        ];
    }
    return [
        {
            type: TAG_TYPES.MATERIAL_LIST,
            id: "LIST"
        }
    ];
}; // export const buildMaterialUrl = (params = {}) => {
 //   const { categorySlug, shopId, materialId, related, ...queryParams } = params;
 //   let base = "/api/v2/academic-materials";
 //   if (categorySlug) {
 //     base += `/category/${categorySlug}/materials`;
 //   } else if (shopId) {
 //     base += `/shop/${shopId}/materials`;
 //   } else if (materialId && related) {
 //     base += `/${materialId}/related`;
 //   }
 //   const queryString = new URLSearchParams(queryParams).toString();
 //   return `${base}?${queryString}`;
 // };
 // export const transformMaterialResponse = (response, arg) => {
 //   if (arg?.related) {
 //     return {
 //       relatedMaterials: response.data.relatedMaterials,
 //       metadata: {
 //         results: response.data.results,
 //         status: response.data.status,
 //       },
 //     };
 //   }
 //   const materials = response.data?.materials || response.data;
 //   const pagination = response.pagination ||
 //     response.metadata || {
 //       totalPages: 1,
 //       currentPage: 1,
 //       totalResults: materials.length,
 //     };
 //   return { materials, pagination };
 // };
 // export const provideMaterialTags = (result, arg) => {
 //   if (arg?.related) {
 //     return [{ type: "RelatedMaterials", id: arg.materialId }];
 //   }
 //   if (arg?.isFeatured) {
 //     return [{ type: "FeaturedMaterials", id: "LIST" }];
 //   }
 //   return result?.materials
 //     ? [
 //         ...result.materials.map(({ id }) => ({ type: "Material", id })),
 //         { type: "MaterialList", id: "LIST" },
 //       ]
 //     : [{ type: "MaterialList", id: "LIST" }];
 // };
}}),
"[project]/acadevault-client/src/features/materials/academicMaterialsApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getRunningOperationPromises": (()=>getRunningOperationPromises),
    "materialApi": (()=>materialApi),
    "useCreateMaterialMutation": (()=>useCreateMaterialMutation),
    "useDeleteMaterialMutation": (()=>useDeleteMaterialMutation),
    "useGetMaterialDetailsQuery": (()=>useGetMaterialDetailsQuery),
    "useGetMaterialsQuery": (()=>useGetMaterialsQuery),
    "useGetPopularTagsQuery": (()=>useGetPopularTagsQuery),
    "useGetRelatedMaterialsQuery": (()=>useGetRelatedMaterialsQuery),
    "useUpdateMaterialMutation": (()=>useUpdateMaterialMutation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$redux$2d$wrapper$40$8$2e$1$2e$0_ne_75efd75daf6b761488c00b4882ad73b4$2f$node_modules$2f$next$2d$redux$2d$wrapper$2f$es6$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-redux-wrapper@8.1.0_ne_75efd75daf6b761488c00b4882ad73b4/node_modules/next-redux-wrapper/es6/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/materialQueryHelpers.js [app-ssr] (ecmascript)");
;
;
;
;
const MATERIAL_API_URL = "/api/v2/academic-materials";
const materialApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "materialApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"]),
    extractRehydrationInfo (action, { reducerPath }) {
        if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$redux$2d$wrapper$40$8$2e$1$2e$0_ne_75efd75daf6b761488c00b4882ad73b4$2f$node_modules$2f$next$2d$redux$2d$wrapper$2f$es6$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HYDRATE"]) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder)=>({
            // ──────────────────── GET ACADEMIC MATERIALS ─────────────────────
            getMaterials: builder.query({
                query: (params)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildMaterialUrl"])(params),
                transformResponse: (response, meta, arg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformMaterialResponse"])(response, arg),
                providesTags: (result, error, arg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["provideMaterialTags"])(result, arg)
            }),
            getPopularTags: builder.query({
                query: ()=>`${MATERIAL_API_URL}/popular-tags`,
                providesTags: (result)=>result?.data?.tags ? [
                        ...result.data.tags.map((tag)=>({
                                type: "PopularTags",
                                id: tag
                            })),
                        {
                            type: "PopularTags",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "PopularTags",
                            id: "LIST"
                        }
                    ],
                keepUnusedDataFor: 300,
                refetchOnFocus: true,
                refetchOnReconnect: true,
                pollingInterval: 600_000
            }),
            // ───────────────── GET ACADEMIC MATERIALS DETAILS ───────────────────
            getMaterialDetails: builder.query({
                query: (slug)=>`${MATERIAL_API_URL}/${encodeURIComponent(slug)}`,
                transformResponse: (response)=>response.data,
                providesTags: (_result, _error, slug)=>[
                        {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL,
                            id: slug
                        }
                    ]
            }),
            // ───────────────── GET RELATED MATERIALS ─────────────────
            getRelatedMaterials: builder.query({
                /**
       * Builds the query string to match your controller’s req.query handling.
       * We URL-encode the materialId, then append any pagination/sort/fields params.
       */ query: ({ materialId, page, limit, sort, fields })=>{
                    const params = new URLSearchParams();
                    if (page != null) params.append("page", String(page));
                    if (limit != null) params.append("limit", String(limit));
                    if (sort) params.append("sort", sort);
                    if (fields?.length) params.append("fields", fields.join(","));
                    return {
                        url: `${MATERIAL_API_URL}/${encodeURIComponent(materialId)}/related?${params.toString()}`,
                        method: "GET"
                    };
                },
                /**
       * Our backend responds with:
       *   { status: 'success', results: N, data: { relatedMaterials: [ … ] } }
       * We unwrap to get the plain array.
       */ transformResponse: (response)=>response.data.relatedMaterials,
                /**
       * Provide cache invalidation tags for each material returned, plus
       * a “LIST” tag so we can invalidate the whole related-materials list if needed.
       */ providesTags: (relatedMaterials, _error, { materialId })=>relatedMaterials ? [
                        // tag each returned material
                        ...relatedMaterials.map((mat)=>({
                                type: "Material",
                                id: mat._id
                            })),
                        // and a tag specific to this material’s related-list
                        {
                            type: "Material",
                            id: `RELATED_LIST_${materialId}`
                        }
                    ] : [
                        {
                            type: "Material",
                            id: `RELATED_LIST_${materialId}`
                        }
                    ]
            }),
            getMaterialsByShop: builder.query({
                query: ({ shopId, queryParams = {} })=>{
                    const searchParams = new URLSearchParams({
                        page: 1,
                        limit: 12,
                        sort: "-createdAt",
                        ...queryParams
                    });
                    return `${MATERIAL_API_URL}/shop/${shopId}/materials?${searchParams.toString()}`;
                },
                transformResponse: (response)=>({
                        materials: response.data,
                        pagination: response.metadata
                    }),
                providesTags: (result)=>result?.materials ? [
                        ...result.materials.map(({ id })=>({
                                type: "Material",
                                id
                            })),
                        {
                            type: "MaterialList",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "MaterialList",
                            id: "LIST"
                        }
                    ]
            }),
            createMaterial: builder.mutation({
                query: (data)=>({
                        url: `${MATERIAL_API_URL}`,
                        method: "POST",
                        body: data
                    }),
                invalidatesTags: [
                    {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL_LIST,
                        id: "LIST"
                    }
                ]
            }),
            updateMaterial: builder.mutation({
                query: ({ id, data })=>({
                        url: `${MATERIAL_API_URL}${id}`,
                        method: "PATCH",
                        body: data
                    }),
                invalidatesTags: (result, error, { id })=>[
                        {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL,
                            id
                        },
                        {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL_LIST,
                            id: "LIST"
                        }
                    ]
            }),
            deleteMaterial: builder.mutation({
                query: (id)=>({
                        url: `${MATERIAL_API_URL}${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: (result, error, id)=>[
                        {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL,
                            id
                        },
                        {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAG_TYPES"].MATERIAL_LIST,
                            id: "LIST"
                        }
                    ]
            })
        })
});
const { useGetMaterialsQuery, useGetPopularTagsQuery, useGetMaterialDetailsQuery, useGetRelatedMaterialsQuery, useCreateMaterialMutation, useUpdateMaterialMutation, useDeleteMaterialMutation, util: { getRunningOperationPromises } } = materialApi; // import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
 // import { createApi } from "@reduxjs/toolkit/query/react";
 // import { HYDRATE } from "next-redux-wrapper";
 // const MATERIAL_API_URL = "/api/v2/academic-materials";
 // export const materialsApi = createApi({
 //   reducerPath: "materialsApi",
 //   baseQuery: baseQueryWithReauth,
 //   tagTypes: [
 //     "Material",
 //     "MaterialList",
 //     "FeaturedMaterials",
 //     "RelatedMaterials",
 //   ],
 //   extractRehydrationInfo(action, { reducerPath }) {
 //     if (action.type === HYDRATE) {
 //       return action.payload[reducerPath];
 //     }
 //   },
 //   endpoints: (builder) => ({
 //     getMaterials: builder.query({
 //       query: (params = {}) => {
 //         const searchParams = new URLSearchParams(params);
 //         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
 //       },
 //       transformResponse: (response) => ({
 //         materials: response.data,
 //         pagination: response.pagination,
 //       }),
 //       providesTags: (result) =>
 //         result?.materials
 //           ? [
 //               ...result.materials.map(({ id }) => ({ type: "Material", id })),
 //               { type: "MaterialList", id: "LIST" },
 //             ]
 //           : [{ type: "MaterialList", id: "LIST" }],
 //     }),
 //     getMaterialBySlug: builder.query({
 //       query: (slug) => `${MATERIAL_API_URL}/${slug}`,
 //       transformResponse: (response) => response.data,
 //       providesTags: (result, error, slug) => [{ type: "Material", id: slug }],
 //     }),
 //     getFeaturedMaterials: builder.query({
 //       query: (params = {}) => {
 //         const searchParams = new URLSearchParams(params);
 //         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
 //       },
 //       transformResponse: (response) => response.data,
 //       providesTags: [{ type: "FeaturedMaterials", id: "LIST" }],
 //     }),
 //     getMaterialsByCategory: builder.query({
 //       query: ({ categorySlug, queryParams = {} }) => {
 //         const queryString = new URLSearchParams(queryParams).toString();
 //         return `${MATERIAL_API_URL}/category/${categorySlug}/materials?${queryString}`;
 //       },
 //       transformResponse: (response) => ({
 //         materials: response.data,
 //         pagination: response.pagination,
 //       }),
 //       providesTags: (result) =>
 //         result?.materials
 //           ? [
 //               ...result.materials.map(({ id }) => ({ type: "Material", id })),
 //               { type: "MaterialList", id: "LIST" },
 //             ]
 //           : [{ type: "MaterialList", id: "LIST" }],
 //     }),
 //     getMaterialsByShop: builder.query({
 //       query: ({ shopId, queryParams = {} }) => {
 //         const searchParams = new URLSearchParams({
 //           page: 1,
 //           limit: 12,
 //           sort: "-createdAt",
 //           ...queryParams,
 //         });
 //         return `${MATERIAL_API_URL}/shop/${shopId}/materials?${searchParams.toString()}`;
 //       },
 //       transformResponse: (response) => ({
 //         materials: response.data,
 //         pagination: response.metadata,
 //       }),
 //       providesTags: (result) =>
 //         result?.materials
 //           ? [
 //               ...result.materials.map(({ id }) => ({ type: "Material", id })),
 //               { type: "MaterialList", id: "LIST" },
 //             ]
 //           : [{ type: "MaterialList", id: "LIST" }],
 //     }),
 //     getMaterialsByLevelAndDegree: builder.query({
 //       query: (params = {}) => {
 //         const searchParams = new URLSearchParams(params);
 //         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
 //       },
 //       transformResponse: (response) => ({
 //         materials: response.data.materials,
 //         pagination: {
 //           totalPages: 1, // Optional fallback until backend supports full pagination
 //           currentPage: 1,
 //           totalResults: response.data.materials.length,
 //         },
 //       }),
 //       providesTags: [{ type: "MaterialList", id: "LIST" }],
 //     }),
 //     getRelatedMaterials: builder.query({
 //       query: ({ materialId, queryParams = {} }) => {
 //         const searchParams = new URLSearchParams(queryParams).toString();
 //         return `${MATERIAL_API_URL}/${materialId}/related?${searchParams}`;
 //       },
 //       transformResponse: (response) => ({
 //         relatedMaterials: response.data.relatedMaterials,
 //         metadata: {
 //           results: response.data.results,
 //           status: response.data.status,
 //         },
 //       }),
 //       providesTags: (result, error, { materialId }) => [
 //         { type: "RelatedMaterials", id: materialId },
 //       ],
 //     }),
 //   }),
 // });
 // export const {
 //   useGetMaterialsQuery,
 //   useGetMaterialBySlugQuery,
 //   useGetFeaturedMaterialsQuery,
 //   useGetMaterialsByCategoryQuery,
 //   useGetMaterialsByShopQuery,
 //   useGetMaterialsByLevelAndDegreeQuery,
 //   useGetRelatedMaterialsQuery,
 //   util: { getRunningOperationPromises },
 // } = materialsApi;
}}),
"[project]/acadevault-client/src/features/materials/featuredMaterialsApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "featuredMaterialsApi": (()=>featuredMaterialsApi),
    "useGetFeaturedMaterialsQuery": (()=>useGetFeaturedMaterialsQuery),
    "useLazyGetFeaturedMaterialsQuery": (()=>useLazyGetFeaturedMaterialsQuery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
;
;
const MATERIAL_API_URL = "/api/v2/academic-materials";
const featuredMaterialsApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "featuredMaterialsApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: [
        "FeaturedMaterial"
    ],
    endpoints: (builder)=>({
            // ─────────────── Query: Get Featured Materials ───────────────
            getFeaturedMaterials: builder.query({
                query: (params = {})=>{
                    const query = new URLSearchParams(params).toString();
                    return `${MATERIAL_API_URL}/?${query}`;
                },
                transformResponse: (response)=>response?.data || [],
                providesTags: (result)=>result ? [
                        ...result.map((item)=>({
                                type: "FeaturedMaterial",
                                id: item.id
                            })),
                        {
                            type: "FeaturedMaterial",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "FeaturedMaterial",
                            id: "LIST"
                        }
                    ]
            })
        })
});
const { useGetFeaturedMaterialsQuery, useLazyGetFeaturedMaterialsQuery } = featuredMaterialsApi;
}}),
"[project]/acadevault-client/src/features/shop/shopApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "shopApi": (()=>shopApi),
    "useFollowShopMutation": (()=>useFollowShopMutation),
    "useGetShopDetailsQuery": (()=>useGetShopDetailsQuery),
    "useGetShopReviewsQuery": (()=>useGetShopReviewsQuery),
    "useGetShopsQuery": (()=>useGetShopsQuery),
    "useGetTopSellersQuery": (()=>useGetTopSellersQuery),
    "useLazyGetShopDetailsQuery": (()=>useLazyGetShopDetailsQuery),
    "useLazyGetShopReviewsQuery": (()=>useLazyGetShopReviewsQuery),
    "useSubmitContactFormMutation": (()=>useSubmitContactFormMutation),
    "useSubmitShopReviewMutation": (()=>useSubmitShopReviewMutation),
    "useUnfollowShopMutation": (()=>useUnfollowShopMutation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/services/baseQueryWithReauth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$redux$2d$wrapper$40$8$2e$1$2e$0_ne_75efd75daf6b761488c00b4882ad73b4$2f$node_modules$2f$next$2d$redux$2d$wrapper$2f$es6$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-redux-wrapper@8.1.0_ne_75efd75daf6b761488c00b4882ad73b4/node_modules/next-redux-wrapper/es6/index.js [app-ssr] (ecmascript)");
;
;
;
const SHOP_API_URL = "api/v2/shops";
const shopApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "shopApi",
    baseQuery: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$services$2f$baseQueryWithReauth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseQueryWithReauth"],
    tagTypes: [
        "Shop",
        "ShopReview",
        "FollowStatus"
    ],
    extractRehydrationInfo (action, { reducerPath }) {
        if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$redux$2d$wrapper$40$8$2e$1$2e$0_ne_75efd75daf6b761488c00b4882ad73b4$2f$node_modules$2f$next$2d$redux$2d$wrapper$2f$es6$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HYDRATE"]) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder)=>({
            // === Get Shop Details with Optional Query ===
            getShopDetails: builder.query({
                query: ({ shopId, queryParams = {} })=>{
                    const queryString = new URLSearchParams(queryParams).toString();
                    return `/${SHOP_API_URL}/${shopId}${queryString ? `?${queryString}` : ""}`;
                },
                transformResponse: (res)=>res.data,
                providesTags: (result, error, { shopId })=>[
                        {
                            type: "Shop",
                            id: shopId
                        }
                    ]
            }),
            // === Fetch Shops List ===
            getShops: builder.query({
                query: (queryParams)=>{
                    const query = new URLSearchParams(queryParams).toString();
                    return `/${SHOP_API_URL}${query ? `?${query}` : ""}`;
                },
                providesTags: (result)=>result?.data ? [
                        ...result.data.map(({ _id })=>({
                                type: "Shop",
                                id: _id
                            })),
                        {
                            type: "Shop",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "Shop",
                            id: "LIST"
                        }
                    ]
            }),
            // === Get Top Sellers (based on performance) ===
            getTopSellers: builder.query({
                query: ()=>`/${SHOP_API_URL}/top-sellers`,
                providesTags: [
                    {
                        type: "Shop",
                        id: "TOP_SELLERS"
                    }
                ]
            }),
            // === Follow / Unfollow Shops (Authenticated Actions) ===
            followShop: builder.mutation({
                query: (shopId)=>({
                        url: `/${SHOP_API_URL}/${shopId}/follow`,
                        method: "POST"
                    }),
                invalidatesTags: (result, error, shopId)=>[
                        {
                            type: "FollowStatus",
                            id: shopId
                        },
                        {
                            type: "Shop",
                            id: shopId
                        }
                    ]
            }),
            unfollowShop: builder.mutation({
                query: (shopId)=>({
                        url: `/${SHOP_API_URL}/${shopId}/unfollow`,
                        method: "POST"
                    }),
                invalidatesTags: (result, error, shopId)=>[
                        {
                            type: "FollowStatus",
                            id: shopId
                        },
                        {
                            type: "Shop",
                            id: shopId
                        }
                    ]
            }),
            // === Shop Reviews ===
            getShopReviews: builder.query({
                query: ({ shopId, queryParams = {} })=>{
                    const queryString = new URLSearchParams(queryParams).toString();
                    return `/${SHOP_API_URL}/${shopId}/reviews${queryString ? `?${queryString}` : ""}`;
                },
                transformResponse: (res)=>res.data,
                providesTags: (result, error, { shopId })=>[
                        {
                            type: "ShopReview",
                            id: shopId
                        }
                    ]
            }),
            submitShopReview: builder.mutation({
                query: ({ shopId, reviewData })=>({
                        url: `/${SHOP_API_URL}/${shopId}/reviews`,
                        method: "POST",
                        body: reviewData
                    }),
                invalidatesTags: (result, error, { shopId })=>[
                        {
                            type: "ShopReview",
                            id: shopId
                        }
                    ]
            }),
            // === Contact Shop ===
            submitContactForm: builder.mutation({
                query: ({ shopId, formData })=>({
                        url: `/${SHOP_API_URL}/${shopId}/contact`,
                        method: "POST",
                        body: formData
                    })
            })
        })
});
const { useGetShopDetailsQuery, useLazyGetShopDetailsQuery, useGetShopsQuery, useGetTopSellersQuery, useFollowShopMutation, useUnfollowShopMutation, useGetShopReviewsQuery, useLazyGetShopReviewsQuery, useSubmitShopReviewMutation, useSubmitContactFormMutation } = shopApi; // import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
 // import { createApi } from "@reduxjs/toolkit/query/react";
 // import { HYDRATE } from "next-redux-wrapper";
 // const SHOP_API_URL = "api/v2/shops";
 // export const shopApi = createApi({
 //   reducerPath: "shopApi",
 //   baseQuery: baseQueryWithReauth,
 //   tagTypes: ["Shop", "ShopReview", "FollowStatus"],
 //   extractRehydrationInfo(action, { reducerPath }) {
 //     if (action.type === HYDRATE) {
 //       return action.payload[reducerPath];
 //     }
 //   },
 //   endpoints: (builder) => ({
 //     // === Fetch all shops ===
 //     getShops: builder.query({
 //       query: (queryParams) => {
 //         const query = new URLSearchParams(queryParams).toString();
 //         return `/${SHOP_API_URL}${query ? `?${query}` : ""}`;
 //       },
 //       providesTags: (result) =>
 //         result?.data
 //           ? [
 //               ...result.data.map(({ _id }) => ({ type: "Shop", id: _id })),
 //               { type: "Shop", id: "LIST" },
 //             ]
 //           : [{ type: "Shop", id: "LIST" }],
 //     }),
 //     // === Get Top Sellers (based on performance) ===
 //     getTopSellers: builder.query({
 //       query: () => `/${SHOP_API_URL}/top-sellers`,
 //       providesTags: [{ type: 'Shop', id: "TOP_SELLERS" }],
 //     }),
 //     // GET shop details
 //     getShopDetails: builder.query({
 //       query: (shopId) => `/${SHOP_API_URL}/${shopId}`,
 //       transformResponse: (res) => res.data,
 //       providesTags: (result, error, shopId) => [{ type: "Shop", id: shopId }],
 //     }),
 //     // POST follow shop
 //     followShop: builder.mutation({
 //       query: (shopId) => ({
 //         url: `/${SHOP_API_URL}/${shopId}/follow`,
 //         method: "POST",
 //       }),
 //       invalidatesTags: (result, error, shopId) => [
 //         { type: "FollowStatus", id: shopId },
 //       ],
 //     }),
 //     // POST unfollow shop
 //     unfollowShop: builder.mutation({
 //       query: (shopId) => ({
 //         url: `/${SHOP_API_URL}/${shopId}/unfollow`,
 //         method: "POST",
 //       }),
 //       invalidatesTags: (result, error, shopId) => [
 //         { type: "FollowStatus", id: shopId },
 //       ],
 //     }),
 //     // GET shop reviews
 //     getShopReviews: builder.query({
 //       query: ({ shopId, queryParams = {} }) => {
 //         const queryString = new URLSearchParams(queryParams).toString();
 //         return `/${SHOP_API_URL}/${shopId}/reviews?${queryString}`;
 //       },
 //       transformResponse: (res) => res.data,
 //       providesTags: (result, error, { shopId }) => [
 //         { type: "ShopReview", id: shopId },
 //       ],
 //     }),
 //     // POST submit review
 //     submitShopReview: builder.mutation({
 //       query: ({ shopId, reviewData }) => ({
 //         url: `/${SHOP_API_URL}/${shopId}/reviews`,
 //         method: "POST",
 //         body: reviewData,
 //       }),
 //       invalidatesTags: (result, error, { shopId }) => [
 //         { type: "ShopReview", id: shopId },
 //       ],
 //     }),
 //     // POST contact form
 //     submitContactForm: builder.mutation({
 //       query: ({ shopId, formData }) => ({
 //         url: `/${SHOP_API_URL}/${shopId}/contact`,
 //         method: "POST",
 //         body: formData,
 //       }),
 //     }),
 //   }),
 // });
 // export const {
 //   useGetShopsQuery,
 //   useGetTopSellersQuery,
 //   useGetShopDetailsQuery,
 //   useLazyGetShopDetailsQuery,
 //   useFollowShopMutation,
 //   useUnfollowShopMutation,
 //   useGetShopReviewsQuery,
 //   useLazyGetShopReviewsQuery,
 //   useSubmitShopReviewMutation,
 //   useSubmitContactFormMutation,
 // } = shopApi;
}}),
"[project]/acadevault-client/src/features/reviews/reviewsApi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "reviewsApi": (()=>reviewsApi),
    "useAddReviewMutation": (()=>useAddReviewMutation),
    "useGetMaterialReviewsQuery": (()=>useGetMaterialReviewsQuery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
;
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:9000");
const MATERIALS_PREFIX = '/api/v2/academic-materials';
const reviewsApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'reviewsApi',
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
        baseUrl: BASE_URL
    }),
    tagTypes: [
        'Review'
    ],
    endpoints: (builder)=>({
            /**
     * Fetch paginated reviews for a given material.
     * GET /api/v2/academic-materials/:materialId/reviews?page=&limit=
     */ getMaterialReviews: builder.query({
                query: ({ materialId, page = 1, limit = 5 })=>`${MATERIALS_PREFIX}/${encodeURIComponent(materialId)}/reviews?page=${page}&limit=${limit}`,
                transformResponse: (response)=>response.data,
                providesTags: (result, error, { materialId })=>// Invalidate this tag whenever reviews for this material change
                    [
                        {
                            type: 'Review',
                            id: materialId
                        }
                    ]
            }),
            /**
     * Submit a new review for a material.
     * POST /api/v2/academic-materials/:materialId/reviews
     */ addReview: builder.mutation({
                query: ({ materialId, ...body })=>({
                        url: `${MATERIALS_PREFIX}/${encodeURIComponent(materialId)}/reviews`,
                        method: 'POST',
                        body
                    }),
                transformResponse: (response)=>response.data,
                invalidatesTags: (result, error, { materialId })=>[
                        {
                            type: 'Review',
                            id: materialId
                        }
                    ]
            })
        })
});
const { useGetMaterialReviewsQuery, useAddReviewMutation } = reviewsApi;
}}),
"[project]/acadevault-client/src/store/store.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "persistor": (()=>persistor),
    "store": (()=>store)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/auth/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categorySlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/categorySlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialsUiSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/materialsUiSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/auth/authApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$academicLevelApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/academicLevelApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/categoryApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/academicMaterialsApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$featuredMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/featuredMaterialsApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux@5.0.1/node_modules/redux/dist/redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux-persist@6.0.0_react@19.2.4_redux@5.0.1/node_modules/redux-persist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux-persist@6.0.0_react@19.2.4_redux@5.0.1/node_modules/redux-persist/es/persistReducer.js [app-ssr] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux-persist@6.0.0_react@19.2.4_redux@5.0.1/node_modules/redux-persist/es/persistStore.js [app-ssr] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux-persist@6.0.0_react@19.2.4_redux@5.0.1/node_modules/redux-persist/lib/storage/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/shop/shopApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/reviews/reviewsApi.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const persistConfig = {
    key: "root",
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    whitelist: [
        "auth"
    ]
};
const rootReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["combineReducers"])({
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$academicLevelApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["academicLevelApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$academicLevelApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["academicLevelApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["materialApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["materialApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reviewsApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reviewsApi"].reducer,
    [__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$featuredMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featuredMaterialsApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$featuredMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featuredMaterialsApi"].reducer,
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    category: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categorySlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    materialsUi: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialsUiSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
const persistedReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])(persistConfig, rootReducer);
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_rea_e6cc7c56218aaa428e8ebeaeb8efcde1$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        }).concat(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$academicLevelApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["academicLevelApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["materialApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reviewsApi"].middleware, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$featuredMaterialsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["featuredMaterialsApi"].middleware)
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store);
}}),
"[project]/acadevault-client/src/hooks/useAuth.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/auth/authApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$re_8dddbfbcd4bd7a0f43088bcd5827b3cd$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-redux@9.2.0_@types+re_8dddbfbcd4bd7a0f43088bcd5827b3cd/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function useAuth() {
    const [hasInitialized, setHasInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasTriedRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$re_8dddbfbcd4bd7a0f43088bcd5827b3cd$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    const [loginMutation, { isLoading: loginLoading }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLoginMutation"])();
    const [logoutMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLogoutMutation"])();
    const [refreshMutation, { isLoading: refreshLoading }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefreshMutation"])();
    const { data: currentUserData, isFetching: isFetchingUser, isError: userFetchError, isSuccess: userFetchSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetCurrentUserQuery"])(undefined, {
        skip: !hasInitialized || !document.cookie.includes("accessToken")
    });
    const [updatePasswordMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUpdatePasswordMutation"])();
    const [updateProfileMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUpdateProfileMutation"])();
    const [deleteAccountMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeleteAccountMutation"])();
    const { data: accountStatus, isLoading: isCheckingStatus, isError: statusError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$auth$2f$authApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetAccountStatusQuery"])(undefined, {
        skip: !user
    });
    /**
   * Attempt silent session refresh once
   */ const triggerRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!hasTriedRefresh.current && !refreshLoading) {
            hasTriedRefresh.current = true;
            try {
                await refreshMutation().unwrap();
                console.log("✅ Silent session refresh complete.");
            } catch (err) {
                console.warn("⚠️ Silent session refresh failed. Logging out user.");
            // optional: you could call logoutMutation() here to clear cookies
            } finally{
                setHasInitialized(true); // even on failure, stop further retries
            }
        }
    }, [
        refreshLoading,
        refreshMutation
    ]);
    /**
   * Handle user fetch errors to trigger refresh
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (userFetchError && !hasTriedRefresh.current) {
            triggerRefresh();
        } else if (!isFetchingUser && !refreshLoading) {
            setHasInitialized(true); // even if no error, mark init after fetch
        }
    }, [
        userFetchError,
        isFetchingUser,
        refreshLoading,
        triggerRefresh
    ]);
    const login = async (payload)=>{
        try {
            const result = await loginMutation(payload).unwrap();
            return {
                success: true,
                user: result.user
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    };
    const logout = async ()=>{
        try {
            await logoutMutation().unwrap();
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    };
    const updatePassword = async (payload)=>{
        try {
            const data = await updatePasswordMutation(payload).unwrap();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    };
    const updateProfile = async (payload)=>{
        try {
            const data = await updateProfileMutation(payload).unwrap();
            return {
                success: true,
                data
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    };
    const deleteAccount = async ()=>{
        try {
            await deleteAccountMutation().unwrap();
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error
            };
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
        triggerRefresh
    };
}
}}),
"[project]/acadevault-client/src/app/AppInitializer.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AppInitializer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useAuth.js [app-ssr] (ecmascript)");
"use client";
;
;
function AppInitializer() {
    const { triggerRefresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        triggerRefresh(); // silent refresh on app boot
    }, [
        triggerRefresh
    ]);
    return null;
}
}}),
"[project]/acadevault-client/src/config/priceConfiguration.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AVAILABLE_ADDONS": (()=>AVAILABLE_ADDONS),
    "BASE_RATES": (()=>BASE_RATES),
    "MATERIAL_TIERS": (()=>MATERIAL_TIERS),
    "PRICING_UNITS": (()=>PRICING_UNITS),
    "WORDS_PER_PAGE": (()=>WORDS_PER_PAGE),
    "academicLevelRates": (()=>academicLevelRates),
    "urgencyMultipliers": (()=>urgencyMultipliers),
    "validPromoCodes": (()=>validPromoCodes),
    "writerTiers": (()=>writerTiers)
});
const WORDS_PER_PAGE = 275; // Standard word count per page
const PRICING_UNITS = {
    Assignment: "page",
    ExamToken: "unit",
    PastQuestion: "set",
    Handout: "page",
    Seminar: "session",
    LectureNotes: "page",
    Flashcards: "set",
    Essay: "page",
    TermPaper: "page",
    CaseStudy: "page",
    Proposal: "page",
    Presentation: "deck",
    Certification: "unit",
    ProjectReport: "page",
    Journal: "page",
    ResearchPaper: "page",
    Thesis: "page",
    Dissertation: "page",
    BusinessPlan: "page",
    Dataset: "dataset",
    Ebook: "unit",
    VideoTutorial: "hour",
    Audio: "hour",
    OnlineCourse: "course",
    Webinar: "event",
    Software: "license",
    SourceCode: "project",
    Book: "unit",
    LabManual: "unit",
    Poster: "unit",
    StudyKit: "unit",
    PrintedMap: "unit"
};
const BASE_RATES = {
    Assignment: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    ExamToken: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    PastQuestion: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    Handout: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    Seminar: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    LectureNotes: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    Flashcards: {
        USD: 6,
        NGN: 450,
        GHS: 40,
        XAF: 3600,
        KES: 750
    },
    Essay: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    TermPaper: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    CaseStudy: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    Proposal: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    Presentation: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    Certification: {
        USD: 8,
        NGN: 550,
        GHS: 50,
        XAF: 4800,
        KES: 1000
    },
    ProjectReport: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    Journal: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    ResearchPaper: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    Thesis: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    Dissertation: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    BusinessPlan: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    Dataset: {
        USD: 10,
        NGN: 650,
        GHS: 60,
        XAF: 6000,
        KES: 1250
    },
    Ebook: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    VideoTutorial: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    Audio: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    OnlineCourse: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    Webinar: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    Software: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    SourceCode: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    Book: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    LabManual: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    Poster: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    StudyKit: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    },
    PrintedMap: {
        USD: 15,
        NGN: 1100,
        GHS: 100,
        XAF: 9000,
        KES: 2000
    }
};
const MATERIAL_TIERS = {
    Assignment: "Tier1",
    ExamToken: "Tier1",
    PastQuestion: "Tier1",
    Handout: "Tier1",
    Seminar: "Tier1",
    LectureNotes: "Tier1",
    Flashcards: "Tier1",
    Essay: "Tier2",
    TermPaper: "Tier2",
    CaseStudy: "Tier2",
    Proposal: "Tier2",
    Presentation: "Tier2",
    Certification: "Tier2",
    ProjectReport: "Tier3",
    Journal: "Tier3",
    ResearchPaper: "Tier3",
    Thesis: "Tier3",
    Dissertation: "Tier3",
    BusinessPlan: "Tier3",
    Dataset: "Tier3",
    Ebook: "Tier4",
    VideoTutorial: "Tier4",
    Audio: "Tier4",
    OnlineCourse: "Tier4",
    Webinar: "Tier4",
    Software: "Tier4",
    SourceCode: "Tier4",
    Book: "Tier4",
    LabManual: "Tier4",
    Poster: "Tier4",
    StudyKit: "Tier4",
    PrintedMap: "Tier4"
};
const academicLevelRates = {
    ond: 1.0,
    hnd: 1.05,
    bsc: 1.1,
    pgd: 1.15,
    masters: 1.2,
    phd: 1.3
};
const urgencyMultipliers = {
    flexible: 1.0,
    standard: 1.1,
    rush: 1.3,
    immediate: {
        Tier1: 1.5,
        Tier2: 1.6,
        Tier3: 1.8,
        Tier4: 2.0
    }
};
const writerTiers = {
    standard: 1.0,
    expert: 1.1,
    premium: 1.25
};
const AVAILABLE_ADDONS = {
    Tier1: [
        {
            id: "plagiarismReport",
            label: "Plagiarism Report",
            price: {
                USD: 10,
                NGN: 1500,
                GHS: 133.33,
                XAF: 12000,
                KES: 1250
            }
        },
        {
            id: "consultation",
            label: "Consultation Session",
            price: {
                USD: 12,
                NGN: 1800,
                GHS: 160,
                XAF: 14400,
                KES: 1500
            }
        },
        {
            id: "proofreading",
            label: "Proofreading & Language Enhancement",
            price: {
                USD: 18,
                NGN: 2700,
                GHS: 240,
                XAF: 21600,
                KES: 2250
            }
        },
        {
            id: "formatting",
            label: "Formatting & Styling Package",
            price: {
                USD: 15,
                NGN: 2250,
                GHS: 200,
                XAF: 18000,
                KES: 2000
            }
        }
    ],
    Tier2: [
        {
            id: "plagiarismReport",
            label: "Plagiarism Report",
            price: {
                USD: 20,
                NGN: 3000,
                GHS: 266.67,
                XAF: 24000,
                KES: 2500
            }
        },
        {
            id: "consultation",
            label: "Consultation Session",
            price: {
                USD: 22,
                NGN: 3300,
                GHS: 293.33,
                XAF: 26400,
                KES: 2750
            }
        },
        {
            id: "slides",
            label: "Presentation Slides",
            price: {
                USD: 40,
                NGN: 6000,
                GHS: 533.33,
                XAF: 48000,
                KES: 5000
            }
        },
        {
            id: "expedited",
            label: "Expedited Turnaround",
            price: {
                USD: 30,
                NGN: 4500,
                GHS: 400,
                XAF: 36000,
                KES: 3750
            }
        },
        {
            id: "citationManagement",
            label: "Reference & Citation Management",
            price: {
                USD: 25,
                NGN: 3750,
                GHS: 333.33,
                XAF: 30000,
                KES: 3125
            }
        }
    ],
    Tier3: [
        {
            id: "plagiarismReport",
            label: "Plagiarism Report",
            price: {
                USD: 30,
                NGN: 4500,
                GHS: 400,
                XAF: 36000,
                KES: 3750
            }
        },
        {
            id: "consultation",
            label: "Consultation Session",
            price: {
                USD: 35,
                NGN: 5250,
                GHS: 466.67,
                XAF: 42000,
                KES: 4375
            }
        },
        {
            id: "slides",
            label: "Presentation Slides",
            price: {
                USD: 45,
                NGN: 6750,
                GHS: 600,
                XAF: 54000,
                KES: 5625
            }
        },
        {
            id: "dataAnalysis",
            label: "Data Analysis Report",
            price: {
                USD: 50,
                NGN: 7500,
                GHS: 666.67,
                XAF: 60000,
                KES: 6250
            }
        },
        {
            id: "infographics",
            label: "Custom Infographics & Charts",
            price: {
                USD: 55,
                NGN: 8250,
                GHS: 733.33,
                XAF: 66000,
                KES: 6875
            }
        },
        {
            id: "unlimitedRevisions",
            label: "Unlimited Revisions (2 weeks)",
            price: {
                USD: 28,
                NGN: 4200,
                GHS: 373.33,
                XAF: 33600,
                KES: 4375
            }
        }
    ],
    Tier4: [
        {
            id: "plagiarismReport",
            label: "Plagiarism Report",
            price: {
                USD: 45,
                NGN: 6750,
                GHS: 600,
                XAF: 54000,
                KES: 5625
            }
        },
        {
            id: "consultation",
            label: "Consultation Session",
            price: {
                USD: 50,
                NGN: 7500,
                GHS: 666.67,
                XAF: 60000,
                KES: 6250
            }
        },
        {
            id: "slides",
            label: "Presentation Slides",
            price: {
                USD: 60,
                NGN: 9000,
                GHS: 800,
                XAF: 72000,
                KES: 7500
            }
        },
        {
            id: "transcription",
            label: "Transcription Service",
            price: {
                USD: 55,
                NGN: 8250,
                GHS: 733.33,
                XAF: 66000,
                KES: 6875
            }
        },
        {
            id: "hosting",
            label: "Course Hosting & LMS Setup",
            price: {
                USD: 70,
                NGN: 10500,
                GHS: 933.33,
                XAF: 84000,
                KES: 8750
            }
        },
        {
            id: "customization",
            label: "Software Customization",
            price: {
                USD: 80,
                NGN: 12000,
                GHS: 1066.67,
                XAF: 96000,
                KES: 10000
            }
        },
        {
            id: "editing",
            label: "Content Editing & Proofread",
            price: {
                USD: 25,
                NGN: 3750,
                GHS: 333.33,
                XAF: 30000,
                KES: 3125
            }
        },
        {
            id: "researchHour",
            label: "Research Consultation Hour (Live)",
            price: {
                USD: 65,
                NGN: 9750,
                GHS: 773.33,
                XAF: 69600,
                KES: 8125
            }
        },
        {
            id: "turnitinGuarantee",
            label: "Turnitin® Similarity Guarantee",
            price: {
                USD: 35,
                NGN: 5250,
                GHS: 426.67,
                XAF: 38400,
                KES: 4375
            }
        }
    ]
};
const validPromoCodes = {
    SAVE10: {
        discount: 10,
        eligibleCurrencies: [
            "USD",
            "EUR",
            "GBP",
            "CAD",
            "AUD"
        ]
    },
    FIRSTORDER: {
        discount: 15,
        eligibleCurrencies: [
            "all"
        ]
    },
    AFRICA10: {
        discount: 10,
        eligibleCurrencies: [
            "NGN",
            "GHS",
            "XAF",
            "XOF",
            "KES",
            "ETB",
            "ZAR",
            "SLE",
            "GNF",
            "UGX",
            "RWF",
            "AOA",
            "STN",
            "MWK"
        ]
    }
}; // export const validPromoCodes = {
 //   SAVE10: {
 //     discount: 10,
 //     eligibleCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
 //     minOrder: {
 //       stable: 50, // $50 USD for international currencies
 //       unstable: {
 //         NGN: 50000, // ₦50,000 for Nigeria
 //         GHS: 600, // ₠600 for Ghana
 //         XAF: 30000, // CFA 30,000 for Central Africa
 //         XOF: 30000, // CFA 30,000 for West Africa
 //         KES: 6500, // KSh 6,500 for Kenya
 //         ETB: 3000, // Br 3,000 for Ethiopia
 //         ZAR: 900, // R 900 for South Africa
 //         SLE: 1000000, // Le 1,000,000 for Sierra Leone
 //         GNF: 450000, // FG 450,000 for Guinea
 //         UGX: 180000, // USh 180,000 for Uganda
 //         RWF: 70000, // RF 70,000 for Rwanda
 //         AOA: 45000, // Kz 45,000 for Angola
 //         STN: 1100000, // Db 1,100,000 for São Tomé and Príncipe
 //         MWK: 85000, // MK 85,000 for Malawi
 //       },
 //     },
 //     message: "Save 10% on orders over the minimum amount!",
 //   },
 //   FIRSTORDER: {
 //     discount: 15,
 //     eligibleCurrencies: ["all"],
 //     minOrder: {
 //       stable: 50, // $50 USD for international currencies
 //       unstable: {
 //         NGN: 50000,
 //         GHS: 600,
 //         XAF: 30000,
 //         XOF: 30000,
 //         KES: 6500,
 //         ETB: 3000,
 //         ZAR: 900,
 //         SLE: 1000000,
 //         GNF: 450000,
 //         UGX: 180000,
 //         RWF: 70000,
 //         AOA: 45000,
 //         STN: 1100000,
 //         MWK: 85000,
 //       },
 //     },
 //     message: "Save 15% on your first order over the minimum amount!",
 //   },
 //   AFRICA10: {
 //     discount: 10,
 //     eligibleCurrencies: [
 //       "NGN",
 //       "GHS",
 //       "XAF",
 //       "XOF",
 //       "KES",
 //       "ETB",
 //       "ZAR",
 //       "SLE",
 //       "GNF",
 //       "UGX",
 //       "RWF",
 //       "AOA",
 //       "STN",
 //       "MWK",
 //     ],
 //     minOrder: {
 //       stable: 50, // $50 USD for international currencies (though unlikely to apply)
 //       unstable: {
 //         NGN: 50000,
 //         GHS: 600,
 //         XAF: 30000,
 //         XOF: 30000,
 //         KES: 6500,
 //         ETB: 3000,
 //         ZAR: 900,
 //         SLE: 1000000,
 //         GNF: 450000,
 //         UGX: 180000,
 //         RWF: 70000,
 //         AOA: 45000,
 //         STN: 1100000,
 //         MWK: 85000,
 //       },
 //     },
 //     message: "Save 10% on orders over the minimum amount!",
 //   },
 // };
}}),
"[project]/acadevault-client/src/constants/enums.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Mapping of supported currency codes to their symbols.
 */ __turbopack_context__.s({
    "CURRENCIES": (()=>CURRENCIES),
    "MINIMUM_TOTALS": (()=>MINIMUM_TOTALS),
    "STABLE_ECONOMY_COUNTRIES": (()=>STABLE_ECONOMY_COUNTRIES),
    "citationStyles": (()=>citationStyles),
    "currencySymbols": (()=>currencySymbols)
});
const currencySymbols = Object.freeze({
    NGN: "₦",
    GHS: "₵",
    XAF: "FCFA",
    XOF: "CFA",
    KES: "KSh",
    ETB: "Br",
    ZAR: "R",
    SLE: "Le",
    GNF: "FG",
    UGX: "USh",
    RWF: "FRw",
    AOA: "Kz",
    STN: "Db",
    MWK: "MK",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$"
});
const CURRENCIES = Object.freeze([
    "NGN",
    "GHS",
    "XAF",
    "XOF",
    "KES",
    "ETB",
    "ZAR",
    "SLE",
    "GNF",
    "UGX",
    "RWF",
    "AOA",
    "STN",
    "MWK",
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD"
]);
const MINIMUM_TOTALS = {
    NGN: 3000,
    GHS: 40,
    XAF: 20000,
    XOF: 15000,
    KES: 1000,
    ETB: 500,
    ZAR: 150,
    SLE: 30000,
    GNF: 15000,
    UGX: 5000,
    RWF: 2000,
    AOA: 1000,
    STN: 35000,
    MWK: 2500,
    USD: 15,
    EUR: 12,
    GBP: 10,
    CAD: 18,
    AUD: 20
};
const STABLE_ECONOMY_COUNTRIES = [
    "US",
    "CA",
    "GB",
    "AU",
    "NZ",
    "DE",
    "FR",
    "IT",
    "ES",
    "NL",
    "AE",
    "SG",
    "JP",
    "KR",
    "CH"
];
const citationStyles = [
    {
        value: "apa",
        label: "APA"
    },
    {
        value: "mla",
        label: "MLA"
    },
    {
        value: "chicago",
        label: "Chicago"
    },
    {
        value: "harvard",
        label: "Harvard"
    },
    {
        value: "ieee",
        label: "IEEE"
    },
    {
        value: "other",
        label: "Other"
    }
];
}}),
"[project]/acadevault-client/src/utils/priceUtils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "areAllPricesLoaded": (()=>areAllPricesLoaded),
    "calculateTotalPrice": (()=>calculateTotalPrice),
    "calculateUrgencyMultiplier": (()=>calculateUrgencyMultiplier),
    "calculateUrgencyText": (()=>calculateUrgencyText),
    "calculateWordCountFeedback": (()=>calculateWordCountFeedback),
    "fetchEffectivePrice": (()=>fetchEffectivePrice),
    "formatPriceWithSymbol": (()=>formatPriceWithSymbol),
    "getDefaultCurrency": (()=>getDefaultCurrency),
    "getLocalCurrency": (()=>getLocalCurrency),
    "validateDeadlineFeasibility": (()=>validateDeadlineFeasibility),
    "wordCountFromText": (()=>wordCountFromText)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/config/priceConfiguration.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/constants/enums.js [app-ssr] (ecmascript)");
;
;
function getDefaultCurrency(countryCode, userPreference = null) {
    if (userPreference && __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currencySymbols"][userPreference]) return userPreference;
    return [
        "US",
        "CA",
        "GB",
        "AU",
        "NZ",
        "DE",
        "FR",
        "IT",
        "ES",
        "NL",
        "AE",
        "SG",
        "JP",
        "KR",
        "CH"
    ].includes(countryCode) ? "USD" : getLocalCurrency(countryCode);
}
function getLocalCurrency(countryCode) {
    const countryToCurrency = {
        NG: "NGN",
        GH: "GHS",
        CM: "XAF",
        NE: "XOF",
        KE: "KES",
        ET: "ETB",
        ZA: "ZAR",
        SL: "SLE",
        GN: "GNF",
        UG: "UGX",
        RW: "RWF",
        AO: "AOA",
        ST: "STN",
        MW: "MWK"
    };
    return countryToCurrency[countryCode] || "USD";
}
function calculateUrgencyMultiplier(deadline, pages, tier) {
    if (!deadline) return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].flexible;
    const now = new Date().getTime();
    const due = new Date(deadline).getTime();
    const hoursLeft = (due - now) / (1000 * 60 * 60);
    // Enforce a minimum lead time: at least 1 hour per page, but no less than 12 hours
    const minLead = Math.max(pages * 1, 12);
    if (hoursLeft < minLead) {
        // super‑urgent: tier determines the premium
        return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].immediate[tier] ?? __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].immediate.Tier1;
    }
    if (hoursLeft <= 12 * 2) {
        // rush window (12–24 h)
        return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].rush;
    }
    if (hoursLeft <= 72) {
        // standard window (24–72 h)
        return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].standard;
    }
    // flexible (> 72 h)
    return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["urgencyMultipliers"].flexible;
}
function calculateUrgencyText(deadline) {
    if (!deadline) return {
        text: "Not Set",
        color: "text-gray-500"
    };
    const diff = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return {
        text: "Immediate",
        color: "text-red-600"
    };
    if (diff <= 3) return {
        text: "Rush",
        color: "text-orange-500"
    };
    if (diff <= 7) return {
        text: "Standard",
        color: "text-blue-500"
    };
    return {
        text: "Flexible",
        color: "text-green-500"
    };
}
function validateDeadlineFeasibility(unitCount, deadline, materialType, tier) {
    const unitType = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRICING_UNITS"][materialType] || "page";
    const pages = unitType === "page" ? unitCount : unitCount * 0.5; // Example conversion for non-page units
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const hoursDiff = (deadlineDate - now) / (1000 * 60 * 60);
    const minHours = Math.max(pages * 1, 12); // 1 hour per page, minimum 12 hours
    if (hoursDiff < minHours) {
        return {
            isFeasible: false,
            message: `Deadline too short. Minimum ${minHours} hours required for ${pages} ${unitType}s.`
        };
    }
    return {
        isFeasible: true,
        message: ""
    };
}
function wordCountFromText(text) {
    if (!text || typeof text !== "string") return 0;
    return text.trim().split(/\s+/g).filter((word)=>/^[a-zA-Z0-9]+$/.test(word)).length;
}
function calculateWordCountFeedback(count, unitType) {
    // Convert everything to pages
    const pages = unitType === "pages" ? count : Math.ceil(count / __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$config$2f$priceConfiguration$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WORDS_PER_PAGE"]);
    if (pages < 5) {
        return {
            text: "Great, this is a manageable length!",
            color: "text-green-600"
        };
    } else if (pages < 20) {
        return {
            text: "This is a substantial project!",
            color: "text-blue-600"
        };
    } else {
        return {
            text: "Large project, we'll ensure top quality!",
            color: "text-orange-600"
        };
    }
}
function formatPriceWithSymbol(amount, currency, exchangeRate = null) {
    const symbol = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currencySymbols"][currency] || currency;
    try {
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount).replace(currency, symbol);
        if (exchangeRate && currency !== "USD") {
            return `${formatted} (~$${(amount / exchangeRate || 0).toFixed(2)})`;
        }
        return formatted;
    } catch (error) {
        console.error(`Error formatting price for ${currency}:`, error);
        const fallback = `${symbol}${amount.toFixed(2)}`;
        if (exchangeRate && currency !== "USD") {
            return `${fallback} (~$${(amount / exchangeRate || 0).toFixed(2)})`;
        }
        return fallback;
    }
}
const calculateTotalPrice = (priceItems = [])=>{
    return priceItems.reduce((sum, item)=>sum + (item.price?.amount ?? 0), 0);
};
const areAllPricesLoaded = (priceItems = [])=>{
    return priceItems.every((item)=>!item.loading);
};
async function fetchEffectivePrice({ materialId, basePrice = 0, materialType, currency, region = null }) {
    if (!materialId || !materialType || !currency) return {
        price: {
            amount: basePrice
        }
    };
    const params = new URLSearchParams();
    params.append("materialId", materialId);
    params.append("materialType", materialType);
    params.append("currency", currency);
    if (region) params.append("region", region);
    try {
        const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:9000")}/api/v2/prices/current-price?${params.toString()}`);
        const json = await res.json();
        return {
            price: json?.data ?? {
                amount: basePrice
            }
        };
    } catch (err) {
        console.error("Failed to fetch price:", err);
        return {
            price: {
                amount: basePrice
            }
        };
    }
}
}}),
"[project]/acadevault-client/src/contexts/CurrencyContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// "use client";
// import { CURRENCIES } from "@/constants/enums";
// import React, { createContext, useState, useEffect } from "react";
// export const CurrencyContext = createContext();
// const DEFAULT_CURRENCY = "NGN";
// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
//   const [isStorageError, setIsStorageError] = useState(false);
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("selectedCurrency");
//       if (saved && CURRENCIES.includes(saved)) {
//         setCurrency(saved);
//       }
//     } catch (error) {
//       console.error("Error accessing localStorage:", error);
//       setIsStorageError(true);
//     }
//   }, []);
//   const handleSetCurrency = (newCurrency) => {
//     if (!CURRENCIES.includes(newCurrency)) {
//       console.warn(`Invalid currency code: ${newCurrency}`);
//       return;
//     }
//     setCurrency(newCurrency);
//     if (!isStorageError) {
//       try {
//         localStorage.setItem("selectedCurrency", newCurrency);
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//         setIsStorageError(true);
//       }
//     }
//   };
//   return (
//     <CurrencyContext.Provider
//       value={{ currency, setCurrency: handleSetCurrency }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// };
__turbopack_context__.s({
    "CurrencyContext": (()=>CurrencyContext),
    "CurrencyProvider": (()=>CurrencyProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$priceUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/priceUtils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/constants/enums.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const CurrencyContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    currency: "USD",
    setCurrency: ()=>{}
});
function CurrencyProvider({ children }) {
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("USD");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function detect() {
            try {
                // You can swap this for any IP‐geolocation service you like
                const res = await fetch("https://ipapi.co/json/");
                if (!res.ok) throw new Error("IP lookup failed");
                const { country_code } = await res.json();
                const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$priceUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultCurrency"])(country_code, null);
                // only use if in our list
                if (__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CURRENCIES"].includes(detected)) setCurrency(detected);
            } catch (err) {
                console.warn("Currency detection error:", err);
            }
        }
        detect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrencyContext.Provider, {
        value: {
            currency,
            setCurrency
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/contexts/CurrencyContext.js",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/contexts/CountryContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CountryContext": (()=>CountryContext),
    "CountryProvider": (()=>CountryProvider),
    "useCountry": (()=>useCountry)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DEFAULT_COUNTRY = "Nigeria"; // fallback
const STORAGE_KEY = "acadev_country";
const CountryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const CountryProvider = ({ children })=>{
    const [country, setCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_COUNTRY);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = "undefined" !== "undefined" && localStorage.getItem(STORAGE_KEY);
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, []);
    // Save to localStorage when country changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem(STORAGE_KEY, country);
    }, [
        country
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountryContext.Provider, {
        value: {
            country,
            setCountry
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/contexts/CountryContext.js",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
const useCountry = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CountryContext);
    if (!context) throw new Error("useCountry must be used within a CountryProvider");
    return context;
};
}}),
"[project]/acadevault-client/src/contexts/PortalProvider.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PortalProvider": (()=>PortalProvider),
    "usePortal": (()=>usePortal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const PortalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function PortalProvider({ children }) {
    const [portals, setPortals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const openPortal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((component, key = Date.now())=>{
        setPortals((prev)=>[
                ...prev,
                {
                    key,
                    component
                }
            ]);
        return key;
    }, []);
    const closePortal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
        setPortals((prev)=>prev.filter((p)=>p.key !== key));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PortalContext.Provider, {
        value: {
            openPortal,
            closePortal
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PortalRoot, {
                portals: portals
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/contexts/PortalProvider.js",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/contexts/PortalProvider.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
function usePortal() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PortalContext);
}
function PortalRoot({ portals }) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    "TURBOPACK unreachable";
    const portalRoot = undefined;
}
}}),
"[project]/acadevault-client/src/contexts/ChatContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatProvider": (()=>ChatProvider),
    "useChat": (()=>useChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function ChatProvider({ children }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const openChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(true), []);
    const closeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(false), []);
    const toggleChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen((s)=>!s), []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: {
            isOpen,
            openChat,
            closeChat,
            toggleChat
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/contexts/ChatContext.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
function useChat() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (!ctx) throw new Error("useChat must be used within ChatProvider");
    return ctx;
}
}}),
"[project]/acadevault-client/src/components/chats/LiveChat/ChatButton.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$ChatContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/ChatContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
"use client";
;
;
;
function ChatButton() {
    const { toggleChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$ChatContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChat"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleChat,
        "aria-label": "Open chat",
        className: "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
            className: "w-7 h-7"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/chats/LiveChat/ChatButton.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/chats/LiveChat/ChatButton.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
"use client";
;
;
;
function ChatMessage({ msg }) {
    const isUser = msg.type === "user";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: `flex items-end ${isUser ? "justify-end" : "justify-start"}`,
        children: [
            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                className: "w-5 h-5 text-indigo-500 mr-2"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx",
                lineNumber: 12,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-4 py-2 rounded-lg max-w-[70%] ${isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none"}`,
                children: msg.text
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                className: "w-5 h-5 text-gray-400 ml-2"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx",
                lineNumber: 22,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatWindow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$ChatMessage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/chats/ChatBot/ChatMessage.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ChatWindow({ messages = [], isTyping }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [
        messages,
        isTyping
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        ref: ref,
        className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar",
        children: [
            messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$ChatMessage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    msg: m
                }, i, false, {
                    fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)),
            isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "animate-spin w-5 h-5 text-gray-400"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MessageInput)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
"use client";
;
;
;
function MessageInput({ onSubmit, placeholder }) {
    const [val, setVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handle = ()=>{
        if (!val.trim()) return;
        onSubmit(val);
        setVal("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (e)=>{
            e.preventDefault();
            handle();
        },
        className: "flex border-t border-gray-200 p-3 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: val,
                onChange: (e)=>setVal(e.target.value),
                placeholder: placeholder,
                className: "flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: !val.trim(),
                className: "px-4 bg-indigo-600 text-white rounded-r-md disabled:opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/components/chats/ChatBot/ChatPanel.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$ChatWindow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/chats/ChatBot/ChatWindow.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$MessageInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/chats/ChatBot/MessageInput.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ChatPanel({ messages = [], isTyping = false, onSendMessage, placeholder = "Type a message..." }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$ChatWindow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                messages: messages,
                isTyping: isTyping
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatPanel.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$MessageInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: onSendMessage,
                placeholder: placeholder
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatPanel.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/chats/ChatBot/ChatPanel.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/app/ClientProviders.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ClientProviders)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$re_8dddbfbcd4bd7a0f43088bcd5827b3cd$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-redux@9.2.0_@types+re_8dddbfbcd4bd7a0f43088bcd5827b3cd/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/redux-persist@6.0.0_react@19.2.4_redux@5.0.1/node_modules/redux-persist/es/integration/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/store/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f$AppInitializer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/AppInitializer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/CurrencyContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CountryContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/CountryContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$PortalProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/PortalProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$ChatContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/ChatContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$LiveChat$2f$ChatButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/chats/LiveChat/ChatButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$chats$2f$ChatBot$2f$ChatPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/chats/ChatBot/ChatPanel.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
function ClientProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$re_8dddbfbcd4bd7a0f43088bcd5827b3cd$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$redux$2d$persist$40$6$2e$0$2e$0_react$40$19$2e$2$2e$4_redux$40$5$2e$0$2e$1$2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistor"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CountryContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountryProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CurrencyProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$PortalProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PortalProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$ChatContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatProvider"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f$AppInitializer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this),
                                children,
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
                            lineNumber: 23,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
                        lineNumber: 22,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
                    lineNumber: 21,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/ClientProviders.js",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/acadevault-client/src/components/ErrorBoundary.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ErrorBoundary)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center h-screen text-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold text-red-600 mb-2",
                        children: "Oops! Something went wrong."
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ErrorBoundary.jsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: this.state.error?.message
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ErrorBoundary.jsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded",
                        children: "Refresh"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ErrorBoundary.jsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/ErrorBoundary.jsx",
                lineNumber: 22,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__788a72ca._.js.map