// Mock API data (replace with real API call in production)
export const fetchFAQs = async () => {
  return [
    {
      category: "General",
      learnContent: {
        summary:
          "Learn about Acadevault’s mission to empower academic success with resources for students, educators, and researchers.",
        videoUrl: "/videos/general-intro.mp4",
        guideUrl: "/guides/general-guide.pdf",
      },
      questions: [
        {
          id: 1,
          question: "What is Acadevault?",
          answer:
            "Acadevault is a global platform connecting students, educators, and researchers with high-quality academic resources, including study guides, lecture notes, and writing services.",
          tags: ["Beginner", "Platform"],
          difficulty: "Beginner",
          related: [2, 3],
          popularity: 95,
          updatedAt: "2025-06-01",
        },
        {
          id: 2,
          question: "How do I create an account?",
          answer:
            "Click 'Sign Up' on the homepage, provide your email, and verify your account. It’s free and takes less than 2 minutes.",
          tags: ["Beginner", "Account"],
          difficulty: "Beginner",
          related: [1, 4],
          popularity: 90,
          updatedAt: "2025-05-15",
        },
        {
          id: 3,
          question: "Is Acadevault free to use?",
          answer:
            "Basic access is free, with premium subscriptions for advanced features like unlimited downloads or writer services.",
          tags: ["Beginner", "Pricing"],
          difficulty: "Beginner",
          related: [1, 2],
          popularity: 85,
          updatedAt: "2025-06-10",
        },
        {
          id: 4,
          question: "What types of resources are available?",
          answer:
            "Acadevault offers lecture notes, study guides, research papers, templates, and professional writing services.",
          tags: ["Resources", "Content"],
          difficulty: "Beginner",
          related: [2, 3],
          popularity: 80,
          updatedAt: "2025-05-20",
        },
      ],
    },
    {
      category: "Vendor",
      learnContent: {
        summary:
          "Discover how to sell your academic materials on Acadevault and earn up to 70% commission.",
        videoUrl: "/videos/vendor-intro.mp4",
        guideUrl: "/guides/vendor-guide.pdf",
      },
      questions: [
        {
          id: 5,
          question: "Who can become a vendor?",
          answer:
            "Educators, researchers, or professionals with original materials can apply after identity and qualification verification.",
          tags: ["Vendor", "Eligibility"],
          difficulty: "Beginner",
          related: [6, 7],
          popularity: 90,
          updatedAt: "2025-06-05",
        },
        {
          id: 6,
          question: "How much can vendors earn?",
          answer:
            "Vendors earn 70% commission per sale, with no upper limit. Top vendors earn $5,000+/month.",
          tags: ["Vendor", "Earnings"],
          difficulty: "Intermediate",
          related: [5, 8],
          popularity: 95,
          updatedAt: "2025-06-01",
        },
        {
          id: 7,
          question: "How are vendors paid?",
          answer:
            "Monthly payouts via Paystack or Stripe, with a $50 minimum threshold.",
          tags: ["Vendor", "Payouts"],
          difficulty: "Beginner",
          related: [5, 6],
          popularity: 85,
          updatedAt: "2025-05-25",
        },
        {
          id: 8,
          question: "What materials can I sell?",
          answer:
            "Sell original lecture notes, study guides, templates, or research papers, subject to plagiarism checks.",
          tags: ["Vendor", "Content"],
          difficulty: "Beginner",
          related: [6, 7],
          popularity: 80,
          updatedAt: "2025-05-30",
        },
      ],
    },
    {
      category: "Writer",
      learnContent: {
        summary:
          "Join Acadevault’s writer network to provide professional writing services for students and academics.",
        videoUrl: "/videos/writer-intro.mp4",
        guideUrl: "/guides/writer-guide.pdf",
      },
      questions: [
        {
          id: 9,
          question: "How do I become a writer?",
          answer:
            "Apply through the writer portal, submit your portfolio, and pass our skills assessment. Approval takes 5-7 days.",
          tags: ["Writer", "Eligibility"],
          difficulty: "Beginner",
          related: [10, 11],
          popularity: 90,
          updatedAt: "2025-06-03",
        },
        {
          id: 10,
          question: "What types of writing jobs are available?",
          answer:
            "Write essays, research papers, theses, or edit academic content based on client requirements.",
          tags: ["Writer", "Jobs"],
          difficulty: "Intermediate",
          related: [9, 12],
          popularity: 85,
          updatedAt: "2025-05-28",
        },
        {
          id: 11,
          question: "How are writers paid?",
          answer:
            "Writers receive payments per project via Paystack or Stripe, with rates starting at $20/page.",
          tags: ["Writer", "Payouts"],
          difficulty: "Beginner",
          related: [9, 10],
          popularity: 80,
          updatedAt: "2025-06-01",
        },
        {
          id: 12,
          question: "What tools do writers use?",
          answer:
            "Access our integrated editor, plagiarism checker, and client communication tools in the writer dashboard.",
          tags: ["Writer", "Tools"],
          difficulty: "Intermediate",
          related: [10, 11],
          popularity: 75,
          updatedAt: "2025-05-22",
        },
      ],
    },
    {
      category: "Affiliate",
      learnContent: {
        summary:
          "Earn commissions by promoting Acadevault’s resources through our affiliate program.",
        videoUrl: "/videos/affiliate-intro.mp4",
        guideUrl: "/guides/affiliate-guide.pdf",
      },
      questions: [
        {
          id: 13,
          question: "Who can join the affiliate program?",
          answer:
            "Bloggers, educators, students, or anyone with an audience can join. No website required.",
          tags: ["Affiliate", "Eligibility"],
          difficulty: "Beginner",
          related: [14, 15],
          popularity: 95,
          updatedAt: "2025-06-05",
        },
        {
          id: 14,
          question: "How do I track affiliate earnings?",
          answer:
            "Monitor clicks, conversions, and commissions in real-time via your affiliate dashboard.",
          tags: ["Affiliate", "Tracking"],
          difficulty: "Intermediate",
          related: [13, 16],
          popularity: 90,
          updatedAt: "2025-06-02",
        },
        {
          id: 15,
          question: "When are affiliate commissions paid?",
          answer:
            "Monthly via Paystack or Stripe, with a $50 minimum payout threshold.",
          tags: ["Affiliate", "Payouts"],
          difficulty: "Beginner",
          related: [13, 14],
          popularity: 85,
          updatedAt: "2025-05-29",
        },
        {
          id: 16,
          question: "What can affiliates promote?",
          answer:
            "Promote materials, writer services, or subscriptions using unique affiliate links or banners.",
          tags: ["Affiliate", "Promotion"],
          difficulty: "Beginner",
          related: [14, 15],
          popularity: 80,
          updatedAt: "2025-05-27",
        },
      ],
    },
    {
      category: "Referral",
      learnContent: {
        summary:
          "Invite friends to Acadevault and earn rewards for each qualifying purchase they make.",
        videoUrl: "/videos/referral-intro.mp4",
        guideUrl: "/guides/referral-guide.pdf",
      },
      questions: [
        {
          id: 17,
          question: "How do I get my referral link?",
          answer:
            "Find your unique referral link in the 'Refer & Earn' section of your dashboard.",
          tags: ["Referral", "Link"],
          difficulty: "Beginner",
          related: [18, 19],
          popularity: 90,
          updatedAt: "2025-06-04",
        },
        {
          id: 18,
          question: "When do I receive referral rewards?",
          answer:
            "Rewards are credited within 24 hours of a referred user’s qualifying purchase ($10+).",
          tags: ["Referral", "Rewards"],
          difficulty: "Beginner",
          related: [17, 20],
          popularity: 85,
          updatedAt: "2025-06-01",
        },
        {
          id: 19,
          question: "Is there a referral limit?",
          answer:
            "No limit! Refer unlimited friends and earn 10% of their first purchase, up to $50.",
          tags: ["Referral", "Limits"],
          difficulty: "Beginner",
          related: [17, 18],
          popularity: 80,
          updatedAt: "2025-05-30",
        },
        {
          id: 20,
          question: "Can I refer myself?",
          answer:
            "No, self-referrals are prohibited and may result in account suspension.",
          tags: ["Referral", "Rules"],
          difficulty: "Beginner",
          related: [18, 19],
          popularity: 75,
          updatedAt: "2025-05-25",
        },
      ],
    },
    {
      category: "Security",
      learnContent: {
        summary:
          "Understand how Acadevault protects your data and intellectual property with industry-leading security.",
        videoUrl: "/videos/security-intro.mp4",
        guideUrl: "/guides/security-guide.pdf",
      },
      questions: [
        {
          id: 21,
          question: "How does Acadevault protect my data?",
          answer:
            "We use GDPR-compliant measures, including encryption and secure servers, to protect your personal and financial data.",
          tags: ["Security", "Data"],
          difficulty: "Beginner",
          related: [22, 23],
          popularity: 95,
          updatedAt: "2025-06-06",
        },
        {
          id: 22,
          question: "How are materials protected?",
          answer:
            "All uploads are watermarked and scanned for plagiarism using tools like Turnitin.",
          tags: ["Security", "Content"],
          difficulty: "Intermediate",
          related: [21, 24],
          popularity: 90,
          updatedAt: "2025-06-03",
        },
        {
          id: 23,
          question: "Is my payment information safe?",
          answer:
            "Payments are processed via secure gateways like Paystack and Stripe, with PCI-DSS compliance.",
          tags: ["Security", "Payments"],
          difficulty: "Beginner",
          related: [21, 22],
          popularity: 85,
          updatedAt: "2025-05-31",
        },
        {
          id: 24,
          question: "What happens if my account is compromised?",
          answer:
            "Contact support immediately. We’ll lock your account and guide you through recovery steps.",
          tags: ["Security", "Account"],
          difficulty: "Intermediate",
          related: [22, 23],
          popularity: 80,
          updatedAt: "2025-05-28",
        },
      ],
    },
    {
      category: "Subscription",
      learnContent: {
        summary:
          "Explore Acadevault’s subscription plans for unlimited access to premium features.",
        videoUrl: "/videos/subscription-intro.mp4",
        guideUrl: "/guides/subscription-guide.pdf",
      },
      questions: [
        {
          id: 25,
          question: "What are the subscription plans?",
          answer:
            "We offer Basic (free), Pro ($10/month), and Premium ($20/month) plans with varying access levels.",
          tags: ["Subscription", "Plans"],
          difficulty: "Beginner",
          related: [26, 27],
          popularity: 90,
          updatedAt: "2025-06-05",
        },
        {
          id: 26,
          question: "How do I upgrade my plan?",
          answer:
            "Go to the 'Subscription' section in your account settings and select your desired plan.",
          tags: ["Subscription", "Upgrade"],
          difficulty: "Beginner",
          related: [25, 28],
          popularity: 85,
          updatedAt: "2025-06-02",
        },
        {
          id: 27,
          question: "Can I cancel my subscription?",
          answer:
            "Yes, cancel anytime via your account settings. Refunds are prorated for annual plans.",
          tags: ["Subscription", "Cancellation"],
          difficulty: "Beginner",
          related: [25, 26],
          popularity: 80,
          updatedAt: "2025-05-30",
        },
        {
          id: 28,
          question: "What benefits do premium plans offer?",
          answer:
            "Unlimited downloads, priority support, and access to exclusive writer services.",
          tags: ["Subscription", "Benefits"],
          difficulty: "Intermediate",
          related: [26, 27],
          popularity: 75,
          updatedAt: "2025-05-27",
        },
      ],
    },
    {
      category: "Support",
      learnContent: {
        summary:
          "Get help anytime with Acadevault’s 24/7 support and comprehensive resources.",
        videoUrl: "/videos/support-overview.mp4",
        guideUrl: "/guides/support-guide.pdf",
      },
      questions: [
        {
          id: 29,
          question: "How do I contact support?",
          answer:
            "Reach out via email (support@acadevault.com), live chat, or phone through the support portal.",
          tags: ["Support", "Contact"],
          difficulty: "Beginner",
          related: [30, 31],
          popularity: 95,
          updatedAt: "2025-06-07",
        },
        {
          id: 30,
          question: "What support is available?",
          answer:
            "24/7 support via multiple channels, plus guides, tutorials, and community forums.",
          tags: ["Support", "Resources"],
          difficulty: "Beginner",
          related: [29, 32],
          popularity: 90,
          updatedAt: "2025-06-04",
        },
        {
          id: 31,
          question: "How do I report a technical issue?",
          answer:
            "Submit a ticket via the support portal, including screenshots or error details for faster help.",
          tags: ["Support", "Issues"],
          difficulty: "Intermediate",
          related: [29, 30],
          popularity: 85,
          updatedAt: "2025-06-01",
        },
        {
          id: 32,
          question: "Are there self-help resources?",
          answer:
            "Yes, access our help center with articles, videos, and FAQs for instant solutions.",
          tags: ["Support", "Self-Help"],
          difficulty: "Beginner",
          related: [30, 31],
          popularity: 80,
          updatedAt: "2025-05-29",
        },
      ],
    },
  ];
};
