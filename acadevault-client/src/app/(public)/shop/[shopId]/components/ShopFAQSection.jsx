"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash";
import FAQChatbot from "@/components/chats/ChatBot/FAQChatbot";

export default function ShopFAQSection({ shop }) {
  const resourceType = "shop";
  const resourceId = shop.id;

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch FAQs on mount / shop change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/ai/faq?resourceType=${resourceType}&resourceId=${resourceId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          if (Array.isArray(data.faqs)) setFaqs(data.faqs);
          else console.warn("Unexpected FAQ payload:", data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resourceType, resourceId]);

  // 2. Debounced AI fallback
  const aiFallback = useCallback(
    debounce(async (question) => {
      try {
        const res = await fetch("/api/ai/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, resourceType, resourceId }),
        });
        const json = await res.json();
        if (typeof json.answer === "string") return json.answer;
      } catch (err) {
        console.error("[AI fallback error]", err);
      }
      return "Sorry, I can’t answer that right now. Please try again later or contact support at support@acadevault.com.";
    }, 300),
    [resourceType, resourceId]
  );

  // 3. Render loading / error / chatbot
  if (loading) {
    return (
      <section className="my-12">
        <p className="text-gray-500 animate-pulse">Loading FAQs…</p>
      </section>
    );
  }

  if (error) {
    console.error("[ShopFAQ] load error:", error);
    return (
      <section className="my-12">
        <p className="text-red-500">
          Failed to load FAQs.{" "}
          <button
            onClick={() => {
              // simply re-trigger the effect
              setLoading(true);
            }}
            className="underline"
          >
            Retry?
          </button>
        </p>
      </section>
    );
  }

  return (
    <section className="my-12">
      <FAQChatbot
        title="Need help with this shop?"
        faqs={faqs}
        fuzzyMatch={true}
        aiFallback={aiFallback}
      />
    </section>
  );
}

// import FAQChatbot from "@/components/chats/FAQChatbot";

// export default function ShopFAQSection({ faqs }) {
//   return (
//     <section className="my-12">
//       <FAQChatbot
//         title="Need help with this shop?"
//         faqs={faqs}
//         aiFallback={async (q) => {
//           try {
//             const res = await fetch("/api/ai/faq", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ question: q }),
//             });
//             const json = await res.json();
//             if (typeof json.answer === "string") {
//               return json.answer;
//             }
//           } catch (e) {
//             console.error("AI fallback failure:", e);
//           }
//           // Final fallback if AI endpoint is broken
//           return "Sorry, I can’t answer that right now. Please try again later or contact support at support@acadevault.com.";
//         }}
//         fuzzyMatch={true}
//       />
//     </section>
//   );
// }
