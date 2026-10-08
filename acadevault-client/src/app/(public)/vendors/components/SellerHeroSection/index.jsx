"use client";


import { cn } from "@/utils/cn";
import VendorBackground from "./VendorBackground";
import VendorContent from "./VendorContent";

// Entry component that assembles the hero section
export default function VendorHeroSection({ className }) {
  const ctaButtons = [
    {
      label: "Start Selling Now",
      href: "/signup/vendors",
      variant: "gradient",
      target: "_self",
    },
    {
      label: "Explore How It Works",
      href: "#how-it-works",
      variant: "tertiary",
      target: "_self",
    },
  ];

  return (
    <section
      className={cn(
        "relative overflow-hidden text-white pt-6 pb-4",
        className
      )}
    >
      <VendorBackground
        backgroundImage="/media/particle-bg.jpg"
        backgroundAlt="Academic materials background"
        animationType="kenburns-left"
        overlayColor="rgba(0,0,0,0.5)"
        overlayOpacity={60}
        imagePosition="cover"
        imagePriority={true}
      />

      <VendorContent
        textAlignment="left"
        buttonAlignment="center"
        buttonLayout="inline"
        maxWidth="max-w-5xl"
        padding="px-4 sm:px-8 md:px-12 lg:px-16"
        headingSize="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        ctaButtons={ctaButtons}
      />
    </section>
  );
}
