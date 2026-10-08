"use client";

import React from "react";
import BorderBottom from "../common/BorderBottom";
import Heading from "../common/Heading";
import ButtonLink from "../common/ButtonLink";


export default function OnlinePaymentOptions() {
  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md mb-8">
      <p className="text-3xl font-medium text-gray-400 mb-4">Option 02</p>
      <BorderBottom>
        <Heading as="h4" variation="secondary">
          Pay Online via Secured Payment Gateways (Verve, Visa or MasterCard)
        </Heading>
      </BorderBottom>
      <div className="space-y-6 mt-6">
        <div className="p-4 border rounded shadow-sm text-center">
          <img
            src="/payment.png"
            alt="Paystack with Verve, Visa &amp; MasterCard"
            className="h-80 mx-auto object-contain mb-4"
          />
          <ButtonLink variation="primary" to="/">
            Make Payment Now Via Paystack
          </ButtonLink>
        </div>
        <div className="p-4 border rounded shadow-sm text-center">
          <img
            src="/paypal-payments.png"
            alt="Paypal Payment Gateway"
            className="h-80 mx-auto object-contain mb-4"
          />
          <ButtonLink variation="secondary" to="/">
            Make Payment Now Via Paypal
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
