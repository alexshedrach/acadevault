"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, Search, HelpCircle, ShoppingCart } from "lucide-react";
import Branding from "./Branding";

export default function SecondaryNavbar({ showSearch = false, showCategories = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAcademicAssistanceOpen, setIsAcademicAssistanceOpen] =
    useState(false);
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState(false);

  const academicAssistanceLinks = [
    {
      label: "Plagiarism Checking",
      href: "/academic-assistance/plagiarism-checking",
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
    {
      label: "Live Q&A Sessions",
      href: "/academic-assistance/live-qa-sessions",
    },
  ];

  const helpSupportLinks = [
    { label: "Report an Issue", href: "/help-support/report-issue" },
    { label: "Terms & Conditions", href: "/help-support/terms-conditions" },
    { label: "Privacy Policy", href: "/help-support/privacy-policy" },
    { label: "FAQ", href: "/help-support/faq" },
    { label: "Contact Us", href: "/help-support/contact-us" },
    {
      label: "Community Guidelines",
      href: "/help-support/community-guidelines",
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Branding />

        <div className="hidden md:flex items-center gap-6">
          <Link href="/materials" className="text-gray-700 hover:text-blue-600">
            Materials
          </Link>
          <div className="relative">
            <button
              onClick={() =>
                setIsAcademicAssistanceOpen(!isAcademicAssistanceOpen)
              }
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Academic Assistance
              <span
                className={`transform transition-transform ${
                  isAcademicAssistanceOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isAcademicAssistanceOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                {academicAssistanceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsAcademicAssistanceOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsHelpSupportOpen(!isHelpSupportOpen)}
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Help & Support
              <span
                className={`transform transition-transform ${
                  isHelpSupportOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isHelpSupportOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                {helpSupportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsHelpSupportOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/hire-writer"
            className="text-gray-700 hover:text-blue-600"
          >
            Hire a Writer
          </Link>
          <Link
            href="/vendors/register"
            className="text-gray-700 hover:text-blue-600"
          >
            Become a Vendor
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search materials..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search materials"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          )}
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link
            href="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Sign In
          </Link>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-6">
          <Link
            href="/materials"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Materials
          </Link>
          <div>
            <button
              onClick={() =>
                setIsAcademicAssistanceOpen(!isAcademicAssistanceOpen)
              }
              className="py-2 text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Academic Assistance
              <span
                className={`transform transition-transform ${
                  isAcademicAssistanceOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isAcademicAssistanceOpen && (
              <div className="pl-4">
                {academicAssistanceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => setIsHelpSupportOpen(!isHelpSupportOpen)}
              className="py-2 text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              Help & Support
              <span
                className={`transform transition-transform ${
                  isHelpSupportOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isHelpSupportOpen && (
              <div className="pl-4">
                {helpSupportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/hire-writer"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Hire a Writer
          </Link>
          <Link
            href="/vendors/register"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Become a Vendor
          </Link>
        </div>
      )}
    </nav>
  );
}
