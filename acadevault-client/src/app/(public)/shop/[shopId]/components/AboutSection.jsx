"use client";

import WorkingHoursSection from "./WorkingHoursSection";
import ContactCard from "./ContactCard";
import ShopDescription from "./ShopDescription";

export default function AboutSection({ shop }) {
  const { description, contactInfo, workingHours } = shop;

  return (
    <section className="space-y-8 text-gray-700 text-sm">
      {/* Description */}
      {description && (
        <ShopDescription
          text={description}
          sentenceCount={6}
          readMore={true}
          showFade={true}
          className="max-w-2xl mx-auto md:mx-0 text-center md:text-left"
        />
      )}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information Card */}
        <ContactCard contactInfo={contactInfo} />

        {/* Working Hours Card */}
        {workingHours?.length > 0 && (
          // <WorkingHoursSection workingHours={workingHours} />
          <WorkingHoursSection
            workingHours={[
              { day: "Monday", open: "08:00", close: "17:00" },
              { day: "Tuesday", open: "08:00", close: "17:00" },
              { day: "Wednesday", open: "08:00", close: "17:00" },
              { day: "Thursday", open: "08:00", close: "17:00" },
              { day: "Friday", open: "08:00", close: "17:00" },
              { day: "Saturday", open: "10:00", close: "15:00" },
              { day: "Sunday", open: "00:00", close: "00:00" }, // Closed
            ]}
          />
        )}
      </div>
    </section>
  );
}
