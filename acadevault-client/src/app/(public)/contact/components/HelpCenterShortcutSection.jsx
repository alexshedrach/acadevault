"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FiHelpCircle, FiSearch, FiMessageSquare } from "react-icons/fi";
import useAnalytics from "@/hooks/useAnalytics"; 
import dynamic from "next/dynamic";

// Lazy-load the ChatBot widget
const ChatBotWidget = dynamic(() => import("./ChatBotWidget"), { ssr: false });

export default function HelpCenterShortcutSection() {
  const { t } = useTranslation("contact");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { trackEvent } = useAnalytics();
  const inputRef = useRef(null);

  // Fetch top FAQs/suggestions as user types
  useEffect(() => {
    let active = true;
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/faqs?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setSuggestions(data.slice(0, 5).map((item) => item.question));
      });
    return () => {
      active = false;
    };
  }, [query]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    trackEvent("HelpCenter:search", { query });
    // Redirect to full Help Center search page
    window.location.href = `/help-center?search=${encodeURIComponent(query)}`;
  };

  const onChatClick = () => {
    trackEvent("HelpCenter:chat_open", {});
    // ChatBotWidget will handle open
  };

  return (
    <section
      aria-labelledby="helpcenter-heading"
      className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <FiHelpCircle className="mx-auto h-12 w-12 text-indigo-600" aria-hidden="true" />
        <h2
          id="helpcenter-heading"
          className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl"
        >
          {t("help_center_title", "Need help?")}
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          {t(
            "help_center_subtitle",
            "Browse our FAQs or start a chat. We’re here to help you succeed!"
          )}
        </p>

        {/* Search form */}
        <form
          onSubmit={onSearchSubmit}
          className="mt-8 relative max-w-xl mx-auto"
          role="search"
          aria-label={t("faq_search_aria", "Search FAQs")}
        >
          <label htmlFor="faq-search" className="sr-only">
            {t("faq_search_label", "Search Frequently Asked Questions")}
          </label>
          <div className="flex">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400" />
              <input
                ref={inputRef}
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("faq_search_placeholder", "Search FAQs…")}
                className="w-full rounded-l-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="faq-suggestions"
              />
            </div>
            <button
              type="submit"
              className="rounded-r-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {t("faq_search_button", "Search")}
            </button>
          </div>

          {/* Autocomplete suggestions */}
          {suggestions.length > 0 && (
            <ul
              id="faq-suggestions"
              role="listbox"
              className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
            >
              {suggestions.map((text, idx) => (
                <li
                  key={idx}
                  role="option"
                  onClick={() => {
                    window.location.href = `/help-center?highlight=${encodeURIComponent(text)}`;
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {text}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Quick links */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: t("topic_account", "Account & Billing"), href: "/help-center#account" },
            { title: t("topic_upload", "Uploading Materials"), href: "/help-center#upload" },
            { title: t("topic-orders", "Orders & Refunds"), href: "/help-center#orders" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FiMessageSquare className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              <span className="ml-4 text-lg font-medium text-gray-900">{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Chat button (fixed to bottom-right) */}
        <button
          onClick={onChatClick}
          aria-label={t("chat_button_aria", "Chat with support")}
          className="fixed bottom-6 right-6 z-50 flex items-center rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FiMessageSquare className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Lazy-loaded ChatBot */}
        <Suspense fallback={null}>
          <ChatBotWidget />
        </Suspense>
      </div>
    </section>
  );
}
