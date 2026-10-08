module.exports = {

"[project]/acadevault-client/.next-internal/server/app/(public)/materials/category/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js <module evaluation>", "default");
}}),
"[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js", "default");
}}),
"[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$category$2f5b$slug$5d2f$components$2f$ClientMaterials$2e$js__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$category$2f5b$slug$5d2f$components$2f$ClientMaterials$2e$js__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$category$2f5b$slug$5d2f$components$2f$ClientMaterials$2e$js__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/acadevault-client/src/features/materials/materialQueryHelpers.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/acadevault-client/src/lib/materials/fetchMaterialsByCategory.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchServerMaterialsByCategory": (()=>fetchServerMaterialsByCategory)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/materialQueryHelpers.js [app-rsc] (ecmascript)");
;
async function fetchServerMaterialsByCategory(params = {}) {
    try {
        // 1. build a safe URL fragment (e.g. "/api/v2/academic-materials/category/math/materials?page=2&limit=10")
        const fragment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildMaterialUrl"])(params);
        // 2. prefix with our public API base (NEXT_PUBLIC_API_URL)
        const url = `${("TURBOPACK compile-time value", "http://localhost:9000")}${fragment}`;
        const res = await fetch(url, {
            cache: "no-store",
            credentials: "include"
        });
        if (!res.ok) {
            // e.g. 404, 500
            console.error("SSR: non-OK response", res.status);
            return null;
        }
        const json = await res.json();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$materialQueryHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["transformMaterialResponse"])(json, params);
    } catch (err) {
        console.error("SSR Material Fetch Failed:", err);
        return null;
    }
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
"[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoryPage),
    "generateMetadata": (()=>generateMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/metadata/generatePageMetadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$category$2f5b$slug$5d2f$components$2f$ClientMaterials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/category/[slug]/components/ClientMaterials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$materials$2f$fetchMaterialsByCategory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/materials/fetchMaterialsByCategory.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/header/Navbar.jsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateMetadata({ params }) {
    // 1. Await the params object
    const { slug: rawSlug } = await params; // e.g. "computer-science"
    const decoded = decodeURIComponent(rawSlug).replace(/-/g, " "); // "computer science"
    // 2. Compose a page‐specific title & description
    const pageTitle = `${decoded} Materials`;
    const pageDescription = `Browse all academic materials under “${decoded}” on AcadeVault.`;
    // 3. Compute a slug‐based URL path (matching your routing structure).
    //    For example, if the page lives at /materials/category/computer-science, pass that in:
    const urlSlug = `materials/category/${encodeURIComponent(rawSlug)}`;
    // 4. Delegate to your reusable helper:
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$metadata$2f$generatePageMetadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generatePageMetadata"])({
        title: pageTitle,
        description: pageDescription,
        slug: urlSlug
    });
}
async function CategoryPage({ params, searchParams }) {
    // 1. Must await them per Next.js 14 “Sync Dynamic APIs” rule:
    const { slug: rawSlug } = await params; // rawSlug is e.g. "computer-science"
    const categorySlug = decodeURIComponent(rawSlug);
    // 2. await the searchParams object
    const incoming = await searchParams; // e.g. { page: "2", limit: "10" }
    // 3. Build a “plain” object of only string|number from incoming searchParams:
    const cleanedParams = {};
    for (const [key, value] of Object.entries(incoming)){
        if (typeof value === "string" && value.trim() !== "") {
            // if it represents an integer, you might parseInt here
            // e.g. cleanedParams.page = parseInt(value, 10)
            // but for now, just pass as string—our RTK Query builder can coerce it.
            cleanedParams[key] = value;
        }
    }
    // 4. Fetch initial data on the server:
    const initialData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$materials$2f$fetchMaterialsByCategory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchServerMaterialsByCategory"])({
        categorySlug,
        ...cleanedParams
    });
    // If no data or empty list, we can show a “not found” or “no results” block
    if (!initialData || Array.isArray(initialData.materials) === false || initialData.materials.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg font-medium",
                children: [
                    "No materials found in the “",
                    categorySlug.replace(/-/g, " "),
                    "” category."
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
    // 5. Render the page with a server-rendered <h1>, then hydrate <ClientMaterials>
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$header$2f$Navbar$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                showSearch: true,
                showCategories: true
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$category$2f5b$slug$5d2f$components$2f$ClientMaterials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                initialData: initialData,
                categorySlug: categorySlug,
                initialSearchParams: cleanedParams
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/category/[slug]/page.js [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=acadevault-client_0e2501b9._.js.map