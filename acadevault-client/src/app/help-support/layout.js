import Footer from "@/components/footer/Footer";
import SecondaryNavbar from "@/components/header/SecondaryNavbar";
import Link from "next/link";

export const metadata = {
  title: "Help & Support – AcadeVault",
  description:
    "Report issues, read policies, get answers, or contact our support team.",
};

export default function HelpSupportLayout({ children }) {
  const menu = [
    { label: "Overview", href: "/help-support" },
    { label: "Report an Issue", href: "/help-support/report-issue" },
    { label: "FAQ", href: "/help-support/faq" },
    { label: "Contact Support", href: "/help-support/contact-support" },
    { label: "Terms & Conditions", href: "/help-support/terms-and-conditions" },
    { label: "Privacy Policy", href: "/help-support/privacy-policy" },
  ];

  return (
    <>
      <SecondaryNavbar showCategories />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-50 border-r p-6">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <nav className="space-y-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <>{children}</>
      </div>

      <Footer />
    </>
  );
}
