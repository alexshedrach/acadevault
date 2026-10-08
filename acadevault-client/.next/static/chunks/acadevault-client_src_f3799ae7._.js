(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/acadevault-client/src/components/common/HelpSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const HelpSection = ({ title = "Need Academic Help?", description = "Struggling to find your approved topic or completed project? Hire a writer today or chat with us for instant support.", whatsapp = {
    number: "+2348146870361",
    link: "https://wa.me/2348146870361"
}, downloadCta = "Hire a Writer", chatCta = "Talk to Support", projectLinks = [], showWhatsAppStatus = false, showChatWidget = true })=>{
    _s();
    // 🔍 Track when HelpSection is viewed (replace with your analytics)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HelpSection.useEffect": ()=>{
            console.log("[HelpSection] rendered");
        }
    }["HelpSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "help-section-title",
        className: "relative isolate overflow-hidden rounded-xl border border-orange-200 bg-orange-50 px-6 py-10 shadow-inner",
        children: [
            showWhatsAppStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative flex h-3 w-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex h-3 w-3 rounded-full bg-green-500"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-gray-700",
                        children: "Support is online"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-2xl text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "help-section-title",
                        className: "mb-2 text-2xl font-bold text-orange-600",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base leading-relaxed text-gray-700 sm:text-lg",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex flex-wrap items-center justify-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                href: whatsapp.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                className: "inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
                                "aria-label": "Talk to support on WhatsApp",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    chatCta
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/hire-writer",
                                passHref: true,
                                legacyBehavior: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: "inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                    "aria-label": "Hire a writer for project assistance",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        downloadCta
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    projectLinks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-2 text-sm text-gray-800",
                        children: projectLinks.map((link, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    link.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "font-medium text-blue-600 hover:underline",
                                        children: link.label
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-sm text-gray-600",
                        children: [
                            "📞 Call or WhatsApp:",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `tel:${whatsapp.number}`,
                                className: "font-semibold text-blue-600 hover:underline",
                                children: whatsapp.number
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            showChatWidget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Chat support available"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/HelpSection.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
_s(HelpSection, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = HelpSection;
const __TURBOPACK__default__export__ = HelpSection;
var _c;
__turbopack_context__.k.register(_c, "HelpSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/useCategoryDetails.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useCategoryDetails": (()=>useCategoryDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/category/categoryApi.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useCategoryDetails(categoryIdOrSlug, params = {}) {
    _s();
    const { data: category, isLoading, isFetching, isError, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCategoryByIdQuery"])({
        categoryId: categoryIdOrSlug,
        params
    }, {
        skip: !categoryIdOrSlug
    });
    return {
        category,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        // Extracted normalized fields
        materials: category?.materials || [],
        subcategories: category?.subcategories || [],
        totalViews: category?.totalViews ?? 0,
        totalDownloads: category?.totalDownloads ?? 0,
        averageRating: category?.averageRating ?? 0,
        newMaterialsCount: category?.newMaterialsCount ?? 0,
        // Utility
        hasContent: (category?.materials?.length ?? 0) > 0 || (category?.subcategories?.length ?? 0) > 0
    };
}
_s(useCategoryDetails, "/FRMuu/cwHbp1zgiD9r0Rvd0MCs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$category$2f$categoryApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCategoryByIdQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DepartmentBreadcrumbs = ({ departmentDetail, slug, className = "", separatorColor = "text-gray-400", textColor = "text-gray-600", activeColor = "text-gray-900", hoverColor = "hover:text-blue-600", size = "sm", ariaLabel = "Department Breadcrumb" })=>{
    _s();
    const handleBreadcrumbClick = (label)=>{
        try {
            trackEvent({
                category: "Breadcrumbs",
                action: "Click",
                label
            });
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
        }
    };
    // Capitalize the first letter of each word in a string
    const capitalize = (str)=>str.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const breadcrumbItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DepartmentBreadcrumbs.useMemo[breadcrumbItems]": ()=>{
            const items = [
                {
                    label: "Home",
                    href: "/"
                },
                {
                    label: "Categories",
                    href: "#"
                },
                {
                    label: "Departments",
                    href: "/departments"
                }
            ];
            // Add parent category if available
            if (departmentDetail?.parent?.name && departmentDetail?.parent?.slug) {
                items.push({
                    label: capitalize(departmentDetail.parent.name),
                    href: `/departments/${departmentDetail.parent.slug}`
                });
            }
            // Add current department
            const departmentLabel = departmentDetail?.name ? capitalize(departmentDetail.name) : capitalize(decodeURIComponent(slug).replace(/-/g, " "));
            items.push({
                label: departmentLabel,
                isCurrentPage: true
            });
            return items;
        }
    }["DepartmentBreadcrumbs.useMemo[breadcrumbItems]"], [
        departmentDetail,
        slug
    ]);
    // Determine text size classes
    const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mx-auto px-4 sm:px-6 md:px-8 py-4 bg-gray-100 ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            "aria-label": ariaLabel,
            className: "flex items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "flex flex-wrap items-center gap-2",
                children: breadcrumbItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center gap-2",
                        children: [
                            item.isCurrentPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${textSize} ${activeColor} font-medium`,
                                "aria-current": "page",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
                                lineNumber: 86,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                onClick: ()=>handleBreadcrumbClick(item.label),
                                className: `${textSize} ${textColor} ${hoverColor} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`,
                                "aria-label": `Navigate to ${item.label}`,
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
                                lineNumber: 93,
                                columnNumber: 17
                            }, this),
                            index < breadcrumbItems.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: `w-4 h-4 ${separatorColor}`,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
                                lineNumber: 103,
                                columnNumber: 17
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
};
_s(DepartmentBreadcrumbs, "HAr+ErSODKPZlOrdiM+wjEw6xrI=");
_c = DepartmentBreadcrumbs;
const __TURBOPACK__default__export__ = DepartmentBreadcrumbs;
var _c;
__turbopack_context__.k.register(_c, "DepartmentBreadcrumbs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentBreadcrumbs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/DepartmentBreadcrumbs.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
"use client";
;
;
;
;
;
function DepartmentDetailHero({ departmentDetail, departmentSlug }) {
    const departmentName = departmentDetail?.name || departmentSlug.replace(/-/g, " ") || "Department";
    const departmentDescription = departmentDetail?.description || "Explore high-quality academic resources curated for your department.";
    const parentCategory = departmentDetail?.parent?.name || "Academic Resources";
    const backgroundImage = departmentDetail?.image || "/images/departments-banner.jpg";
    const handleCTAClick = (label)=>{
        try {
            trackEvent({
                category: "DepartmentHero",
                action: "CTA_Click",
                label
            });
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16",
                style: {
                    backgroundImage: ("TURBOPACK compile-time truthy", 1) ? `url(${backgroundImage})` : ("TURBOPACK unreachable", undefined),
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat"
                },
                role: "banner",
                "aria-label": `${departmentName} Department Hero`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-600/30 to-indigo-800",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 text-left container mx-auto px-6 sm:px-12 md:px-20 max-w-5xl relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl sm:text-5xl font-bold leading-tight flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        className: "w-10 h-10"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    departmentName,
                                    " Department"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl sm:text-2xl font-medium max-w-3xl",
                                children: [
                                    "Discover curated resources for ",
                                    departmentName,
                                    " to fuel your academic success."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base sm:text-lg text-gray-100 max-w-3xl",
                                children: departmentDescription
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            departmentDetail?.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-6 text-sm sm:text-base",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            departmentDetail.data.totalMaterials,
                                            " Materials"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Star, {
                                                className: "w-5 h-5 text-yellow-400"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this),
                                            departmentDetail.data.averageRating || "N/A",
                                            " Rating"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Download, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this),
                                            departmentDetail.data.totalViews,
                                            " Views"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/materials/upload",
                                        onClick: ()=>handleCTAClick("Upload Material"),
                                        className: "inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        "aria-label": "Upload your academic material",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this),
                                            "Upload Your Material"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/materials?category=${departmentSlug}`,
                                        onClick: ()=>handleCTAClick("Browse Materials"),
                                        className: "inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        "aria-label": `Browse materials for ${departmentName}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            "Browse Materials"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentBreadcrumbs$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                departmentDetail: departmentDetail,
                slug: departmentSlug,
                className: "max-w-7xl",
                size: "md"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = DepartmentDetailHero;
const __TURBOPACK__default__export__ = DepartmentDetailHero;
var _c;
__turbopack_context__.k.register(_c, "DepartmentDetailHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
const SubcategoriesSection = ({ subcategories })=>{
    if (!subcategories || subcategories.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-semibold text-gray-800",
                    children: "Subcategories"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: subcategories.map((subcategory)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/departments/${subcategory.slug}`,
                            className: "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold",
                                    children: subcategory.name
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: subcategory.description
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, subcategory._id, true, {
                            fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
                            lineNumber: 12,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = SubcategoriesSection;
const __TURBOPACK__default__export__ = SubcategoriesSection;
var _c;
__turbopack_context__.k.register(_c, "SubcategoriesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const DepartmentInsightsSection = ({ stats, className = "", departmentSlug })=>{
    // Format large numbers (e.g., 1200 -> 1.2K)
    const formatNumber = (num)=>{
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num || 0;
    };
    // Format rating as stars
    const formatRating = (rating)=>{
        if (!rating || isNaN(rating)) return "N/A";
        const stars = Math.round(rating);
        return "★".repeat(stars) + "☆".repeat(5 - stars);
    };
    // Handle stat card click for analytics
    const handleStatClick = (metric)=>{
        try {
            trackEvent({
                category: "DepartmentInsights",
                action: "Click",
                label: metric
            });
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
        }
    };
    // Define insight cards with icons and tooltips
    const insights = [
        {
            label: "Materials Available",
            value: formatNumber(stats?.totalMaterials),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                className: "w-6 h-6 text-blue-600"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            tooltip: "Number of academic materials in this department",
            metric: "Materials"
        },
        {
            label: "Total Views",
            value: formatNumber(stats?.totalViews),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                className: "w-6 h-6 text-green-600"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            tooltip: "Total views of materials in this department",
            metric: "Views"
        },
        {
            label: "Total Downloads",
            value: formatNumber(stats?.totalDownloads),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "w-6 h-6 text-purple-600"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            tooltip: "Total downloads of materials in this department",
            metric: "Downloads"
        },
        {
            label: "Average Rating",
            value: formatRating(stats?.averageRating),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                className: "w-6 h-6 text-yellow-500"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                lineNumber: 73,
                columnNumber: 13
            }, this),
            tooltip: "Average user rating for materials",
            metric: "Rating"
        },
        {
            label: "New Materials",
            value: formatNumber(stats?.newMaterialsCount),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                className: "w-6 h-6 text-teal-600"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            tooltip: "Number of new materials added recently",
            metric: "NewMaterials"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `py-16 bg-gradient-to-b from-gray-50 to-white ${className}`,
        "aria-label": "Department Insights",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                    className: "w-8 h-8 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                "Department Insights"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        departmentSlug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/materials?category=${departmentSlug}`,
                            className: "text-blue-600 hover:underline text-base font-semibold",
                            onClick: ()=>handleStatClick("ExploreMaterials"),
                            "aria-label": "Explore all materials in this department",
                            children: "Explore All Materials"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6",
                    children: insights.map((insight, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer",
                            onClick: ()=>handleStatClick(insight.metric),
                            role: "button",
                            tabIndex: 0,
                            "aria-label": `View ${insight.label}: ${insight.value}`,
                            title: insight.tooltip,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center mb-4",
                                    children: insight.icon
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: insight.value
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: insight.label
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                !stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No insights available for this department."
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        departmentSlug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/materials/upload",
                            className: "text-blue-600 hover:underline mt-2 inline-block",
                            onClick: ()=>handleStatClick("UploadMaterial"),
                            children: "Be the first to contribute!"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                            lineNumber: 136,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
};
_c = DepartmentInsightsSection;
const __TURBOPACK__default__export__ = DepartmentInsightsSection;
var _c;
__turbopack_context__.k.register(_c, "DepartmentInsightsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetail.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DepartmentDetail)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useCategoryDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentDetailHero$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetailHero.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$category$2f$SubcategoriesSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/category/SubcategoriesSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentInsightsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/DepartmentInsightsSection.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function DepartmentDetail({ departmentSlug, departmentDetail }) {
    _s();
    // Client-side re-fetch of dynamic stats
    const { category: liveCategory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryDetails"])(departmentSlug);
    // Merge SSR + CSR data: prefer liveCategory fields, fall back to initial
    const category = liveCategory || departmentDetail;
    if (!category) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentDetailHero$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                departmentDetail: departmentDetail,
                departmentSlug: departmentSlug
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetail.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$category$2f$SubcategoriesSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                subcategories: departmentDetail?.subcategories || []
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetail.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$DepartmentInsightsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                stats: departmentDetail,
                departmentSlug: departmentSlug
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentDetail.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DepartmentDetail, "wJbSl/gSIrnB7swRkg31dUYbrRQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryDetails"]
    ];
});
_c = DepartmentDetail;
var _c;
__turbopack_context__.k.register(_c, "DepartmentDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/ui/AlertBox.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlertBox": (()=>AlertBox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/** Mapping variant → icon + base styles */ const VARIANT_CONFIG = {
    success: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            className: "h-5 w-5 text-green-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 18,
            columnNumber: 11
        }, this),
        bg: "bg-green-50",
        border: "border-green-400",
        text: "text-green-800"
    },
    error: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "h-5 w-5 text-red-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 24,
            columnNumber: 11
        }, this),
        bg: "bg-red-50",
        border: "border-red-400",
        text: "text-red-800"
    },
    warning: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "h-5 w-5 text-yellow-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 31,
            columnNumber: 7
        }, this),
        bg: "bg-yellow-50",
        border: "border-yellow-400",
        text: "text-yellow-800"
    },
    info: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            className: "h-5 w-5 text-blue-600",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 38,
            columnNumber: 11
        }, this),
        bg: "bg-blue-50",
        border: "border-blue-400",
        text: "text-blue-800"
    }
};
function AlertBox({ variant = "info", title, children, autoDismiss = false, duration = 5000, dismissible = true, onDismiss, onRetry, retryText = "Retry", compact = false, centered = false, className = "" }) {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const config = VARIANT_CONFIG[variant];
    // Auto-dismiss effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AlertBox.useEffect": ()=>{
            if (!autoDismiss) return;
            const timer = setTimeout({
                "AlertBox.useEffect.timer": ()=>{
                    setVisible(false);
                    onDismiss?.();
                }
            }["AlertBox.useEffect.timer"], duration);
            return ({
                "AlertBox.useEffect": ()=>clearTimeout(timer)
            })["AlertBox.useEffect"];
        }
    }["AlertBox.useEffect"], [
        autoDismiss,
        duration,
        onDismiss
    ]);
    // If not visible, unmount
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            role: "alert",
            initial: {
                opacity: 0,
                y: 10
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -10
            },
            transition: {
                duration: 0.2
            },
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex items-start gap-3 rounded-md border p-4 shadow-sm", config.bg, config.border, config.text, centered && "justify-center text-center", compact && "p-2 text-sm", className),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0", centered && "mx-auto"),
                    children: config.icon
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        title && !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 113,
                            columnNumber: 35
                        }, this),
                        children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: compact ? "mt-1" : "mt-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this) : null,
                        onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onRetry,
                            className: "mt-2 inline-flex items-center text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "w-4 h-4 mr-1",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this),
                                retryText
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this),
                dismissible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": "Dismiss alert",
                    onClick: ()=>{
                        setVisible(false);
                        onDismiss?.();
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-2 right-2 inline-flex p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2", config.text, config.bg.replace("-50", "-100")),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-4 h-4",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                        lineNumber: 146,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
                    lineNumber: 133,
                    columnNumber: 13
                }, this)
            ]
        }, "alert", true, {
            fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
            lineNumber: 89,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/AlertBox.jsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
} // "use client";
 // import { useEffect, useState } from "react";
 // import { motion, AnimatePresence } from "framer-motion";
 // import {
 //   CheckCircle,
 //   XCircle,
 //   Info,
 //   AlertTriangle,
 //   AlertCircle,
 //   RotateCcw,
 //   X,
 // } from "lucide-react";
 // import cn from "cn";
 // const STATUS_CONFIG = {
 //   success: {
 //     icon: <CheckCircle className="h-5 w-5 text-green-600" />,
 //     bg: "bg-green-100",
 //     text: "text-green-800",
 //     border: "border-green-200",
 //   },
 //   error: {
 //     icon: <XCircle className="h-5 w-5 text-red-600" />,
 //     bg: "bg-red-50",
 //     text: "text-red-800",
 //     border: "border-red-200",
 //   },
 //   warning: {
 //     icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
 //     bg: "bg-yellow-50",
 //     text: "text-yellow-800",
 //     border: "border-yellow-200",
 //   },
 //   info: {
 //     icon: <Info className="h-5 w-5 text-blue-600" />,
 //     bg: "bg-blue-50",
 //     text: "text-blue-800",
 //     border: "border-blue-200",
 //   },
 // };
 // export default function AlertBox({
 //   status = "info", // "success" | "error" | "warning" | "info"
 //   title, // Optional
 //   message = "Something happened.",
 //   autoDismiss = false,
 //   duration = 3000,
 //   onDismiss,
 //   onRetry,
 //   showRetry = false,
 //   showDismiss = true,
 //   compact = false,
 //   center = false,
 //   className = "",
 // }) {
 //   const [visible, setVisible] = useState(true);
 //   const config = STATUS_CONFIG[status] || STATUS_CONFIG.info;
 //   useEffect(() => {
 //     if (autoDismiss) {
 //       const timeout = setTimeout(() => {
 //         setVisible(false);
 //         onDismiss?.();
 //       }, duration);
 //       return () => clearTimeout(timeout);
 //     }
 //   }, [autoDismiss, duration, onDismiss]);
 //   if (!visible) return null;
 //   return (
 //     <AnimatePresence>
 //       {visible && (
 //         <motion.div
 //           key="alert"
 //           initial={{ opacity: 0, y: 10 }}
 //           animate={{ opacity: 1, y: 0 }}
 //           exit={{ opacity: 0, y: -10 }}
 //           transition={{ duration: 0.25 }}
 //           role="alert"
 //           className={cn(
 //             "relative flex items-start gap-3 rounded-md border p-4 shadow-sm",
 //             config.bg,
 //             config.text,
 //             config.border,
 //             center && "justify-center text-center",
 //             compact && "p-2 text-sm",
 //             className
 //           )}
 //         >
 //           <div className="shrink-0 mt-1">{config.icon}</div>
 //           <div className="flex-1">
 //             {!compact && title && <div className="font-semibold">{title}</div>}
 //             <div>{message}</div>
 //             {showRetry && onRetry && (
 //               <button
 //                 onClick={onRetry}
 //                 className="mt-2 inline-flex items-center text-sm font-medium hover:underline"
 //               >
 //                 <RotateCcw className="w-4 h-4 mr-1" />
 //                 Retry
 //               </button>
 //             )}
 //           </div>
 //           {showDismiss && (
 //             <button
 //               onClick={() => {
 //                 setVisible(false);
 //                 onDismiss?.();
 //               }}
 //               className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
 //               aria-label="Dismiss alert"
 //             >
 //               <X className="w-4 h-4" />
 //             </button>
 //           )}
 //         </motion.div>
 //       )}
 //     </AnimatePresence>
 //   );
 // }
