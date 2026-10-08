export const fetchVendorFAQs = async () => {
  return [
    {
      category: "Getting Started",
      questions: [
        {
          id: 1,
          question: "Who can become a vendor on Acadevault?",
          answer:
            "Academics, researchers, educators, and professionals with original content can apply. You’ll need to verify your identity and qualifications via our secure onboarding process.",
        },
        {
          id: 2,
          question: "What are the requirements to join as a vendor?",
          answer:
            "You must be 18+, provide valid ID, and submit proof of academic or professional credentials. Materials must comply with our originality and quality standards.",
        },
        {
          id: 3,
          question: "How long does the vendor approval process take?",
          answer:
            "Approval typically takes 3-5 business days after submitting your application and required documents.",
        },
      ],
    },
    {
      category: "Earnings & Payments",
      questions: [
        {
          id: 4,
          question: "How much can I earn as a vendor?",
          answer:
            "Vendors earn 70% commission per sale. Earnings vary based on pricing (e.g., $5-$100) and demand, with no upper limit. Top vendors earn $5,000+/month.",
        },
        {
          id: 5,
          question: "How and when do I get paid?",
          answer:
            "Payouts are processed monthly via Paystack or Stripe to your linked bank account. Minimum payout threshold is $50.",
        },
        {
          id: 6,
          question: "Are there any fees for vendors?",
          answer:
            "No upfront fees. Acadevault deducts a 30% platform fee per sale, and payment gateways may charge a small transaction fee (1-3%).",
        },
      ],
    },
    {
      category: "Content & Materials",
      questions: [
        {
          id: 7,
          question: "What types of materials can I sell?",
          answer:
            "You can sell lecture notes, study guides, research papers, templates, course outlines, and more, provided they’re original or authorized.",
        },
        {
          id: 8,
          question: "How do I ensure my content is protected?",
          answer:
            "All uploads are watermarked and undergo plagiarism checks using tools like Turnitin to protect your intellectual property.",
        },
        {
          id: 9,
          question: "Can I update my materials after uploading?",
          answer:
            "Yes, you can update materials via the vendor dashboard. Updates are reviewed to ensure compliance with our standards.",
        },
      ],
    },
    {
      category: "Support & Resources",
      questions: [
        {
          id: 10,
          question: "What support is available for vendors?",
          answer:
            "We offer 24/7 support via email, live chat, and phone, plus onboarding guides and an analytics dashboard.",
        },
        {
          id: 11,
          question: "How do I track my sales performance?",
          answer:
            "Use the vendor dashboard to monitor real-time sales, views, and performance metrics, with exportable reports.",
        },
        {
          id: 12,
          question: "What if I face technical issues?",
          answer:
            "Our technical support team is available 24/7. Submit a ticket via the dashboard or contact us directly.",
        },
      ],
    },
  ];
};
