import { Mail, Phone } from "lucide-react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

export default function ContactOptions() {
  const { copied, handleCopy } = useCopyToClipboard();

  const contactItems = [
    {
      icon: <Phone className="w-5 h-5 text-blue-600" />,
      label: "+1248146870361",
      type: "phone",
    },
    {
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      label: "acadevault@support.com",
      type: "email",
    },
  ];

  return (
    <div className="border border-gray-200 shadow-md rounded-2xl p-6 bg-white mb-10">
      <p className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-wider flex items-center justify-center gap-2">
        <Phone className="w-4 h-4 text-blue-500" />
        Call, WhatsApp or Email
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-base font-medium text-gray-800">
        {contactItems.map(({ icon, label, type }) => (
          <div
            key={type}
            onClick={() => handleCopy(label, type)}
            className="flex items-center gap-2 group cursor-pointer relative"
          >
            {icon}
            <span className="group-hover:underline">{label}</span>
            {copied === type && (
              <span className="absolute -top-7 right-0 text-xs text-green-600 bg-white px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