_s(AlertBox, "+l2LUTlfMHnsWfc+O34BMiR0NHk=");
_c = AlertBox;
var _c;
__turbopack_context__.k.register(_c, "AlertBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$ErrorState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/states/ErrorState.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/states/EmptyState.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$LoadingState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/states/LoadingState.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$AlertBox$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/AlertBox.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/Button.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const normalizeError = (error)=>{
    if (!error) return "Something went wrong.";
    if (typeof error === "string") return error;
    if (typeof error === "object") {
        if ("message" in error && typeof error.message === "string") return error.message;
        if ("data" in error && typeof error.data === "object" && "message" in error.data) return error.data.message;
    }
    return "Unexpected error occurred.";
};
/**
 * A professional, production-grade async state handler that leverages
 * the standardized LoadingState, ErrorState, EmptyState, and AlertBox components.
 */ const AsyncStateHandler = ({ loading, error, onRetry, loaderText = "Loading...", errorMessage, useAlertBoxForError = false, alertBoxProps = {}, showEmptyState = false, isEmpty = false, emptyTitle = "No content available", emptyMessage = "We couldn't find any items to display.", emptyIcon, centered = false, className = "", children })=>{
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$LoadingState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            message: loaderText,
            alignment: centered ? "center" : "left",
            className: className
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    if (error) {
        const normalizedError = errorMessage || normalizeError(error);
        if (useAlertBoxForError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$AlertBox$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertBox"], {
                variant: "error",
                title: "Error loading content",
                onRetry: onRetry,
                retryText: "Retry",
                dismissible: true,
                className: className,
                ...alertBoxProps,
                children: normalizedError
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx",
                lineNumber: 64,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$ErrorState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Error loading content",
            message: normalizedError,
            action: onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onRetry,
                variant: "outline",
                size: "sm",
                "aria-label": "Retry loading",
                children: "Retry"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx",
                lineNumber: 84,
                columnNumber: 13
            }, void 0),
            className: className
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx",
            lineNumber: 79,
            columnNumber: 7
        }, this);
    }
    if (showEmptyState && isEmpty) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: emptyTitle,
            message: emptyMessage,
            icon: emptyIcon,
            alignment: centered ? "center" : "left",
            className: className
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx",
            lineNumber: 101,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};
_c = AsyncStateHandler;
const __TURBOPACK__default__export__ = AsyncStateHandler;
// USAGE
// 1. Standard usage (fallback to ErrorState)
{}// 2. Use AlertBox instead of ErrorState
{} // import React from "react";
 // import ErrorState from "../states/ErrorState";
 // import EmptyState from "../states/EmptyState";
 // import LoadingState from "../states/LoadingState";
 // const normalizeError = (error) => {
 //   if (!error) return "Something went wrong.";
 //   if (typeof error === "string") return error;
 //   if (typeof error === "object") {
 //     if (error.message) return error.message;
 //     if (error.data?.message) return error.data.message;
 //   }
 //   return "Unexpected error occurred.";
 // };
 // /**
 //  * A professional, production-grade async state handler that leverages
 //  * the standardized LoadingState, ErrorState, and EmptyState components.
 //  */
 // const AsyncStateHandler = ({
 //   loading,
 //   error,
 //   onRetry,
 //   children,
 //   loaderText = "Loading...",
 //   errorMessage,
 //   showEmptyState = false,
 //   isEmpty = false,
 //   emptyTitle = "No content available",
 //   emptyMessage = "We couldn't find any items to display.",
 //   emptyIcon,
 //   centered = false,
 //   className = "",
 // }) => {
 //   if (loading) {
 //     return (
 //       <LoadingState
 //         message={loaderText}
 //         centered={centered}
 //         className={className}
 //       />
 //     );
 //   }
 //   if (error) {
 //     return (
 //       <ErrorState
 //         title="Error loading content"
 //         message={errorMessage || normalizeError(error)}
 //         action={
 //           onRetry ? (
 //             <button
 //               onClick={onRetry}
 //               className="btn btn-primary"
 //               aria-label="Retry loading"
 //             >
 //               Retry
 //             </button>
 //           ) : undefined
 //         }
 //         centered={centered}
 //         className={className}
 //       />
 //     );
 //   }
 //   if (showEmptyState && isEmpty) {
 //     return (
 //       <EmptyState
 //         title={emptyTitle}
 //         message={emptyMessage}
 //         icon={emptyIcon}
 //         centered={centered}
 //         className={className}
 //       />
 //     );
 //   }
 //   return <>{children}</>;
 // };
 // export default AsyncStateHandler;
 // import React from "react";
 // import { AlertTriangle } from "lucide-react";
 // import Loader from "../ui/Loader";
 // const normalizeError = (error) => {
 //   if (!error) return "Something went wrong.";
 //   if (typeof error === "string") return error;
 //   if (typeof error === "object" && error !== null) {
 //     if (error.message) return error.message;
 //     if (error.data?.message) return error.data.message;
 //   }
 //   return "Unexpected error occurred.";
 // };
 // /**
 //  * A reusable, accessible async state handler for loading/error UI.
 //  *
 //  * @param {boolean} loading - Whether the content is loading.
 //  * @param {any} error - Error state.
 //  * @param {Function} onRetry - Optional retry function.
 //  * @param {ReactNode} children - The content to render when not loading or errored.
 //  * @param {string} [errorMessage] - Custom error message.
 //  * @param {string} [loaderText] - Custom loader text.
 //  * @param {boolean} [centered] - Whether to center content vertically/horizontally.
 //  */
 // const AsyncStateHandler = ({
 //   loading,
 //   error,
 //   onRetry,
 //   children,
 //   errorMessage,
 //   loaderText = "Loading...",
 //   centered = false,
 // }) => {
 //   const wrapperClass = centered
 //     ? "flex flex-col items-center justify-center min-h-[60vh] w-full text-center px-4"
 //     : "w-full flex justify-center px-4 py-4";
 //   if (loading) {
 //     return (
 //       <div
 //         className={wrapperClass}
 //         role="status"
 //         aria-busy="true"
 //         aria-live="polite"
 //       >
 //         <Loader type="spinner" size="md" color="blue-600" text={loaderText} />
 //       </div>
 //     );
 //   }
 //   if (error) {
 //     const message = errorMessage || normalizeError(error);
 //     return (
 //       <div
 //         className={`${wrapperClass} text-gray-600 dark:text-gray-300`}
 //         role="alert"
 //         aria-live="assertive"
 //       >
 //         <AlertTriangle
 //           size={36}
 //           className="text-red-500 mb-3"
 //           aria-hidden="true"
 //         />
 //         <p className="mb-4 text-base font-medium">{message}</p>
 //         {onRetry && (
 //           <button
 //             type="button"
 //             onClick={onRetry}
 //             className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
 //             aria-label="Retry loading content"
 //           >
 //             Retry
 //           </button>
 //         )}
 //       </div>
 //     );
 //   }
 //   return <>{children}</>;
 // };
 // export default AsyncStateHandler;
