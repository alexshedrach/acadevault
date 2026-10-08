import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ROLE_DASHBOARD_PATHS = {
  Admin: "/dashboard/admin",
  Seller: "/dashboard/seller",
  User: "/dashboard/user",
  Affiliate: "/dashboard/affiliate",
  Agent: "/dashboard/agent",
};

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/activate-account",
  "/resend-activation",
  "/activate-prompt",
];

async function getUserRoleFromToken(token) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    const { payload } = await jwtVerify(token, secret);
    return payload.role;
  } catch (err) {
    console.warn("JWT verification failed:", err.message);
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Redirect guests from dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from visiting guest-only pages
  if (token && PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    const role = await getUserRoleFromToken(token);
    const redirectPath = ROLE_DASHBOARD_PATHS[role] || "/dashboard";
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  // Restrict role-based dashboard sub-paths
  if (token && pathname.startsWith("/dashboard")) {
    const role = await getUserRoleFromToken(token);
    const expectedPath = ROLE_DASHBOARD_PATHS[role];

    if (!pathname.startsWith(expectedPath)) {
      url.pathname = expectedPath;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/activate-account/:path*",
    "/resend-activation",
    "/activate-prompt",
  ],
};

// import { NextResponse } from "next/server";

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
