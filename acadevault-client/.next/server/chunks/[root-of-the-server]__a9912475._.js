module.exports = {

"[project]/acadevault-client/.next-internal/server/app/api/ai/faq/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/acadevault-client/src/data/globalFAQs.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"question\":\"How do I reset my password?\",\"answer\":\"Click “Forgot password” on the login screen and follow the instructions emailed to you.\"},{\"question\":\"Where can I find academic materials?\",\"answer\":\"Navigate to Materials → Browse to search by subject, rating, or tags.\"},{\"question\":\"How do I contact a shop owner?\",\"answer\":\"Visit the shop’s page and click “Chat on WhatsApp” or use the contact form at the bottom.\"},{\"question\":\"Can I request a new feature?\",\"answer\":\"Yes—drop us a line at support@acadevault.com or use the Feedback link in your profile menu.\"},{\"question\":\"What payment methods do you accept?\",\"answer\":\"We accept bank transfers, credit/debit cards, and mobile payments. Specific options may vary per vendor.\"},{\"question\":\"How can I track my order?\",\"answer\":\"Once your order is shipped, you'll receive a tracking ID via email or SMS. You can track it on our Order Tracking page.\"},{\"question\":\"Can I return or exchange items?\",\"answer\":\"Yes, items can be returned or exchanged within 7 days if they are in good condition. Check the shop’s return policy for specific details.\"},{\"question\":\"Do you offer student discounts?\",\"answer\":\"Some shops offer student discounts. Please check the product page or contact the shop directly for eligibility.\"},{\"question\":\"How do I contact customer support?\",\"answer\":\"You can reach us through the Contact Us page or by messaging the shop directly from their profile.\"},{\"question\":\"How do I become a vendor on AcadeVault?\",\"answer\":\"Click on 'Become a Vendor' in the footer or vendor dashboard and complete the registration form. You'll be contacted for verification.\"},{\"question\":\"What kind of materials can I sell?\",\"answer\":\"Vendors can upload academic notes, past questions, research papers, eBooks, tutorials, and more—provided they meet our content guidelines.\"},{\"question\":\"How are vendor earnings paid out?\",\"answer\":\"Payouts are processed weekly or monthly based on your preference, via bank transfer. Ensure your bank details are updated in your profile.\"},{\"question\":\"Is there a commission fee for vendors?\",\"answer\":\"Yes, a small commission is deducted per sale to cover platform fees. Check the vendor dashboard for current rates.\"},{\"question\":\"How can I promote my shop or materials?\",\"answer\":\"Use the Ads & Promotions section in your vendor dashboard to boost your listings or appear on featured sections.\"},{\"question\":\"Can I offer discounts or bundles?\",\"answer\":\"Yes, you can create discount coupons or package deals via the Marketing tab in your vendor dashboard.\"},{\"question\":\"How can I respond to customer messages?\",\"answer\":\"Use the built-in messaging system to reply to inquiries in real-time, or connect your WhatsApp number for direct contact.\"},{\"question\":\"Can I upload materials in bulk?\",\"answer\":\"Yes, we support bulk upload via CSV and ZIP file uploads. Check the Bulk Upload section in the dashboard for instructions.\"}]"));}}),
"[project]/acadevault-client/src/app/api/ai/faq/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$globalFAQs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/acadevault-client/src/data/globalFAQs.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fuse$2e$js$40$7$2e$1$2e$0$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/fuse.js@7.1.0/node_modules/fuse.js/dist/fuse.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$5$2e$23$2e$2_ws$40$8$2e$18$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@5.23.2_ws@8.18.3_zod@3.25.76/node_modules/openai/index.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$5$2e$23$2e$2_ws$40$8$2e$18$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@5.23.2_ws@8.18.3_zod@3.25.76/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
;
;
;
;
//
// 1. Validation schemas (Zod)
//
const GetQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    resourceType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    resourceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
const PostBodySchema = GetQuerySchema.extend({
    question: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
//
// 2. Helpers
//
/**
 * Return FAQs for this resource + all “global” entries.
 * A “global” FAQ is one with NO resourceType/resourceId fields in the JSON.
 */ function getLocalFAQs(resourceType, resourceId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$acadevault$2d$client$2f$src$2f$data$2f$globalFAQs$2e$json__$28$json$29$__["default"].filter((faq)=>{
        // if no resourceType in JSON → treat as global
        if (!("resourceType" in faq)) {
            return true;
        }
        // otherwise must match exactly
        return faq.resourceType === resourceType && faq.resourceId === resourceId;
    });
}
/** Only pass entries that actually have question+answer strings */ function sanitizeFAQs(faqs) {
    return faqs.filter((f)=>typeof f.question === "string" && typeof f.answer === "string");
}
async function GET(req) {
    try {
        // 3.1 Validate query
        const url = new URL(req.url);
        const { resourceType, resourceId } = GetQuerySchema.parse({
            resourceType: url.searchParams.get("resourceType"),
            resourceId: url.searchParams.get("resourceId")
        });
        // 3.2 Fetch + sanitize
        const faqs = sanitizeFAQs(getLocalFAQs(resourceType, resourceId));
        // 3.3 Return with 5‑minute cache
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            faqs
        }, {
            status: 200,
            headers: {
                "Cache-Control": "public, max-age=300, stale-while-revalidate=600"
            }
        });
    } catch (err) {
        console.error("[FAQ GET] Error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError ? err.errors : "Internal Server Error"
        }, {
            status: err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError ? 400 : 500
        });
    }
}
async function POST(req) {
    let body;
    try {
        // 4.1 Validate payload
        body = PostBodySchema.parse(await req.json());
    } catch (err) {
        console.error("[FAQ POST] Validation failed:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid request payload"
        }, {
            status: 400
        });
    }
    const { question, resourceType, resourceId } = body;
    const faqs = sanitizeFAQs(getLocalFAQs(resourceType, resourceId));
    // 4.2 Attempt OpenAI completion
    if (process.env.OPENAI_API_KEY) {
        try {
            const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$5$2e$23$2e$2_ws$40$8$2e$18$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
                apiKey: process.env.OPENAI_API_KEY
            });
            const resp = await openai.chat.completions.create({
                model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
                temperature: 0.2,
                max_tokens: 256,
                messages: [
                    {
                        role: "system",
                        content: "You are AcadeVault's helpful FAQ assistant."
                    },
                    {
                        role: "user",
                        content: question
                    }
                ]
            });
            const answer = resp.choices?.[0]?.message?.content?.trim();
            if (answer) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    answer
                });
            }
        } catch (err) {
            console.warn("[FAQ POST] OpenAI error, falling back:", err);
        }
    }
    // 4.3 Fuse.js fuzzy‐matching fallback
    if (faqs.length) {
        try {
            const fuse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fuse$2e$js$40$7$2e$1$2e$0$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](faqs, {
                keys: [
                    "question"
                ],
                threshold: parseFloat(process.env.FUSE_THRESHOLD || "0.4")
            });
            const best = fuse.search(question)[0];
            if (best?.item?.answer) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    answer: best.item.answer
                });
            }
        } catch (err) {
            console.warn("[FAQ POST] Fuse.js fallback error:", err);
        }
    }
    // 4.4 Final fallback message
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        answer: "Sorry, I can’t answer that right now. Please try again later or contact support at support@acadevault.com."
    });
} // import { NextApiRequest, NextApiResponse } from "next";
 // import OpenAI from "openai";
 // export default async function handler(req, res) {
 //   if (req.method !== "POST") {
 //     return res.status(405).json({ error: "Method not allowed" });
 //   }
 //   let { question } = req.body;
 //   if (typeof question !== "string" || !question.trim()) {
 //     return res.status(400).json({ error: "Missing or invalid question" });
 //   }
 //   question = question.trim();
 //   // If you have OpenAI set up:
 //   if (process.env.OPENAI_API_KEY) {
 //     try {
 //       const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 //       const completion = await openai.chat.completions.create({
 //         model: "gpt-3.5-turbo",
 //         messages: [
 //           { role: "system", content: "You are AcadeVault FAQ assistant." },
 //           { role: "user", content: question },
 //         ],
 //         temperature: 0.2,
 //         max_tokens: 200,
 //       });
 //       const answer = completion.choices[0].message.content.trim();
 //       return res.status(200).json({ answer });
 //     } catch (err) {
 //       console.error("OpenAI error:", err);
 //       // fall through to static fallback
 //     }
 //   }
 //   // Static fallback
 //   const canned = `Sorry, I can’t answer that right now. Please try again later or contact support at support@acadevault.com.`;
 //   return res.status(200).json({ answer: canned });
 // }
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a9912475._.js.map