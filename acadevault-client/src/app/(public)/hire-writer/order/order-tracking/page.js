"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Assigning Writer",
    description: "Finding the perfect writer for your project.",
    progress: 25,
  },
  {
    id: 2,
    name: "Writing in Progress",
    description: "Your writer is working on your project.",
    progress: 50,
  },
  {
    id: 3,
    name: "Quality Check",
    description: "Ensuring top-notch quality and originality.",
    progress: 75,
  },
  {
    id: 4,
    name: "Delivery",
    description: "Your project is ready for download!",
    progress: 100,
  },
];

export default function LiveOrderTrackerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = searchParams.get("orderId");

  // Fetch order details
  useEffect(() => {
    if (!orderId) {
      toast.error("Invalid order ID. Please try again.");
      router.push("/dashboard/orders");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
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
        setCurrentStep(data.status);
        setProgress(steps.find((s) => s.name === data.status)?.progress || 0);
        setEstimatedTime(data.estimatedTime || null);
        setIsLoading(false);
        trackEvent("view_order_tracker", {
          event_label: "Order Tracker Page",
          order_id: orderId,
        });
      } catch (err) {
        setConnectionError(err.message);
        toast.error(err.message);
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user, router]);

  // WebSocket for real-time updates
  const connectWebSocket = useCallback(() => {
    if (!user || !orderId) return;
    const ws = new WebSocket(
      `${
        process.env.NEXT_PUBLIC_WS_URL
      }/order-status?token=${encodeURIComponent(
        localStorage.getItem("token")
      )}&orderId=${orderId}`
    );

    ws.onopen = () => {
      setConnectionError(null);
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentStep(data.status);
      setProgress(
        data.progress ||
          steps.find((s) => s.name === data.status)?.progress ||
          0
      );
      setEstimatedTime(data.estimatedTime || null);
      toast.success(`Order updated: ${data.status}`);
      trackEvent("order_status_update", {
        event_label: `Order Tracker - ${data.status}`,
        order_id: orderId,
      });
    };

    ws.onerror = () => {
      setConnectionError("Failed to connect to real-time updates.");
      toast.error("Connection lost. Retrying...");
    };

    ws.onclose = () => {
      setTimeout(connectWebSocket, 5000);
    };

    return () => ws.close();
  }, [user, orderId]);

  useEffect(() => {
    const cleanup = connectWebSocket();
    return cleanup;
  }, [connectWebSocket]);

  // Fallback to polling
  useEffect(() => {
    if (connectionError) {
      const pollStatus = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/order/status/${orderId}`,
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
          if (!response.ok) throw new Error("Failed to fetch status");
          const data = await response.json();
          setCurrentStep(data.status);
          setProgress(steps.find((s) => s.name === data.status)?.progress || 0);
          setEstimatedTime(data.estimatedTime || null);
          setConnectionError(null);
        } catch (err) {
          setConnectionError("Unable to fetch order status.");
        }
      };
      const interval = setInterval(pollStatus, 10000);
      return () => clearInterval(interval);
    }
  }, [connectionError, user, orderId]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (connectionError && !orderDetails) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Error Loading Order
        </h2>
        <p className="text-gray-600 mt-2">{connectionError}</p>
        <Button
          onClick={() => router.push("/dashboard/orders")}
          className="mt-4"
          variant="default"
          aria-label="View order history"
        >
          View Order History
        </Button>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((s) => s.name === currentStep);

  return (
    <motion.div
      className="max-w-5xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="main"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Track Your Order
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Order Progress (#{orderId})
          </h2>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            aria-label={
              isCollapsed ? "Expand order tracker" : "Collapse order tracker"
            }
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <FaChevronDown className="w-5 h-5" />
            ) : (
              <FaChevronUp className="w-5 h-5" />
            )}
          </Button>
        </div>

        {connectionError && (
          <div
            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
            role="alert"
          >
            {connectionError}
            <Button
              onClick={connectWebSocket}
              variant="ghost"
              className="ml-2 text-blue-600 underline"
              aria-label="Retry connection"
            >
              Retry
            </Button>
          </div>
        )}

        {!isCollapsed && (
          <>
            {orderDetails && (
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Order Details
                </h3>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Topic:</dt>
                    <dd className="font-medium truncate max-w-xs">
                      {orderDetails.topic}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Estimated Delivery:</dt>
                    <dd className="font-medium">
                      {format(new Date(orderDetails.deadline), "PP")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total Paid:</dt>
                    <dd className="font-medium">
                      ${orderDetails.estimatedPrice.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <motion.div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  aria-label={`Progress: ${progress}%`}
                />
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {index <= currentStepIndex ? (
                      <FaCheckCircle
                        className="text-green-500 w-6 h-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaSpinner
                        className="text-gray-400 w-6 h-6 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {s.name}
                    </p>
                    <p className="text-sm text-gray-600">{s.description}</p>
                    {index === currentStepIndex && estimatedTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated:{" "}
                        {format(
                          new Date(estimatedTime),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {currentStep === "Delivery" && (
              <Button
                onClick={() => {
                  trackEvent("download_order", {
                    event_label: "Download Order",
                    order_id: orderId,
                  });
                  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/download`;
                }}
                className="mt-6 w-full"
                variant="default"
                aria-label="Download completed order"
              >
                Download Order
              </Button>
            )}
          </>
        )}
      </div>

      <div className="mt-6 flex gap-4 justify-center">
        <Link
          href="/dashboard/orders"
          className="px-4 py-2 text-blue-600 hover:underline"
          aria-label="View order history"
          onClick={() =>
            trackEvent("click_order_history", {
              event_label: "View Order History",
              order_id: orderId,
            })
          }
        >
          View Order History
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 text-blue-600 hover:underline"
          aria-label="Contact support"
          onClick={() =>
            trackEvent("click_contact_support", {
              event_label: "Contact Support",
              order_id: orderId,
            })
          }
        >
          Contact Support
        </Link>
      </div>
    </motion.div>
  );
}