var _c;
__turbopack_context__.k.register(_c, "AsyncStateHandler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/helpers/cleanParams.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * Remove undefined/null/empty-string/empty-array keys
 */ __turbopack_context__.s({
    "cleanParams": (()=>cleanParams)
});
const cleanParams = (params)=>{
    return Object.fromEntries(Object.entries(params).filter(([_, value])=>value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/helpers/parsePriceRange.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * parsePriceRange("10-50") → { "price[gte]": 10, "price[lte]": 50 }
 */ __turbopack_context__.s({
    "parsePriceRange": (()=>parsePriceRange)
});
const parsePriceRange = (range)=>{
    if (!range) return {};
    const [min, max] = range.split("-").map(Number);
    const filter = {};
    if (!isNaN(min)) filter["price[gte]"] = min;
    if (!isNaN(max)) filter["price[lte]"] = max;
    return filter;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/helpers/normalizeParams.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "normalizeParams": (()=>normalizeParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$cleanParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/helpers/cleanParams.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$parsePriceRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/helpers/parsePriceRange.js [app-client] (ecmascript)");
;
;
const normalizeParams = (params)=>{
    const normalized = {
        ...params
    };
    if (normalized.keyword) {
        normalized.search = normalized.keyword;
        delete normalized.keyword;
    }
    if (normalized.sortBy) {
        const [field, direction] = normalized.sortBy.split("-");
        normalized.sort = direction === "desc" ? `-${field}` : field;
        delete normalized.sortBy;
    }
    if (normalized.price) {
        Object.assign(normalized, (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$parsePriceRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePriceRange"])(normalized.price));
        delete normalized.price;
    }
    // Convert "false" → remove, "true" → keep
    [
        "isFree",
        "isFeatured",
        "isTrending"
    ].forEach((flag)=>{
        if (normalized[flag] === "false") delete normalized[flag];
        else if (normalized[flag]) normalized[flag] = "true";
    });
    // Convert array filters to comma-separated
    [
        "materialType",
        "department",
        "academicDegree",
        "deliveryFormat"
    ].forEach((key)=>{
        if (Array.isArray(normalized[key])) {
            normalized[key] = normalized[key].join(",");
        }
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$cleanParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanParams"])(normalized);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/materialHooks/useMaterialFilters.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useMaterialFilters": (()=>useMaterialFilters)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lodash$40$4$2e$17$2e$23$2f$node_modules$2f$lodash$2f$debounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lodash@4.17.23/node_modules/lodash/debounce.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/CurrencyContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$normalizeParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/helpers/normalizeParams.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function useMaterialFilters() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { currency } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyContext"]);
    // 1) Detect slugs from dynamic routes:
    //    a) /materials/category/[slug] → categorySlug
    //    b) /departments/[slug]          → departmentSlug
    const categorySlug = params?.slug && pathname.includes("/materials/category") ? params.slug : null;
    const departmentSlug = params?.slug && pathname.startsWith("/departments/") ? params.slug : null;
    // 2) Compute the base path for filter updates:
    //    - If on a department page, stay under /departments/[slug]
    //    - Else if on a material-category page, use /materials/category/[slug]
    //    - Otherwise default to /materials
    const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[basePath]": ()=>{
            if (departmentSlug) {
                return `/departments/${encodeURIComponent(departmentSlug)}`;
            }
            if (categorySlug) {
                return `/materials/category/${encodeURIComponent(categorySlug)}`;
            }
            return "/materials";
        }
    }["useMaterialFilters.useMemo[basePath]"], [
        departmentSlug,
        categorySlug
    ]);
    // 3) Read raw query params from the URL
    const rawFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[rawFilters]": ()=>Object.fromEntries(searchParams.entries())
    }["useMaterialFilters.useMemo[rawFilters]"], [
        searchParams
    ]);
    // 4) Normalize for API use (arrays, numbers, booleans)
    const filters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[filters]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$normalizeParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeParams"])(rawFilters)
    }["useMaterialFilters.useMemo[filters]"], [
        rawFilters
    ]);
    // 5) Derive price range array if needed
    const priceRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[priceRange]": ()=>{
            if (!rawFilters.price) return [
                null,
                null
            ];
            const [min, max] = rawFilters.price.split("-").map(Number);
            return [
                isNaN(min) ? null : min,
                isNaN(max) ? null : max
            ];
        }
    }["useMaterialFilters.useMemo[priceRange]"], [
        rawFilters.price
    ]);
    // 6) (Optional) Build a debug query string
    const filterQueryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[filterQueryString]": ()=>new URLSearchParams(filters).toString()
    }["useMaterialFilters.useMemo[filterQueryString]"], [
        filters
    ]);
    // 7) Compose final query params for your `useMaterials` / `fetch` calls
    const materialQueryParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[materialQueryParams]": ()=>({
                ...departmentSlug ? {
                    departmentSlug
                } : {},
                ...categorySlug ? {
                    categorySlug
                } : {},
                ...filters
            })
    }["useMaterialFilters.useMemo[materialQueryParams]"], [
        departmentSlug,
        categorySlug,
        filters
    ]);
    // 8) updateFilters: merge newFilters into rawFilters & push to URL
    const updateFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaterialFilters.useCallback[updateFilters]": (newFilters = {})=>{
            const merged = {
                ...rawFilters,
                ...newFilters
            };
            // Whenever user changes filters other than page, reset to page 1
            if (!("page" in newFilters)) {
                merged.page = 1;
            }
            // Strip out empty / null / undefined / empty-array values
            Object.entries(merged).forEach({
                "useMaterialFilters.useCallback[updateFilters]": ([k, v])=>{
                    if (v == null || v === "" || Array.isArray(v) && v.length === 0) {
                        delete merged[k];
                    }
                }
            }["useMaterialFilters.useCallback[updateFilters]"]);
            const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$normalizeParams$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeParams"])(merged);
            const qs = new URLSearchParams(normalized).toString();
            // ← pass { scroll: false } to preserve scroll position
            router.push(`${basePath}?${qs}`, {
                scroll: false
            });
        }
    }["useMaterialFilters.useCallback[updateFilters]"], [
        rawFilters,
        basePath,
        router
    ]);
    // 9) Debounced version for sliders, search boxes, etc.
    const debouncedUpdateFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaterialFilters.useMemo[debouncedUpdateFilters]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lodash$40$4$2e$17$2e$23$2f$node_modules$2f$lodash$2f$debounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(updateFilters, 300)
    }["useMaterialFilters.useMemo[debouncedUpdateFilters]"], [
        updateFilters
    ]);
    // 10) resetFilters: clear all and return to basePath
    const resetFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaterialFilters.useCallback[resetFilters]": ()=>{
            router.push(basePath, {
                scroll: false
            }); // ← scroll:false here too
        }
    }["useMaterialFilters.useCallback[resetFilters]"], [
        router,
        basePath
    ]);
    return {
        // Context identifiers
        categorySlug,
        departmentSlug,
        // Raw + normalized filters
        rawFilters,
        filters,
        priceRange,
        filterQueryString,
        // Routing helpers
        updateFilters,
        debouncedUpdateFilters,
        resetFilters,
        // For API hooks
        currency,
        materialQueryParams
    };
}
_s(useMaterialFilters, "+ykIU/0wp8JQ/N2YY+fAi7I7vBs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/materialHooks/useMaterials.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useMaterials": (()=>useMaterials)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/features/materials/academicMaterialsApi.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const useMaterials = (queryParams = {}, infiniteScroll = false, options = {})=>{
    _s();
    const { initialData = null, refetchOnMount = true } = options;
    // ── 1) Local pagination state ────────────────────────────────────────────
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(queryParams.page ? Number(queryParams.page) : initialData?.pagination?.currentPage || 1);
    // ── 2) Local materials array (seed with initialData if provided) ────────
    const [materials, setMaterials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialData?.materials || []);
    // ── 3) Local pagination info state (seed if provided) ───────────────────
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialData?.pagination || {
        totalPages: 1,
        currentPage: page,
        totalResults: initialData?.materials?.length || 0
    });
    // ── 4) Determine if there's more data ───────────────────────────────────
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMaterials.useState": ()=>{
            if (initialData?.pagination) {
                return initialData.pagination.currentPage < initialData.pagination.totalPages;
            }
            // default to true until we know otherwise
            return true;
        }
    }["useMaterials.useState"]);
    // ── 5) Fire RTK Query with mount behavior controlled by options ──────────
    const { data: materialsData, error: materialsError, isLoading: materialsLoading, isFetching: isMaterialsFetching, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetMaterialsQuery"])({
        ...queryParams,
        page
    }, {
        // if initialData exists and refetchOnMount is false, skip the first fetch
        refetchOnMountOrArgChange: refetchOnMount
    });
    // ── 6) Sync page if queryParams.page changes externally ─────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMaterials.useEffect": ()=>{
            if (queryParams.page && Number(queryParams.page) !== page) {
                setPage(Number(queryParams.page));
            }
        }
    }["useMaterials.useEffect"], [
        queryParams.page,
        page
    ]);
    // ── 7) When RTK returns new data, update local state ────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMaterials.useEffect": ()=>{
            // No data yet (e.g. first render with initialData and refetchOnMount=false)
            if (!materialsData) return;
            const newMaterials = materialsData.materials || [];
            const meta = materialsData.pagination || materialsData.metadata || {};
            // Update pagination state
            setPagination({
                totalPages: meta.totalPages || pagination.totalPages,
                currentPage: meta.currentPage || page,
                totalResults: meta.totalResults ?? pagination.totalResults
            });
            if (infiniteScroll) {
                // Append pages in infinite scroll mode
                setMaterials({
                    "useMaterials.useEffect": (prev)=>page === 1 ? newMaterials : [
                            ...prev,
                            ...newMaterials
                        ]
                }["useMaterials.useEffect"]);
                setHasMore((meta.currentPage || page) < (meta.totalPages || 1));
            } else {
                // Replace materials array
                setMaterials(newMaterials);
                setHasMore((meta.currentPage || page) < (meta.totalPages || 1));
            // Scroll-to-top handled by parent if desired
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useMaterials.useEffect"], [
        materialsData,
        page,
        infiniteScroll
    ]);
    // ── 8) Manual pagination setter ─────────────────────────────────────────
    const setManualPage = (newPage)=>{
        setPage(newPage);
        if (!infiniteScroll) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };
    // ── 9) Load next page (for infinite scrolling) ──────────────────────────
    const fetchNextPage = ()=>{
        if (hasMore && !isMaterialsFetching) {
            setPage((prev)=>prev + 1);
        }
    };
    return {
        materials,
        pagination,
        materialsLoading,
        isMaterialsFetching,
        materialsError,
        currentPage: page,
        setPage: setManualPage,
        refetch,
        hasMore,
        fetchNextPage,
        isFetchingNextPage: isMaterialsFetching && page > 1
    };
};
_s(useMaterials, "9pXHuvvvZjPorG/uQ4AHsZnbPbI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$features$2f$materials$2f$academicMaterialsApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetMaterialsQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PriceRangeSlider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$7$2e$3$2e$9_$40$emotio_5efc65b7a21bb615fd4ee8d4bf58b896$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@7.3.9_@emotio_5efc65b7a21bb615fd4ee8d4bf58b896/node_modules/@mui/material/esm/Slider/Slider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CURRENCY_SYMBOLS = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
    CAD: "CA$",
    INR: "₹"
};
function PriceRangeSlider({ value = [
    0,
    10000
], min = 0, max = 10000, loading = false, onChange = ()=>{}, onApply = ()=>{}, onReset = ()=>{}, currency = "USD" }) {
    _s();
    const [tempRange, setTempRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const currencySymbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PriceRangeSlider.useMemo[currencySymbol]": ()=>CURRENCY_SYMBOLS[currency] || currency
    }["PriceRangeSlider.useMemo[currencySymbol]"], [
        currency
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PriceRangeSlider.useEffect": ()=>{
            setTempRange(value);
        }
    }["PriceRangeSlider.useEffect"], [
        value
    ]);
    const handleSliderChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PriceRangeSlider.useCallback[handleSliderChange]": (_, newValue)=>{
            setTempRange(newValue);
            onChange(newValue);
        }
    }["PriceRangeSlider.useCallback[handleSliderChange]"], [
        onChange
    ]);
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PriceRangeSlider.useCallback[handleInputChange]": (index, val)=>{
            const num = Number(val);
            if (!isNaN(num)) {
                const updatedRange = [
                    ...tempRange
                ];
                updatedRange[index] = Math.min(Math.max(num, min), max);
                // Ensure lower bound is not higher than upper bound
                if (index === 0 && updatedRange[0] > updatedRange[1]) {
                    updatedRange[0] = updatedRange[1];
                } else if (index === 1 && updatedRange[1] < updatedRange[0]) {
                    updatedRange[1] = updatedRange[0];
                }
                setTempRange(updatedRange);
                onChange(updatedRange);
            }
        }
    }["PriceRangeSlider.useCallback[handleInputChange]"], [
        tempRange,
        min,
        max,
        onChange
    ]);
    const applyFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PriceRangeSlider.useCallback[applyFilter]": ()=>{
            onApply(tempRange);
        }
    }["PriceRangeSlider.useCallback[applyFilter]"], [
        tempRange,
        onApply
    ]);
    const resetFilter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PriceRangeSlider.useCallback[resetFilter]": ()=>{
            setTempRange([
                min,
                max
            ]);
            onReset();
        }
    }["PriceRangeSlider.useCallback[resetFilter]"], [
        min,
        max,
        onReset
    ]);
    const isPriceActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PriceRangeSlider.useMemo[isPriceActive]": ()=>{
            return tempRange[0] !== min || tempRange[1] !== max;
        }
    }["PriceRangeSlider.useMemo[isPriceActive]"], [
        tempRange,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-gray-800 text-sm font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            currencySymbol,
                            tempRange[0].toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            currencySymbol,
                            tempRange[1].toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 bg-gray-200 animate-pulse rounded"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                lineNumber: 93,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$7$2e$3$2e$9_$40$emotio_5efc65b7a21bb615fd4ee8d4bf58b896$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                getAriaLabel: ()=>"Price range",
                value: tempRange,
                onChange: handleSliderChange,
                valueLabelDisplay: "off",
                min: min,
                max: max,
                sx: {
                    color: "#2563eb",
                    height: 6,
                    "& .MuiSlider-thumb": {
                        width: 18,
                        height: 18,
                        backgroundColor: "#fff",
                        border: "2px solid #2563eb",
                        boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
                        "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0 0 0 6px rgba(37,99,235,0.3)"
                        }
                    }
                }
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    "Min",
                    "Max"
                ].map((label, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-3 top-2.5 text-gray-500",
                                children: currencySymbol
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                inputMode: "numeric",
                                type: "number",
                                value: tempRange[idx],
                                onChange: (e)=>handleInputChange(idx, e.target.value),
                                className: "pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm",
                                placeholder: label,
                                min: min,
                                max: max,
                                disabled: loading
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: applyFilter,
                        disabled: loading,
                        className: "bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50",
                        children: "Apply"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetFilter,
                        disabled: loading || !isPriceActive,
                        className: "text-sm text-gray-600 hover:text-red-500 focus:outline-none transition disabled:opacity-50",
                        children: "Reset"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(PriceRangeSlider, "csW4tf7rTGgFTzYGHZMlEgABJfM=");
_c = PriceRangeSlider;
var _c;
__turbopack_context__.k.register(_c, "PriceRangeSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const booleanOptions = [
    {
        label: "Free Materials",
        key: "isFree"
    },
    {
        label: "Featured",
        key: "isFeatured"
    },
    {
        label: "Trending",
        key: "isTrending"
    }
];
const BooleanFilters = ({ defaultSelected = {}, onChange, onReset })=>{
    _s();
    const handleCheckboxChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BooleanFilters.useCallback[handleCheckboxChange]": (key)=>{
            const updated = {
                ...defaultSelected,
                [key]: !defaultSelected[key]
            };
            onChange(updated);
        }
    }["BooleanFilters.useCallback[handleCheckboxChange]"], [
        defaultSelected,
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: [
            booleanOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-200 bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium text-gray-800",
                            children: option.label
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "inline-flex relative items-center cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: !!defaultSelected[option.key],
                                    onChange: ()=>handleCheckboxChange(option.key),
                                    className: "sr-only peer"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, option.key, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)),
            Object.values(defaultSelected).some(Boolean) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onReset,
                className: "self-start text-sm text-blue-600 hover:underline mt-1",
                children: "Reset Filters"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
};
_s(BooleanFilters, "fDd6el2gOYrNlfDUM9vLSVJdl24=");
_c = BooleanFilters;
const __TURBOPACK__default__export__ = BooleanFilters;
var _c;
__turbopack_context__.k.register(_c, "BooleanFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const formats = [
    "digital",
    "physical",
    "hybrid"
];
const capitalize = (str)=>str.charAt(0).toUpperCase() + str.slice(1);
const DeliveryFormatFilter = ({ defaultSelected = [], onChange, onReset })=>{
    _s();
    const handleCheckboxChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DeliveryFormatFilter.useCallback[handleCheckboxChange]": (format)=>{
            const isSelected = defaultSelected.includes(format);
            const updated = isSelected ? defaultSelected.filter({
                "DeliveryFormatFilter.useCallback[handleCheckboxChange]": (f)=>f !== format
            }["DeliveryFormatFilter.useCallback[handleCheckboxChange]"]) : [
                ...defaultSelected,
                format
            ];
            onChange(updated);
        }
    }["DeliveryFormatFilter.useCallback[handleCheckboxChange]"], [
        defaultSelected,
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between p-2 rounded-md cursor-pointer border border-transparent hover:border-blue-200 transition group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-700 group-hover:text-blue-600 transition-colors",
                                children: capitalize(format)
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: defaultSelected.includes(format),
                                onChange: ()=>handleCheckboxChange(format),
                                className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-200"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        ]
                    }, format, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            defaultSelected.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 border-t border-gray-100 pt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onReset,
                    className: "text-xs font-medium text-blue-600 hover:underline transition",
                    children: "Reset Filters"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
_s(DeliveryFormatFilter, "fDd6el2gOYrNlfDUM9vLSVJdl24=");
_c = DeliveryFormatFilter;
const __TURBOPACK__default__export__ = DeliveryFormatFilter;
var _c;
__turbopack_context__.k.register(_c, "DeliveryFormatFilter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FilterSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
"use client";
;
;
;
;
function FilterSection({ id, title, children, active, onClear, expanded, toggleExpand, sectionRefs }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: (el)=>sectionRefs.current[id] = el,
        className: "bg-white/50 border border-gray-200 rounded-lg shadow-sm overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                role: "button",
                tabIndex: 0,
                onClick: ()=>toggleExpand(id),
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") toggleExpand(id);
                },
                initial: false,
                animate: {
                    backgroundColor: expanded[id] ? "#EFF6FF" : "#FFFFFF"
                },
                className: "w-full flex items-center justify-between px-2 py-3 cursor-pointer focus:outline-none hover:bg-gray-50 transition-colors rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                animate: {
                                    rotate: expanded[id] ? 180 : 0
                                },
                                transition: {
                                    duration: 0.3
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    size: 20,
                                    className: `transition-colors ${expanded[id] ? "text-blue-600" : "text-gray-600"}`
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `ml-2 text-lg font-semibold transition-colors ${expanded[id] ? "text-blue-600" : "text-gray-800"}`,
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 inline-flex items-center justify-center text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-2 py-0.5",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation(); // Still important to prevent collapse
                            onClear();
                        },
                        disabled: !active,
                        className: `flex items-center text-sm font-medium transition-colors ${active ? "text-red-500 hover:text-red-600" : "text-gray-300 cursor-not-allowed"} focus:outline-none`,
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                initial: false,
                children: expanded[id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        height: 0
                    },
                    animate: {
                        opacity: 1,
                        height: "auto"
                    },
                    exit: {
                        opacity: 0,
                        height: 0
                    },
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                    },
                    children: children
                }, "content", false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = FilterSection;
