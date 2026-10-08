import React from "react";
import PropTypes from "prop-types";
import LiveChatCard from "@/components/chats/LiveChat/LiveChatCard";
import ShopContactForm from "./ShopContactForm";

export default function ShopContactSection({ shop, owner }) {
  return (
    <section
      aria-labelledby="contact-section-title"
      className="max-w-6xl mx-auto px-4 pb-12 bg-white rounded-2xl shadow-lg space-y-8"
    >
      {/* <h2
        id="contact-section-title"
        className="text-3xl font-semibold text-gray-800"
      >
        Contact {shop.name}
      </h2> */}

      {/* Guidance Box */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Need help deciding?
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
          <li>
            <strong>Live Chat</strong> for instant responses and casual
            inquiries.
          </li>
          <li>
            <strong>Contact Form</strong> for detailed requests, partnerships,
            or issues that need tracking.
          </li>
          <li>
            For urgent or sensitive matters, use the form to ensure proper
            routing and record-keeping.
          </li>
        </ul>
      </div>

      {/* Two-column layout: form + chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ShopContactForm shopId={shop.id} ownerName={owner?.name} />
        </div>

        <div>
          <LiveChatCard
            shopOwnerName={owner?.name}
            avatarUrl={owner?.avatarUrl}
          />
        </div>
      </div>
    </section>
  );
}

ShopContactSection.propTypes = {
  shop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};
