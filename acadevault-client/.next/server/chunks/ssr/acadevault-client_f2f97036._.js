module.exports = {

"[project]/acadevault-client/.next-internal/server/app/(public)/materials/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/acadevault-client/src/utils/generatePageMetadata.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "generatePageMetadata": (()=>generatePageMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/baseMetadata.js [app-rsc] (ecmascript)");
;
function generatePageMetadata({ title, description, slug, image = "https://acadevault.com/og-image.jpg" }) {
    const url = `https://acadevault.com/${slug}`;
    return {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"],
        title: `${title}`,
        description,
        openGraph: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"].openGraph,
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
            ...__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$baseMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseMetadata"].twitter,
            title,
            description,
            images: [
                image
            ]
        }
    };
}
}}),
"[project]/acadevault-client/src/lib/materials/fetchServerMaterialDetails.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchServerMaterialDetails": (()=>fetchServerMaterialDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:9000")?.replace(/\/+$/, "");
const API_PREFIX = "/api/v2/academic-materials";
const fetchServerMaterialDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (slug)=>{
    if (!slug || typeof slug !== "string") {
        console.warn("[getMaterialDetailsBySlug] called with invalid slug:", slug);
        return null;
    }
    try {
        const url = `${BASE_URL}${API_PREFIX}/${encodeURIComponent(slug)}`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // Next.js ISR: revalidate every 5 minutes
            next: {
                revalidate: 300
            }
        });
        if (res.status === 404) {
            return null;
        }
        if (!res.ok) {
            const text = await res.text();
            console.error(`[getMaterialDetailsBySlug] fetch error: ${res.status}`, text);
            return null;
        }
        const payload = await res.json();
        return payload.data || null;
    } catch (error) {
        console.error("[getMaterialDetailsBySlug] network error:", error);
        return null;
    }
});
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
"[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js <module evaluation>", "default");
}}),
"[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js", "default");
}}),
"[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f5b$slug$5d2f$components$2f$MaterialDetailClient$2e$js__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f5b$slug$5d2f$components$2f$MaterialDetailClient$2e$js__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f5b$slug$5d2f$components$2f$MaterialDetailClient$2e$js__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/acadevault-client/src/app/(public)/materials/[slug]/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// File: src/app/material/[slug]/page.js
__turbopack_context__.s({
    "default": (()=>MaterialDetailPage),
    "generateMetadata": (()=>generateMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/generatePageMetadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$materials$2f$fetchServerMaterialDetails$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/materials/fetchServerMaterialDetails.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/header/Navbar.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f5b$slug$5d2f$components$2f$MaterialDetailClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/[slug]/components/MaterialDetailClient.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function generateMetadata({ params }) {
    // 1. Await params
    const { slug: rawSlug } = await params;
    // 2. Validate
    if (!rawSlug || typeof rawSlug !== "string") {
        return {
            title: "Material Not Found | AcadeVault",
            description: "This academic material could not be found."
        };
    }
    // 3. Fetch minimal data for head tags
    const material = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$materials$2f$fetchServerMaterialDetails$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchServerMaterialDetails"])(rawSlug);
    if (!material) {
        return {
            title: "Material Not Found | AcadeVault",
            description: "This academic material could not be found."
        };
    }
    // 4. Build metadata
    const { title, author = "Unknown Author", description: desc = "", category } = material;
    const categoryName = category?.name || "Uncategorized";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generatePageMetadata"])({
        title: `${title} | ${categoryName} Material by ${author} | AcadeVault`,
        description: desc.slice(0, 160) || `Download "${title}" – an academic resource for ${categoryName} students on AcadeVault.`,
        slug: `material/${encodeURIComponent(rawSlug)}`,
        image: material.ogImage || `https://acadevault.com/og/materials/${encodeURIComponent(rawSlug)}.png`
    });
}
async function MaterialDetailPage({ params }) {
    // 1. Await params
    const { slug: rawSlug } = await params;
    // 2. Decode slug
    const slug = decodeURIComponent(rawSlug);
    // 3. Fetch full material data
    const material = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$materials$2f$fetchServerMaterialDetails$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchServerMaterialDetails"])(slug);
    // 4. 404 if not found
    if (!material) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    // 5. Render
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                showSearch: true,
                showCategories: true
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/[slug]/page.js",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f5b$slug$5d2f$components$2f$MaterialDetailClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                initialData: material,
                slug: slug
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/[slug]/page.js",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/[slug]/page.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/[slug]/page.js [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=acadevault-client_f2f97036._.js.map