var _c;
__turbopack_context__.k.register(_c, "FilterSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LevelsWithDegreeFilter({ data = [], defaultSelected = [], onChange = ()=>{} }) {
    _s();
    const [expandedLevel, setExpandedLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedDegreesByLevel, setSelectedDegreesByLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Initialize from default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LevelsWithDegreeFilter.useEffect": ()=>{
            if (defaultSelected.length > 0) {
                const init = {};
                defaultSelected.forEach({
                    "LevelsWithDegreeFilter.useEffect": (deg)=>{
                        data.forEach({
                            "LevelsWithDegreeFilter.useEffect": ({ level, degrees })=>{
                                if (degrees.some({
                                    "LevelsWithDegreeFilter.useEffect": (d)=>d.code === deg
                                }["LevelsWithDegreeFilter.useEffect"])) {
                                    init[level] = [
                                        ...init[level] || [],
                                        deg
                                    ];
                                }
                            }
                        }["LevelsWithDegreeFilter.useEffect"]);
                    }
                }["LevelsWithDegreeFilter.useEffect"]);
                setSelectedDegreesByLevel(init);
                const levels = Object.keys(init);
                if (levels.length === 1) setExpandedLevel(levels[0]);
            }
        }
    }["LevelsWithDegreeFilter.useEffect"], [
        defaultSelected,
        data
    ]);
    const handleToggleExpand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LevelsWithDegreeFilter.useCallback[handleToggleExpand]": (level)=>{
            setExpandedLevel({
                "LevelsWithDegreeFilter.useCallback[handleToggleExpand]": (prev)=>prev === level ? null : level
            }["LevelsWithDegreeFilter.useCallback[handleToggleExpand]"]);
        }
    }["LevelsWithDegreeFilter.useCallback[handleToggleExpand]"], []);
    const handleDegreeToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LevelsWithDegreeFilter.useCallback[handleDegreeToggle]": (degreeCode, parentLevel)=>{
            setSelectedDegreesByLevel({
                "LevelsWithDegreeFilter.useCallback[handleDegreeToggle]": (prev)=>{
                    const current = prev[parentLevel] || [];
                    const isSelected = current.includes(degreeCode);
                    // Create a new state where only the current level is active
                    const updatedDegrees = isSelected ? [] // Unchecking the only selected one = clear
                     : [
                        degreeCode
                    ]; // Replace with the new one
                    const next = updatedDegrees.length ? {
                        [parentLevel]: updatedDegrees
                    } : {}; // Clear all if nothing is selected
                    setExpandedLevel(parentLevel); // Expand the new one
                    const allDegrees = Object.values(next).flat();
                    onChange({
                        degrees: allDegrees,
                        level: parentLevel,
                        full: next
                    });
                    return next;
                }
            }["LevelsWithDegreeFilter.useCallback[handleDegreeToggle]"]);
        }
    }["LevelsWithDegreeFilter.useCallback[handleDegreeToggle]"], [
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "space-y-2",
            children: data.map(({ level, degrees })=>{
                const isExpanded = expandedLevel === level;
                const selected = selectedDegreesByLevel[level] || [];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleToggleExpand(level),
                            className: `flex justify-between items-center w-full text-left px-3 py-2 rounded-md border transition
                    ${isExpanded ? "bg-blue-50 border-blue-500 text-blue-800 font-semibold" : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"}`,
                            "aria-expanded": isExpanded,
                            "aria-controls": `degrees-${level}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: level
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this),
                                isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                    lineNumber: 88,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                    lineNumber: 90,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                            lineNumber: 74,
                            columnNumber: 15
                        }, this),
                        isExpanded && degrees.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            id: `degrees-${level}`,
                            className: "mt-2 ml-4 space-y-1",
                            role: "group",
                            "aria-labelledby": level,
                            children: degrees.map((degree)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "inline-flex items-center text-sm text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selected.includes(degree.code),
                                                onChange: ()=>handleDegreeToggle(degree.code, level),
                                                className: "form-checkbox mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                                lineNumber: 104,
                                                columnNumber: 25
                                            }, this),
                                            degree.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                        lineNumber: 103,
                                        columnNumber: 23
                                    }, this)
                                }, degree.code, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                                    lineNumber: 102,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                            lineNumber: 95,
                            columnNumber: 17
                        }, this)
                    ]
                }, level, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
                    lineNumber: 73,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(LevelsWithDegreeFilter, "7UuME5khfLVY91gMafYAN/SolxE=");
_c = LevelsWithDegreeFilter;
const __TURBOPACK__default__export__ = LevelsWithDegreeFilter;
var _c;
__turbopack_context__.k.register(_c, "LevelsWithDegreeFilter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useCategoryData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PriceRangeSlider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/PriceRangeSlider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$BooleanFilters$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/filters/BooleanFilters.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$DeliveryFormatFilter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/filters/DeliveryFormatFilter.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$FilterSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/filters/FilterSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$LevelsWithDegreeFilter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/filters/LevelsWithDegreeFilter.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 10000;
function MaterialFilters({ filters, onFilterChange, resetFilters }) {
    _s();
    const { academicLevels, isLoadingAcademicLevels, errors: { academicError } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryData"])({
        autoFetch: true
    });
    // Prepare selected arrays for multi‐select filters
    const degreesSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MaterialFilters.useMemo[degreesSelected]": ()=>filters.academicDegree?.split(",") || []
    }["MaterialFilters.useMemo[degreesSelected]"], [
        filters.academicDegree
    ]);
    const deliveryFormatsSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MaterialFilters.useMemo[deliveryFormatsSelected]": ()=>filters.deliveryFormat?.split(",") || []
    }["MaterialFilters.useMemo[deliveryFormatsSelected]"], [
        filters.deliveryFormat
    ]);
    // Price range state
    const initialMin = Number(filters["price[gte]"]) || DEFAULT_MIN;
    const initialMax = Number(filters["price[lte]"]) || DEFAULT_MAX;
    const [priceRange, setPriceRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        initialMin,
        initialMax
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MaterialFilters.useEffect": ()=>{
            setPriceRange([
                initialMin,
                initialMax
            ]);
        }
    }["MaterialFilters.useEffect"], [
        initialMin,
        initialMax
    ]);
    // Track expanded/collapsed state per section
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        price: true,
        academic: true,
        delivery: true,
        flags: true
    });
    const sectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const toggleExpand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MaterialFilters.useCallback[toggleExpand]": (key)=>{
            setExpanded({
                "MaterialFilters.useCallback[toggleExpand]": (prev)=>{
                    const next = {
                        ...prev,
                        [key]: !prev[key]
                    };
                    if (!prev[key] && sectionRefs.current[key]) {
                        sectionRefs.current[key].scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                    return next;
                }
            }["MaterialFilters.useCallback[toggleExpand]"]);
        }
    }["MaterialFilters.useCallback[toggleExpand]"], []);
    // Determine which filters are "active"
    const isPriceActive = priceRange[0] !== DEFAULT_MIN || priceRange[1] !== DEFAULT_MAX;
    const isAcademicActive = Boolean(filters.academicLevel || filters.academicDegree);
    const isDeliveryActive = deliveryFormatsSelected.length > 0;
    const isFlagsActive = filters.isFree === "true" || filters.isFeatured === "true" || filters.isTrending === "true";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$FilterSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "price",
                title: "Price Range",
                expanded: expanded,
                toggleExpand: toggleExpand,
                sectionRefs: sectionRefs,
                active: isPriceActive,
                onClear: ()=>{
                    setPriceRange([
                        DEFAULT_MIN,
                        DEFAULT_MAX
                    ]);
                    onFilterChange({
                        price: undefined
                    });
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PriceRangeSlider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: priceRange,
                    min: DEFAULT_MIN,
                    max: DEFAULT_MAX,
                    onChange: setPriceRange,
                    onApply: ([min, max])=>onFilterChange({
                            price: `${min}-${max}`
                        }),
                    onReset: ()=>{
                        setPriceRange([
                            DEFAULT_MIN,
                            DEFAULT_MAX
                        ]);
                        onFilterChange({
                            price: undefined
                        });
                    },
                    currency: filters.currency || "USD"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$FilterSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "academic",
                title: "Levels & Degrees",
                expanded: expanded,
                toggleExpand: toggleExpand,
                sectionRefs: sectionRefs,
                active: isAcademicActive,
                onClear: ()=>onFilterChange({
                        academicLevel: undefined,
                        academicDegree: undefined
                    }),
                loading: isLoadingAcademicLevels,
                error: academicError,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$LevelsWithDegreeFilter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    data: academicLevels,
                    defaultSelected: degreesSelected,
                    onChange: ({ level, degrees })=>onFilterChange({
                            academicLevel: degrees.length ? level : undefined,
                            academicDegree: degrees.length ? degrees[0] : undefined
                        })
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$FilterSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "delivery",
                title: "Delivery Format",
                expanded: expanded,
                toggleExpand: toggleExpand,
                sectionRefs: sectionRefs,
                active: isDeliveryActive,
                onClear: ()=>onFilterChange({
                        deliveryFormat: undefined
                    }),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$DeliveryFormatFilter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    defaultSelected: deliveryFormatsSelected,
                    onChange: (sel)=>onFilterChange({
                            deliveryFormat: sel.length ? sel : undefined
                        })
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$FilterSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "flags",
                title: "Flags",
                expanded: expanded,
                toggleExpand: toggleExpand,
                sectionRefs: sectionRefs,
                active: isFlagsActive,
                onClear: ()=>onFilterChange({
                        isFree: undefined,
                        isFeatured: undefined,
                        isTrending: undefined
                    }),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$BooleanFilters$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    defaultSelected: {
                        isFree: filters.isFree === "true",
                        isFeatured: filters.isFeatured === "true",
                        isTrending: filters.isTrending === "true"
                    },
                    onChange: (flags)=>onFilterChange({
                            isFree: flags.isFree ? "true" : undefined,
                            isFeatured: flags.isFeatured ? "true" : undefined,
                            isTrending: flags.isTrending ? "true" : undefined
                        })
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(MaterialFilters, "vFe+bL6mW6NQsbbjNVfNKgZk0IU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryData"]
    ];
});
_c = MaterialFilters;
const __TURBOPACK__default__export__ = MaterialFilters;
var _c;
__turbopack_context__.k.register(_c, "MaterialFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaterialListingSidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$MaterialFilters$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/filters/MaterialFilters.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
;
;
;
function MaterialListingSidebar({ filters, onFilterChange, resetFilters, isCollapsed, onCollapse }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/30 z-30 lg:hidden",
                onClick: onCollapse,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                lineNumber: 16,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed lg:static top-0 left-0 h-full lg:h-auto bg-white transition-transform duration-300 ease-in-out z-40", isCollapsed ? "-translate-x-full lg:translate-x-0 w-0 overflow-hidden" : "translate-x-0 w-[70%] sm:w-[40%] md:w-[30%]" // fluid custom widths
                ),
                "aria-hidden": isCollapsed,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCollapse,
                        className: "absolute -top-4 right-4 z-50 p-2 rounded-full bg-white/90 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out backdrop-blur-sm",
                        "aria-label": "Collapse Filters",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "text-orange-500",
                            size: 25
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "relative border border-gray-200 rounded-lg shadow-sm p-4 pt-10 pb-6 flex flex-col h-full lg:h-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "absolute -top-3 left-6 px-2 text-2xl font-bold text-gray-900",
                                children: "Filters"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 overflow-y-auto flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$filters$2f$MaterialFilters$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    filters: filters,
                                    onFilterChange: onFilterChange,
                                    onResetFilters: resetFilters
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = MaterialListingSidebar;
var _c;
__turbopack_context__.k.register(_c, "MaterialListingSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/SortDropdown.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SortDropdown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
"use client";
;
;
;
function SortDropdown({ labelName = "Sort By", options, selected, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "sort-dropdown",
                className: "text-sm font-semibold text-gray-600 whitespace-nowrap",
                children: labelName
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full sm:w-48",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "sort-dropdown",
                        value: selected,
                        onChange: (e)=>onChange(e.target.value),
                        className: "   block w-full   bg-white border border-gray-200   rounded-lg shadow-sm   px-4 py-2   text-sm text-gray-700   appearance-none   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500   transition   ",
                        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: opt.value,
                                children: opt.label
                            }, opt.value, false, {
                                fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-y-0 right-3 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 16,
                            className: "text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/SortDropdown.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = SortDropdown;
var _c;
__turbopack_context__.k.register(_c, "SortDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaterialListingHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$SortDropdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/SortDropdown.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
;
;
function MaterialListingHeader({ pagination, filters, sortOptions, isSidebarCollapsed, onSortChange, onToggleSidebar }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 flex-wrap",
                children: [
                    isSidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onToggleSidebar,
                        className: "group inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-all",
                        "aria-label": "Show Filters",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 24,
                                className: "mr-2 text-orange-500 group-hover:translate-x-1 transition-transform"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this),
                            "Show Filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    sortOptions?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full sm:w-64",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$SortDropdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            labelName: "Sort By:",
                            options: sortOptions,
                            selected: filters?.sort || "",
                            onChange: onSortChange
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm",
                role: "status",
                "aria-live": "polite",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-semibold text-indigo-600 leading-none",
                        children: pagination.totalResults?.toLocaleString() || 0
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                        children: "materials found"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = MaterialListingHeader;
var _c;
__turbopack_context__.k.register(_c, "MaterialListingHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/ui/Pagination.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Pagination)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-icons@5.6.0_react@19.2.4/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Pagination({ currentPage, totalPages, onPageChange, isLoading = false, onPageChangeStart, onPageChangeEnd, alwaysVisible = false, minPagesToShow = 2 }) {
    _s();
    // 1) Always call hooks first:
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const paginationRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Pagination.useMemo[paginationRange]": ()=>{
            if (totalPages <= 5) return [
                ...Array(totalPages)
            ].map({
                "Pagination.useMemo[paginationRange]": (_, i)=>i + 1
            }["Pagination.useMemo[paginationRange]"]);
            const range = [];
            const delta = 2;
            let left = Math.max(2, currentPage - delta);
            let right = Math.min(totalPages - 1, currentPage + delta);
            if (left > 2) range.push("...");
            for(let i = left; i <= right; i++)range.push(i);
            if (right < totalPages - 1) range.push("...");
            return [
                1,
                ...range,
                totalPages
            ];
        }
    }["Pagination.useMemo[paginationRange]"], [
        currentPage,
        totalPages
    ]);
    const handlePageChange = async (page)=>{
        if (isLoading || page === currentPage) return;
        onPageChangeStart?.(page);
        await onPageChange(page);
        onPageChangeEnd?.(page);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Pagination.useEffect": ()=>{
            const handleKeyDown = {
                "Pagination.useEffect.handleKeyDown": (e)=>{
                    if (!navRef.current?.contains(document.activeElement)) return;
                    if (e.key === "ArrowLeft" && currentPage > 1) {
                        handlePageChange(currentPage - 1);
                    } else if (e.key === "ArrowRight" && currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                    } else if (e.key === "Home") {
                        handlePageChange(1);
                    } else if (e.key === "End") {
                        handlePageChange(totalPages);
                    }
                }
            }["Pagination.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "Pagination.useEffect": ()=>document.removeEventListener("keydown", handleKeyDown)
            })["Pagination.useEffect"];
        }
    }["Pagination.useEffect"], [
        currentPage,
        totalPages
    ]);
    // 2) Now compute visibility
    const shouldShow = alwaysVisible || totalPages >= minPagesToShow;
    if (!shouldShow) return null;
    // 3) And finally return JSX
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        ref: navRef,
        className: "flex justify-center mt-6",
        "aria-label": "Pagination",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex items-center gap-1 bg-white/10 p-2 rounded-md shadow-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationButton, {
                    onClick: ()=>handlePageChange(1),
                    disabled: currentPage === 1 || isLoading,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaAngleDoubleLeft"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, void 0),
                    label: "First page"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationButton, {
                    onClick: ()=>handlePageChange(currentPage - 1),
                    disabled: currentPage === 1 || isLoading,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaAngleLeft"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, void 0),
                    label: "Previous page"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                paginationRange.map((p, i)=>p === "..." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "px-3 py-2 text-gray-500 select-none",
                        children: "…"
                    }, i, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 102,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationButton, {
                        onClick: ()=>handlePageChange(p),
                        disabled: isLoading,
                        isActive: p === currentPage,
                        label: `Page ${p}`,
                        text: p
                    }, i, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationButton, {
                    onClick: ()=>handlePageChange(currentPage + 1),
                    disabled: currentPage === totalPages || isLoading,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaAngleRight"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, void 0),
                    label: "Next page"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationButton, {
                    onClick: ()=>handlePageChange(totalPages),
                    disabled: currentPage === totalPages || isLoading,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaAngleDoubleRight"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 127,
                        columnNumber: 17
                    }, void 0),
                    label: "Last page"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-center px-3 py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$icons$40$5$2e$6$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaSpinner"], {
                        size: 16,
                        className: "animate-spin text-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
                    lineNumber: 132,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(Pagination, "EeklsE90tiKmxlhNfhr1QTV3iX0=");
_c = Pagination;
const PaginationButton = ({ onClick, disabled, icon, isActive, text, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            disabled: disabled,
            "aria-label": label,
            "aria-current": isActive ? "page" : undefined,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200", isActive && "bg-blue-600 text-white font-semibold shadow-lg"),
            children: icon || text
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
            lineNumber: 150,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/Pagination.jsx",
        lineNumber: 149,
        columnNumber: 3
    }, this); // import { cn } from "@/utils/cn";
 // import { useEffect, useMemo, useRef } from "react";
 // import {
 //   FaAngleDoubleLeft,
 //   FaAngleDoubleRight,
 //   FaAngleLeft,
 //   FaAngleRight,
 //   FaSpinner,
 // } from "react-icons/fa";
 // /**
 //  * Pagination Component
 //  *
 //  * @param {number} currentPage - Current active page.
 //  * @param {number} totalPages - Total number of pages.
 //  * @param {function} onPageChange - Callback to change pages.
 //  * @param {boolean} isLoading - Indicates if data for the new page is loading.
 //  * @param {function} onPageChangeStart - Optional callback triggered before page change.
 //  * @param {function} onPageChangeEnd - Optional callback triggered after page change.
 //  * @param {boolean} alwaysVisible - If true, pagination is shown regardless of the page count.
 //  * @param {number} minPagesToShow - Minimum pages required to display pagination (default: 2).
 //  */
 // export default function Pagination({
 //   currentPage,
 //   totalPages,
 //   onPageChange,
 //   isLoading = false,
 //   onPageChangeStart,
 //   onPageChangeEnd,
 //   alwaysVisible = false,
 //   minPagesToShow = 2,
 // }) {
 //   const navRef = useRef(null);
 //   // Only show pagination if necessary
 //   if (!alwaysVisible && totalPages < minPagesToShow) return null;
 //   // Dynamically generates pagination numbers with ellipsis
 //   const paginationRange = useMemo(() => {
 //     if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);
 //     const range = [];
 //     const delta = 2;
 //     let left = Math.max(2, currentPage - delta);
 //     let right = Math.min(totalPages - 1, currentPage + delta);
 //     if (left > 2) range.push("...");
 //     for (let i = left; i <= right; i++) range.push(i);
 //     if (right < totalPages - 1) range.push("...");
 //     return [1, ...range, totalPages];
 //   }, [currentPage, totalPages]);
 //   // Handles a page change with optional lifecycle hooks
 //   const handlePageChange = async (page) => {
 //     if (isLoading || page === currentPage) return;
 //     onPageChangeStart?.(page);
 //     await onPageChange(page);
 //     onPageChangeEnd?.(page);
 //   };
 //   // Enable keyboard navigation
 //   useEffect(() => {
 //     const handleKeyDown = (e) => {
 //       if (!navRef.current?.contains(document.activeElement)) return;
 //       if (e.key === "ArrowLeft") {
 //         if (currentPage > 1) handlePageChange(currentPage - 1);
 //       } else if (e.key === "ArrowRight") {
 //         if (currentPage < totalPages) handlePageChange(currentPage + 1);
 //       } else if (e.key === "Home") {
 //         handlePageChange(1);
 //       } else if (e.key === "End") {
 //         handlePageChange(totalPages);
 //       }
 //     };
 //     document.addEventListener("keydown", handleKeyDown);
 //     return () => document.removeEventListener("keydown", handleKeyDown);
 //   }, [currentPage, totalPages]);
 //   return (
 //     <nav
 //       ref={navRef}
 //       className="flex justify-center mt-6"
 //       aria-label="Pagination Navigation"
 //     >
 //       <ul className="flex items-center gap-1 bg-white/10 p-2 rounded-md shadow-md">
 //         {/* First Page */}
 //         <PaginationButton
 //           onClick={() => handlePageChange(1)}
 //           disabled={currentPage === 1 || isLoading}
 //           icon={<FaAngleDoubleLeft size={16} />}
 //           label="First page"
 //         />
 //         {/* Previous Page */}
 //         <PaginationButton
 //           onClick={() => handlePageChange(currentPage - 1)}
 //           disabled={currentPage === 1 || isLoading}
 //           icon={<FaAngleLeft size={16} />}
 //           label="Previous page"
 //         />
 //         {/* Page Numbers with Ellipsis */}
 //         {paginationRange.map((page, index) =>
 //           page === "..." ? (
 //             <li key={index} className="px-3 py-2 text-gray-500 select-none">
 //               …
 //             </li>
 //           ) : (
 //             <PaginationButton
 //               key={index}
 //               onClick={() => handlePageChange(page)}
 //               disabled={isLoading}
 //               isActive={page === currentPage}
 //               label={`Page ${page}`}
 //               text={page}
 //             />
 //           )
 //         )}
 //         {/* Next Page */}
 //         <PaginationButton
 //           onClick={() => handlePageChange(currentPage + 1)}
 //           disabled={currentPage === totalPages || isLoading}
 //           icon={<FaAngleRight size={16} />}
 //           label="Next page"
 //         />
 //         {/* Last Page */}
 //         <PaginationButton
 //           onClick={() => handlePageChange(totalPages)}
 //           disabled={currentPage === totalPages || isLoading}
 //           icon={<FaAngleDoubleRight size={16} />}
 //           label="Last page"
 //         />
 //         {/* Loading Spinner */}
 //         {isLoading && (
 //           <li className="flex items-center px-3 py-2">
 //             <FaSpinner size={16} className="animate-spin text-blue-600" />
 //           </li>
 //         )}
 //       </ul>
 //     </nav>
 //   );
 // }
 // /**
 //  * PaginationButton Component
 //  */
 // const PaginationButton = ({
 //   onClick,
 //   disabled,
 //   icon,
 //   isActive,
 //   text,
 //   label,
 // }) => (
 //   <li>
 //     <button
 //       onClick={onClick}
 //       disabled={disabled}
 //       aria-label={label}
 //       aria-disabled={disabled}
 //       aria-current={isActive ? "page" : undefined}
 //       tabIndex={disabled ? -1 : 0}
 //       className={cn(
 //         "px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
 //         disabled
 //           ? "text-gray-400 cursor-not-allowed"
 //           : "text-gray-700 hover:bg-gray-200",
 //         isActive && "bg-blue-600 text-white font-semibold shadow-lg"
 //       )}
 //     >
 //       {icon || text}
 //     </button>
 //   </li>
 // );
 // 🚀 How to Use It?
 // 1️⃣ Basic Usage
 // <Pagination
 //   currentPage={3}
 //   totalPages={10}
 //   onPageChange={(page) => console.log(`Switched to page ${page}`)}
 // />
 // 2️⃣ Usage with Loading & Custom Events
 // <Pagination
 //   currentPage={5}
 //   totalPages={20}
 //   isLoading={loading}
 //   onPageChange={(page) => fetchNewPageData(page)}
 //   onPageChangeStart={(page) => console.log(`Starting to load page ${page}`)}
 //   onPageChangeEnd={(page) => console.log(`Finished loading page ${page}`)}
 // />
_c1 = PaginationButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "Pagination");
__turbopack_context__.k.register(_c1, "PaginationButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/MaterialPaginationFooter.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaterialPaginationFooter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Pagination$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/Pagination.jsx [app-client] (ecmascript)");
;
;
function MaterialPaginationFooter({ currentPage = 1, totalPages = 1, onPageChange, loading }) {
    const shouldShowPagination = totalPages > 1;
    return shouldShowPagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Pagination$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            currentPage: currentPage,
            totalPages: totalPages,
            onPageChange: onPageChange,
            isLoading: loading,
            alwaysVisible: false,
            minPagesToShow: 2,
            onPageChangeStart: (page)=>{
                console.log("Starting to change page:", page);
            },
            onPageChangeEnd: (page)=>{
                console.log("Finished changing page:", page);
            }
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialPaginationFooter.jsx",
            lineNumber: 14,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialPaginationFooter.jsx",
        lineNumber: 13,
        columnNumber: 7
    }, this);
}
_c = MaterialPaginationFooter;
var _c;
__turbopack_context__.k.register(_c, "MaterialPaginationFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/useContainerDimensions.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// hooks/useContainerDimensions.ts
__turbopack_context__.s({
    "useContainerDimensions": (()=>useContainerDimensions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useContainerDimensions() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    const updateDimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useContainerDimensions.useCallback[updateDimensions]": ()=>{
            if (containerRef.current) {
                const { offsetWidth: width, offsetHeight: height } = containerRef.current;
                setDimensions({
                    width,
                    height
                });
            }
        }
    }["useContainerDimensions.useCallback[updateDimensions]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useContainerDimensions.useLayoutEffect": ()=>{
            if (!containerRef.current) return;
            const observer = new ResizeObserver(updateDimensions);
            observer.observe(containerRef.current);
            updateDimensions(); // Initial call
            return ({
                "useContainerDimensions.useLayoutEffect": ()=>{
                    observer.disconnect();
                }
            })["useContainerDimensions.useLayoutEffect"];
        }
    }["useContainerDimensions.useLayoutEffect"], [
        updateDimensions
    ]);
    return {
        containerRef,
        dimensions
    };
}
_s(useContainerDimensions, "LX6k4jwZ6bsNA4zLEuF1j3QrIJA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/useEffectivePrice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/contexts/CurrencyContext.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const useEffectivePrice = ({ materialId, materialType, region = null })=>{
    _s();
    const { currency } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$contexts$2f$CurrencyContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyContext"]);
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useEffectivePrice.useMemo[query]": ()=>{
            const params = {};
            if (currency) params.currency = currency;
            if (region) params.region = region;
            if (materialId) params.materialId = materialId;
            if (materialType) params.materialType = materialType;
            return new URLSearchParams(params).toString();
        }
    }["useEffectivePrice.useMemo[query]"], [
        currency,
        materialId,
        materialType,
        region
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEffectivePrice.useEffect": ()=>{
            if (!currency || !materialId || !materialType) return;
            const fetchPrice = {
                "useEffectivePrice.useEffect.fetchPrice": async ()=>{
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
                }
            }["useEffectivePrice.useEffect.fetchPrice"];
            fetchPrice();
        }
    }["useEffectivePrice.useEffect"], [
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
_s(useEffectivePrice, "3vlVbqZgoUAS5G0OOAWBKPnelvo=");
const __TURBOPACK__default__export__ = useEffectivePrice;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/ui/ContextMenu.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ContextMenu = ({ items = [], icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
    className: "w-5 h-5"
}, void 0, false, {
    fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
    lineNumber: 10,
    columnNumber: 10
}, this), buttonClassName = "", menuClassName = "", iconClassName = "", align = "right", autoClose = true })=>{
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleMenu = ()=>setOpen((prev)=>!prev);
    const closeMenu = ()=>setOpen(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContextMenu.useEffect": ()=>{
            const handleClickOutside = {
                "ContextMenu.useEffect.handleClickOutside": (e)=>{
                    if (menuRef.current && !menuRef.current.contains(e.target)) {
                        closeMenu();
                    }
                }
            }["ContextMenu.useEffect.handleClickOutside"];
            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return ({
                "ContextMenu.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["ContextMenu.useEffect"];
        }
    }["ContextMenu.useEffect"], [
        open
    ]);
    const handleItemClick = (action)=>{
        if (typeof action === "function") action();
        if (autoClose) closeMenu();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleMenu,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2 rounded-full hover:bg-gray-100 transition", buttonClassName),
                "aria-haspopup": "true",
                "aria-expanded": open,
                "aria-label": "Open Context Menu",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(iconClassName),
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute z-[9999] mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md focus:outline-none", align === "left" ? "left-0" : "right-0", menuClassName),
                role: "menu",
                children: items.map(({ label, icon, onClick, className }, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleItemClick(onClick),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition", className),
                        role: "menuitem",
                        children: [
                            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-4 h-4",
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
                                lineNumber: 76,
                                columnNumber: 24
                            }, this),
                            label
                        ]
                    }, index, true, {
                        fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
                lineNumber: 58,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/ui/ContextMenu.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
};
_s(ContextMenu, "iuQeQ4sVg+lFcobs6EbZQm9Prm4=");
_c = ContextMenu;
ContextMenu.propTypes = {
    items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shape({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].node,
        onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
    })),
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].node,
    buttonClassName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    menuClassName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    iconClassName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    align: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        "left",
        "right"
    ]),
    autoClose: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool
};
const __TURBOPACK__default__export__ = ContextMenu;
var _c;
__turbopack_context__.k.register(_c, "ContextMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/TooltipWrapper.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
;
;
;
const getPositionClasses = (position)=>{
    switch(position){
        case "top":
            return {
                tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
                arrow: "top-full left-1/2 -translate-x-1/2 border-t-gray-800"
            };
        case "bottom":
            return {
                tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
                arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800"
            };
        case "left":
            return {
                tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
                arrow: "left-full top-1/2 -translate-y-1/2 border-l-gray-800"
            };
        case "right":
        default:
            return {
                tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
                arrow: "right-full top-1/2 -translate-y-1/2 border-r-gray-800"
            };
    }
};
const TooltipWrapper = ({ label, children, className = "", position = "left" })=>{
    const { tooltip, arrow } = getPositionClasses(position);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative flex", className),
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tooltip",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap", tooltip),
                children: [
                    label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute w-0 h-0 border-8 border-transparent", arrow)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/TooltipWrapper.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/TooltipWrapper.jsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/TooltipWrapper.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_c = TooltipWrapper;
TooltipWrapper.propTypes = {
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
    children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].node.isRequired,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        "top",
        "right",
        "bottom",
        "left"
    ])
};
const __TURBOPACK__default__export__ = TooltipWrapper;
var _c;
__turbopack_context__.k.register(_c, "TooltipWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
 // import React from "react";
 // import PropTypes from "prop-types";
 // import { cn } from "@/utils/cn";
 // const TooltipWrapper = ({ label, children, className = "" }) => (
 //   <div className={cn("group relative flex", className)}>
 //     {children}
 //     <span
 //       role="tooltip"
 //       className="absolute z-50 left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 pointer-events-none whitespace-nowrap"
 //     >
 //       {label}
 //     </span>
 //   </div>
 // );
 // TooltipWrapper.propTypes = {
 //   label: PropTypes.string.isRequired,
 //   children: PropTypes.node.isRequired,
 //   className: PropTypes.string,
 // };
 // export default TooltipWrapper;
}}),
"[project]/acadevault-client/src/components/ui/HoverableActionButton.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/TooltipWrapper.jsx [app-client] (ecmascript)");
;
;
;
;
;
;
const HoverableActionButton = ({ icon: Icon, label, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: label,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            onClick: onClick,
            title: label,
            "aria-label": label,
            whileHover: {
                scale: 1.1
            },
            whileTap: {
                scale: 0.95
            },
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-white/90 backdrop-blur-sm p-2 mb-1 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500", className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-4 h-4 text-gray-600 group-hover:text-blue-600"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/HoverableActionButton.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/ui/HoverableActionButton.jsx",
            lineNumber: 14,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionButton.jsx",
        lineNumber: 13,
        columnNumber: 3
    }, this);
_c = HoverableActionButton;
HoverableActionButton.propTypes = {
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elementType.isRequired,
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
    onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
};
const __TURBOPACK__default__export__ = HoverableActionButton;
var _c;
__turbopack_context__.k.register(_c, "HoverableActionButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shuffle.js [app-client] (ecmascript) <export default as Shuffle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/HoverableActionButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$ContextMenu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/ContextMenu.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const HoverableActionBar = ({ isFree, onWishlist, onCompare, onAddToCart, onQuickView })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-2 right-2 flex flex-col items-center z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$ContextMenu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                align: "right",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                    className: "w-5 h-5 text-gray-700 hover:text-orange-600"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, void 0),
                items: [
                    {
                        label: "Report",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                            lineNumber: 40,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>console.log("Reported")
                    },
                    {
                        label: "Not Interested",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                            lineNumber: 45,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>console.log("Not Interested")
                    },
                    {
                        label: "Copy Link",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                            lineNumber: 50,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>navigator.clipboard.writeText(window.location.href)
                    },
                    {
                        label: "Save for Later",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                            lineNumber: 55,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>console.log("Saved for later")
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"],
                        label: "Add to Wishlist",
                        onClick: onWishlist
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"],
                        label: "Compare",
                        onClick: onCompare
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
                        label: "Quick View",
                        onClick: onQuickView
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    !isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
                        label: "Add to Cart",
                        onClick: onAddToCart
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
_c = HoverableActionBar;
const __TURBOPACK__default__export__ = HoverableActionBar;
var _c;
__turbopack_context__.k.register(_c, "HoverableActionBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
 // import React from "react";
 // import {
 //   Bookmark,
 //   Shuffle,
 //   ShoppingCart,
 //   Flag,
 //   XCircle,
 //   Clock,
 //   Link as LinkIcon,
 // } from "lucide-react";
 // import HoverableActionButton from "./HoverableActionButton";
 // import ContextMenu from "../ui/ContextMenu";
 // const HoverableActionBar = ({ isFree, onWishlist, onCompare, onAddToCart }) => (
 //   <div className="absolute top-2 right-2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
 //     <HoverableActionButton
 //       icon={Bookmark}
 //       label="Add to Wishlist"
 //       onClick={onWishlist}
 //     />
 //     <HoverableActionButton icon={Shuffle} label="Compare" onClick={onCompare} />
 //     {!isFree && (
 //       <HoverableActionButton
 //         icon={ShoppingCart}
 //         label="Add to Cart"
 //         onClick={onAddToCart}
 //       />
 //     )}
 //     <ContextMenu
 //       align="right"
 //       iconClassName="text-gray-700 hover:text-orange-600"
 //       items={[
 //         {
 //           label: "Report",
 //           icon: <Flag className="w-4 h-4" />,
 //           onClick: () => console.log("Reported"),
 //         },
 //         {
 //           label: "Not Interested",
 //           icon: <XCircle className="w-4 h-4" />,
 //           onClick: () => console.log("Not Interested"),
 //         },
 //         {
 //           label: "Copy Link",
 //           icon: <LinkIcon className="w-4 h-4" />,
 //           onClick: () => navigator.clipboard.writeText(window.location.href),
 //         },
 //         {
 //           label: "Save for Later",
 //           icon: <Clock className="w-4 h-4" />,
 //           onClick: () => console.log("Saved for later"),
 //         },
 //       ]}
 //     />
 //   </div>
 // );
 // export default HoverableActionBar;
}}),
"[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getDefaultContextMenuItems": (()=>getDefaultContextMenuItems)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
;
;
const getDefaultContextMenuItems = (id, slug)=>[
        {
            label: "Report",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {}, void 0, false, {
                fileName: "[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js",
                lineNumber: 6,
                columnNumber: 11
            }, this),
            onClick: ()=>console.log("Report", id)
        },
        {
            label: "Not Interested",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {}, void 0, false, {
                fileName: "[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js",
                lineNumber: 11,
                columnNumber: 11
            }, this),
            onClick: ()=>console.log("Not Interested", id)
        },
        {
            label: "Copy Link",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {}, void 0, false, {
                fileName: "[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js",
                lineNumber: 16,
                columnNumber: 11
            }, this),
            onClick: ()=>navigator.clipboard.writeText(`${window.location.origin}/materials/${slug}`)
        },
        {
            label: "Save for Later",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {}, void 0, false, {
                fileName: "[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js",
                lineNumber: 24,
                columnNumber: 11
            }, this),
            onClick: ()=>console.log("Saved", id)
        }
    ];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/ImageWithFallback.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * ImageWithFallback
 * Renders an image with a graceful fallback: either the first letter of `fallbackText`
 * or a placeholder if the image fails to load or no source is provided.
 *
 * @param {Object} props
 * @param {string} props.src - Image URL.
 * @param {string} props.alt - Alternative text for accessibility.
 * @param {number} [props.size=40] - Size in pixels (used when `fill` is false).
 * @param {string} [props.fallbackText=""] - Fallback text (usually a name or label).
 * @param {string} [props.className=""] - Additional custom styles.
 * @param {boolean} [props.fill=false] - Use full container fill mode (relative parent required).
 */ const ImageWithFallback = ({ src, alt, size = 40, fallbackText = "", className = "", fill = false })=>{
    _s();
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showFallback = !src || hasError;
    // Compute initial letter from fallback text
    const fallbackInitial = fallbackText?.trim()?.charAt(0)?.toUpperCase() || "?";
    // Fallback UI (e.g., user's initial in a circle)
    if (showFallback) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-sm ${className}`,
            style: fill ? {} : {
                width: size,
                height: size
            },
            "aria-label": alt,
            role: "img",
            children: fallbackInitial
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/ImageWithFallback.jsx",
            lineNumber: 36,
            columnNumber: 7
        }, this);
    }
    // Image UI (with optional fill layout)
    return fill ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative rounded-full overflow-hidden ${className}`,
        style: {
            aspectRatio: "1 / 1"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: alt,
            fill: true,
            onError: ()=>setHasError(true),
            className: "object-cover",
            sizes: "(max-width: 768px) 40px, 100vw"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/ImageWithFallback.jsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/ImageWithFallback.jsx",
        lineNumber: 49,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: src,
        alt: alt,
        width: size,
        height: size,
        onError: ()=>setHasError(true),
        className: `rounded-full object-cover ${className}`
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/ImageWithFallback.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
};
_s(ImageWithFallback, "0lWSx5YqYPOl7PiOJe/TIAtHv6A=");
_c = ImageWithFallback;
const __TURBOPACK__default__export__ = ImageWithFallback;
var _c;
__turbopack_context__.k.register(_c, "ImageWithFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/utils/getImageUrl.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getFileUrl": (()=>getFileUrl),
    "getImageUrl": (()=>getImageUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/materials/MaterialShopInfo.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$ImageWithFallback$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/ImageWithFallback.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getImageUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/getImageUrl.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const MaterialShopInfo = ({ shop, className = "" })=>{
    if (!shop) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-2 text-sm text-gray-500 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$ImageWithFallback$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getImageUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(shop.logo),
                alt: shop.businessName,
                fallbackText: shop.businessName,
                size: 30,
                className: "w-8 h-8 rounded-full overflow-hidden mr-3"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/materials/MaterialShopInfo.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/shop/${shop.id}`,
                className: "hover:text-blue-600 transition-colors font-medium truncate max-w-full",
                title: shop.businessName,
                children: shop.businessName
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/materials/MaterialShopInfo.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/materials/MaterialShopInfo.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
};
_c = MaterialShopInfo;
const __TURBOPACK__default__export__ = MaterialShopInfo;
var _c;
__turbopack_context__.k.register(_c, "MaterialShopInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/utils/getPromotionTag.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/StatusTag.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StatusTag": (()=>StatusTag)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * StatusTag — A floating, animated, contextual tag for visual status indicators
 * on cards or featured elements.
 */ const getTagColor = (type)=>{
    switch(type.toLowerCase()){
        case "sold-out":
        case "high-discount":
            return "bg-red-600";
        case "limited-time":
        case "trending":
            return "bg-orange-500";
        case "promo":
        case "new":
            return "bg-green-600";
        case "info":
            return "bg-blue-600";
        default:
            return "bg-gray-600";
    }
};
const getDefaultIcon = (type)=>{
    switch(type.toLowerCase()){
        case "sold-out":
            return "❌";
        case "new":
            return "🆕";
        case "trending":
            return "🔥";
        case "high-discount":
            return "💸";
        case "promo":
            return "🏷️";
        case "limited-time":
            return "⏳";
        case "info":
            return "ℹ️";
        default:
            return null;
    }
};
const positionMap = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2"
};
const StatusTag = ({ label, icon, type = "default", position = "top-right", responsivePosition = {}, className = "", animation = true, style, ...props })=>{
    const bgColorClass = getTagColor(type);
    const effectiveIcon = icon ?? getDefaultIcon(type);
    const basePositionClass = positionMap[position] || positionMap["top-right"];
    const responsiveClass = Object.entries(responsivePosition).map(([bp, pos])=>`${bp}:${positionMap[pos] || basePositionClass}`).join(" ");
    const tagContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute z-10 text-white text-[11px] font-medium px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1", bgColorClass, basePositionClass, responsiveClass, className),
        style: style,
        ...props,
        children: [
            effectiveIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                children: effectiveIcon
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/StatusTag.jsx",
                lineNumber: 88,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/StatusTag.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/StatusTag.jsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
    if (!animation) return tagContent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.3
        },
        children: tagContent
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/StatusTag.jsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
};
_c = StatusTag;
StatusTag.propTypes = {
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number
    ]).isRequired,
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].node,
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        "high-discount",
        "limited-time",
        "promo",
        "default",
        "new",
        "sold-out",
        "trending",
        "info"
    ]),
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        "top-left",
        "top-right",
        "bottom-right",
        "bottom-left"
    ]),
    responsivePosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object,
    animation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object
};
// 🎯 Real-World Usage Examples
{
/*

<StatusTag
  label="Limited Time"
  type="limited-time"
  position="top-left"
  responsivePosition={{ sm: "top-left", md: "bottom-right" }}
/>

<StatusTag
  label="🔥 Trending"
  type="trending"
  icon="🔥"
  className="animate-bounce"
  animation
/> */ }var _c;
__turbopack_context__.k.register(_c, "StatusTag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/rating/useRating.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useRating": (()=>useRating)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useRating({ value = 0, maxStars = 5, allowHalf = true, readOnly = false, onChange }) {
    _s();
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRating.useEffect": ()=>{
            setRating(value);
        }
    }["useRating.useEffect"], [
        value
    ]);
    const getType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRating.useCallback[getType]": (index)=>{
            const idx = index + 1;
            if (idx <= rating) return "full";
            if (allowHalf && rating >= idx - 0.5 && rating < idx) return "half";
            return "empty";
        }
    }["useRating.useCallback[getType]"], [
        rating,
        allowHalf
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRating.useCallback[handleClick]": (index)=>{
            if (readOnly || !onChange) return;
            const newRating = allowHalf && hover === index - 0.5 ? index - 0.5 : index;
            setRating(newRating);
            onChange(newRating);
        }
    }["useRating.useCallback[handleClick]"], [
        hover,
        allowHalf,
        onChange,
        readOnly
    ]);
    return {
        rating,
        hover,
        setHover,
        getType,
        handleClick
    };
}
_s(useRating, "mjK5m+K/8znCTNoGp97pTTUOZTk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/rating/StarIcons.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StarEmpty": (()=>StarEmpty),
    "StarFull": (()=>StarFull),
    "StarHalf": (()=>StarHalf)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const StarFull = ({ size, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: color,
        stroke: color,
        viewBox: "0 0 20 20",
        width: size,
        height: size,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
            lineNumber: 11,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
        lineNumber: 4,
        columnNumber: 3
    }, this);
_c = StarFull;
const StarHalf = ({ size, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        width: size,
        height: size,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "halfGradient",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "50%",
                            stopColor: color
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
                            lineNumber: 21,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "50%",
                            stopColor: "transparent"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
                            lineNumber: 22,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
                    lineNumber: 20,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
                lineNumber: 19,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "url(#halfGradient)",
                stroke: color,
                d: "M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
                lineNumber: 25,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
        lineNumber: 18,
        columnNumber: 3
    }, this);
_c1 = StarHalf;
const StarEmpty = ({ size, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        stroke: color,
        viewBox: "0 0 20 20",
        width: size,
        height: size,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
            lineNumber: 42,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/rating/StarIcons.jsx",
        lineNumber: 35,
        columnNumber: 3
    }, this);
_c2 = StarEmpty;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StarFull");
__turbopack_context__.k.register(_c1, "StarHalf");
__turbopack_context__.k.register(_c2, "StarEmpty");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/rating/StarTooltip.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StarTooltip": (()=>StarTooltip)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
;
;
const StarTooltip = ({ index })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -5
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -5
            },
            transition: {
                duration: 0.2
            },
            className: "absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10",
            children: [
                index,
                " Star",
                index > 1 ? "s" : ""
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/components/rating/StarTooltip.jsx",
            lineNumber: 6,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/rating/StarTooltip.jsx",
        lineNumber: 5,
        columnNumber: 3
    }, this);
