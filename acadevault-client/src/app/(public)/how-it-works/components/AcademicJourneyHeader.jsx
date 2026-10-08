"use client";

import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const AcademicJourneyHeader = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Client-side mount check
  useEffect(() => {
    setIsMounted(true);
    // Mock analytics (replace with real provider like Google Analytics)
    console.log("AcademicJourneyHeader viewed", { page: "/overview" });
  }, []);

  if (!isMounted) return null;

  return (
    <SectionHeader
      title={
        <>
          Your Academic Journey{" "}
          <span className="text-blue-600 ml-4"> with AcadeVault</span>
        </>
      }
      description="Whether you’re a student seeking resources, an academic selling materials, or a researcher hiring a writer, AcadeVault simplifies your academic needs with a secure, user-friendly platform."
      icon={<BookOpen className="w-8 h-8" />}
      iconPosition="top"
      align="center"
      size="2xl"
      maxWidth="4xl"
      headingLevel="h1"
      headingClassName="font-extrabold"
      descriptionClassName="text-gray-600"
      className="py-8"
      animate={true}
    />
  );
};

export default AcademicJourneyHeader;
