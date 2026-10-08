module.exports = {

"[project]/acadevault-client/.next-internal/server/app/(public)/departments/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/acadevault-client/src/app/favicon.ico.mjs { IMAGE => \"[project]/acadevault-client/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/favicon.ico.mjs { IMAGE => \"[project]/acadevault-client/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/acadevault-client/src/app/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/acadevault-client/src/app/loading.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/loading.js [app-rsc] (ecmascript)"));
}}),
"[project]/acadevault-client/src/app/not-found.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/not-found.js [app-rsc] (ecmascript)"));
}}),
"[project]/acadevault-client/src/app/(public)/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/(public)/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/acadevault-client/src/lib/metadata/baseMetadata.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// -------------------------------------------------
// lib/metadata/baseMetadata.js
// -------------------------------------------------
__turbopack_context__.s({
    "baseMetadata": (()=>baseMetadata)
});
const baseMetadata = {
    metadataBase: new URL("https://acadevault.com"),
    title: {
        default: "AcadeVault | Digital Academic Marketplace",
        template: "%s | AcadeVault"
    },
    description: "A professional platform for academic materials, courses, and more.",
    keywords: [
        "academic materials",
        "research",
        "courses",
        "digital books"
    ],
    authors: [
        {
            name: "Alexdegreat Computer Tech & Solutions",
            url: "https://acadevault.com"
        }
    ],
    creator: "Alexdegreat",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://acadevault.com",
        siteName: "AcadeVault",
        title: "AcadeVault - Buy & Sell Academic Materials",
        description: "A professional platform for digital academic materials.",
        images: [
            {
                url: "https://acadevault.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "AcadeVault Hero Image"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        site: "@acadevault",
        creator: "@alexdegreat",
        title: "AcadeVault - Digital Academic Marketplace",
        description: "Find and sell academic materials with ease.",
        images: [
            "https://acadevault.com/twitter-image.jpg"
        ]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            maxSnippet: -1,
            maxImagePreview: "large",
            maxVideoPreview: -1
        }
    }
};
}}),
"[project]/acadevault-client/src/lib/metadata/generatePageMetadata.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// -------------------------------------------------
// lib/metadata/generatePageMetadata.js
// -------------------------------------------------
__turbopack_context__.s({
    "generatePageMetadata": (()=>generatePageMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/metadata/baseMetadata.js [app-rsc] (ecmascript)");
;
function generatePageMetadata({ title, description, slug, image = "https://acadevault.com/og-image.jpg" }) {
    const url = `https://acadevault.com/${slug}`;
    return {
        // 1. Spread in all the “base” fields first
        ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"],
        // 2. Override title + description
        title: `${title}`,
        description,
        openGraph: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"].openGraph,
            title,
            description,
            url,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${title} Image`
                }
            ]
        },
        twitter: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"].twitter,
            title,
            description,
            images: [
                image
            ]
        }
    };
}
}}),
"[project]/acadevault-client/src/components/header/Navbar.jsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/components/header/Navbar.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/components/header/Navbar.jsx <module evaluation>", "default");
}}),
"[project]/acadevault-client/src/components/header/Navbar.jsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/components/header/Navbar.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/components/header/Navbar.jsx", "default");
}}),
"[project]/acadevault-client/src/components/header/Navbar.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/header/Navbar.jsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/header/Navbar.jsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "metadata": (()=>metadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx <module evaluation>", "default");
const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call metadata() from the server but metadata is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx <module evaluation>", "metadata");
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "metadata": (()=>metadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx", "default");
const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call metadata() from the server but metadata is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx", "metadata");
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$ClientDepartments$2e$jsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$ClientDepartments$2e$jsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$ClientDepartments$2e$jsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/acadevault-client/src/features/category/categoryQueryHelpers.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/acadevault-client/src/lib/categories/fetchServerDepartments.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchServerDepartments": (()=>fetchServerDepartments)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/categoryQueryHelpers.js [app-rsc] (ecmascript)");
;
async function fetchServerDepartments(params = {}) {
    try {
        const urlFragment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildDepartmentUrl"])(params);
        const url = `${("TURBOPACK compile-time value", "http://localhost:9000")}${urlFragment}`;
        const res = await fetch(url, {
            cache: "no-store",
            credentials: "include"
        });
        if (!res.ok) {
            console.error("SSR department fetch failed:", res.status);
            return null;
        }
        const json = await res.json();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["transformDepartmentResponse"])(json, params);
    } catch (err) {
        console.error("SSR Error:", err);
        return null;
    }
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DepartmentListPage),
    "generateMetadata": (()=>generateMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/metadata/generatePageMetadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/header/Navbar.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$ClientDepartments$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartments.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$categories$2f$fetchServerDepartments$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/categories/fetchServerDepartments.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateMetadata() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generatePageMetadata"])({
        title: "Departments - Academic Disciplines",
        description: "Browse academic departments and disciplines to find curated resources for your studies on Acadavault.",
        slug: "departments"
    });
}
async function DepartmentListPage({ searchParams }) {
    // searchParams is now async in server components
    const params = await searchParams;
    // Clean search parameters to remove empty or invalid values
    const cleanedParams = {};
    for (const [key, value] of Object.entries(params)){
        if (typeof value === "string" && value.trim() !== "") {
            cleanedParams[key] = value;
        }
    }
    // Set default limit to 20 for consistency
    cleanedParams.limit = cleanedParams.limit || 20;
    cleanedParams.page = Number(cleanedParams.page) || 1;
    // Fetch initial data from the server
    const initialData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$categories$2f$fetchServerDepartments$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchServerDepartments"])(cleanedParams);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                showCategories: true,
                showSearch: true
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/page.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$ClientDepartments$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                initialData: initialData,
                initialSearchParams: cleanedParams
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/page.js",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/page.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/page.js [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=acadevault-client_d42ef0b6._.js.map