_c = StarTooltip;
var _c;
__turbopack_context__.k.register(_c, "StarTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/rating/StarButton.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StarButton": (()=>StarButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarIcons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/rating/StarIcons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarTooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/rating/StarTooltip.jsx [app-client] (ecmascript)");
;
;
;
;
;
const StarButton = ({ index, type, size, color, inactiveColor, readOnly, glow, animate, showTooltip, onMouseEnter, onMouseLeave, onClick })=>{
    const Icon = type === "full" ? __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarIcons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarFull"] : type === "half" ? __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarIcons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarHalf"] : __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarIcons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarEmpty"];
    const fillColor = type === "empty" ? inactiveColor : color;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        role: "radio",
        "aria-checked": type !== "empty",
        "aria-label": `${index} Star${index > 1 ? "s" : ""}`,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        onKeyDown: (e)=>{
            if ((e.key === "Enter" || e.key === " ") && !readOnly) {
                e.preventDefault();
                onClick();
            }
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("relative outline-none", !readOnly && "cursor-pointer", glow && type === "full" && "drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]"),
        whileHover: animate && !readOnly ? {
            scale: 1.2
        } : {},
        whileTap: animate && !readOnly ? {
            scale: 0.9
        } : {},
        tabIndex: readOnly ? -1 : 0,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: size,
                color: fillColor
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/rating/StarButton.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            showTooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarTooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarTooltip"], {
                index: index
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/rating/StarButton.jsx",
                lineNumber: 50,
                columnNumber: 23
            }, this)
        ]
    }, index, true, {
        fileName: "[project]/acadevault-client/src/components/rating/StarButton.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
_c = StarButton;
var _c;
__turbopack_context__.k.register(_c, "StarButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/rating/StarRating.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StarRatingDisplay": (()=>StarRatingDisplay),
    "StarRatingInput": (()=>StarRatingInput)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$useRating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/rating/useRating.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/rating/StarButton.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const StarRatingDisplay = ({ average, count, maxStars = 5, size = 24, color = "#facc15", inactiveColor = "#d1d5db" })=>{
    _s();
    const { getType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$useRating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRating"])({
        value: average,
        maxStars,
        readOnly: true,
        allowHalf: true
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center space-x-1 select-none cursor-default",
        role: "img",
        "aria-label": `Rating: ${average} out of ${maxStars}`,
        children: [
            Array.from({
                length: maxStars
            }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarButton"], {
                    index: i + 1,
                    type: getType(i),
                    size: size,
                    color: color,
                    inactiveColor: inactiveColor,
                    readOnly: true,
                    glow: false,
                    animate: false,
                    showTooltip: false,
                    onMouseEnter: ()=>{},
                    onMouseLeave: ()=>{},
                    onClick: ()=>{}
                }, i, false, {
                    fileName: "[project]/acadevault-client/src/components/rating/StarRating.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-2 text-sm",
                children: [
                    "(",
                    count,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/rating/StarRating.jsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/rating/StarRating.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_s(StarRatingDisplay, "yNSy6NyvxSkzbZXr7HPs1Wg3FaI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$useRating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRating"]
    ];
});
_c = StarRatingDisplay;
const StarRatingInput = ({ value = 0, onChange, maxStars = 5, size = 24, color = "#facc15", inactiveColor = "#d1d5db", glow = false, animate = true, showTooltip = true })=>{
    _s1();
    const { rating, hover, setHover, getType, handleClick } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$useRating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRating"])({
        value,
        maxStars,
        allowHalf: true,
        readOnly: false,
        onChange
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center space-x-1 select-none cursor-pointer",
        role: "radiogroup",
        "aria-label": `Rating: ${rating} out of ${maxStars}`,
        children: Array.from({
            length: maxStars
        }, (_, i)=>{
            const idx = i + 1;
            const type = getType(i);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarButton"], {
                index: idx,
                type: type,
                size: size,
                color: color,
                inactiveColor: inactiveColor,
                readOnly: false,
                glow: glow,
                animate: animate,
                showTooltip: showTooltip,
                onMouseEnter: ()=>setHover(idx),
                onMouseLeave: ()=>setHover(null),
                onClick: ()=>handleClick(idx)
            }, i, false, {
                fileName: "[project]/acadevault-client/src/components/rating/StarRating.jsx",
                lineNumber: 76,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/rating/StarRating.jsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}; // 🔗 5. Usage
 // import React, { useState, useEffect } from "react";
 // import { StarRatingDisplay, StarRatingInput } from "@/components/rating";
 // const MaterialPage = ({ id }) => {
 //   const [avg, setAvg] = useState(0);
 //   const [count, setCount] = useState(0);
 //   const [userRating, setUserRating] = useState<number | null>(null);
 //   useEffect(() => {
 //     // fetch average & count
 //     fetch(`/api/material/${id}/stats`)
 //       .then(r => r.json())
 //       .then(({ average, reviews }) => {
 //         setAvg(average);
 //         setCount(reviews);
 //       });
 //     // fetch user's rating (if any)
 //     fetch(`/api/material/${id}/my-rating`)
 //       .then(r => r.json())
 //       .then(({ rating }) => setUserRating(rating));
 //   }, [id]);
 //   const handleUserRate = (newRating: number) => {
 //     fetch(`/api/material/${id}/rate`, {
 //       method: "POST",
 //       body: JSON.stringify({ rating: newRating }),
 //       headers: { "Content-Type": "application/json" },
 //     }).then(() => {
 //       setUserRating(newRating);
 //       // optionally re-fetch stats to update avg & count
 //     });
 //   };
 //   return (
 //     <div>
 //       <h1>Material Title</h1>
 //       <StarRatingDisplay average={avg} count={count} />
 //       <h2>Your Rating</h2>
 //       <StarRatingInput
 //         value={userRating ?? 0}
 //         onChange={handleUserRate}
 //       />
 //     </div>
 //   );
 // };
 // export default MaterialPage;
_s1(StarRatingInput, "KPDaxqAjloKVpZs6nIKuKcYIcRo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$useRating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRating"]
    ];
});
_c1 = StarRatingInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "StarRatingDisplay");
__turbopack_context__.k.register(_c1, "StarRatingInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/utils/formatPrice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatCurrency": (()=>formatCurrency),
    "formatPrice": (()=>formatPrice),
    "formatPriceWithSymbol": (()=>formatPriceWithSymbol)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/constants/enums.js [app-client] (ecmascript)");
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
    const symbol = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$enums$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currencySymbols"][currency] || currency;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/PriceDisplay.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formatPrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/formatPrice.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * PriceDisplay — Displays original and discounted price,
 * with support for free, loading, and customizable styles.
 */ const PriceDisplay = ({ price = 0, finalPrice, isFree, loading = false, locale = "en-US", className = "", priceClass = "", originalPriceClass = "", freeClass = "", loadingClass = "" })=>{
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col animate-pulse", className),
            "aria-busy": "true",
            "aria-live": "polite",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-gray-400", loadingClass),
                children: "Loading price..."
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    if (!finalPrice || typeof finalPrice.amount !== "number") {
        return null; // Don't render incomplete or broken price
    }
    const { amount, formatted, originalAmount, currencySymbol, discountApplied } = finalPrice;
    const hasDiscount = originalAmount > amount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col", className),
        "aria-label": "Product pricing",
        children: isFree ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-green-600", "aria-label:Free", freeClass),
            children: "Free"
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
            lineNumber: 51,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                hasDiscount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("del", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-gray-400 line-through", originalPriceClass),
                    "aria-label": "Original price",
                    children: [
                        currencySymbol,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formatPrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(originalAmount, locale)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
                    lineNumber: 63,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ins", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-bold text-blue-600 not-italic", priceClass),
                    "aria-label": "Current price",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$formatPrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(formatted, locale)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/PriceDisplay.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
};
_c = PriceDisplay;
PriceDisplay.propTypes = {
    /** Optional static price (not used directly if `finalPrice` is present) */ price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
    /** Final price object after discounts/tax */ finalPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shape({
        amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number.isRequired,
        formatted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
        currencySymbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
        discountApplied: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number
        ]).isRequired,
        originalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number.isRequired
    }).isRequired,
    /** Whether the item is free (overrides pricing) */ isFree: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /** Loading state for async price fetching */ loading: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    /** Locale for price formatting (e.g. `en-US`) */ locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Class for the root wrapper */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Class for the discounted (final) price */ priceClass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Class for the original (strikethrough) price */ originalPriceClass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Class for "Free" label */ freeClass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Class for loading state */ loadingClass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
};
const __TURBOPACK__default__export__ = PriceDisplay;
var _c;
__turbopack_context__.k.register(_c, "PriceDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useEffectivePrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useEffectivePrice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$ContextMenu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/ContextMenu.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/HoverableActionBar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$getDefaultContextMenuItems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/helpers/getDefaultContextMenuItems.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$materials$2f$MaterialShopInfo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/materials/MaterialShopInfo.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getImageUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/getImageUrl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getPromotionTag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/getPromotionTag.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$StatusTag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/StatusTag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarRating$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/rating/StarRating.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PriceDisplay$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/PriceDisplay.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/TooltipWrapper.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
;
const CardActions = ({ slug, finalPrice, isFree, loading, hasDiscount, variant, onWishlist, onCompare, onAddToCart })=>{
    const isList = variant === "list";
    const isCompact = variant === "compact";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between", {
            "pt-4 border-t border-gray-200 mt-4": variant === "grid",
            "flex-col sm:flex-row sm:items-center gap-0 pt-2 border-t border-gray-100 mt-4": isList,
            "justify-between p-2": isCompact
        }),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PriceDisplay$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        finalPrice: finalPrice,
                        isFree: isFree,
                        loading: loading,
                        className: "items-start"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    hasDiscount && !isCompact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase",
                        children: [
                            "Save ",
                            finalPrice.discountPercent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: isCompact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/materials/${slug}`,
                    className: "px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700",
                    children: "View"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/materials/${slug}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                className: "flex items-center gap-1",
                                children: [
                                    "View Material ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 76,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        !isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: isList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Wishlist",
                                        position: "top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onWishlist,
                                            className: "p-2 rounded-full border",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: "w-4 h-4 text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                                lineNumber: 89,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                            lineNumber: 85,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 84,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Compare",
                                        position: "top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onCompare,
                                            className: "p-2 rounded-full border",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                className: "w-4 h-4 text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                                lineNumber: 97,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                            lineNumber: 93,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 92,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TooltipWrapper$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Add to Cart",
                                        position: "top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onAddToCart,
                                            className: "p-2 rounded-full border",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "w-4 h-4 text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                                lineNumber: 105,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                            lineNumber: 101,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 100,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_c = CardActions;
const CardInfo = ({ title, slug, department, academicLevel, academicDegree, materialType, deliveryFormat, digitalContent, summary, description, rating, numReviews, analytics, variant, onRate })=>{
    const deptName = department?.name ?? "Unknown Department";
    const level = academicLevel ?? "Unknown Level";
    const degree = academicDegree ?? "N/A";
    const typeLabel = materialType ?? "Material";
    const deliveryLabel = deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
    const pageCount = digitalContent?.pageCount ?? "N/A";
    const statsUp = analytics?.upvotes ?? 0;
    const statsComments = analytics?.purchases ?? 0;
    const isCompact = variant === "compact";
    const summaryText = variant === "grid" ? summary || description || "" : variant === "list" ? (description?.slice(0, 120) ?? "") + "..." : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: isCompact ? "p-2" : variant === "grid" ? "p-4" : "flex-1 space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `font-semibold text-gray-900 ${isCompact ? "text-base" : "text-lg"} line-clamp-2`,
                children: title
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            !isCompact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-500",
                children: [
                    deptName,
                    " • ",
                    degree,
                    " (",
                    level,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 169,
                columnNumber: 9
            }, this),
            (variant === "grid" || variant === "list") && summaryText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-sm text-gray-600 ${variant === "grid" ? "line-clamp-2" : ""}`,
                children: [
                    summaryText,
                    variant === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/materials/${slug}`,
                        target: "_blank",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-blue-600 hover:underline ml-1",
                            children: "Read more"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                            lineNumber: 183,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 182,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 175,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-500",
                children: [
                    typeLabel,
                    " • ",
                    deliveryLabel,
                    " • ",
                    pageCount,
                    " pages"
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            !isCompact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$rating$2f$StarRating$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarRatingDisplay"], {
                        average: rating,
                        count: numReviews,
                        size: 18,
                        color: "#facc15",
                        inactiveColor: "#d1d5db"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-sm text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onRate?.("upvote"),
                                title: "Like",
                                className: "flex items-center gap-1 hover:text-blue-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: statsUp
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: "Purchases",
                                className: "flex items-center gap-1 hover:text-blue-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: statsComments
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 196,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
};
_c1 = CardInfo;
const MaterialsListingCard = ({ material, variant = "grid", contextMenuItems, onWishlist, onCompare, onAddToCart, onRate, // Slots for advanced overrides
renderThumbnail, renderInfo, renderActions, renderShopInfo })=>{
    _s();
    const { _id: id, slug, title, thumbnail, department, academicLevel, academicDegree, materialType, deliveryFormat, digitalContent, summary, description, price: basePrice, rating = 0, numReviews = 0, analytics = {}, shop } = material;
    // price logic...
    const { price: finalPrice, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useEffectivePrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        materialId: id,
        materialType
    });
    const isFree = finalPrice?.amount === 0;
    const hasDiscount = typeof finalPrice?.originalAmount === "number" && finalPrice.amount < finalPrice.originalAmount;
    const isGrid = variant === "grid";
    // build list‐only menu
    const menuItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MaterialsListingCard.useMemo[menuItems]": ()=>contextMenuItems ?? (!isGrid ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$getDefaultContextMenuItems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultContextMenuItems"])(id, slug) : [])
    }["MaterialsListingCard.useMemo[menuItems]"], [
        contextMenuItems,
        isGrid,
        id,
        slug
    ]);
    const handle = {
        wishlist: ()=>onWishlist?.(id),
        compare: ()=>onCompare?.(id),
        addToCart: ()=>onAddToCart?.(id),
        upvote: ()=>onRate?.("upvote", id)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative border-2 border-gray-200 rounded-xl bg-gradient-to-br from-neutral-50 to-white overflow-hidden transition-shadow duration-300", {
            "shadow-sm hover:shadow-md": isGrid,
            "flex items-start gap-6 border-b border-gray-200 p-6 hover:shadow-lg": variant === "list"
        }),
        children: [
            renderThumbnail ? renderThumbnail({
                material,
                finalPrice,
                basePrice,
                variant
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardThumbnail, {
                slug: slug,
                title: title,
                thumbnail: thumbnail,
                basePrice: basePrice,
                finalPrice: finalPrice,
                showPromo: variant !== "compact",
                variant: variant
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 303,
                columnNumber: 9
            }, this),
            isGrid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$HoverableActionBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isFree: isFree,
                onWishlist: handle.wishlist,
                onCompare: handle.compare,
                onAddToCart: handle.addToCart
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 316,
                columnNumber: 9
            }, this),
            !isGrid && menuItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$ContextMenu$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    align: "right",
                    items: menuItems,
                    buttonClassName: "p-1 focus:ring-2 focus:ring-blue-500 rounded-full",
                    menuClassName: "min-w-[10rem]"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                    lineNumber: 327,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 326,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col justify-between", {
                    "p-4 gap-2": isGrid,
                    "": variant === "list",
                    "p-2": variant === "compact"
                }),
                children: [
                    renderInfo ? renderInfo({
                        material,
                        variant,
                        onRate
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardInfo, {
                        title,
                        slug,
                        department,
                        academicLevel,
                        academicDegree,
                        materialType,
                        deliveryFormat,
                        digitalContent,
                        summary,
                        description,
                        rating,
                        numReviews,
                        analytics,
                        variant,
                        onRate: (action)=>onRate?.(action, id)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this),
                    renderShopInfo ? renderShopInfo({
                        shop
                    }) : shop && variant !== "compact" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$materials$2f$MaterialShopInfo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        shop: shop
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 370,
                        columnNumber: 46
                    }, this),
                    renderActions ? renderActions({
                        material,
                        finalPrice,
                        isFree,
                        hasDiscount,
                        loading
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardActions, {
                        slug: slug,
                        finalPrice: finalPrice,
                        isFree: isFree,
                        loading: loading,
                        hasDiscount: hasDiscount,
                        variant: variant,
                        onWishlist: handle.wishlist,
                        onCompare: handle.compare,
                        onAddToCart: handle.addToCart
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 337,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
        lineNumber: 289,
        columnNumber: 5
    }, this);
};
_s(MaterialsListingCard, "LS7lub+P9IBJVmpQpR7m0E838co=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useEffectivePrice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c2 = MaterialsListingCard;
const CardThumbnail = ({ slug, title, thumbnail, basePrice = 0, finalPrice, showPromo = true, variant })=>{
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getImageUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(thumbnail);
    const promoTag = showPromo && finalPrice ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$getPromotionTag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPromotionTag"])({
        finalPrice,
        price: basePrice
    }) : null;
    const sizeClasses = variant === "grid" ? "h-45 w-full" : variant === "list" ? "w-36 h-36 sm:w-48 sm:h-48" : "h-32 w-full";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden ${sizeClasses}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/materials/${slug}`,
                target: "_blank",
                className: "block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: imageUrl,
                    alt: title,
                    fill: true,
                    className: "object-cover transition-transform duration-300 hover:scale-105",
                    sizes: variant === "grid" ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 30vw, 15vw",
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                    lineNumber: 417,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            promoTag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$StatusTag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusTag"], {
                label: promoTag.label,
                type: promoTag.type,
                position: "bottom-right",
                animation: true
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
                lineNumber: 431,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
};
_c3 = CardThumbnail;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c4 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(MaterialsListingCard);
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CardActions");
__turbopack_context__.k.register(_c1, "CardInfo");
__turbopack_context__.k.register(_c2, "MaterialsListingCard");
__turbopack_context__.k.register(_c3, "CardThumbnail");
__turbopack_context__.k.register(_c4, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaterialListingCardSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useContainerDimensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useContainerDimensions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialsListingCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/MaterialsListingCard.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function MaterialListingCardSection({ materials = [], isSidebarCollapsed, onWishlist, onCompare, onAddToCart, onRate }) {
    _s();
    const { containerRef, dimensions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useContainerDimensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContainerDimensions"])();
    const isNarrow = dimensions.width < 768;
    const layoutType = isSidebarCollapsed ? "grid" : "list";
    const layoutClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MaterialListingCardSection.useMemo[layoutClasses]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("gap-8", {
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0": layoutType === "grid",
                "justify-center": layoutType === "grid" && isNarrow,
                "flex flex-col divide-y divide-gray-200": layoutType === "list"
            })
    }["MaterialListingCardSection.useMemo[layoutClasses]"], [
        layoutType,
        isNarrow
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: layoutClasses,
        children: materials.map((mat, idx)=>{
            const key = mat.id ?? mat.slug ?? `material-${idx}`;
            const contextMenuItems = layoutType === "list" ? [
                {
                    label: "Report",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {}, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
                        lineNumber: 44,
                        columnNumber: 25
                    }, this),
                    onClick: ()=>console.log("Report", mat.id)
                },
                {
                    label: "Not Interested",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {}, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
                        lineNumber: 49,
                        columnNumber: 25
                    }, this),
                    onClick: ()=>console.log("Not Interested", mat.id)
                },
                {
                    label: "Copy Link",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {}, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
                        lineNumber: 54,
                        columnNumber: 25
                    }, this),
                    onClick: ()=>navigator.clipboard.writeText(`${window.location.origin}/materials/${mat.slug}`)
                },
                {
                    label: "Save for Later",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {}, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
                        lineNumber: 62,
                        columnNumber: 25
                    }, this),
                    onClick: ()=>console.log("Saved", mat.id)
                }
            ] : undefined;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialsListingCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                material: mat,
                variant: layoutType,
                contextMenuItems: contextMenuItems,
                onWishlist: onWishlist,
                onCompare: onCompare,
                onAddToCart: onAddToCart,
                onRate: onRate
            }, key, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
                lineNumber: 69,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MaterialListingCardSection, "DCAE2ydKYIdlR2jmuYImxzBki94=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useContainerDimensions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContainerDimensions"]
    ];
});
_c = MaterialListingCardSection;
var _c;
__turbopack_context__.k.register(_c, "MaterialListingCardSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/constants/sortOptions.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MaterialListing)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/states/EmptyState.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingSidebar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingHeader.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialPaginationFooter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/MaterialPaginationFooter.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingCardSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/MaterialListingCardSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$sortOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/constants/sortOptions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/file-question.js [app-client] (ecmascript) <export default as FileQuestion>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
function MaterialListing({ materials = [], pagination = {}, filters = {}, sortOptions = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$constants$2f$sortOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SORT_OPTIONS"], contextTitle = "", onFilterChange, onSortChange, onPageChange, resetFilters, isFetchingNextPage, fetchNextPage, hasMore, className = "" }) {
    _s();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isEmpty = Array.isArray(materials) && materials.length === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-8 ${className}`,
        children: [
            contextTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-extrabold text-gray-900 tracking-tight mb-2",
                        children: contextTitle
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                lineNumber: 32,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        filters: filters,
                        onFilterChange: onFilterChange,
                        resetFilters: resetFilters,
                        isCollapsed: isSidebarCollapsed,
                        onCollapse: ()=>setIsSidebarCollapsed(true)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-6",
                        children: isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "No Academic Materials Found",
                            message: "Try adjusting your filters or explore other categories.",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"], {
                                size: 48,
                                className: "text-yellow-500"
                            }, void 0, false, {
                                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                                lineNumber: 54,
                                columnNumber: 21
                            }, void 0),
                            centered: true
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    pagination: pagination,
                                    filters: filters,
                                    sortOptions: sortOptions,
                                    isSidebarCollapsed: isSidebarCollapsed,
                                    onSortChange: onSortChange,
                                    onToggleSidebar: ()=>setIsSidebarCollapsed((prev)=>!prev)
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialListingCardSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    materials: materials,
                                    isSidebarCollapsed: isSidebarCollapsed
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$MaterialPaginationFooter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    currentPage: pagination.currentPage,
                                    totalPages: pagination.totalPages,
                                    onPageChange: onPageChange,
                                    loading: isFetchingNextPage,
                                    fetchNextPage: fetchNextPage,
                                    hasMore: hasMore
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(MaterialListing, "Jr6e6wRLWRs9JQ/zM66721jGkOw=");
_c = MaterialListing;
MaterialListing.propTypes = {
    materials: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].array,
    pagination: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shape({
        currentPage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
        totalPages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number
    }),
    filters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object,
    sortOptions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].array,
    contextTitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    onFilterChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    onSortChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    onPageChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    resetFilters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    isFetchingNextPage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    fetchNextPage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].func,
    hasMore: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
};
var _c;
__turbopack_context__.k.register(_c, "MaterialListing");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/layout/Container.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
;
;
const Container = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(_c = ({ as: Component = "div", variant = "default", section = false, background = "", padded = false, fullHeight = false, centerContent = false, children, className, ...rest }, ref)=>{
    const basePadding = padded ? "pt-10 pb-16" : "";
    const layoutClass = variant === "fluid" ? padded ? "w-full px-4 sm:px-6 lg:px-8" : "w-full" : variant === "responsive" ? "mx-auto w-full max-w-screen-lg px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16" : "mx-auto w-full max-w-7xl px-2 sm:px-4";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(section && "", background && `bg-${background}`, layoutClass, fullHeight && "min-h-[calc(100vh-160px)]", centerContent && "flex flex-col justify-center", basePadding, className),
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/layout/Container.jsx",
        lineNumber: 32,
        columnNumber: 7
    }, this);
});
_c1 = Container;
Container.displayName = "Container";
const __TURBOPACK__default__export__ = Container;
// 🧪 Usage Examples
{
/* <Container>
  <h1>Default container</h1>
</Container>

<Container variant="responsive">
  <p>This container adapts padding & max-width per screen size</p>
</Container>

<Container variant="fluid" padded={false}>
  <div className="bg-blue-200 p-4">Fluid edge-to-edge with no padding</div>
</Container>

<Container
  variant="default"
  section
  background="gray-50"
  centerContent
  fullHeight
>
  <h2 className="text-center text-2xl">Hero Section</h2>
</Container> */ }var _c, _c1;
__turbopack_context__.k.register(_c, "Container$React.forwardRef");
__turbopack_context__.k.register(_c1, "Container");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/lib/categories/fetchRelatedDepartments.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchRelatedDepartments": (()=>fetchRelatedDepartments)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function fetchRelatedDepartments(currentDepartmentId) {
    const url = `${("TURBOPACK compile-time value", "http://localhost:9000")}/api/v2/categories/departments/${currentDepartmentId}/related`;
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch related departments.");
    }
    const { data } = await res.json();
    return data.relatedDepartments || [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/hooks/useRelatedDepartments.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useRelatedDepartments": (()=>useRelatedDepartments)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$categories$2f$fetchRelatedDepartments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/lib/categories/fetchRelatedDepartments.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useRelatedDepartments(currentDepartmentId) {
    _s();
    const [related, setRelated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRelatedDepartments.useEffect": ()=>{
            if (!currentDepartmentId) return;
            async function loadRelated() {
                try {
                    setLoading(true);
                    const departments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$lib$2f$categories$2f$fetchRelatedDepartments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRelatedDepartments"])(currentDepartmentId);
                    setRelated(departments);
                    setError(null);
                } catch (err) {
                    console.error("Error fetching related departments:", err);
                    setError(err.message || "Failed to load related departments.");
                } finally{
                    setLoading(false);
                }
            }
            loadRelated();
        }
    }["useRelatedDepartments.useEffect"], [
        currentDepartmentId
    ]);
    return {
        related,
        loading,
        error
    };
}
_s(useRelatedDepartments, "FA52lT5r3meUH3ZobwL3ZQqtf54=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/ui/Loader.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Loader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const LOADER_TYPES = {
    spinner: "spinner",
    dots: "dots",
    bars: "bars",
    pulse: "pulse",
    wave: "wave",
    skeleton: "skeleton"
};
const SPINNER_SIZES = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4"
};
function Loader({ type = LOADER_TYPES.spinner, size = "md", color = "blue-600", animationSpeed = "animate-spin", text = "Loading...", fullScreen = false, withSkeletonGrid = false, skeletonCount = 6, skeletonHeight = "h-24", skeletonShape = "rounded-lg" }) {
    const ariaLabel = text || "Loading...";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-label": ariaLabel,
        "aria-live": "polite",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex flex-col items-center justify-center space-y-4", {
            "fixed inset-0 bg-white bg-opacity-80 z-50": fullScreen,
            "min-h-screen px-4 py-10": fullScreen
        }),
        children: [
            type === LOADER_TYPES.spinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("border-t-transparent border-solid rounded-full", SPINNER_SIZES[size], animationSpeed, `border-${color}`)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            type === LOADER_TYPES.dots && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2",
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-3 h-3 rounded-full bg-current animate-bounce", `text-${color}`, {
                            "delay-100": i === 1,
                            "delay-200": i === 2
                        })
                    }, i, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            type === LOADER_TYPES.bars && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-1",
                children: [
                    ...Array(5)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-1 h-6 bg-current animate-pulse", `text-${color}`, `delay-${i * 100}`)
                    }, i, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            type === LOADER_TYPES.pulse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-10 h-10 rounded-full bg-current opacity-75 animate-pulse", `text-${color}`)
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            type === LOADER_TYPES.wave && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-1",
                children: [
                    ...Array(4)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-2 h-8 bg-current animate-wave", `text-${color}`, `delay-${i * 150}`)
                    }, i, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 104,
                columnNumber: 9
            }, this),
            type === LOADER_TYPES.skeleton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 w-full p-4",
                children: Array.from({
                    length: skeletonCount
                }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$classnames$40$2$2e$5$2e$1$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bg-gray-200 animate-pulse w-full", skeletonHeight, skeletonShape)
                    }, index, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 119,
                columnNumber: 9
            }, this),
            text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 text-sm text-center px-2",
                children: text
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 134,
                columnNumber: 16
            }, this),
            withSkeletonGrid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10 w-full max-w-6xl animate-pulse space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-6 bg-gray-200 w-1/3 mx-auto rounded"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
                        children: [
                            ...Array(skeletonCount)
                        ].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-gray-100 rounded-lg shadow space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-32 bg-gray-300 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-5 bg-gray-300 w-3/4 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-300 w-5/6 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-300 w-2/3 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/ui/Loader.jsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = Loader;
Loader.propTypes = {
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf(Object.values(LOADER_TYPES)),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf(Object.keys(SPINNER_SIZES)),
    color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    animationSpeed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    fullScreen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    withSkeletonGrid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bool,
    skeletonCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
    skeletonHeight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    skeletonShape: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
};
// 🧪 Example Usage
{
/* 
  
<Loader
  type="spinner"
  size="lg"
  text="Fetching material details..."
  fullScreen
/>

<Loader
  type="skeleton"
  skeletonCount={5}
  skeletonHeight="h-20"
  skeletonShape="rounded-lg"
/>

<Loader
  type="spinner"
  fullScreen
  withSkeletonGrid
  text="Loading course materials..."
/> */ }var _c;
__turbopack_context__.k.register(_c, "Loader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/helpers/truncateText.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useRelatedDepartments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useRelatedDepartments.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Loader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/ui/Loader.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$truncateText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/helpers/truncateText.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const RelatedDepartmentsSection = ({ currentDepartmentId })=>{
    _s();
    const { related, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useRelatedDepartments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRelatedDepartments"])(currentDepartmentId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl text-center font-extrabold text-gray-800 mb-6 border-y-2 border-orange-500 inline-block pb-2",
                    children: "Related Departments"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$ui$2f$Loader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    type: "spinner",
                    text: "Loading"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                    lineNumber: 20,
                    columnNumber: 21
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-red-500 text-sm",
                    children: [
                        error,
                        " Please try again later."
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this),
                !loading && !error && related.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-500 text-sm",
                    children: "No related departments found."
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this),
                !loading && related.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-3",
                    children: related.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/departments/${dept.slug}`,
                            className: "group hover:bg-blue-50 transition flex items-center gap-4 border-b border-gray-200 pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold group-hover:bg-blue-200 transition",
                                    children: dept.name.charAt(0)
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-gray-800 group-hover:text-blue-700",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$helpers$2f$truncateText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateText"])(dept.name, 48)
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, dept.slug, true, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                            lineNumber: 37,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false);
};
_s(RelatedDepartmentsSection, "ga4QaPHo9ATdXsNoQzqFR0pvFeA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useRelatedDepartments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRelatedDepartments"]
    ];
});
_c = RelatedDepartmentsSection;
const __TURBOPACK__default__export__ = RelatedDepartmentsSection;
var _c;
__turbopack_context__.k.register(_c, "RelatedDepartmentsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/PromoBanner.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.35.0_@emot_e48b854992a4fef57027c30f397dbbaf/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
;
;
;
;
const PromoBanner = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$35$2e$0_$40$emot_e48b854992a4fef57027c30f397dbbaf$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-xl",
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
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                        size: 28
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold",
                        children: "Special Student Deal!"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-white/90 mb-4",
                children: [
                    "Get up to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "25% off"
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                        lineNumber: 18,
                        columnNumber: 19
                    }, this),
                    " your first purchase. Limited time offer."
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/deals",
                className: "inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition-all",
                children: "Claim Offer"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/components/common/PromoBanner.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = PromoBanner;
