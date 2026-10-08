"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Library, User, Users } from "lucide-react";

/**
 * AcadeVaultPricingSection
 *
 * Renders a three-column pricing section:
 *  - Student Plan (Individuals)
 *  - Academic Team Plan (Small Teams)
 *  - Institutional Plan (Large Organizations)
 *
 * Each card has a purple top border, a title, target audience, pricing info,
 * a CTA button, and a bullet-list of features.
 *
 * Usage:
 *   <AcadeVaultPricingSection />
 *
 * Tailwind classes ensure a responsive, accessible, and production-ready layout.
 */
export default function AcadeVaultPricingSection() {
  // Define plan data in an array to simplify mapping to JSX.
  const plans = [
    {
      id: "student",
      title: "Student Plan",
      subtitle: "For individual learners",
      price: "₦5,000",
      frequency: "month",
      ctaText: "Start Free Trial",
      ctaHref: "/signup?plan=student",
      icon: <User className="w-5 h-5 text-indigo-600" />,
      features: [
        "Access to 10,000+ academic materials",
        "Interactive quizzes & practice exercises",
        "Personalized study recommendations",
        "Quick-view summaries on mobile",
      ],
      isHighlighted: false,
    },
    {
      id: "team",
      title: "Team Plan",
      subtitle: "For study groups & labs (2–10 users)",
      price: "₦12,000",
      frequency: "per user / month",
      ctaText: "Start Free Trial",
      ctaHref: "/signup?plan=team",
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      features: [
        "Everything in Student Plan",
        "Shared group libraries & notes",
        "Team performance analytics",
        "Role-based access control",
      ],
      isHighlighted: true, // This plan has a bolder purple border
    },
    {
      id: "institution",
      title: "Institutional Plan",
      subtitle: "For universities & large organizations",
      price: "Contact Sales",
      frequency: null,
      ctaText: "Request a Demo",
      ctaHref: "/contact-sales",
      icon: <Library className="w-5 h-5 text-indigo-600" />,
      features: [
        "Everything in Team Plan",
        "Dedicated account manager & onboarding",
        "Custom integrations (LMS, SSO, etc.)",
        "Advanced analytics & reporting",
        "Unlimited users & materials",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <Container as="section" className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      {/* Section heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Accelerate Your Academic Journey
        </h2>
        <p className="mt-4 text-gray-600">
          Choose the plan that fits your needs—whether you’re an individual
          student, a study group, or an entire institution. Try one free today
          or contact us to learn more.
        </p>
      </div>

      {/* Pricing cards container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              flex flex-col justify-between rounded-lg border 
              bg-white shadow-sm transition-shadow duration-200
              ${plan.isHighlighted ? "border-indigo-600" : "border-gray-200"}
            `}
          >
            {/* Top accent bar for highlight */}
            <div
              className={`
                h-1 rounded-t-lg ${
                  plan.isHighlighted ? "bg-indigo-600" : "bg-gray-300"
                }
              `}
            />

            {/* Card content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Icon + Title */}
              <div className="flex items-center space-x-2 mb-4">
                {plan.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">{plan.subtitle}</p>

              {/* Price */}
              <div className="text-gray-900 mb-6">
                {plan.price !== "Contact Sales" ? (
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-gray-500">
                      /{plan.frequency}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-semibold">Contact Sales</span>
                )}
              </div>

              {/* CTA Button */}
              <div className="mb-6">
                <Link
                  href={plan.ctaHref}
                  className={`
                    block w-full text-center px-4 py-2 rounded-md font-medium
                    ${
                      plan.isHighlighted
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                    }
                    transition-colors duration-200
                  `}
                >
                  {plan.ctaText}
                </Link>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-green-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-gray-600 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
