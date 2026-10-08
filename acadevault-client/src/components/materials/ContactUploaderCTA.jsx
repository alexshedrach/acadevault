"use client";
import { MailIcon } from "lucide-react";
import { Button } from "../ui/Button";


export default function ContactUploaderCTA({ uploaderId }) {
  const handleContact = () => {
    window.location.href = `/messages/new?to=${uploaderId}`;
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <Button
        onClick={handleContact}
        variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        <MailIcon className="w-4 h-4 mr-2" />
        Contact Uploader
      </Button>
      <span className="text-xs text-gray-500">
        For clarifications, extra files, or inquiries.
      </span>
    </div>
  );
}
