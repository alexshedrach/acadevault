"use client";

import React from "react";
import PropTypes from "prop-types";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ShopContactForm({ shopId, ownerName, avatarUrl }) {
  return (
    <ContactForm
      endpoint={`/api/shops/${shopId}/contact`}
      hiddenFields={{ shopId, role: "shop" }}
      reasonOptions={[
        { value: "", label: "Select reason…" },
        { value: "Product Inquiry", label: "Product Inquiry" },
        { value: "Pricing", label: "Pricing" },
        { value: "Support", label: "Support" },
      ]}
      onSuccess={() => alert(`Message sent to ${ownerName}!`)}
    />
  );
}

ShopContactForm.propTypes = {
  shopId: PropTypes.string.isRequired,
  ownerName: PropTypes.string,
};
