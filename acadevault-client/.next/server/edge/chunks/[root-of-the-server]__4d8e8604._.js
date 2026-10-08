(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__4d8e8604._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/acadevault-client/middleware.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$0$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.0/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
;
;
const ROLE_DASHBOARD_PATHS = {
    Admin: "/dashboard/admin",
    Seller: "/dashboard/seller",
    User: "/dashboard/user",
    Affiliate: "/dashboard/affiliate",
    Agent: "/dashboard/agent"
};
const PUBLIC_ROUTES = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/activate-account",
    "/resend-activation",
    "/activate-prompt"
];
async function getUserRoleFromToken(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET);
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$0$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        return payload.role;
    } catch (err) {
        console.warn("JWT verification failed:", err.message);
        return null;
    }
}
async function middleware(req) {
    const token = req.cookies.get("accessToken")?.value;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;
    // Redirect guests from dashboard
    if (!token && pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Prevent logged-in users from visiting guest-only pages
    if (token && PUBLIC_ROUTES.some((route)=>pathname.startsWith(route))) {
        const role = await getUserRoleFromToken(token);
        const redirectPath = ROLE_DASHBOARD_PATHS[role] || "/dashboard";
        url.pathname = redirectPath;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Restrict role-based dashboard sub-paths
    if (token && pathname.startsWith("/dashboard")) {
        const role = await getUserRoleFromToken(token);
        const expectedPath = ROLE_DASHBOARD_PATHS[role];
        if (!pathname.startsWith(expectedPath)) {
            url.pathname = expectedPath;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/activate-account/:path*",
        "/resend-activation",
        "/activate-prompt"
    ]
}; // import { NextResponse } from "next/server";
 // export function middleware(req) {
 //   const isAuth = req.cookies.get("accessToken");
 //   const url = req.nextUrl.clone();
 //   const { pathname } = url;
 //   // Block access to protected dashboard for unauthenticated users
 //   if (!isAuth && pathname.startsWith("/dashboard")) {
 //     url.pathname = "/login";
 //     return NextResponse.redirect(url);
 //   }
 //   // Block access to auth-only pages for authenticated users
 //   const authPages = [
 //     "/login",
 //     "/signup",
 //     "/forgot-password",
 //     "/reset-password",
 //     "/activate-account",
 //     "/resend-activation",
 //     "/activate-prompt",
 //   ];
 //   if (isAuth && authPages.some((authPage) => pathname.startsWith(authPage))) {
 //     url.pathname = "/dashboard"; // or redirect to role-based default
 //     return NextResponse.redirect(url);
 //   }
 //   return NextResponse.next();
 // }
 // export const config = {
 //   matcher: [
 //     "/dashboard/:path*",
 //     "/login",
 //     "/signup",
 //     "/forgot-password",
 //     "/reset-password",
 //     "/activate-account/:path*",
 //     "/resend-activation",
 //     "/activate-prompt",
 //   ],
 // };
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__4d8e8604._.js.map