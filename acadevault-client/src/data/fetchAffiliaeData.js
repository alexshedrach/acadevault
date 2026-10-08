import {
  Link as LinkIcon,
  Share2,
  DollarSign,
  Download,
  Users,
  HelpCircle,
} from "lucide-react";

export const fetchAffiliateData = async () => ({
  steps: [
    {
      id: 1,
      title: "Register & Get Approved",
      description:
        "Sign up for the affiliate program and get instant access to your dashboard after approval.",
      icon: <LinkIcon className="w-6 h-6 text-blue-600" />,
      tooltip: "Start by creating your affiliate account.",
      subSteps: [
        "Complete the online registration form.",
        "Verify your identity via email or phone.",
        "Access your affiliate dashboard instantly upon approval.",
      ],
      cta: { text: "Start Registration", href: "/affiliate-signup" },
    },
    {
      id: 2,
      title: "Access & Share Your Tools",
      description:
        "Use banners, deep links, and embeddable widgets to promote AcadeVault anywhere online.",
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      tooltip: "Choose tools that best fit your audience.",
      subSteps: [
        "Browse a variety of marketing tools in your dashboard.",
        "Embed banners, buttons, or trackable links into your content.",
        "Tailor assets for social media, blogs, YouTube, or newsletters.",
      ],
      cta: { text: "Explore Toolkit", href: "/affiliate-toolkit" },
    },
    {
      id: 3,
      title: "Track & Optimize Performance",
      description:
        "Monitor real-time analytics, track referrals, and request monthly payouts with ease.",
      icon: <Download className="w-6 h-6 text-blue-600" />,
      tooltip: "Analytics help you grow smarter.",
      subSteps: [
        "Track impressions, clicks, and conversions in your dashboard.",
        "Understand top-performing links and optimize them.",
        "Generate detailed reports and set goals based on data.",
      ],
      cta: { text: "View Reports", href: "/affiliate-dashboard" },
    },
    {
      id: 4,
      title: "Get Paid Monthly",
      description:
        "Earn up to 20% commission per successful referral. Get paid automatically every month.",
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      tooltip: "Withdraw earnings to your local bank or PayPal.",
      subSteps: [
        "Ensure your profile has valid payment details.",
        "Payouts processed every 30 days automatically.",
        "Minimum withdrawal threshold: $20.",
      ],
      cta: { text: "Check Payout Options", href: "/affiliate-payouts" },
    },
  ],
  tools: [
    {
      id: 1,
      title: "Banner Ads",
      description:
        "Pre-designed banners suitable for websites, blogs, and email newsletters.",
      preview: "/previews/banner.jpg",
    },
    {
      id: 2,
      title: "Deep Links",
      description:
        "Generate trackable deep links to specific pages or products in seconds.",
      preview: "/previews/link.jpg",
    },
    {
      id: 3,
      title: "Widgets",
      description:
        "Drag-and-drop widgets that integrate seamlessly into your site or app.",
      preview: "/previews/widget.jpg",
    },
    {
      id: 4,
      title: "Promo Videos",
      description:
        "Use ready-made video ads for YouTube, Instagram, or TikTok promotions.",
      preview: "/previews/video.jpg",
    },
  ],
});

// Mock API
export const fetchWhyJoinAffiliateData = async () => ({
  benefits: [
    {
      id: 1,
      title: "Competitive Commissions",
      description:
        "Earn up to 20% commission on every sale, with bonuses for high performers.",
      iconName: "DollarSign",
    },
    {
      id: 2,
      title: "Global Reach",
      description:
        "Promote to a worldwide audience of students, educators, and researchers.",
      iconName: "Users",
    },
    {
      id: 3,
      title: "Real-Time Analytics",
      description:
        "Track clicks, conversions, and earnings instantly with our intuitive dashboard.",
      iconName: "LinkIcon",
    },
    {
      id: 4,
      title: "Dedicated Support",
      description:
        "Access 24/7 support, webinars, and exclusive resources to boost your success.",
      iconName: "HelpCircle",
    },
    {
      id: 5,
      title: "Flexible Promotion",
      description:
        "Use banners, links, or widgets to promote Acadevault on any platform.",
      iconName: "LinkIcon",
    },
    {
      id: 6,
      title: "30-Day Cookie Window",
      description:
        "Earn commissions for purchases made within 30 days of a user’s click.",
      iconName: "DollarSign",
    },
  ],
  stats: [
    { label: "Active Affiliates", value: 2500, progress: 80 },
    { label: "Countries Reached", value: 75, progress: 90 },
    { label: "Monthly Payouts", value: 15000, progress: 85 },
    { label: "Conversions", value: 50000, progress: 95 },
  ],
  testimonials: [
    {
      id: 1,
      name: "Jane Doe",
      role: "Education Blogger",
      quote:
        "Acadevault’s affiliate program has been a game-changer for my blog. The commissions are generous, and the dashboard is super easy to use!",
      rating: 5,
      avatar: "/avatars/jane.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      role: "YouTube Educator",
      quote:
        "I love the flexibility of promoting Acadevault. Their support team is always there to help me optimize my campaigns.",
      rating: 4,
      avatar: "/avatars/john.jpg",
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Student Influencer",
      quote:
        "As a student, I never thought I could earn this much by sharing links. Acadevault makes it so simple!",
      rating: 5,
      avatar: "/avatars/emily.jpg",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Academic Consultant",
      quote:
        "The 30-day cookie window ensures I get credited for sales, and the payouts are always on time.",
      rating: 4,
      avatar: "/avatars/michael.jpg",
    },
  ],
  tools: [
    {
      id: 1,
      title: "Banner Ads",
      description: "Eye-catching banners in multiple sizes for your website.",
      preview: "/previews/banner.jpg",
    },
    {
      id: 2,
      title: "Deep Links",
      description: "Custom links to specific Acadevault products or pages.",
      preview: "/previews/link.jpg",
    },
    {
      id: 3,
      title: "Widgets",
      description: "Interactive widgets to showcase Acadevault materials.",
      preview: "/previews/widget.jpg",
    },
  ],
  howItWorks: [
    {
      id: 1,
      step: "Sign Up",
      description: "Join our affiliate program in minutes, free of charge.",
      iconName: "Users",
    },
    {
      id: 2,
      step: "Promote",
      description: "Share your unique links via blogs, social media, or email.",
      iconName: "LinkIcon",
    },
    {
      id: 3,
      step: "Earn",
      description:
        "Earn commissions for every sale generated through your links.",
      iconName: "DollarSign",
    },
  ],
});
