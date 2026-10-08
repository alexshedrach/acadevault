"use client";

import React from "react";
import { useFAQChatbot } from "@/hooks/useFAQChatbot";
import ChatHeader from "./ChatHeader";
import FAQSuggestions from "./FAQSuggestions";
import { FileQuestion, Info } from "lucide-react";
import ChatPanel from "./ChatPanel";
import EmptyState from "../../states/EmptyState";

export default function FAQChatbot({
  title = "How can I help you?",
  faqs = [],
  fallbackFAQs = [],
  aiFallback, // optional async fn(question)=>answer
}) {
  const { messages, isTyping, containerRef, sendQuestion, activeFAQs } =
    useFAQChatbot({ faqs, fallbackFAQs, aiFallback });

  // nothing to show?
  if (!faqs.length && !fallbackFAQs.length && !aiFallback) {
    return (
      <EmptyState
        title="No FAQs Available"
        message="This resource has no FAQs configured."
        icon={<FileQuestion size={48} className="text-indigo-500" />}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* header */}
      <ChatHeader title={title} />

      {/* suggestions */}
      <div className="px-6 pt-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Info size={18} className="text-indigo-500" />
          <span className="text-sm font-medium">Try these questions</span>
        </div>
        <FAQSuggestions
          faqs={activeFAQs}
          onClick={sendQuestion}
          maxSuggestions={6}
        />
      </div>

      {/* chat */}
      <div
        ref={containerRef}
        className="h-64 px-6 overflow-y-auto border-t border-b border-gray-200"
        role="log"
        aria-live="polite"
      >
        <ChatPanel
          messages={messages}
          isTyping={isTyping}
          onSendMessage={sendQuestion}
          placeholder="Type your question..."
        />
      </div>
    </div>
  );
}
