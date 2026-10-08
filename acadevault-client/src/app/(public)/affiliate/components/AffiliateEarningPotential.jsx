"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  CheckCircle,
  BookOpen,
  Star as StarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AffiliateEarningPotential = () => {
  const stories = [
    {
      quote:
        "I earned $3,000 in commissions promoting AcadeVault to my blog readers!",
      author: "Emeka Okafor, Education Blogger",
      image: "/avatars/friday.png",
    },
    {
      quote:
        "AcadeVault’s affiliate program is easy to use, and the support team is amazing.",
      author: "Dr. Lisa Chen, Academic Influencer",
      image: "/avatars/james.png",
    },
    {
      quote:
        "Promoting AcadeVault helped me generate a steady income stream effortlessly.",
      author: "Sarah Johnson, Study Tips YouTuber",
      image: "/avatars/tony.png",
    },
    {
      quote:
        "The high-quality materials make it easy to promote AcadeVault to my students.",
      author: "Prof. Ahmed Yusuf, University Lecturer",
      image: "/avatars/jenny.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const lastIndex = stories.length - 1;

  const slideLeft = () =>
    setCurrent((idx) => (idx === 0 ? lastIndex : idx - 1));
  const slideRight = () =>
    setCurrent((idx) => (idx === lastIndex ? 0 : idx + 1));

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Particle Animation */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-16 h-16 bg-blue-400 rounded-full animate-ping opacity-50 top-10 left-20" />
        <div className="absolute w-10 h-10 bg-indigo-400 rounded-full animate-ping opacity-50 top-40 right-30" />
        <div className="absolute w-12 h-12 bg-purple-400 rounded-full animate-ping opacity-50 bottom-20 left-50" />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-12 gap-12">
        {/* Earning Potential */}
        <div className="col-span-12 space-y-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center lg:justify-start gap-3 mb-4">
              <DollarSign className="w-10 h-10 text-blue-600" />
              Unlock Your Earning Potential
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Join AcadeVault’s affiliate program and earn up to 20% commission
              on every sale. With no cap on earnings, your income potential is
              limitless when you promote our premium academic materials, writer
              services, or subscriptions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Commission Structure",
                items: [
                  "20% commission on academic material sales",
                  "15% commission on writer services",
                  "10% commission on subscriptions",
                ],
              },
              {
                title: "Reliable Payouts",
                text: "Get paid monthly via Paystack or Stripe with a minimum payout threshold of $50. Track your earnings in real-time using our transparent affiliate dashboard.",
              },
              {
                title: "Unlimited Earnings",
                text: "There’s no limit to your commissions. The more you promote AcadeVault, the more you earn, with high-converting products designed for academic audiences.",
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-8"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  {block.title}
                </h3>
                {block.items ? (
                  <ul className="space-y-3 text-gray-700">
                    {block.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{block.text}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Affiliate Resources */}
        <div className="col-span-12 lg:col-span-7 space-y-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center lg:justify-start gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-blue-600" />
              Affiliate Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Kickstart your success with AcadeVault’s comprehensive suite of
              tools and guides, designed to help you effectively promote our
              academic platform.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {[
              {
                href: "/help-center/guides/affiliate-start",
                label: "Affiliate Guide",
                color: "blue",
              },
              {
                href: "/affiliate/tools",
                label: "Marketing Tools",
                color: "green",
              },
              {
                href: "/affiliate/banners",
                label: "Banner Ads",
                color: "purple",
              },
              {
                href: "/affiliate/social-media-kit",
                label: "Social Media Kit",
                color: "orange",
              },
              {
                href: "/affiliate/support",
                label: "Support Center",
                color: "indigo",
              },
            ].map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                className={`px-6 py-3 rounded-full font-semibold text-white bg-${btn.color}-500 hover:bg-${btn.color}-600 transition duration-300 shadow hover:shadow-lg`}
              >
                {btn.label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-gray-500 lg:mx-0 text-center lg:text-left">
            Need help? Our dedicated affiliate support team is available 24/7 to
            assist you.
          </p>
        </div>

        {/* Success Stories Carousel */}
        <div className="col-span-12 lg:col-span-5 bg-amber-500/40 py-4 rounded-2xl shadow-md">
         
          <div className="text-center px-2 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
              <StarIcon className="w-10 h-10 text-gray-500" />
              Affiliate Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from our affiliates who are thriving with AcadeVault’s
              affiliate program.
            </p>
          </div>

          <div className="relative w-full max-w-3xl mx-auto h-64 overflow-hidden">
            <AnimatePresence initial={false}>
              {stories.map((story, idx) =>
                idx === current ? (
                  <motion.div
                    key={idx}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.6 }}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 px-24 h-full">
                      <div className="flex items-center mb-4">
                        <img
                          src={story.image}
                          alt={story.author}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <p className="font-semibold text-gray-800">
                          {story.author}
                        </p>
                      </div>
                      <p className="italic text-gray-700 text-sm">
                        “{story.quote}”
                      </p>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {/* Prev/Next Buttons */}
            <button
              onClick={slideLeft}
              aria-label="Previous Story"
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={slideRight}
              aria-label="Next Story"
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateEarningPotential;
