import React from "react";
import { Folder, FileText } from "lucide-react";
import HelpSection from "../common/HelpSection";

function MaterialHelpSection() {
  return (
    <HelpSection
      title="Couldn't Find Your Approved Topic?"
      description="No worries! Our expert writers can develop a custom project or seminar tailored to your department's standards. Hire now or chat with us."
      whatsapp={{
        number: "+2348146870361",
        link: "https://wa.me/2348146870361",
      }}
      downloadCta="Hire a Writer"
      chatCta="Chat with Academic Expert"
      showWhatsAppStatus={true}
      showChatWidget={true}
      projectLinks={[
        {
          label: "See All Departments",
          href: "/departments",
          icon: <Folder className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
        },
        {
          label: "Submit Your Topic",
          href: "/hire-writer",
          icon: (
            <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          ),
        },
      ]}
    />
  );
}

export default MaterialHelpSection;
