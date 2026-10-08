export default function HelpSupportOverview() {
  return (
    <section className="space-y-8 py-16 px-10">
      <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
      <p className="text-gray-600 max-w-2xl">
        Need assistance? Browse our resources below or reach out directly to our
        support team.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Report an Issue",
            href: "/help-support/report-issue",
            desc: "Found a bug or problem? Let us know.",
          },
          {
            title: "FAQ",
            href: "/help-support/faq",
            desc: "Answers to common questions.",
          },
          {
            title: "Contact Support",
            href: "/help-support/contact-support",
            desc: "Get in touch with our team.",
          },
          {
            title: "Terms & Conditions",
            href: "/help-support/terms-and-conditions",
            desc: "Our service policies.",
          },
          {
            title: "Privacy Policy",
            href: "/help-support/privacy-policy",
            desc: "How we protect your data.",
          },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="block p-6 bg-white border rounded-lg shadow hover:shadow-lg transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm">{card.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
