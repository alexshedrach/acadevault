"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaDownload,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { ProductJsonLd } from "next-seo";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";
import { jsPDF } from "jspdf";

function ShareButton({ url, title, platforms, onShare }) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };
  const platformIcons = {
    twitter: <FaTwitter className="w-5 h-5 text-gray-600" />,
    linkedin: <FaLinkedin className="w-5 h-5 text-gray-600" />,
    facebook: <FaFacebook className="w-5 h-5 text-gray-600" />,
  };

  return (
    <div className="flex justify-center gap-4">
      {platforms.map((platform) => (
        <a
          key={platform}
          href={shareLinks[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Share on ${
            platform.charAt(0).toUpperCase() + platform.slice(1)
          }`}
          onClick={onShare}
        >
          {platformIcons[platform]}
        </a>
      ))}
    </div>
  );
}

function EmailSubscriptionForm({ userEmail, onSubmit }) {
  const [email, setEmail] = useState(userEmail || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token":
            document.querySelector('meta[name="csrf-token"]')?.content || "",
        },
        body: JSON.stringify({ email }),
      });
      onSubmit();
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Stay Updated</h3>
      <p className="text-sm text-gray-600 mb-4">
        Subscribe to receive updates on your order and exclusive offers.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          aria-label="Email for subscription"
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          aria-label="Subscribe to newsletter"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}

export default function OrderSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams.get("orderId");
  const total = parseFloat(searchParams.get("total"));
  const email = searchParams.get("email");

  useEffect(() => {
    if (!orderId || !total || !email) {
      setError("Invalid order details. Please try again.");
      toast.error("Invalid order details. Please try again.");
      setIsLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/last`,
          {
            headers: {
              Authorization: user
                ? `Bearer ${localStorage.getItem("token")}`
                : "",
              "Content-Type": "application/json",
              "X-CSRF-Token":
                document.querySelector('meta[name="csrf-token"]')?.content ||
                "",
            },
          }
        );
        if (!response.ok)
          throw new Error(`Failed to fetch order details: ${response.status}`);
        const data = await response.json();
        setOrderDetails(data);
        trackEvent("view_order_success", {
          event_label: "Order Success Page",
          value: total,
          order_id: orderId,
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, total, email, user, router]);

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    doc.text(
      `Order Receipt\n\nOrder ID: ${orderId}\nTotal: $${total.toFixed(
        2
      )}\nEmail: ${email}\nOrder Date: ${format(new Date(), "PPp")}${
        orderDetails
          ? `\nTopic: ${orderDetails.topic}\nDeadline: ${format(
              new Date(orderDetails.deadline),
              "PP"
            )}`
          : ""
      }`,
      10,
      10
    );
    doc.save(`receipt_${orderId}.pdf`);
    trackEvent("download_receipt", {
      event_label: "Download Receipt",
      order_id: orderId,
    });
  };

  const handleLinkClick = (label) => {
    trackEvent("click_order_success_link", {
      event_label: label,
      order_id: orderId,
    });
  };

  if (error) {
    return (
      <motion.section
        className="py-16 bg-gradient-to-br from-white via-red-50 to-red-100 min-h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="alert"
        aria-live="assertive"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaExclamationCircle
            className="text-red-500 w-20 h-20 mx-auto mb-6"
            aria-hidden="true"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => router.push("/hire-writer/pricing")}
              variant="default"
              aria-label="Return to quote form"
            >
              Back to Quote Form
            </Button>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              aria-label="Contact support"
              onClick={() => handleLinkClick("Contact Support")}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <ProductJsonLd
        type="WebPage"
        name="Order Success - AcaDeVault"
        description="Thank you for your order with AcaDeVault. Track your order, download your receipt, or contact support."
        offers={{
          "@type": "Offer",
          price: total || 0,
          priceCurrency: "USD",
        }}
      />
      <motion.section
        className="py-16 bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="main"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaCheckCircle
            className="text-green-500 w-20 h-20 mx-auto mb-6"
            aria-hidden="true"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Your order (#{orderId}) has been successfully processed. A
            confirmation email has been sent to {email}. You can track your
            order progress in real-time or view your order history.
          </p>

          {isLoading ? (
            <div className="animate-pulse bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-8">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ) : orderDetails ? (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <dl className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Order ID:</dt>
                  <dd className="font-medium">{orderDetails.orderId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Topic:</dt>
                  <dd className="font-medium truncate max-w-xs">
                    {orderDetails.topic}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Estimated Price:</dt>
                  <dd className="font-medium">
                    ${orderDetails.estimatedPrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Estimated Delivery:</dt>
                  <dd className="font-medium">
                    {format(new Date(orderDetails.deadline), "PP")}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href={`/hire-writer/order?orderId=${orderId}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Track your order"
              onClick={() => handleLinkClick("Track Order")}
            >
              Track Order
            </Link>
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="px-6 py-3 flex items-center"
              aria-label="Download order receipt"
            >
              <FaDownload className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              aria-label="Contact support"
              onClick={() => handleLinkClick("Contact Support")}
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="px-6 py-3 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Return to homepage"
              onClick={() => handleLinkClick("Back to Home")}
            >
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <ShareButton
              url="https://acadevault.com"
              title="I just ordered an academic project from AcaDeVault!"
              platforms={["twitter", "linkedin", "facebook"]}
              onShare={() => handleLinkClick("Social Share")}
            />
          </div>

          <EmailSubscriptionForm
            userEmail={user?.email || email}
            onSubmit={() => {
              handleLinkClick("Subscribe Newsletter");
              toast.success("Subscribed successfully!");
            }}
          />
        </div>
      </motion.section>
    </>
  );
}
