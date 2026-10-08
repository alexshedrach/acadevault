"use client";

import SectionHeader from "@/components/common/SectionHeader";
import Container from "@/components/layout/Container";
import { BiMoneyWithdraw } from "react-icons/bi";
import PaymentOptions from "./PaymentOptions";
import SecuredPaymentGateways from "./SecuredPaymentGateways";
import PaymentInstructions from "./PaymentInstructions";
import TermsOfUse from "./TermsOfUse";
import SecurityAndPrivacySection from "./SecurityAndPrivacySection";
import PaymentFAQs from "./PaymentFAQs";
import CustomerSupport from "./CustomerSupport";

export default function PaymentOptionsClient() {
  return (
    <>
      <SectionHeader
        title="How to Make Payments"
        description="Enjoy seamless, secure, and fast payment processing."
        headingLevel="h1"
        size="xl"
        icon={<BiMoneyWithdraw className="w-8 h-8" />}
        className="bg-white py-20"
      />

      {/* Payment Options Section */}
      <PaymentOptions />

      {/* Secured Payment Gateways */}
      <SecuredPaymentGateways />

      {/* Instructions After Payment */}
      <PaymentInstructions />

      {/* Terms of Use */}
      <TermsOfUse />

      {/* Security & Privacy */}
      <SecurityAndPrivacySection />

      {/* FAQ Section */}
      <PaymentFAQs />

      {/* Customer Support */}
      <CustomerSupport />
    </>
  );
}
