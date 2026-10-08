"use client";

import dynamic from "next/dynamic";

// Lazy-load dynamic sections with client-only behavior
const LiveChatSupportSection = dynamic(
  () => import("./LiveChatSupportSection"),
  { ssr: false, loading: () => <div>Loading Live Chat Support...</div> }
);
const ContactMapSection = dynamic(() => import("./ContactMapSection"), {
  ssr: false,
  loading: () => <div>Loading Map...</div>,
});
const HelpCenterShortcutSection = dynamic(
  () => import("./HelpCenterShortcutSection"),
  { ssr: false, loading: () => <div>Loading Help Center...</div> }
);

export default function ClientDynamicSections() {
  return (
    <>
      <LiveChatSupportSection />
      <ContactMapSection />
      <HelpCenterShortcutSection />
    </>
  );
}
