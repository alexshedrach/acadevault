"use client";

import React, { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages = [], isTyping }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <ul
      ref={ref}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar"
    >
      {messages.map((m, i) => (
        <ChatMessage key={i} msg={m} />
      ))}
      {isTyping && (
        <li className="text-left">
          <Loader2 className="animate-spin w-5 h-5 text-gray-400" />
        </li>
      )}
    </ul>
  );
}
