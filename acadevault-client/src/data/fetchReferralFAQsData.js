export const fetchReferralFAQs = async () => {
  return [
    {
      category: "Getting Started",
      questions: [
        {
          id: 1,
          question: "How do I get my referral link?",
          answer:
            "Log in to your AcadeVault account, navigate to the 'Refer & Earn' section in your dashboard, and copy your unique referral link. You can share it via email, social media, or any platform.",
        },
        {
          id: 2,
          question: "Who can join the referral program?",
          answer:
            "Any registered AcadeVault user (vendor or buyer) can join the referral program. No additional qualifications are required.",
        },
        {
          id: 3,
          question: "How do I track my referrals?",
          answer:
            "Your dashboard provides a 'Referral Analytics' section where you can monitor clicks, sign-ups, and earnings from your referrals in real-time.",
        },
        {
          id: 4,
          question: "Is there a referral program guide?",
          answer:
            "Yes, our onboarding guide in the 'Refer & Earn' section includes step-by-step instructions and best practices for maximizing your referrals.",
        },
      ],
    },
    {
      category: "Rewards & Payouts",
      questions: [
        {
          id: 5,
          question: "When do I receive my rewards?",
          answer:
            "Rewards are credited to your wallet within 24 hours after a referred user makes a qualifying purchase (minimum $10).",
        },
        {
          id: 6,
          question: "How much can I earn per referral?",
          answer:
            "You earn 10% of the first purchase made by each referred user, up to $50 per referral, with no lifetime cap on total earnings.",
        },
        {
          id: 7,
          question: "How are referral payouts processed?",
          answer:
            "Payouts are processed monthly via Paystack or Stripe to your linked bank account. The minimum payout threshold is $25.",
        },
        {
          id: 8,
          question: "Can I use my referral earnings to buy materials?",
          answer:
            "Yes, referral earnings in your wallet can be used to purchase materials on AcadeVault or withdrawn as cash.",
        },
      ],
    },
    {
      category: "Referral Rules",
      questions: [
        {
          id: 9,
          question: "Is there a limit to how many friends I can refer?",
          answer:
            "No limit! Refer as many friends as you like and earn commissions on each successful transaction they make.",
        },
        {
          id: 10,
          question: "What counts as a qualifying purchase?",
          answer:
            "A qualifying purchase is any transaction of $10 or more made by a referred user within 90 days of signing up via your link.",
        },
        {
          id: 11,
          question: "Can I refer myself or create multiple accounts?",
          answer:
            "No, self-referrals and multiple accounts are prohibited and may result in suspension from the referral program.",
        },
        {
          id: 12,
          question: "What happens if my referral doesn't make a purchase?",
          answer:
            "You won’t earn a reward unless the referred user makes a qualifying purchase within 90 days of signing up.",
        },
      ],
    },
    {
      category: "Support & Troubleshooting",
      questions: [
        {
          id: 13,
          question: "What if my referral link isn’t working?",
          answer:
            "Contact our 24/7 support team via email or live chat, and we’ll troubleshoot the issue within 24 hours.",
        },
        {
          id: 14,
          question: "How do I report a referral issue?",
          answer:
            "Use the 'Report Issue' feature in the 'Refer & Earn' section of your dashboard or contact support directly.",
        },
        {
          id: 15,
          question: "Can I share my referral link on social media?",
          answer:
            "Yes, you can share your link on any platform, but avoid spamming or violating platform policies to ensure your referrals are valid.",
        },
        {
          id: 16,
          question: "How do I contact support for referral questions?",
          answer:
            "Reach out via email (support@acadevault.com), live chat, or phone through the vendor dashboard’s support portal.",
        },
      ],
    },
  ];
};