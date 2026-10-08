"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function ChatBotWidget() {
  useEffect(() => {
    // Initialize your chatbot SDK or custom logic here
  }, []);

  return (
    <div
      id="chatbot-widget"
      className="fixed bottom-24 right-6 z-40 w-80 max-w-full rounded-lg bg-white shadow-xl"
    >
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h4 className="text-lg font-medium">Chat with us</h4>
        <button
          aria-label="Close chat"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => {
            document.getElementById("chatbot-widget")?.classList.add("hidden");
          }}
        >
          <FiX size={20} />
        </button>
      </div>
      <div className="p-4">
        {/* Replace with your chatbot UI or embed code */}
        <p className="text-gray-600">Hi there! How can we help?</p>
      </div>
    </div>
  );
}
