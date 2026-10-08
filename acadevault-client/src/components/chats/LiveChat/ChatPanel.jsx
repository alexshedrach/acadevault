"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);

  // Open chat panel when URL hash is #chat
  useEffect(() => {
    if (window.location.hash === "#chat") {
      setIsOpen(true);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleNewConversation = () => {
    // TODO: Integrate with live chat service (e.g., Intercom) or backend API
    console.log("Starting new conversation...");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
        aria-label="Toggle chat panel"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl p-4 z-50 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Chat with Us
            </h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close chat panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">Welcome! How can we help you today?</p>
            <button
              onClick={handleNewConversation}
              className="w-full bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition duration-300"
            >
              New Conversation
            </button>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Support available 9 AM - 5 PM WAT</span>
              <a
                href="mailto:support@acadevault.com"
                className="text-blue-600 hover:underline"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import { useChat } from "@/contexts/ChatContext";
// import { X } from "lucide-react";

// export default function ChatPanel() {
//   const { isOpen, closeChat } = useChat();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-40 flex" aria-modal="true" role="dialog">
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/40" onClick={closeChat} />

//       {/* Panel */}
//       <div className="relative ml-auto w-full max-w-md h-full bg-white shadow-xl flex flex-col">
//         <header className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Chat with Us</h2>
//           <button
//             onClick={closeChat}
//             aria-label="Close chat"
//             className="p-2 rounded hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </header>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Replace with your actual chat UI */}
//           <p className="text-gray-500 text-sm">
//             Welcome! How can we help you today?
//           </p>
//         </div>

//         <footer className="p-4 border-t">
//           <input
//             type="text"
//             placeholder="Type your message…"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </footer>
//       </div>
//     </div>
//   );
// }
