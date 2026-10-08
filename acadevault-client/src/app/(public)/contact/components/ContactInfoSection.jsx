"use client";

import { MapPin, Phone, Mail, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const contactItems = [
  {
    icon: MapPin,
    title: "Head Office",
    content: (
      <address className="not-italic leading-relaxed text-gray-600">
        123 Knowledge Ave
        <br />
        Unwana, Ebonyi State
        <br />
        Nigeria, ZIP 480101
      </address>
    ),
    actions: [
      {
        label: "View on Map",
        href: "https://maps.google.com?q=123+Knowledge+Ave+Unwana+Nigeria",
      },
    ],
    ariaLabel: "Head office address and map link",
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <>
        <Link
          href="tel:+2348001234567"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          +234 800 123 4567
        </Link>
        <span className="text-sm text-gray-500">Mon–Fri, 9AM–6PM WAT</span>
      </>
    ),
    actions: [
      {
        label: "Call Now",
        href: "tel:+2348001234567",
      },
    ],
    ariaLabel: "Contact phone number and call link",
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <>
        <Link
          href="mailto:support@acadevault.com"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          support@acadevault.com
        </Link>
        <span className="text-sm text-gray-500">Reply within 24 hours</span>
      </>
    ),
    actions: [
      {
        label: "Send Email",
        href: "mailto:support@acadevault.com",
      },
    ],
    ariaLabel: "Support email address and email link",
  },
  {
    icon: LifeBuoy,
    title: "Help & Support",
    content: (
      <p className="text-gray-600">
        Visit our support center for assistance with any issues or questions.
      </p>
    ),
    actions: [
      {
        label: "Go to Help Center",
        href: "/support",
      },
    ],
    ariaLabel: "Help and support center link",
  },
  //   {
  //   icon: Mail,
  //   title: "Support Emails",
  //   content: (
  //     <ul className="space-y-1 text-left text-gray-600">
  //       <li>
  //         <strong>Technical Support: </strong>
  //         <Link
  //           href="mailto:techsupport@acadevault.com"
  //           className="text-blue-500 hover:text-blue-600 transition-colors"
  //         >
  //           techsupport@acadevault.com
  //         </Link>
  //       </li>
  //       <li>
  //         <strong>Business & Partnerships: </strong>
  //         <Link
  //           href="mailto:partners@acadevault.com"
  //           className="text-blue-500 hover:text-blue-600 transition-colors"
  //         >
  //           partners@acadevault.com
  //         </Link>
  //       </li>
  //       <li>
  //         <strong>Academic Contributors: </strong>
  //         <Link
  //           href="mailto:contributors@acadevault.com"
  //           className="text-blue-500 hover:text-blue-600 transition-colors"
  //         >
  //           contributors@acadevault.com
  //         </Link>
  //       </li>
  //       <li>
  //         <strong>Payments & Refunds: </strong>
  //         <Link
  //           href="mailto:billing@acadevault.com"
  //           className="text-blue-500 hover:text-blue-600 transition-colors"
  //         >
  //           billing@acadevault.com
  //         </Link>
  //       </li>
  //     </ul>
  //   ),
  //   actions: [
  //     {
  //       label: "Send General Email",
  //       href: "mailto:support@acadevault.com",
  //     },
  //   ],
  //   ariaLabel: "Dedicated support email addresses and contact links",
  // }
];

export default function ContactInfoSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Connect with Us
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            We're here to assist you with all your academic needs. Reach out
            through any of the channels below.
          </p>
        </motion.div> */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map(
            ({ icon: Icon, title, content, actions, ariaLabel }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                aria-label={ariaLabel}
              >
                {/* Subtle decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 text-blue-600 rounded-full p-3 mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {title}
                  </h3>
                  <div className="text-center text-base text-gray-600 mb-4">
                    {content}
                  </div>

                  {actions?.length > 0 && (
                    <div className="flex justify-center gap-2">
                      {actions.map((action) => (
                        <Button
                          key={action.label}
                          asChild
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Link href={action.href} aria-label={action.label}>
                            {action.label}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
