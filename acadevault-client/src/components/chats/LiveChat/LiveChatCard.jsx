"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Avatar from "@/components/common/Avatar";
import { PhoneIcon, ClockIcon, InfoIcon } from "lucide-react";
import ChatModal from "@/components/modals/ChatModal";

export default function LiveChatCard({
  shopOwnerName,
  avatarUrl,
  businessHours,
  phone,
  presenceEndpoint,
  unreadEndpoint,
  ticketUrl,
}) {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll presence every 30s (or use WebSocket in production)
  useEffect(() => {
    let interval;
    async function fetchPresence() {
      try {
        const res = await fetch(presenceEndpoint);
        const { online: isOnline } = await res.json();
        setOnline(isOnline);
      } catch {
        /* handle error */
      }
    }
    fetchPresence();
    interval = setInterval(fetchPresence, 30000);
    return () => clearInterval(interval);
  }, [presenceEndpoint]);

  // Poll unread count every 15s
  useEffect(() => {
    let interval;
    async function fetchUnread() {
      try {
        const res = await fetch(unreadEndpoint);
        const { count } = await res.json();
        setUnreadCount(count);
      } catch {
        /* handle error */
      }
    }
    fetchUnread();
    interval = setInterval(fetchUnread, 15000);
    return () => clearInterval(interval);
  }, [unreadEndpoint]);

  // Simulate async reply; replace with real API call
  const sendMessage = async (msg) => {
    // Mark unread as zero when opening
    setUnreadCount(0);
    await new Promise((r) => setTimeout(r, 1200));
    return "Thanks for reaching out! We’ll be with you shortly.";
  };

  return (
    <>
      {/* Teaser Card */}
      <div className="relative bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center space-y-4">
        {/* Presence Badge */}
        <span
          className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
          title={online ? "Agent is online" : "Agent is offline"}
        />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </div>
        )}

        <Avatar
          src={avatarUrl}
          alt={shopOwnerName}
          size={56}
          fallback="/avatars/default-avatar.png"
        />
        <h3 className="text-2xl font-bold text-green-700">QuickConnect</h3>
        <p className="text-gray-600 text-sm max-w-xs">
          Live chat with {shopOwnerName} for instant support.
        </p>

        {/* Additional Info */}
        <div className="w-full grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center justify-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{businessHours || "Mon–Fri: 9am–6pm"}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <PhoneIcon className="w-4 h-4" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone || "+234 814 687 0361"}
            </a>
          </div>
        </div>

        {/* Info Tooltip */}
        <button
          onClick={() => alert("Agents respond within 1 hour when online.")}
          className="flex items-center text-gray-400 text-xs hover:text-gray-600 transition"
          aria-label="More info about response time"
        >
          <InfoIcon className="w-4 h-4 mr-1" />
          Response time
        </button>

        {/* CTA / Deep Link if ticket exists */}
        {ticketUrl ? (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            View Support Ticket
          </a>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition"
            aria-label={`Start live chat with ${shopOwnerName}`}
          >
            Start Chat
          </button>
        )}
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={shopOwnerName}
        avatarUrl={avatarUrl}
        onSendMessage={sendMessage}
        initialMessages={[
          {
            sender: "agent",
            content: "Hello! How can I assist you today?",
            timestamp: new Date(),
          },
        ]}
      />
    </>
  );
}

LiveChatCard.propTypes = {
  shopOwnerName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  businessHours: PropTypes.string,
  phone: PropTypes.string,
  /** API endpoint returning `{ online: boolean }` */
  presenceEndpoint: PropTypes.string.isRequired,
  /** API endpoint returning `{ count: number }` */
  unreadEndpoint: PropTypes.string.isRequired,
  /** If a ticket exists, deep-link to it */
  ticketUrl: PropTypes.string,
};

// "use client";

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import Avatar from "@/components/common/Avatar";
// import ChatModal from "../modals/ChatModal";
// import { PhoneIcon, ClockIcon, InfoIcon } from "lucide-react";

// export default function LiveChatCard({
//   shopOwnerName,
//   avatarUrl,
//   businessHours,
//   phone,
// }) {
//   const [open, setOpen] = useState(false);

//   // Simulate async reply; replace with real API call
//   const sendMessage = async (msg) => {
//     await new Promise((r) => setTimeout(r, 1200));
//     return "Thanks for reaching out! We’ll be with you shortly.";
//   };

//   return (
//     <>
//       {/* Teaser Card */}
//       <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center space-y-4">
//         <Avatar
//           src={avatarUrl}
//           alt={shopOwnerName}
//           size={56}
//           fallback="/avatars/default-avatar.png"
//         />
//         <h3 className="text-2xl font-bold text-green-700">QuickConnect</h3>
//         <p className="text-gray-600 text-sm max-w-xs">
//           Live chat with {shopOwnerName} for instant support.
//         </p>

//         {/* Additional Info */}
//         <div className="w-full grid grid-cols-2 gap-4 text-xs text-gray-500">
//           <div className="flex items-center justify-center gap-1">
//             <ClockIcon className="w-4 h-4" />
//             <span>{businessHours || "Mon–Fri: 9am–6pm"}</span>
//           </div>
//           <div className="flex items-center justify-center gap-1">
//             <PhoneIcon className="w-4 h-4" />
//             <a href={`tel:${phone}`} className="hover:underline">
//               {phone || "+234 800 123 4567"}
//             </a>
//           </div>
//         </div>

//         {/* Info Tooltip */}
//         <button
//           onClick={() => alert("Our agents typically respond within an hour!")}
//           className="flex items-center text-gray-400 text-xs hover:text-gray-600 transition"
//           aria-label="More info about chat response time"
//         >
//           <InfoIcon className="w-4 h-4 mr-1" />
//           Response time
//         </button>

//         {/* CTA */}
//         <button
//           onClick={() => setOpen(true)}
//           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition"
//           aria-label={`Start live chat with ${shopOwnerName}`}
//         >
//           Start Chat
//         </button>
//       </div>

//       {/* Chat Modal */}
//       <ChatModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         title={shopOwnerName}
//         avatarUrl={avatarUrl}
//         onSendMessage={sendMessage}
//         initialMessages={[
//           {
//             sender: "agent",
//             content: "Hello! How can I assist you today?",
//             timestamp: new Date(),
//           },
//         ]}
//       />
//     </>
//   );
// }

// LiveChatCard.propTypes = {
//   shopOwnerName: PropTypes.string.isRequired,
//   avatarUrl: PropTypes.string,
//   businessHours: PropTypes.string, // e.g. "Mon–Fri: 9am–6pm"
//   phone: PropTypes.string, // e.g. "+234 800 123 4567"
// };
