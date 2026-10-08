module.exports = {

"[project]/acadevault-client/src/utils/formatPrice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatCurrency": (()=>formatCurrency),
    "formatPrice": (()=>formatPrice),
    "formatPriceWithSymbol": (()=>formatPriceWithSymbol)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/constants/enums.js [app-ssr] (ecmascript)");
;
const formatPrice = (formatted, locale = "en-US")=>{
    if (typeof formatted === "string") {
        return formatted.replace(/\.00$/, "");
    }
    return Number(formatted).toLocaleString(locale);
};
const formatCurrency = (amount, currency = "NGN", locale = "en-NG")=>{
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    }).format(amount);
};
const formatPriceWithSymbol = (amount, currency = "NGN")=>{
    const symbol = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currencySymbols"][currency] || currency;
    let formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
    // If NGN returns "NGN 5,000" instead of "₦5,000", manually replace
    if (currency === "NGN" && !formatted.includes(symbol)) {
        formatted = formatted.replace(currency, symbol);
    }
    return {
        formatted,
        symbol
    };
};
}}),
"[project]/acadevault-client/src/utils/generateKeyFeatures.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @typedef {Object} DigitalContent
 * @property {number} [pageCount]
 * @property {number} [previewDuration]   Preview time in seconds or pages
 * @property {object} [usageRights]
 * @property {boolean} [usageRights.canBeDownloaded]
 * @property {string} [format]
 * @property {string} [language]
 * @property {string[]} [toolsUsed]
 * @property {string} [licenseType]
 *
 * @typedef {Object} Material
 * @property {string} [title]
 * @property {string[]} [tags]
 * @property {DigitalContent} [digitalContent]
 * @property {Array<any>} [previewFiles]
 */ /**
 * Generate a cleaned-up array of “key features” strings for the Overview panel.
 *
 * Production enhancements:
 *  - ✅ Type safety (TS annotations)
 *  - ✅ Null-safety & defaults
 *  - ✅ Intl formatting for counts/durations
 *  - ✅ Split static vs. dynamic entries
 *  - ✅ Ready for i18n/localization hooks
 *
 * @param {Material} material
 * @returns {string[]} filtered list of feature bullet points
 */ __turbopack_context__.s({
    "generateKeyFeatures": (()=>generateKeyFeatures)
});
function generateKeyFeatures(material) {
    // Destructure with sensible defaults
    const { title = "", tags = [], previewFiles = [], digitalContent: { pageCount, previewDuration, usageRights = {}, format, language, toolsUsed = [], licenseType } = {} } = material;
    // Intl formatters (modify locales as needed)
    const pageFormatter = new Intl.NumberFormat("en-US");
    const durationFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0
    });
    // 1) Static, always-applicable features
    const staticFeatures = [
        "Peer-oriented academic content tailored for institutional standards",
        "Includes Introduction, Objectives, Methodology, Results, and Conclusion sections",
        "Follows structured academic writing conventions with logical flow and clear segmentation",
        "Supports direct submission or adaptation into dissertations, reports, or journal publications",
        "Ideal reference material for computer science, IT, and engineering domains",
        "Detailed software implementation using technologies like Python & MySQL",
        "Reusable diagrams, code snippets, and analysis for presentations and teaching",
        "Supports individual learning, institutional referencing, and team projects",
        "Rights-cleared for educational and non-commercial use",
        "Optimized for both academic assessment and portfolio demonstration",
        "Crafted with precision to meet institutional rubrics and real-world expectations"
    ];
    // 2) Dynamically-generated features
    const dynamicFeatures = [
        pageCount !== undefined && `Spanning ~${pageFormatter.format(pageCount)} pages of structured academic insights`,
        previewDuration !== undefined && `Preview access available for first ${durationFormatter.format(previewDuration)} units`,
        usageRights.canBeDownloaded && "High-resolution content downloadable after purchase",
        format && `Available in ${format} format for flexible consumption`,
        language && `Written in ${language} for academic clarity`,
        toolsUsed.length > 0 && `Built using: ${toolsUsed.map((t)=>t.trim()).join(", ")}`,
        licenseType && `Distributed under a ${licenseType} license`,
        previewFiles.length > 0 && "Includes visual snapshots and real previews for fast comprehension",
        title.trim() !== "" && `Based on the project: "${title.trim()}"`,
        tags.length > 0 && `Key topics covered: ${tags.slice(0, 5).map((t)=>t.trim()).join(", ")}`
    ];
    // 3) Filter out any `false` or empty strings, and return
    return [
        ...staticFeatures,
        ...dynamicFeatures
    ].filter((feat)=>Boolean(feat && feat.trim()));
}
}}),
"[project]/acadevault-client/src/utils/getMaterialSectionConfig.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Maps a materialType string to the correct section heading and internal component.
 *
 * @param materialType   Raw type value from the API (e.g. "Course", "Research Paper")
 * @returns `{ section, component }`
 */ __turbopack_context__.s({
    "getMaterialSectionConfig": (()=>getMaterialSectionConfig)
});
function getMaterialSectionConfig(materialType) {
    const type = materialType?.trim().toLowerCase() ?? "";
    const map = [
        {
            keys: [
                "course",
                "ebook",
                "tutorial",
                "notes",
                "summary"
            ],
            config: {
                section: "What You'll Learn",
                component: "learn"
            }
        },
        {
            keys: [
                "thesis",
                "dissertation",
                "research paper",
                "project report",
                "journal"
            ],
            config: {
                section: "Material Overview",
                component: "overview"
            }
        },
        {
            keys: [
                "business plan",
                "feasibility study"
            ],
            config: {
                section: "Executive Summary",
                component: "overview"
            }
        },
        {
            keys: [
                "template",
                "form",
                "toolkit"
            ],
            config: {
                section: "What's Included",
                component: "resources"
            }
        }
    ];
    for (const entry of map){
        if (entry.keys.includes(type)) {
            return entry.config;
        }
    }
    // Fallback for unrecognized types
    return {
        section: "Highlights",
        component: "overview"
    };
}
}}),
"[project]/acadevault-client/src/utils/dateUtils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatDate": (()=>formatDate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parseISO.js [app-ssr] (ecmascript)");
;
function formatDate(dateInput) {
    // If it's a string, parse it; otherwise assume it's already a Date.
    const date = typeof dateInput === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(dateInput) : dateInput;
    // Format exactly as: Full month name, day, year, "at", hour:minute AM/PM
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "MMMM d, yyyy 'at' h:mm a");
}
}}),
"[project]/acadevault-client/src/utils/getImageUrl.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getFileUrl": (()=>getFileUrl),
    "getImageUrl": (()=>getImageUrl)
});
const getImageUrl = (thumbnailPath)=>{
    const fallbackPath = "/images/acadevault-hero-img-1.png";
    // Absolute URLs are returned as-is
    if (thumbnailPath?.startsWith("http://") || thumbnailPath?.startsWith("https://")) {
        return thumbnailPath;
    }
    // Fallback if no path provided
    if (!thumbnailPath) {
        return fallbackPath;
    }
    // Relative path to backend-hosted image
    return `${"TURBOPACK compile-time value", "http://localhost:9000"}/${thumbnailPath.replace(/^\/+/, "")}`;
};
const getFileUrl = (path)=>{
    const fallbackPath = "/files/preview-not-available.txt";
    if (!path) return fallbackPath;
    // Return absolute URLs as-is
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    // Normalize and build full backend URL
    return `${"TURBOPACK compile-time value", "http://localhost:9000"}/${path.replace(/^\/+/, "")}`;
};
}}),
"[project]/acadevault-client/src/utils/materialUtils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMaterialHighlightTag": (()=>getMaterialHighlightTag),
    "isBestsellerMaterial": (()=>isBestsellerMaterial),
    "isFeaturedMaterial": (()=>isFeaturedMaterial),
    "isTopRatedMaterial": (()=>isTopRatedMaterial)
});
const isBestsellerMaterial = ({ averageRating, totalRatings, totalStudents })=>totalStudents >= 1000 && totalRatings >= 50 && averageRating >= 4.5;
const isTopRatedMaterial = ({ averageRating, totalRatings })=>totalRatings >= 15 && averageRating >= 4.8;
const isFeaturedMaterial = ({ tags, isFeatured })=>tags?.includes("featured") || isFeatured === true;
const getMaterialHighlightTag = (material)=>{
    const averageRating = material.rating?.average ?? 4.7;
    const totalRatings = material.rating?.count ?? 222709;
    const totalStudents = material?.studentsEnrolled ?? 983836;
    const { tags, isFeatured } = material;
    if (isFeaturedMaterial({
        tags,
        isFeatured
    })) {
        return {
            label: "Featured",
            color: "indigo"
        };
    }
    if (isBestsellerMaterial({
        averageRating,
        totalRatings,
        totalStudents
    })) {
        return {
            label: "Bestseller",
            color: "green"
        };
    }
    if (isTopRatedMaterial({
        averageRating,
        totalRatings
    })) {
        return {
            label: "Top Rated",
            color: "purple"
        };
    }
    return null;
};
}}),
"[project]/acadevault-client/src/utils/getFileDescription.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getFileDescription": (()=>getFileDescription)
});
function getFileDescription(materialType) {
    switch(materialType.toLowerCase()){
        case "lecture notes":
            return "annotated slides, lecture outlines, or instructor commentary";
        case "past questions":
        case "exam questions":
            return "previous exam papers, question banks, and model answers";
        case "course summary":
        case "revision guide":
            return "condensed notes, key concepts, or exam-ready overviews";
        case "textbook":
            return "sample chapters, practice exercises, or reference sections";
        case "project report":
        case "research paper":
        case "journal article":
        case "thesis":
        case "dissertation":
        case "business plan":
        case "feasibility study":
            return "abstract, table of contents, or introduction chapter";
        case "assignment":
            return "assignment brief, sample response, or grading rubric";
        case "lab report":
            return "experiment overview, raw data excerpts, or observation summaries";
        case "case study":
            return "real-world scenario overview, analysis framework, or introduction";
        default:
            return "supporting documents, academic references, or course-related previews";
    }
}
}}),
"[project]/acadevault-client/src/utils/getFileInfo.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Returns a simplified file information object from a File input.
 * Useful for displaying user-friendly file metadata in the UI.
 *
 * @param {File} file - The File object to extract info from.
 * @returns {Object} An object containing a shortened name, formatted size, and file type category.
 */ __turbopack_context__.s({
    "formatBytes": (()=>formatBytes),
    "getFileInfo": (()=>getFileInfo)
});
function getFileInfo(file) {
    // Truncate file name if it's longer than 30 characters for cleaner display
    const name = file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name;
    // Format the file size into human-readable units (e.g., "2.3 MB")
    const size = formatBytes(file.size);
    // Determine file type category based on MIME type prefix
    const type = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "other"; // Default to "other" if not image or video
    return {
        name,
        size,
        type
    };
}
function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return "0 B";
    const k = 1024; // Conversion base
    const dm = decimals < 0 ? 0 : decimals; // Ensure decimals is non-negative
    const sizes = [
        "B",
        "KB",
        "MB",
        "GB"
    ]; // Units
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine size unit index
    const value = bytes / Math.pow(k, i); // Convert bytes to appropriate unit
    return parseFloat(value.toFixed(dm)) + " " + sizes[i]; // Format value with unit
}
}}),
"[project]/acadevault-client/src/utils/autoLinkTags.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Automatically hyperlinks any tags found in a given description.
 * This is useful for making keywords or topic tags in a material's description clickable,
 * linking users to a filtered materials page based on that tag.
 *
 * @param {string} description - The input text (typically a material description).
 * @param {string[]} tags - An array of tags to be auto-linked within the description.
 * @returns {string} - The updated description with matched tags turned into hyperlinks.
 */ __turbopack_context__.s({
    "autoLinkTags": (()=>autoLinkTags)
});
function autoLinkTags(description, tags = []) {
    // If there's no description or no tags provided, return the original description as-is
    if (!description || tags.length === 0) return description;
    // Create a regular expression to match any of the tags, using word boundaries
    // The 'gi' flags ensure case-insensitive and global matching
    const tagRegex = new RegExp(`\\b(${tags.join("|")})\\b`, "gi");
    // Replace each matched tag with a markdown-style hyperlink to the /materials page
    return description.replace(tagRegex, (matched)=>{
        // Encode the matched tag for use in a URL query parameter
        const encoded = encodeURIComponent(matched.toLowerCase());
        // Return the markdown link: [tag](/materials?tag=encoded-tag)
        return `[${matched}](/materials?tag=${encoded})`;
    });
}
}}),
"[project]/acadevault-client/src/hooks/useEffectivePrice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/CurrencyContext.js [app-ssr] (ecmascript)");
"use client";
;
;
const useEffectivePrice = ({ materialId, materialType, region = null })=>{
    const { currency } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CurrencyContext"]);
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const params = {};
        if (currency) params.currency = currency;
        if (region) params.region = region;
        if (materialId) params.materialId = materialId;
        if (materialType) params.materialType = materialType;
        return new URLSearchParams(params).toString();
    }, [
        currency,
        materialId,
        materialType,
        region
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!currency || !materialId || !materialType) return;
        const fetchPrice = async ()=>{
            setLoading(true);
            try {
                const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:9000")}/api/v2/prices/current-price?${query}`);
                const json = await res.json();
                setPrice(json?.data ?? null);
            } catch (error) {
                console.error("Failed to fetch price:", error);
                setPrice(null);
            } finally{
                setLoading(false);
            }
        };
        fetchPrice();
    }, [
        query,
        currency,
        materialId,
        materialType
    ]);
    return {
        price,
        loading
    };
};
const __TURBOPACK__default__export__ = useEffectivePrice;
}}),
"[project]/acadevault-client/src/hooks/useLearningObjectives.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useLearningObjectives": (()=>useLearningObjectives)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/**
 * Default objectives to fall back on when none are provided.
 */ const DEFAULT_LEARNING_OBJECTIVES = [
    "Become an advanced, confident, and modern React developer from scratch",
    "Become job-ready by working with libraries and tools used in professional projects",
    "Think like a senior React engineer with advanced design patterns",
    "State management: thinking about state, where to place, local vs. global, UI vs. remote",
    "Build 10+ beautiful projects, including two HUGE professional real-world apps",
    "Join my other 1,900,000+ happy students on this journey",
    "Next.js 'App' router with cutting-edge React Server Components + Server Actions",
    "Build reusable, composable, and versatile components",
    "Build many custom hooks, reusable in your future projects"
];
function useLearningObjectives(materialDetail) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const { learningObjectives } = materialDetail ?? {};
        // Only accept a non-empty array of strings; otherwise, use defaults.
        if (Array.isArray(learningObjectives) && learningObjectives.length > 0 && learningObjectives.every((item)=>typeof item === "string" && item.trim() !== "")) {
            return learningObjectives;
        }
        return DEFAULT_LEARNING_OBJECTIVES;
    }, [
        materialDetail
    ]);
}
}}),
"[project]/acadevault-client/src/hooks/useMaterialReviews.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useMaterialReviews": (()=>useMaterialReviews)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/reviews/reviewsApi.js [app-ssr] (ecmascript)");
;
;
function useMaterialReviews(materialId, limit = 5) {
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const { data, error: fetchError, isLoading: isFetchingReviews, isFetching, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetMaterialReviewsQuery"])({
        materialId,
        page,
        limit
    }, {
        refetchOnMountOrArgChange: true
    });
    const [addReview, { isLoading: isSubmitting, error: submitError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$reviews$2f$reviewsApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAddReviewMutation"])();
    const submitReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (reviewData)=>{
        try {
            await addReview({
                materialId,
                ...reviewData
            }).unwrap();
            setPage(1); // Show new review on the first page
            refetch(); // Refresh reviews
        } catch (err) {
            console.error("Review submission failed", err);
            throw err; // Optional: propagate for local handling
        }
    }, [
        addReview,
        materialId,
        refetch
    ]);
    const reviews = data?.reviews || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);
    return {
        reviews,
        currentPage: page,
        totalPages,
        isFetchingReviews,
        isFetching,
        fetchError,
        submitReview,
        isSubmitting,
        submitError,
        setPage
    };
}
}}),
"[project]/acadevault-client/src/hooks/useInfiniteScroll.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useInfiniteScroll": (()=>useInfiniteScroll)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useInfiniteScroll({ hasMore, isLoading, onLoadMore, rootMargin = "0px 0px 200px 0px", threshold = 0.1 }) {
    // Keep a stable reference to the latest onLoadMore to avoid re-creating observer
    const callbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onLoadMore);
    callbackRef.current = onLoadMore;
    // Store the current IntersectionObserver instance
    const observer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
   * Ref callback: React will call this with the sentinel DOM node.
   * We attach (or re‐attach) our IntersectionObserver here.
   */ const setSentinel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        // Disconnect previous observer if any
        if (observer.current) {
            observer.current.disconnect();
        }
        if (node && hasMore && !isLoading) {
            // Create a new observer instance
            observer.current = new IntersectionObserver((entries)=>{
                // When sentinel enters the viewport
                if (entries[0].isIntersecting) {
                    callbackRef.current();
                }
            }, {
                rootMargin,
                threshold
            });
            observer.current.observe(node);
        }
    }, [
        hasMore,
        isLoading,
        rootMargin,
        threshold
    ]);
    // Clean up on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            observer.current?.disconnect();
        };
    }, []);
    return setSentinel;
}
}}),
"[project]/acadevault-client/src/hooks/useCopyToClipboard.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>useCopyToClipboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useCopyToClipboard({ resetAfter = 2000 } = {}) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // Tracks what was copied (useful for UI feedback)
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // Tracks any clipboard errors
    /**
   * Copies the provided text to the clipboard.
   *
   * @param {string} text - The text to be copied.
   * @param {string} type - The identifier/type of the item copied (useful for UI feedback).
   */ const handleCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text, type)=>{
        if (!navigator?.clipboard) {
            setError("Clipboard API not supported in this browser.");
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setError(null);
            // Auto-reset after specified timeout
            const timer = setTimeout(()=>setCopied(null), resetAfter);
            // Cleanup to avoid memory leaks in fast UI updates
            return ()=>clearTimeout(timer);
        } catch (err) {
            console.error("Failed to copy to clipboard:", err);
            setError("Failed to copy to clipboard. Please try again.");
        }
    }, [
        resetAfter
    ]);
    return {
        copied,
        handleCopy,
        error
    };
} // import { useState } from "react";
 // export default function useCopyToClipboard() {
 //   const [copied, setCopied] = useState(null);
 //   const handleCopy = (text, type) => {
 //     navigator.clipboard.writeText(text);
 //     setCopied(type);
 //     setTimeout(() => setCopied(null), 2000);
 //   };
 //   return { copied, handleCopy };
 // }
}}),
"[project]/acadevault-client/src/data/fallbackReviews.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fallbackReviews": (()=>fallbackReviews)
});
const fallbackReviews = [
    {
        _id: "1",
        user: {
            name: "Jane Doe"
        },
        rating: 5,
        comment: "Incredible content! Very thorough and well structured.",
        createdAt: "2024-12-10T09:00:00Z",
        verified: true,
        platform: "Web"
    },
    {
        _id: "2",
        user: {
            name: "Samuel K."
        },
        rating: 4,
        comment: "Helpful material. It could use more examples, but overall solid.",
        createdAt: "2025-01-15T14:30:00Z",
        verified: false,
        platform: "Mobile App"
    },
    {
        _id: "3",
        user: {
            name: "Anonymous"
        },
        rating: 5,
        comment: "Exactly what I needed for my project. Highly recommended!",
        createdAt: "2025-03-01T10:20:00Z",
        verified: true,
        platform: "Web"
    },
    {
        _id: "4",
        user: {
            name: "Liam P."
        },
        rating: 3,
        comment: "Good content but felt a bit rushed in some sections.",
        createdAt: "2025-03-20T11:45:00Z",
        verified: true,
        platform: "Mobile App"
    },
    {
        _id: "5",
        user: {
            name: "Emily R."
        },
        rating: 4,
        comment: "Very useful overall. Loved the visuals and examples!",
        createdAt: "2025-04-05T08:15:00Z",
        verified: false,
        platform: "Web"
    },
    {
        _id: "6",
        user: {
            name: "David C."
        },
        rating: 2,
        comment: "Not what I expected. The coverage was too shallow.",
        createdAt: "2025-04-18T17:30:00Z",
        verified: true,
        platform: "Mobile App"
    },
    {
        _id: "7",
        user: {
            name: "Nina M."
        },
        rating: 5,
        comment: "Absolutely perfect. Would definitely recommend!",
        createdAt: "2025-04-28T09:10:00Z",
        verified: true,
        platform: "Web"
    }
];
}}),
"[project]/acadevault-client/src/data/faqsData.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "faqDataset": (()=>faqDataset),
    "faqs": (()=>faqs)
});
const faqs = [
    {
        category: "General",
        items: [
            {
                id: 1,
                question: "What is AcadeVault?",
                answer: "AcadeVault is a cutting-edge academic resource platform that provides access to high-quality educational materials, enabling students, researchers, and professionals to find, purchase, and manage their learning resources seamlessly."
            },
            {
                id: 2,
                question: "Can I preview a material before purchasing?",
                answer: "Yes, many materials have preview sections available. Look for the 'Preview' button on the material's page before making a purchase."
            },
            {
                id: 3,
                question: "Does AcadeVault have an affiliate program?",
                answer: "Yes! You can earn commissions by referring new buyers to AcadeVault. Simply sign up as an affiliate and share your unique referral link."
            }
        ]
    },
    {
        category: "Purchasing & Payments",
        items: [
            {
                id: 4,
                question: "How do I purchase materials on AcadeVault?",
                answer: "To purchase materials, create an account, browse the available resources, add your selections to the cart, and proceed to checkout using a secure payment method."
            },
            {
                id: 5,
                question: "What payment methods are supported?",
                answer: "We accept multiple payment options, including credit/debit cards, PayPal, and mobile wallets. Available methods may vary depending on your location."
            },
            {
                id: 6,
                question: "Is my payment information secure?",
                answer: "Yes, AcadeVault uses industry-leading encryption and secure payment gateways to ensure your financial details remain safe and confidential."
            }
        ]
    },
    {
        category: "Account & Security",
        items: [
            {
                id: 7,
                question: "How do I reset my password?",
                answer: "Click on 'Forgot Password' on the login page, enter your registered email, and follow the instructions in the reset link sent to your inbox."
            },
            {
                id: 8,
                question: "How do I get support if I encounter any issues?",
                answer: "You can contact our support team via email at support@acadevault.com or visit our Help Center for FAQs, tutorials, and troubleshooting guides."
            }
        ]
    },
    {
        category: "Selling & Licensing",
        items: [
            {
                id: 9,
                question: "Can I sell my academic materials on AcadeVault?",
                answer: "Absolutely! Educators and content creators can register as sellers, upload their materials, and earn from each sale through our marketplace."
            },
            {
                id: 10,
                question: "Are the materials on AcadeVault copyrighted?",
                answer: "Yes, all materials are copyrighted by their respective authors. Users must adhere to licensing agreements and avoid unauthorized distribution."
            }
        ]
    }
];
const faqDataset = [
    {
        question: "how do i get started?",
        answer: "Simply create an account and start exploring academic materials."
    },
    {
        question: "what payment methods do you support?",
        answer: "We support PayPal, Stripe, and major credit/debit cards."
    },
    {
        question: "can i sell academic materials?",
        answer: "Yes! Sign up as a vendor and start selling your materials."
    },
    {
        question: "is there a refund policy?",
        answer: "Yes, refunds are available under specific conditions."
    },
    {
        question: "how does the affiliate program work?",
        answer: "You earn commissions by referring users."
    }
]; // const faqs = [
 //   {
 //     id: 1,
 //     question: "What is AcadeVault?",
 //     answer:
 //       "AcadeVault is a comprehensive academic resource platform offering a vast collection of educational materials, community support, and seamless purchasing options.",
 //   },
 //   {
 //     id: 2,
 //     question: "How do I purchase a material?",
 //     answer:
 //       "After signing up, browse our materials, add selections to your cart, and complete checkout using our secure payment gateway.",
 //   },
 //   {
 //     id: 3,
 //     question: "Can I access materials offline?",
 //     answer:
 //       "Yes, once purchased, you can download materials and access them offline at your convenience.",
 //   },
 //   {
 //     id: 4,
 //     question: "How do I get support if I have questions?",
 //     answer:
 //       "Our support team is available via email at support@acadevault.com, and you can also find help through our Help Center.",
 //   },
 //   {
 //     id: 5,
 //     question: "What payment methods do you accept?",
 //     answer:
 //       "We accept various payment methods, including Visa, MasterCard, PayPal, and cryptocurrency. Additional local payment methods may be available depending on your region.",
 //   },
 //   {
 //     id: 6,
 //     question: "Is my payment information secure?",
 //     answer:
 //       "Absolutely! We use industry-standard encryption and secure payment gateways to ensure your payment information is safe and confidential.",
 //   },
 //   {
 //     id: 7,
 //     question: "Do you offer refunds?",
 //     answer:
 //       "Yes, we offer refunds under specific conditions. If you are unsatisfied with a material, you can request a refund within 7 days, subject to our refund policy.",
 //   },
 //   {
 //     id: 8,
 //     question: "Can I sell my materials on AcadeVault?",
 //     answer:
 //       "Yes! We welcome educators and content creators. You can apply to become a seller and earn from your materials. Our seller dashboard provides advanced analytics and tools to manage your sales.",
 //   },
 //   {
 //     id: 9,
 //     question: "Does AcadeVault have an affiliate program?",
 //     answer:
 //       "Yes! Our affiliate program allows you to earn commissions by referring new buyers. You can sign up and get a unique referral link to start earning.",
 //   },
 //   {
 //     id: 10,
 //     question: "How do I reset my password?",
 //     answer:
 //       "You can reset your password by clicking 'Forgot Password' on the login page and following the instructions sent to your registered email.",
 //   },
 //   {
 //     id: 11,
 //     question: "Can I preview a material before purchasing?",
 //     answer:
 //       "Yes, many materials have free previews available. Look for the 'Preview' option on the material's page before making a purchase.",
 //   },
 //   {
 //     id: 12,
 //     question: "Are the materials copyrighted?",
 //     answer:
 //       "Yes, all materials are protected under copyright laws. Users must adhere to licensing agreements and refrain from unauthorized distribution.",
 //   },
 //   {
 //     id: 13,
 //     question: "Can I request a custom academic material?",
 //     answer:
 //       "Absolutely! You can submit a request for custom materials, and our experts or content creators may create one tailored to your needs.",
 //   },
 //   {
 //     id: 14,
 //     question: "How do I report an issue with a material?",
 //     answer:
 //       "If you encounter an issue, you can report it directly on the material's page or contact our support team for assistance.",
 //   },
 //   {
 //     id: 15,
 //     question: "Is there a mobile app for AcadeVault?",
 //     answer:
 //       "Yes! AcadeVault is available on iOS and Android, allowing you to browse, purchase, and access materials on the go.",
 //   },
 // ];
}}),
"[project]/acadevault-client/src/helpers/getInitials.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Extracts initials from a full name.
 *
 * @param {string} name - The full name to extract initials from.
 * @param {number} count - Number of initials to return (1 or 2). Defaults to 1.
 * @returns {string} A string of uppercase initials, or '?' if input is invalid.
 */ __turbopack_context__.s({
    "getInitials": (()=>getInitials)
});
function getInitials(name, count = 1) {
    // Validate input: must be a non-empty string
    if (!name || typeof name !== "string") return "?";
    // Split by whitespace and filter out empty parts
    const parts = name.trim().split(/\s+/).filter(Boolean);
    // Return '?' if no usable parts found
    if (parts.length === 0) return "?";
    // Limit count to 1 or 2
    const initialsCount = Math.max(1, Math.min(2, count));
    if (initialsCount === 1) {
        // Return only the first letter of the first word
        return parts[0][0].toUpperCase();
    }
    // If one word only, return the first two letters
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    // If multiple words, take the first character of the first two
    return (parts[0][0] + parts[1][0]).toUpperCase();
}
}}),

};

//# sourceMappingURL=acadevault-client_src_10fe9a74._.js.map