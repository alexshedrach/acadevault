'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/utils/analytics";

// Placeholder for real payment gateway (e.g., Stripe)
const PaymentGateway = ({
  orderId,
  total,
  email,
  onSuccess,
  onError,
  loading,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Complete Your Payment
      </h2>
      <p className="text-sm text-gray-600">
        Order #{orderId} - Pay ${total.toFixed(2)} to confirm your order.
      </p>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <Button
        onClick={() => {
          // Simulate payment processing
          setTimeout(() => {
            if (Math.random() > 0.2) {
              onSuccess();
              toast.success("Payment successful!");
            } else {
              onError(new Error("Payment failed. Please try again."));
              toast.error("Payment failed. Please try again.");
            }
          }, 1000);
        }}
        className="w-full"
        variant="default"
        disabled={loading}
        aria-label="Complete payment"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </Button>
    </div>
  );
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const orderId = searchParams.get("orderId");
  const total = parseFloat(searchParams.get("total"));
  const email = searchParams.get("email");

  useEffect(() => {
    if (!orderId || !total || !email) {
      toast.error("Invalid payment details. Please try again.");
      router.push("/hire-writer/pricing"); // Redirect back to form
    }
  }, [orderId, total, email, router]);

  const handlePaymentSuccess = () => {
    trackEvent("payment_success", {
      event_label: "Payment Success",
      value: total,
    });
    router.push(
      `/hire-writer/order/order-success?orderId=${orderId}&total=${total}&email=${encodeURIComponent(
        email
      )}`
    );
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setLoading(false);
    toast.error(error.message || "Payment failed. Please try again.");
  };

  if (!orderId || !total || !email) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Invalid Payment Details
          </h2>
          <p className="text-gray-600 mt-2">
            Please return to the quote form and try again.
          </p>
          <Button
            onClick={() => router.push("/custom-quote")}
            className="mt-4"
            variant="default"
            aria-label="Return to quote form"
          >
            Back to Quote Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <PaymentGateway
        orderId={orderId}
        total={total}
        email={email}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        loading={loading}
      />
    </div>
  );
}
