import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Share2, Star, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DealsGridSection = ({ deals, timers, isLoading, error, handleShare }) => {
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white border rounded-xl shadow animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </div>
      </section>
    );
  }

  if (deals.length === 0) {
    return (
      <section className="py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-lg font-medium">
            No deals available in this category.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="deals" className="py-8">
      <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              className="group bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/materials/${deal.slug}`}
                className="block"
                aria-label={`View deal: ${deal.title}`}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  {deal.isNew && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {deal.isVerified && (
                    <span className="absolute top-2 right-2">
                      <Verified className="w-5 h-5 text-blue-600" />
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                      -{deal.discount}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <Clock className="w-4 h-4 text-red-500" />
                      {timers[deal.id] || "Loading..."}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {deal.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="line-through text-gray-400">
                      {deal.originalPrice}
                    </span>
                    <span className="text-green-600 font-bold">
                      {deal.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs">
                    <Star className="w-4 h-4 fill-current" />
                    {deal.rating.toFixed(1)}
                  </div>
                </div>
              </Link>
              <div className="flex gap-2 px-5 pb-5">
                <motion.button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Claim Deal
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(deal);
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
                  aria-label={`Share ${deal.title}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DealsGridSection;
