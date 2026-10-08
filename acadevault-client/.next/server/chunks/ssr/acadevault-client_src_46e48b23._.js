module.exports = {

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
"[project]/acadevault-client/src/utils/getPromotionTag.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Generate a promotional tag object based on pricing and discount logic.
 * Used for displaying dynamic tags like "Promo", "30% Off", etc.
 *
 * @param {Object} params - The input parameters.
 * @param {Object} params.finalPrice - Contains actual pricing details including discount.
 * @param {number} params.finalPrice.amount - The actual sale amount.
 * @param {number} params.finalPrice.originalAmount - The original (pre-discount) price.
 * @param {Object} params.price - Original price object, may include type metadata.
 * @param {string} params.price.type - Pricing strategy (e.g., 'promotional').
 * @param {string} [params.price.notes] - Optional notes about the promotion.
 *
 * @returns {Object|null} An object with `label` and `type` for a UI tag or `null` if no promotion.
 */ __turbopack_context__.s({
    "getPromotionTag": (()=>getPromotionTag)
});
const getPromotionTag = ({ finalPrice, price })=>{
    // Early exit if input is invalid or incomplete
    if (!finalPrice?.originalAmount || !finalPrice?.amount || !price?.type) {
        return null;
    }
    const hasDiscount = finalPrice.originalAmount > finalPrice.amount;
    const isPromotional = price.type === "promotional";
    const isDiscount = hasDiscount && !isPromotional;
    // Case 1: Promotion-based pricing (e.g., flash sale, limited time, etc.)
    if (isPromotional) {
        // Optional enhancement: you can inspect `price.notes` for more context like "Limited Time"
        return {
            label: "Promo",
            type: "promo"
        };
    }
    // Case 2: Standard discount (price cut without promotional strategy)
    if (isDiscount) {
        const discountPercent = Math.round((finalPrice.originalAmount - finalPrice.amount) / finalPrice.originalAmount * 100);
        return {
            label: `${discountPercent}% Off`,
            type: discountPercent >= 30 ? "high-discount" : "discount"
        };
    }
    // Case 3: No promo or discount
    return null;
};
}}),
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
"[project]/acadevault-client/src/utils/AnimationUtils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fadeInLeft": (()=>fadeInLeft),
    "fadeInUp": (()=>fadeInUp)
});
const fadeInUp = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0
    },
    transition: {
        duration: 0.6
    }
};
const fadeInLeft = {
    initial: {
        opacity: 0,
        x: -20
    },
    animate: {
        opacity: 1,
        x: 0
    },
    transition: {
        duration: 0.6
    }
};
}}),
"[project]/acadevault-client/src/utils/easings.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "easeInOutQuad": (()=>easeInOutQuad),
    "easeInQuad": (()=>easeInQuad),
    "easeOutCubic": (()=>easeOutCubic),
    "easeOutExpo": (()=>easeOutExpo),
    "easeOutQuad": (()=>easeOutQuad)
});
const easeInQuad = (t)=>t * t;
const easeOutQuad = (t)=>t * (2 - t);
const easeInOutQuad = (t)=>t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOutCubic = (t)=>--t * t * t + 1;
const easeOutExpo = (t)=>t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
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
"[project]/acadevault-client/src/hooks/useTestimonialsCarousel.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTestimonialsCarousel": (()=>useTestimonialsCarousel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$testimonialsData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/data/testimonialsData.js [app-ssr] (ecmascript)");
"use client";
;
;
function useTestimonialsCarousel(autoPlayMs = 7000) {
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Number of testimonials from data source
    const count = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$testimonialsData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["testimonialsData"].length;
    // Move to a new page, wrapping around via modulo
    const paginate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((delta)=>{
        setDirection(delta);
        setPage((prev)=>(prev + delta + count) % count);
    }, [
        count
    ]);
    // On drag/swipe end, determine if enough swipe velocity/offset to paginate
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e, { offset, velocity })=>{
        const swipePower = offset.x * velocity.x;
        const threshold = 1000;
        if (swipePower < -threshold) {
            paginate(1);
        } else if (swipePower > threshold) {
            paginate(-1);
        }
    }, [
        paginate
    ]);
    // Auto-play: advance every autoPlayMs milliseconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timerId = setInterval(()=>{
            paginate(1);
        }, autoPlayMs);
        return ()=>clearInterval(timerId);
    }, [
        page,
        paginate,
        autoPlayMs
    ]);
    // The current testimonial object (from data array)
    const currentTestimonial = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$testimonialsData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["testimonialsData"][page];
    return {
        page,
        direction,
        currentTestimonial,
        paginate,
        handleDragEnd
    };
}
}}),
"[project]/acadevault-client/src/hooks/useCounter.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// useCounter.js
__turbopack_context__.s({
    "useCounter": (()=>useCounter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useCounter({ from = 0, to, duration = 1500, easing = (t)=>t, direction, loop = false, pauseAtEnd = 0, pauseOnHover = false, delay = 0, onEnd }) {
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(from);
    const rafId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const paused = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hoverPaused = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const initialTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Determine natural direction
    const dir = direction || (to > from ? "up" : "down");
    const delta = Math.abs(to - from);
    const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((timestamp)=>{
        if (paused.current || hoverPaused.current) {
            // skip frames while paused
            rafId.current = requestAnimationFrame(step);
            return;
        }
        if (startTime.current === null) {
            startTime.current = timestamp;
        }
        const elapsed = timestamp - startTime.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easing(progress);
        // interpolate value
        const current = dir === "up" ? from + delta * eased : from - delta * eased + (dir === "down" ? delta : 0);
        setValue(Math.round(current));
        if (elapsed < duration) {
            rafId.current = requestAnimationFrame(step);
        } else {
            // end of one cycle
            setValue(to);
            onEnd?.();
            if (loop) {
                // pause then restart
                initialTimeout.current = setTimeout(()=>{
                    startTime.current = null;
                    rafId.current = requestAnimationFrame(step);
                }, pauseAtEnd);
            }
        }
    }, [
        from,
        to,
        duration,
        easing,
        delta,
        dir,
        loop,
        pauseAtEnd,
        onEnd
    ]);
    // Imperative controls
    const pause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        paused.current = true;
    }, []);
    const resume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        paused.current = false;
    }, []);
    // hover handlers
    const bind = {
        onMouseEnter: pauseOnHover ? ()=>{
            hoverPaused.current = true;
        } : undefined,
        onMouseLeave: pauseOnHover ? ()=>{
            hoverPaused.current = false;
        } : undefined
    };
    // lifecycle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // kick off after optional delay
        if (delay > 0) {
            initialTimeout.current = setTimeout(()=>{
                rafId.current = requestAnimationFrame(step);
            }, delay);
        } else {
            rafId.current = requestAnimationFrame(step);
        }
        // cleanup
        return ()=>{
            clearTimeout(initialTimeout.current);
            cancelAnimationFrame(rafId.current);
        };
    }, [
        step,
        delay
    ]);
    return {
        value,
        pause,
        resume,
        bind
    };
}
}}),
"[project]/acadevault-client/src/helpers/truncateText.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Truncate a string to a maximum length, adding "…" if it was longer.
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */ __turbopack_context__.s({
    "truncateText": (()=>truncateText)
});
function truncateText(text, maxLength = 100) {
    if (typeof text !== "string") return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1).trimEnd() + "…";
}
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
"[project]/acadevault-client/src/data/testimonialsData.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "testimonialsData": (()=>testimonialsData)
});
const testimonialsData = [
    {
        id: 1,
        name: "John Doe",
        designation: "Student",
        message: "AcadeVault has completely transformed my study routine. The quality of materials is unmatched!",
        avatar: "/avatars/alex-profile.png",
        rating: 5
    },
    {
        id: 2,
        name: "Jane Smith",
        designation: "Educator",
        message: "I love sharing my knowledge through AcadeVault. It's an excellent platform for educators and students alike.",
        avatar: "/avatars/divine.png",
        rating: 4
    },
    {
        id: 3,
        name: "Michael Lee",
        designation: "Researcher",
        message: "The extensive library and community support make AcadeVault a must-have tool for any researcher.",
        avatar: "/avatars/tony.png",
        rating: 5
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

};

//# sourceMappingURL=acadevault-client_src_46e48b23._.js.map