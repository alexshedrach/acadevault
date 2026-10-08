"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { ProductJsonLd } from "next-seo";
import { useAuth } from "@/hooks/useAuth";

export default function ThankYouScreen() {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  useEffect(() => {
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
        if (!response.ok) throw new Error("Failed to fetch order details");
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError("Unable to load order details. Please contact support.");
        toast.error("Failed to load order details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user]);

  // Track page view and interactions
  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "view_thank_you", {
        event_category: "engagement",
        event_label: "Thank You Screen",
        order_id: orderDetails?.orderId || "unknown",
      });
    }
  }, [orderDetails]);

  const handleLinkClick = (label) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "click_thank_you_link", {
        event_category: "engagement",
        event_label: label,
        order_id: orderDetails?.orderId || "unknown",
      });
    }
  };

  if (error) {
    return (
      <motion.section
        className="py-16 bg-gradient-to-br from-white via-red-50 to-red-100 min-h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="alert"
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
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Contact support"
            onClick={() => handleLinkClick("Contact Support")}
          >
            Contact Support
          </Link>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <ProductJsonLd
        type="WebPage"
        name="Thank You - AcaDeVault"
        description="Thank you for your order with AcaDeVault. Track your order, view details, or contact support."
        offers={{
          "@type": "Offer",
          price: orderDetails?.estimatedPrice || 0,
          priceCurrency: "NGN",
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
            Your order has been successfully processed. You'll receive a
            confirmation email with details, and you can track your order
            progress at any time.
          </p>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
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
                    ₦{orderDetails.estimatedPrice.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Estimated Delivery:</dt>
                  <dd className="font-medium">
                    {new Date(orderDetails.deadline).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href="/hire-writer/order"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Track your order"
              onClick={() => handleLinkClick("Track Order")}
            >
              Track Order
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onShare={() =>
                window.gtag("event", "share_thank_you", {
                  event_category: "engagement",
                  event_label: "Social Share",
                })
              }
            />
          </div>

          <EmailSubscriptionForm
            userEmail={user?.email}
            onSubmit={() => {
              window.gtag("event", "subscribe_newsletter", {
                event_category: "engagement",
                event_label: "Thank You Screen Subscription",
              });
              toast.success("Subscribed successfully!");
            }}
          />
        </div>
      </motion.section>
    </>
  );
}

// ShareButton component (simplified example)
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

  return (
    <div className="flex justify-center gap-4">
      {platforms.map((platform) => (
        <a
          key={platform}
          href={shareLinks[platform]}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Share on ${platform}`}
          onClick={onShare}
        >
          <span className="sr-only">Share on {platform}</span>
          <svg className="w-5 h-5 text-gray-600" fill="currentColor">
            {/* Placeholder SVG; replace with actual icons */}
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
          </svg>
        </a>
      ))}
    </div>
  );
}

// EmailSubscriptionForm component (simplified example)
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md text-white ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          aria-label="Subscribe to newsletter"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
}
