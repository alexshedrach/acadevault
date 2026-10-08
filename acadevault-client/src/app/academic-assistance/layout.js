import Footer from "@/components/footer/Footer";
import SecondaryNavbar from "@/components/header/SecondaryNavbar";
import Link from "next/link";

export const metadata = {
  title: "Academic Assistance – AcadeVault",
  description:
    "Plagiarism Checking, Editing, Citation, Research Assistance, Forums, Live Q&A.",
};

export default function AssistanceLayout({ children }) {
  const menu = [
    { label: "Overview", href: "/academic-assistance" },
    {
      label: "Plagiarism Checking",
      href: "/academic-assistance/plagiarism-check",
    },
    {
      label: "Editing/Proofreading",
      href: "/academic-assistance/editing-proofreading",
    },
    {
      label: "Citation/Referencing",
      href: "/academic-assistance/citation-referencing",
    },
    {
      label: "Research Assistance",
      href: "/academic-assistance/research-assistance",
    },
    {
      label: "Discussion Forums",
      href: "/academic-assistance/discussion-forums",
    },
    { label: "Live Q&A Sessions", href: "/academic-assistance/live-q-and-a" },
  ];

  return (
    <>
      <SecondaryNavbar showCategories />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-50 border-r p-6">
          <h2 className="text-xl font-semibold mb-4">Academic Assistance</h2>
          <nav className="space-y-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
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