const __TURBOPACK__default__export__ = PromoBanner;
var _c;
__turbopack_context__.k.register(_c, "PromoBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/data/quickLinksGroupData.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "quickLinksGroupData": (()=>quickLinksGroupData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
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
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/QuickLinks.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>QuickLinks)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useAuth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$quickLinksGroupData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/data/quickLinksGroupData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function QuickLinks({ className = "", groupClassName = "", groupHeadingClassName = "", groups = null, layout = "grid", groupOrientation = "vertical", customLinks = [] }) {
    _s();
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleLinkClick = (linkName)=>{
        try {
            trackEvent({
                category: "QuickLinks",
                action: "Click",
                label: linkName
            });
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
        }
        console.log(`${linkName} has been clicked`);
    };
    const linkGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuickLinks.useMemo[linkGroups]": ()=>{
            let filteredGroups = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$quickLinksGroupData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["quickLinksGroupData"];
            if (groups && Array.isArray(groups)) {
                filteredGroups = __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$quickLinksGroupData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["quickLinksGroupData"].filter({
                    "QuickLinks.useMemo[linkGroups]": (group)=>groups.includes(group.key)
                }["QuickLinks.useMemo[linkGroups]"]);
            }
            if (customLinks.length > 0) {
                filteredGroups = [
                    ...filteredGroups,
                    {
                        title: "Custom Links",
                        key: "custom",
                        links: customLinks.map({
                            "QuickLinks.useMemo[linkGroups]": (link)=>({
                                    ...link,
                                    icon: link.icon || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "w-5 h-5 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    show: ({
                                        "QuickLinks.useMemo[linkGroups]": ()=>true
                                    })["QuickLinks.useMemo[linkGroups]"]
                                })
                        }["QuickLinks.useMemo[linkGroups]"])
                    }
                ];
            }
            return filteredGroups.map({
                "QuickLinks.useMemo[linkGroups]": (group)=>({
                        ...group,
                        links: group.links.filter({
                            "QuickLinks.useMemo[linkGroups]": (link)=>link.show(user, isAuthenticated)
                        }["QuickLinks.useMemo[linkGroups]"])
                    })
            }["QuickLinks.useMemo[linkGroups]"]);
        }
    }["QuickLinks.useMemo[linkGroups]"], [
        user,
        isAuthenticated,
        groups,
        customLinks
    ]);
    const getLayoutClasses = (type)=>{
        return type === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-2";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(groupOrientation === "horizontal" ? "flex gap-4" : "space-y-6", className),
        role: "navigation",
        "aria-label": "Quick Links Navigation",
        children: linkGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-gray-600 text-base",
            children: "No links available."
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
            lineNumber: 82,
            columnNumber: 9
        }, this) : linkGroups.map((group, index)=>group.links.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 hover:shadow-md transition", groupClassName),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-gray-800  pb-2", groupHeadingClassName),
                        children: group.title
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: getLayoutClasses(layout),
                        children: group.links.map((link, linkIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    onClick: ()=>handleLinkClick(link.label),
                                    className: "flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-1",
                                    "aria-label": link.description,
                                    title: link.description,
                                    children: [
                                        link.icon,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                                            lineNumber: 113,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                                    lineNumber: 105,
                                    columnNumber: 23
                                }, this)
                            }, linkIndex, false, {
                                fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                                lineNumber: 104,
                                columnNumber: 21
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                        lineNumber: 102,
                        columnNumber: 17
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
                lineNumber: 87,
                columnNumber: 15
            }, this))
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/QuickLinks.jsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(QuickLinks, "ihfGSYOpz+wrN+95uoldP3gX/9g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = QuickLinks;
// Usage
// Footer (All Groups, Grid Layout)
{
/* <footer className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <QuickLinks className="max-w-4xl mx-auto" layout="grid" />
  </div>
</footer>; */ }// ======= Sidebar (Specific Groups, List Layout) //=====
{
/* <aside className="w-64 p-4 bg-white shadow-md">
  <QuickLinks
    groups={["discover", "account"]}
    layout="list"
    groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
    groupHeadingClassName=" border-b inline-block"
  />
</aside>; */ } //======= Custom Links (Footer with Additional Links) //====
 // const customLinks = [
 //   { href: "/blog", label: "Blog", description: "Read our latest articles" },
 //   {
 //     href: "/partners",
 //     label: "Partners",
 //     description: "Our academic partners",
 //   },
 // ];
 // <section className="py-16 bg-gray-100">
 //   <div className="container mx-auto px-4">
 //     <QuickLinks
 //       // className="max-w-4xl mx-auto"
 //       // groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
 //       groupHeadingClassName=" border-b inline-block"
 //       layout="list"
 //       groupOrientation="horizontal"
 //       // groups={["discover", "learn-more"]}
 //       customLinks={customLinks}
 //     />
 //   </div>
 // </section>;
var _c;
__turbopack_context__.k.register(_c, "QuickLinks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/TrustBadge.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
;
;
;
const TrustBadge = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-5 mb-6 text-center border border-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                    size: 36,
                    className: "text-green-500"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-gray-800",
                    children: "Your Trust, Our Priority"
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600",
                    children: "AcadeVault guarantees originality, secure checkout, and 24/7 support."
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "mt-3 text-sm text-gray-700 text-left space-y-2 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 16,
                                    className: "text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                                    lineNumber: 18,
                                    columnNumber: 13
                                }, this),
                                "SSL Secured Payments"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                    size: 16,
                                    className: "text-yellow-500"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                "100% Original Content"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    size: 16,
                                    className: "text-green-500"
                                }, void 0, false, {
                                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                "Quality Checked by Experts"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/TrustBadge.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
};
_c = TrustBadge;
const __TURBOPACK__default__export__ = TrustBadge;
var _c;
__turbopack_context__.k.register(_c, "TrustBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ClientDepartmentMaterials)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$AsyncStateHandler$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/states/AsyncStateHandler.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterialFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/materialHooks/useMaterialFilters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/materialHooks/useMaterials.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$materialListing$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/materials/components/materialListing.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useCategoryDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$layout$2f$Container$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/layout/Container.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$RelatedDepartmentsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/app/(public)/departments/components/RelatedDepartmentsSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PromoBanner$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/PromoBanner.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$QuickLinks$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/QuickLinks.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TrustBadge$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/TrustBadge.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function ClientDepartmentMaterials({ initialData, departmentSlug, initialSearchParams }) {
    _s();
    const { category } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryDetails"])(departmentSlug);
    // ── 2) Filters sync with URL ─────────────────────────────────────────────
    const { filters, updateFilters, resetFilters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterialFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMaterialFilters"])();
    // Apply server‐computed filters on mount (only if they differ)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientDepartmentMaterials.useEffect": ()=>{
            const hasServerFilters = Object.keys(initialSearchParams).length > 0;
            if (hasServerFilters && JSON.stringify(initialSearchParams) !== JSON.stringify(filters)) {
                updateFilters(initialSearchParams);
            }
        // only run once on hydration
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ClientDepartmentMaterials.useEffect"], []);
    // ── 3) Department Materials Fetch (with hybrid initialData) ──────────────
    const { materials, pagination, materialsLoading, materialsError, refetch, hasMore, fetchNextPage, isFetchingNextPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMaterials"])({
        ...filters,
        categoryType: "Department",
        categorySlug: departmentSlug
    }, false, {
        // do not refetch on mount if we've just applied server filters
        refetchOnMount: false,
        // **HYBRID**: seed React Query / RTK Query with the server‐side payload
        initialData
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$layout$2f$Container$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        background: "gray-50",
        section: true,
        className: "py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$states$2f$AsyncStateHandler$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        loading: materialsLoading,
                        error: materialsError,
                        onRetry: refetch,
                        loaderText: "Fetching department materials...",
                        showEmptyState: true,
                        isEmpty: materials.length === 0,
                        emptyTitle: "No materials found",
                        emptyMessage: "Try adjusting your filters or check back later.",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$materials$2f$components$2f$materialListing$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            materials: materials,
                            pagination: pagination,
                            loading: materialsLoading,
                            error: materialsError,
                            filters: filters,
                            contextTitle: `Browse ${category?.name || departmentSlug} Materials`,
                            onFilterChange: updateFilters,
                            onSortChange: (sortBy)=>updateFilters({
                                    sortBy
                                }),
                            onPageChange: (page)=>updateFilters({
                                    page
                                }),
                            resetFilters: resetFilters,
                            isFetchingNextPage: isFetchingNextPage,
                            fetchNextPage: fetchNextPage,
                            hasMore: hasMore
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "hidden lg:block sticky top-24 self-start bg-white/50 rounded-lg shadow px-2 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$app$2f28$public$292f$departments$2f$components$2f$RelatedDepartmentsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            currentDepartmentId: category?.id
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$PromoBanner$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$QuickLinks$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            groups: [
                                "discover",
                                "engage"
                            ],
                            layout: "list",
                            groupClassName: "bg-white rounded-lg shadow-sm p-4 space-y-4 border",
                            groupHeadingClassName: " border-b inline-block"
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$TrustBadge$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/ClientDepartmentMaterials.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(ClientDepartmentMaterials, "GBTs8qNGqGU1IZkNlF84TsCHWPk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useCategoryDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryDetails"],
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterialFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMaterialFilters"],
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$materialHooks$2f$useMaterials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMaterials"]
    ];
});
_c = ClientDepartmentMaterials;
var _c;
__turbopack_context__.k.register(_c, "ClientDepartmentMaterials");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/BackgroundGraphic.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BackgroundGraphic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
"use client";
;
;
;
function BackgroundGraphic({ position = "bottom", height = "h-32", viewBox = "0 0 1440 320", paths = [], wrapperClasses = "", svgClasses = "", style = {} }) {
    // Compute a few base classes to pin SVG either at the top or bottom,
    // and give it the slight translate so it overlaps its parent border nicely.
    const posClasses = position === "top" ? "absolute inset-x-0 top-0 transform -translate-y-1" : "absolute inset-x-0 bottom-0 transform translate-y-1";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${posClasses} w-full overflow-hidden leading-none ${wrapperClasses}`,
        style: style,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: `relative block w-full ${height} ${svgClasses}`,
            viewBox: viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            children: paths.map(({ d, fill, opacity, className }, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: d,
                    fill: fill,
                    opacity: opacity,
                    className: className
                }, idx, false, {
                    fileName: "[project]/acadevault-client/src/components/common/BackgroundGraphic.jsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/acadevault-client/src/components/common/BackgroundGraphic.jsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/BackgroundGraphic.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = BackgroundGraphic;
BackgroundGraphic.propTypes = {
    /** "top" renders SVG pinned to top, "bottom" to bottom of its parent */ position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].oneOf([
        "top",
        "bottom"
    ]),
    /** Tailwind height classes for the <svg> (e.g. "h-32", "h-40", "h-full"…) */ height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** viewBox string for the <svg> (default matches 1440×320 artboard) */ viewBox: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Array of path definitions: { d: string, fill?: string, opacity?: number, className?: string } */ paths: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shape({
        d: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string.isRequired,
        fill: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
        opacity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
    })).isRequired,
    /** Extra wrapper classes on the outer <div> (e.g. "opacity-20 pointer-events-none") */ wrapperClasses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Extra classes on the <svg> element (e.g. "dark:fill-current") */ svgClasses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    /** Inline style overrides (e.g. { zIndex: -10 }) */ style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].object
};
BackgroundGraphic.defaultProps = {
    position: "bottom",
    height: "h-32",
    viewBox: "0 0 1440 320",
    wrapperClasses: "",
    svgClasses: "",
    style: {}
};
var _c;
__turbopack_context__.k.register(_c, "BackgroundGraphic");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/components/common/OverlayPattern.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OverlayPattern)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/utils/cn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function OverlayPattern({ className = "", patternColor = "white", dotRadius = 2, patternSize = 40, opacity = 0.2, zIndex = "z-0" }) {
    _s();
    const patternId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useId();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": "true",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$utils$2f$cn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute inset-0", zIndex, className),
        style: {
            opacity
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "h-full w-full object-cover",
            preserveAspectRatio: "xMidYMid slice",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 800 600",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                        id: patternId,
                        x: "0",
                        y: "0",
                        width: patternSize,
                        height: patternSize,
                        patternUnits: "userSpaceOnUse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: dotRadius,
                            cy: dotRadius,
                            r: dotRadius,
                            fill: patternColor
                        }, void 0, false, {
                            fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "800",
                    height: "600",
                    fill: `url(#${patternId})`
                }, void 0, false, {
                    fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/acadevault-client/src/components/common/OverlayPattern.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(OverlayPattern, "yqsso9K62Brnzh5HmWfdF1I6L+o=");
_c = OverlayPattern;
OverlayPattern.propTypes = {
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    patternColor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string,
    dotRadius: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
    patternSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
    opacity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].number,
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].string
};
var _c;
__turbopack_context__.k.register(_c, "OverlayPattern");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.511.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/hooks/useAuth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$BackgroundGraphic$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/BackgroundGraphic.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$OverlayPattern$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/components/common/OverlayPattern.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const DepartmentCTASection = ({ departmentDetail, departmentSlug, className = "", gradient = "from-blue-600 via-indigo-600 to-purple-600", title = "Contribute or Explore More", description, ctaButtons = [] })=>{
    _s();
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Default department name and description
    const departmentName = departmentDetail?.name || (departmentSlug ? departmentSlug.replace(/-/g, " ").replace(/\b\w/g, (c)=>c.toUpperCase()) : "Your Department");
    const defaultDescription = description || `Share your academic materials or discover resources to boost your research in ${departmentName}.`;
    // Handle CTA click for analytics
    const handleCTAClick = (label)=>{
        try {
            trackEvent({
                category: "DepartmentCTA",
                action: "Click",
                label
            });
        } catch (error) {
            console.warn("Analytics tracking failed:", error);
        }
    };
    // Default CTA buttons with conditional rendering
    const defaultButtons = [
        {
            label: "Upload Material",
            href: "/materials/upload",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                className: "w-5 h-5"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            variant: "primary",
            show: isAuthenticated && (user?.role === "Seller" || user?.role === "Admin")
        },
        {
            label: "Browse Materials",
            href: departmentSlug ? `/materials?category=${departmentSlug}` : "/materials",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                className: "w-5 h-5"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            variant: "secondary",
            show: true
        },
        {
            label: "Join Community",
            href: "/community",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$511$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                className: "w-5 h-5"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            variant: "secondary",
            show: true
        }
    ];
    // Merge default and custom buttons, filter by show condition
    const buttons = [
        ...defaultButtons,
        ...ctaButtons
    ].filter((button)=>button.show);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r ${gradient} text-white ${className}`,
        "aria-label": "Call to Action Section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$BackgroundGraphic$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                position: "bottom",
                height: "h-full",
                paths: [
                    {
                        d: "M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,160,864,160C960,160,1056,117,1152,106.7C1248,96,1344,117,1392,128L1440,138.7L1440,320L0,320Z",
                        fill: "#ffffff",
                        opacity: 0.2
                    }
                ],
                svgClasses: "",
                wrapperClasses: "pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$components$2f$common$2f$OverlayPattern$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                patternColor: "white",
                dotRadius: 2,
                patternSize: 40,
                opacity: 0.12,
                zIndex: "z-10"
            }, void 0, false, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl text-center space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl sm:text-4xl font-bold leading-tight",
                        children: title.replace("{department}", departmentName)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base sm:text-lg max-w-2xl mx-auto",
                        children: defaultDescription.replace("{department}", departmentName)
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    buttons.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-4",
                        children: buttons.map((button, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: button.href,
                                onClick: ()=>handleCTAClick(button.label),
                                className: `inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-semibold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white ${button.variant === "primary" ? "bg-white text-blue-600 hover:bg-gray-100" : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"}`,
                                "aria-label": button.label,
                                children: [
                                    button.icon,
                                    button.label
                                ]
                            }, index, true, {
                                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base text-gray-200",
                        children: "No actions available at the moment."
                    }, void 0, false, {
                        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/acadevault-client/src/app/(public)/departments/components/DepartmentCTASection.jsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
};
_s(DepartmentCTASection, "ZciNvz1w38ujgxJkc4IsNEDLTNc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = DepartmentCTASection;
const __TURBOPACK__default__export__ = DepartmentCTASection;
var _c;
__turbopack_context__.k.register(_c, "DepartmentCTASection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=acadevault-client_src_f3799ae7._.js.map