module.exports = {

"[project]/acadevault-client/src/hooks/useShop.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useShop": (()=>useShop)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/shop/shopApi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function useShop({ shopId, queryParams = {} }) {
    // === Shop Details ===
    const { data: shopData, isLoading: isDetailsLoading, isFetching: isDetailsFetching, error: detailsError, refetch: refetchDetails } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetShopDetailsQuery"])({
        shopId,
        queryParams
    }, {
        skip: !shopId,
        refetchOnMountOrArgChange: true
    });
    // === Shops List (e.g., for recommendations) ===
    const { data: shopsList, isLoading: isListLoading, error: listError, refetch: refetchList } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetShopsQuery"])(queryParams, {
        skip: !Object.keys(queryParams).length && !!shopId
    });
    // === Follow / Unfollow ===
    const [followShop, { isLoading: isFollowLoading, error: followError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFollowShopMutation"])();
    const [unfollowShop, { isLoading: isUnfollowLoading, error: unfollowError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUnfollowShopMutation"])();
    // === Reviews ===
    const { data: reviewsData, isLoading: isReviewsLoading, isFetching: isReviewsFetching, error: reviewsError, refetch: refetchReviews } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetShopReviewsQuery"])({
        shopId,
        queryParams
    }, {
        skip: !shopId
    });
    const [lazyGetReviews, { data: lazyReviewsData, isFetching: isLazyReviewsFetching, error: lazyReviewsError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLazyGetShopReviewsQuery"])();
    // === Submit Mutations ===
    const [submitReview, { isLoading: isSubmitReviewLoading, error: submitReviewError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSubmitShopReviewMutation"])();
    const [submitContactForm, { isLoading: isContactLoading, error: contactError }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$shop$2f$shopApi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSubmitContactFormMutation"])();
    // === Callbacks ===
    const follow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>followShop(shopId), [
        followShop,
        shopId
    ]);
    const unfollow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>unfollowShop(shopId), [
        unfollowShop,
        shopId
    ]);
    const loadReviews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((params)=>lazyGetReviews({
            shopId,
            queryParams: params
        }), [
        lazyGetReviews,
        shopId
    ]);
    const submitReviewToShop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((reviewData)=>submitReview({
            shopId,
            reviewData
        }), [
        submitReview,
        shopId
    ]);
    const contactShop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((formData)=>submitContactForm({
            shopId,
            formData
        }), [
        submitContactForm,
        shopId
    ]);
    return {
        // Shop details
        shopData,
        isDetailsLoading,
        isDetailsFetching,
        detailsError,
        refetchDetails,
        // Shops list
        shopsList,
        isListLoading,
        listError,
        refetchList,
        // Follow actions
        follow,
        unfollow,
        isFollowLoading,
        isUnfollowLoading,
        followError,
        unfollowError,
        // Reviews data & actions
        reviewsData,
        lazyReviewsData,
        isReviewsLoading,
        isReviewsFetching,
        reviewsError,
        isLazyReviewsFetching,
        lazyReviewsError,
        refetchReviews,
        loadReviews,
        // Submit review & contact
        submitReviewToShop,
        isSubmitReviewLoading,
        submitReviewError,
        contactShop,
        isContactLoading,
        contactError
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
"[project]/acadevault-client/src/hooks/useFAQChatbot.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useFAQChatbot": (()=>useFAQChatbot)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$faqs$2f$fetchFAQs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/faqs/fetchFAQs.js [app-ssr] (ecmascript)");
;
;
function useFAQChatbot({ faqs, fallbackFAQs = [], aiFallback, responseDelay = 500, fuzzyMatch = false }) {
    // Choose the authoritative source: resource-specific or global fallback
    const activeFAQs = faqs.length ? faqs : fallbackFAQs;
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto‑scroll on new messages or typing indicator
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const c = containerRef.current;
        if (c) c.scrollTop = c.scrollHeight;
    }, [
        messages,
        isTyping
    ]);
    const sendQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text)=>{
        const question = text.trim();
        if (!question) return;
        // 1) Append the user’s question
        setMessages((prev)=>[
                ...prev,
                {
                    type: "user",
                    text: question
                }
            ]);
        setIsTyping(true);
        // 2) Try exact match
        const direct = activeFAQs.find((f)=>f.question.toLowerCase().includes(question.toLowerCase()));
        let answer;
        if (direct) {
            // Exact FAQ found
            answer = direct.answer;
        } else if (aiFallback) {
            // Ask your AI service
            try {
                answer = await aiFallback(question);
            } catch (err) {
                console.error("AI fallback failure:", err);
                answer = "Sorry, I’m having trouble right now. Please try again later.";
            }
        } else if (fuzzyMatch && activeFAQs.length) {
            // Use Fuse.js fuzzy matching
            answer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$faqs$2f$fetchFAQs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuzzyAnswer"])(question, activeFAQs);
        } else if (!activeFAQs.length) {
            // No FAQs at all
            answer = "No FAQs are available for this resource.";
        } else {
            // No match
            answer = "I couldn’t find a matching FAQ. Please try rephrasing your question.";
        }
        // 3) Simulate typing delay, then append bot response
        setTimeout(()=>{
            setMessages((prev)=>[
                    ...prev,
                    {
                        type: "bot",
                        text: answer
                    }
                ]);
            setIsTyping(false);
        }, responseDelay);
    }, [
        activeFAQs,
        aiFallback,
        responseDelay,
        fuzzyMatch
    ]);
    return {
        messages,
        isTyping,
        containerRef,
        sendQuestion,
        activeFAQs
    };
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
"[project]/acadevault-client/src/utils/cleanDescription.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Cleans and normalizes a shop's description by removing redundant shop name prefixes
 * and making sure the sentence starts smoothly.
 *
 * @param {string} description - The original raw description.
 * @param {string} shopName - The name of the shop to remove if prefixed.
 * @returns {string} A cleaned, user-friendly version of the description.
 */ __turbopack_context__.s({
    "cleanDescription": (()=>cleanDescription)
});
function cleanDescription(description, shopName) {
    // Step 1: Remove leading/trailing whitespace from the original description
    const trimmed = description.trim();
    // Step 2: Build a case-insensitive regex to match the shop name at the beginning,
    // followed optionally by spaces, colons, hyphens, or dashes (e.g., "ShopName -", "ShopName: ")
    const regex = new RegExp(`^${shopName}[\\s:\\-—]*`, "i");
    // Step 3: Remove the matched shop name prefix and trim any leftover whitespace
    const withoutName = trimmed.replace(regex, "").trim();
    // Step 4: Detect if the cleaned description starts abruptly with a verb
    const startsWithVerb = /^(offers|provides|delivers|features|sells|shares)/i.test(withoutName);
    // Step 5: If it starts with a verb, prepend it with "This shop" to make it smoother
    if (startsWithVerb) {
        return "This shop " + withoutName.charAt(0).toLowerCase() + withoutName.slice(1);
    }
    // Step 6: Otherwise, return the cleaned description as-is
    return withoutName;
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
"[project]/acadevault-client/src/data/quickLinksGroupData.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "quickLinksGroupData": (()=>quickLinksGroupData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-ssr] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/log-in.js [app-ssr] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>");
;
;
const quickLinksGroupData = [
    {
        title: "Discover",
        key: "discover",
        links: [
            {
                href: "/materials",
                label: "Browse Materials",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                    className: "w-5 h-5 text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 22,
                    columnNumber: 15
                }, this),
                description: "Explore academic resources",
                show: ()=>true
            },
            {
                href: "/reviews",
                label: "Read Reviews",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: "w-5 h-5 text-yellow-500"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 29,
                    columnNumber: 15
                }, this),
                description: "See what others say about materials",
                show: ()=>true
            },
            {
                href: "/categories",
                label: "Explore Departments",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                    className: "w-5 h-5 text-green-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 36,
                    columnNumber: 15
                }, this),
                description: "Find resources by department",
                show: ()=>true
            }
        ]
    },
    {
        title: "Engage",
        key: "engage",
        links: [
            {
                href: "/materials/upload",
                label: "Upload Material",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                    className: "w-5 h-5 text-purple-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 49,
                    columnNumber: 15
                }, this),
                description: "Share your academic content",
                show: (user, isAuthenticated)=>isAuthenticated && (user?.role === "Seller" || user?.role === "Admin")
            },
            {
                href: "/contact",
                label: "Contact Support",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    className: "w-5 h-5 text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 58,
                    columnNumber: 15
                }, this),
                description: "Get help from our team",
                show: ()=>true
            },
            {
                href: "/dashboard",
                label: "My Dashboard",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                    className: "w-5 h-5 text-teal-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 65,
                    columnNumber: 15
                }, this),
                description: "Manage your account and materials",
                show: (user, isAuthenticated)=>isAuthenticated
            }
        ]
    },
    {
        title: "Account",
        key: "account",
        links: [
            {
                href: "/profile",
                label: "My Profile",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "w-5 h-5 text-indigo-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 78,
                    columnNumber: 15
                }, this),
                description: "Update your profile details",
                show: (user, isAuthenticated)=>isAuthenticated
            },
            {
                href: "/subscriptions",
                label: "Manage Subscription",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                    className: "w-5 h-5 text-green-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 85,
                    columnNumber: 15
                }, this),
                description: "View or upgrade your plan",
                show: (user, isAuthenticated)=>isAuthenticated && user?.role === "Seller"
            },
            {
                href: "/login",
                label: "Log In",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                    className: "w-5 h-5 text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 93,
                    columnNumber: 15
                }, this),
                description: "Access your account",
                show: (user, isAuthenticated)=>!isAuthenticated
            },
            {
                href: "/signup",
                label: "Sign Up",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                    className: "w-5 h-5 text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 100,
                    columnNumber: 15
                }, this),
                description: "Join the Acadavault community",
                show: (user, isAuthenticated)=>!isAuthenticated
            }
        ]
    },
    {
        title: "Learn More",
        key: "learn-more",
        links: [
            {
                href: "/about",
                label: "About Us",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                    className: "w-5 h-5 text-blue-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 113,
                    columnNumber: 15
                }, this),
                description: "Learn about Acadavault’s mission",
                show: ()=>true
            },
            {
                href: "/security",
                label: "Security",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                    className: "w-5 h-5 text-red-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 120,
                    columnNumber: 15
                }, this),
                description: "Understand our security measures",
                show: ()=>true
            },
            {
                href: "/faq",
                label: "FAQs",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                    className: "w-5 h-5 text-purple-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/data/quickLinksGroupData.js",
                    lineNumber: 127,
                    columnNumber: 15
                }, this),
                description: "Find answers to common questions",
                show: ()=>true
            }
        ]
    }
];
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
"[project]/acadevault-client/src/data/globalFAQs.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"question\":\"How do I reset my password?\",\"answer\":\"Click “Forgot password” on the login screen and follow the instructions emailed to you.\"},{\"question\":\"Where can I find academic materials?\",\"answer\":\"Navigate to Materials → Browse to search by subject, rating, or tags.\"},{\"question\":\"How do I contact a shop owner?\",\"answer\":\"Visit the shop’s page and click “Chat on WhatsApp” or use the contact form at the bottom.\"},{\"question\":\"Can I request a new feature?\",\"answer\":\"Yes—drop us a line at support@acadevault.com or use the Feedback link in your profile menu.\"},{\"question\":\"What payment methods do you accept?\",\"answer\":\"We accept bank transfers, credit/debit cards, and mobile payments. Specific options may vary per vendor.\"},{\"question\":\"How can I track my order?\",\"answer\":\"Once your order is shipped, you'll receive a tracking ID via email or SMS. You can track it on our Order Tracking page.\"},{\"question\":\"Can I return or exchange items?\",\"answer\":\"Yes, items can be returned or exchanged within 7 days if they are in good condition. Check the shop’s return policy for specific details.\"},{\"question\":\"Do you offer student discounts?\",\"answer\":\"Some shops offer student discounts. Please check the product page or contact the shop directly for eligibility.\"},{\"question\":\"How do I contact customer support?\",\"answer\":\"You can reach us through the Contact Us page or by messaging the shop directly from their profile.\"},{\"question\":\"How do I become a vendor on AcadeVault?\",\"answer\":\"Click on 'Become a Vendor' in the footer or vendor dashboard and complete the registration form. You'll be contacted for verification.\"},{\"question\":\"What kind of materials can I sell?\",\"answer\":\"Vendors can upload academic notes, past questions, research papers, eBooks, tutorials, and more—provided they meet our content guidelines.\"},{\"question\":\"How are vendor earnings paid out?\",\"answer\":\"Payouts are processed weekly or monthly based on your preference, via bank transfer. Ensure your bank details are updated in your profile.\"},{\"question\":\"Is there a commission fee for vendors?\",\"answer\":\"Yes, a small commission is deducted per sale to cover platform fees. Check the vendor dashboard for current rates.\"},{\"question\":\"How can I promote my shop or materials?\",\"answer\":\"Use the Ads & Promotions section in your vendor dashboard to boost your listings or appear on featured sections.\"},{\"question\":\"Can I offer discounts or bundles?\",\"answer\":\"Yes, you can create discount coupons or package deals via the Marketing tab in your vendor dashboard.\"},{\"question\":\"How can I respond to customer messages?\",\"answer\":\"Use the built-in messaging system to reply to inquiries in real-time, or connect your WhatsApp number for direct contact.\"},{\"question\":\"Can I upload materials in bulk?\",\"answer\":\"Yes, we support bulk upload via CSV and ZIP file uploads. Check the Bulk Upload section in the dashboard for instructions.\"}]"));}}),
"[project]/acadevault-client/src/lib/faqs/fetchFAQs.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchFAQs": (()=>fetchFAQs),
    "fuzzyAnswer": (()=>fuzzyAnswer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$globalFAQs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/data/globalFAQs.json (json)"); // ensure this is JSON
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fuse$2e$js$40$7$2e$1$2e$0$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/fuse.js@7.1.0/node_modules/fuse.js/dist/fuse.mjs [app-ssr] (ecmascript)");
;
;
const BASE = ("TURBOPACK compile-time value", "http://localhost:9000") || ""; // e.g. "https://acadevault.com"
async function fetchFAQs(resourceType, resourceId) {
    try {
        const res = await fetch(`${BASE}/api/faqs/${resourceType}/${resourceId}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        if (!Array.isArray(json.faqs)) {
            throw new Error("Bad shape");
        }
        // ensure items have question+answer
        return json.faqs.filter((f)=>f && typeof f.question === "string" && typeof f.answer === "string");
    } catch (err) {
        console.warn(`[fetchFAQs] shop/${resourceId} failed, using fallback:`, err);
        // static fallback
        return Array.isArray(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$globalFAQs$2e$json__$28$json$29$__["default"]) ? __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$globalFAQs$2e$json__$28$json$29$__["default"].filter((f)=>f && typeof f.question === "string" && typeof f.answer === "string") : [];
    }
}
function fuzzyAnswer(question, faqs) {
    if (!faqs.length) {
        return "No FAQs available at the moment.";
    }
    const fuse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fuse$2e$js$40$7$2e$1$2e$0$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](faqs, {
        keys: [
            "question"
        ],
        threshold: 0.4
    });
    const r = fuse.search(question);
    return r.length ? r[0].item.answer : "I couldn’t find a matching FAQ.";
}
}}),
"[project]/acadevault-client/src/constants/sortOptions.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_SORT_OPTIONS": (()=>DEFAULT_SORT_OPTIONS)
});
const DEFAULT_SORT_OPTIONS = [
    {
        value: "-createdAt",
        label: "Newest"
    },
    {
        value: "createdAt",
        label: "Oldest"
    },
    {
        value: "-views",
        label: "Most Viewed"
    },
    {
        value: "price",
        label: "Price: Low to High"
    },
    {
        value: "-price",
        label: "Price: High to Low"
    },
    {
        value: "-averageRating",
        label: "Top Rated"
    }
];
}}),

};

//# sourceMappingURL=acadevault-client_src_58caea35._.js.map