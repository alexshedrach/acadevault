"use client";

import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

export default function ChatPanel({
  messages = [],
  isTyping = false,
  onSendMessage,
  placeholder = "Type a message...",
}) {
  return (
    <div className="flex flex-col h-full">
      <ChatWindow messages={messages} isTyping={isTyping} />
      <MessageInput onSubmit={onSendMessage} placeholder={placeholder} />
    </div>
  );
}
