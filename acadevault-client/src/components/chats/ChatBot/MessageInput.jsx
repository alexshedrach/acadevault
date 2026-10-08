"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSubmit, placeholder }) {
  const [val, setVal] = useState("");
  const handle = () => {
    if (!val.trim()) return;
    onSubmit(val);
    setVal("");
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
      className="flex border-t border-gray-200 p-3 bg-white"
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        disabled={!val.trim()}
        className="px-4 bg-indigo-600 text-white rounded-r-md disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
