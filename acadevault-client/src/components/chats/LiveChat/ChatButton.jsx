"use client";

import { useChat } from "@/contexts/ChatContext";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  const { toggleChat } = useChat();

  return (
    <button
      onClick={toggleChat}
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
