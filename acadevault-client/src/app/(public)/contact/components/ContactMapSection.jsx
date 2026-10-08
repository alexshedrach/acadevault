"use client";

import { MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ContactMapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-3">
            <MapPinned className="w-5 h-5" />
            <span className="text-xs uppercase font-medium tracking-wider">
              Our Location
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Visit AcadeVault Headquarters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Located in the heart of innovation—come say hello or book an
            appointment in advance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100"
        >
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}
          <iframe
            title="AcadeVault HQ Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.8761010864624!2d7.928002374171364!3d5.816176994098742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105c9de81ae3dcad%3A0xf3235d14bc23095c!2sAkanu%20Ibiam%20Federal%20Polytechnic%20Unwana!5e0!3m2!1sen!2sng!4v1718540038826!5m2!1sen!2sng"
            className="w-full h-full"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsMapLoaded(true)}
          />
        </motion.div>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="text-blue-600 border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <a
              href="https://maps.google.com?q=Akanu+Ibiam+Federal+Polytechnic+Unwana"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-600 border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Akanu+Ibiam+Federal+Polytechnic+Unwana"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
