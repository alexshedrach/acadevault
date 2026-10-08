"use client";

import {
  MessageCircleMore,
  Bot,
  PhoneCall,
  Dot,
  CircleDot,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Mock presence state (replace with live data from backend or chat provider)
const mockStatus = {
  whatsapp: true,
  messenger: false,
  inApp: true,
};

export default function LiveChatSupportSection() {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Simulate typing status with a timeout
    const timeout = setTimeout(() => setTyping(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Need Instant Help?
          </h2>
          <p className="mt-2 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Reach out to our support team through live chat channels. We're here
            to assist you 24/7. If no agent is available, our intelligent
            chatbot will assist you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* WhatsApp Support */}
          <ChatCard
            icon={
              <MessageCircleMore className="w-8 h-8 text-green-600 mx-auto mb-4" />
            }
            title="WhatsApp Chat"
            description="Start a conversation instantly via WhatsApp."
            href="https://wa.me/2348001234567"
            status={mockStatus.whatsapp}
            provider="whatsapp"
            color="green"
          />

          {/* Messenger Support */}
          <ChatCard
            icon={<Bot className="w-8 h-8 text-blue-500 mx-auto mb-4" />}
            title="Facebook Messenger"
            description="Reach us on Messenger for quick responses."
            href="https://m.me/acadevault"
            status={mockStatus.messenger}
            provider="messenger"
            color="blue"
          />

          {/* In-App Chat */}
          <ChatCard
            icon={
              <PhoneCall className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            }
            title="In-App Chat"
            description="Talk with our support agents in real time or use our AI-powered FAQ bot."
            href="#"
            status={mockStatus.inApp}
            provider="inapp"
            typing={typing}
            onClick={() => {
              if (window.AcadeVaultChat) {
                window.AcadeVaultChat.open();
              } else {
                alert("In-App Chat coming soon!");
              }
            }}
            color="indigo"
            inApp
          />
        </div>
      </div>
    </section>
  );
}

function ChatCard({
  icon,
  title,
  description,
  href,
  status = false,
  typing = false,
  provider,
  onClick,
  color = "gray",
  inApp = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition bg-white text-left"
    >
      <div className="flex justify-between items-center">
        {icon}
        <Badge className={`text-white text-xs bg-${color}-600`}>
          {status ? "Online" : "Offline"}
        </Badge>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mt-3">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>

      {inApp && typing && (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          Agent is typing...
        </div>
      )}

      <Button
        as={inApp ? "button" : "a"}
        href={inApp ? undefined : href}
        target={inApp ? undefined : "_blank"}
        rel={inApp ? undefined : "noopener noreferrer"}
        onClick={onClick}
        className={`mt-4 w-full bg-${color}-600 hover:bg-${color}-700 text-white`}
      >
        {inApp ? "Open Chat" : `Chat on ${title.split(" ")[0]}`}
      </Button>

      {inApp && (
        <div className="mt-4 bg-gray-50 p-3 rounded-md text-sm text-gray-600">
          <strong>FAQ Bot:</strong> Can’t find an agent? Try asking:
          <ul className="list-disc ml-4 mt-2">
            <li>How do I download materials?</li>
            <li>What payment options are available?</li>
            <li>Can I get a refund?</li>
          </ul>
        </div>
      )}
    </motion.div>
  );
}
