"use client";

import React from "react";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ msg }) {
  const isUser = msg.type === "user";
  return (
    <li
      className={`flex items-end ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && <Bot className="w-5 h-5 text-indigo-500 mr-2" />}
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white text-gray-900 rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>
      {isUser && <User className="w-5 h-5 text-gray-400 ml-2" />}
    </li>
  );
}
