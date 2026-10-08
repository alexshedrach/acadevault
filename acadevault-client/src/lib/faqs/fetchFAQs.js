import globalFAQs from "@/data/globalFAQs.json"; // ensure this is JSON
import Fuse from "fuse.js";

const BASE = process.env.NEXT_PUBLIC_API_URL || ""; // e.g. "https://acadevault.com"

export async function fetchFAQs(resourceType, resourceId) {
  try {
    const res = await fetch(`${BASE}/api/faqs/${resourceType}/${resourceId}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.faqs)) {
      throw new Error("Bad shape");
    }
    // ensure items have question+answer
    return json.faqs.filter(
      (f) => f && typeof f.question === "string" && typeof f.answer === "string"
    );
  } catch (err) {
    console.warn(`[fetchFAQs] shop/${resourceId} failed, using fallback:`, err);
    // static fallback
    return Array.isArray(globalFAQs)
      ? globalFAQs.filter(
          (f) =>
            f && typeof f.question === "string" && typeof f.answer === "string"
        )
      : [];
  }
}

export function fuzzyAnswer(question, faqs) {
  if (!faqs.length) {
    return "No FAQs available at the moment.";
  }
  const fuse = new Fuse(faqs, { keys: ["question"], threshold: 0.4 });
  const r = fuse.search(question);
  return r.length ? r[0].item.answer : "I couldn’t find a matching FAQ.";
}
