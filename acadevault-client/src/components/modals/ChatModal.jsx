"use client";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "../ui/Modal";
import { InputField } from "../forms/fields/InputField";
import Avatar from "../common/Avatar";
import { PaperclipIcon, XIcon } from "lucide-react";
import { HiEmojiHappy } from "react-icons/hi";

/**
 * ChatModal
 *
 * A production-ready chat window with:
 *  - Header (avatar, name, online status, close button)
 *  - Scrollable message list (with timestamps, typing indicator)
 *  - Fixed footer input area (emoji, file attach, text input, send button)
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} title
 * @param {string} avatarUrl
 * @param {boolean} isOnline
 * @param {Array<{sender,content,timestamp}>} initialMessages
 * @param {(msg: string | File) => Promise<string>} onSendMessage
 */
export default function ChatModal({
  isOpen,
  onClose,
  title,
  avatarUrl,
  isOnline = false,
  initialMessages = [],
  onSendMessage,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const endRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setMessages(initialMessages);
      setInput("");
      setAttachment(null);
    }
  }, [isOpen, initialMessages]);

  // Helper: append a new message
  const appendMessage = (sender, content) => {
    setMessages((m) => [...m, { sender, content, timestamp: new Date() }]);
  };

  // Handle “Send” (text or file)
  const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    setIsSending(true);

    // 1) Append user’s text if any
    if (input.trim()) {
      appendMessage("user", input.trim());
    }
    // 2) Append file placeholder if any
    if (attachment) {
      appendMessage("user", `📎 Sent a file: ${attachment.name}`);
    }

    const payload = attachment || input.trim();
    setInput("");
    setAttachment(null);

    try {
      // 3) Invoke parent send
      const reply = await onSendMessage(payload);
      appendMessage("agent", reply);
    } catch (err) {
      console.error("ChatModal error:", err);
      appendMessage("agent", "⚠️ Failed to send message. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Emoji picker stub
  const handleEmojiSelect = (emoji) => {
    setInput((i) => i + emoji);
    setShowEmojiPicker(false);
  };

  // File attachment handler
  const handleAttach = (e) => {
    const file = e.target.files[0];
    if (file) setAttachment(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      theme="light"
      draggable={false}
      footer={null}
      disableBackdropClose
      // Custom header slot
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Avatar
              src={avatarUrl}
              alt={`${title} avatar`}
              size={40}
              fallback="/avatars/default-avatar.png"
            />
            <div>
              <p className="font-semibold text-gray-900">{title}</p>
              <p
                className={`text-xs ${
                  isOnline ? "text-green-600" : "text-gray-500"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      }
    >
      {/* Message List */}
      <div className="relative flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50 border border-gray-200 rounded-md">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No messages yet. Say hello! 👋
          </p>
        )}

        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900"
              } shadow`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              <time className="block text-[10px] text-right opacity-50 mt-1">
                {m.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isSending && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
      {/* Fixed Footer Input */}
      {/* ───── Fixed Footer Input Area ───── */}
      <div
        role="group"
        aria-label="Chat message input area"
        className="mt-4 flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200"
      >
        {/* Emoji Picker */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((v) => !v)}
          aria-label="Open emoji picker"
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
        >
          <HiEmojiHappy className="w-5 h-5 text-indigo-600" />
        </button>

        {/* File Attachment */}
        <div className="relative">
          <label
            htmlFor="chat-attach"
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-indigo-500 transition inline-flex items-center justify-center"
            aria-label="Attach a file"
          >
            <PaperclipIcon className="w-5 h-5 text-indigo-600" />
            <input
              id="chat-attach"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleAttach}
            />
          </label>

          {/* File preview pill */}
          {attachment && (
            <div className="absolute -top-8 left-0 flex items-center bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 space-x-2 text-xs text-indigo-700">
              <span className="truncate max-w-[120px]">{attachment.name}</span>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                aria-label="Remove attachment"
                className="p-1 hover:bg-indigo-100 rounded-full transition"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="flex-1">
          <InputField
            name="chat-input"
            label={null}
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            required={false}
            error=""
            backendError=""
            showHint={false}
            className="!px-4 !py-2 rounded-xl bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500"
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={(!input.trim() && !attachment) || isSending}
          aria-label="Send message"
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
        >
          {isSending ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            <span className="font-medium">Send</span>
          )}
        </button>
      </div>
      {/* ───── Emoji Picker Panel (stub) ───── */}
      {showEmojiPicker && (
        <div
          role="dialog"
          aria-label="Emoji picker"
          className="absolute bottom-20 left-8 bg-white border border-gray-200 rounded-lg shadow-xl p-3 grid grid-cols-8 gap-2"
        >
          {/* Placeholder emojis; integrate your picker here */}
          {["😀", "😂", "😍", "👍", "🎉", "😢", "🙌", "🤔"].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiSelect(emoji)}
              className="p-1 rounded hover:bg-gray-100 transition text-xl"
              aria-label={`Insert ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

ChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  isOnline: PropTypes.bool,
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.oneOf(["user", "agent"]).isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onSendMessage: PropTypes.func.isRequired,
};
