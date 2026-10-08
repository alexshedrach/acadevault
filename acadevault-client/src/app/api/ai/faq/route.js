import { NextResponse } from "next/server";
import { z } from "zod";
import globalFAQs from "@/data/globalFAQs.json";
import Fuse from "fuse.js";
import OpenAI from "openai";

//
// 1. Validation schemas (Zod)
//
const GetQuerySchema = z.object({
  resourceType: z.string().min(1),
  resourceId: z.string().min(1),
});
const PostBodySchema = GetQuerySchema.extend({
  question: z.string().min(1),
});

//
// 2. Helpers
//

/**
 * Return FAQs for this resource + all “global” entries.
 * A “global” FAQ is one with NO resourceType/resourceId fields in the JSON.
 */
function getLocalFAQs(resourceType, resourceId) {
  return globalFAQs.filter((faq) => {
    // if no resourceType in JSON → treat as global
    if (!("resourceType" in faq)) {
      return true;
    }
    // otherwise must match exactly
    return faq.resourceType === resourceType && faq.resourceId === resourceId;
  });
}

/** Only pass entries that actually have question+answer strings */
function sanitizeFAQs(faqs) {
  return faqs.filter(
    (f) => typeof f.question === "string" && typeof f.answer === "string"
  );
}

//
// 3. GET: list FAQs (with cache headers)
//
export async function GET(req) {
  try {
    // 3.1 Validate query
    const url = new URL(req.url);
    const { resourceType, resourceId } = GetQuerySchema.parse({
      resourceType: url.searchParams.get("resourceType"),
      resourceId: url.searchParams.get("resourceId"),
    });

    // 3.2 Fetch + sanitize
    const faqs = sanitizeFAQs(getLocalFAQs(resourceType, resourceId));

    // 3.3 Return with 5‑minute cache
    return NextResponse.json(
      { faqs },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("[FAQ GET] Error:", err);
    return NextResponse.json(
      {
        error: err instanceof z.ZodError ? err.errors : "Internal Server Error",
      },
      { status: err instanceof z.ZodError ? 400 : 500 }
    );
  }
}

//
// 4. POST: answer a single question via AI → Fuse → fallback
//
export async function POST(req) {
  let body;
  try {
    // 4.1 Validate payload
    body = PostBodySchema.parse(await req.json());
  } catch (err) {
    console.error("[FAQ POST] Validation failed:", err);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }

  const { question, resourceType, resourceId } = body;
  const faqs = sanitizeFAQs(getLocalFAQs(resourceType, resourceId));

  // 4.2 Attempt OpenAI completion
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const resp = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        temperature: 0.2,
        max_tokens: 256,
        messages: [
          {
            role: "system",
            content: "You are AcadeVault's helpful FAQ assistant.",
          },
          { role: "user", content: question },
        ],
      });
      const answer = resp.choices?.[0]?.message?.content?.trim();
      if (answer) {
        return NextResponse.json({ answer });
      }
    } catch (err) {
      console.warn("[FAQ POST] OpenAI error, falling back:", err);
    }
  }

  // 4.3 Fuse.js fuzzy‐matching fallback
  if (faqs.length) {
    try {
      const fuse = new Fuse(faqs, {
        keys: ["question"],
        threshold: parseFloat(process.env.FUSE_THRESHOLD || "0.4"),
      });
      const best = fuse.search(question)[0];
      if (best?.item?.answer) {
        return NextResponse.json({ answer: best.item.answer });
      }
    } catch (err) {
      console.warn("[FAQ POST] Fuse.js fallback error:", err);
    }
  }

  // 4.4 Final fallback message
  return NextResponse.json({
    answer:
      "Sorry, I can’t answer that right now. Please try again later or contact support at support@acadevault.com.",
  });
}

// import { NextApiRequest, NextApiResponse } from "next";
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
