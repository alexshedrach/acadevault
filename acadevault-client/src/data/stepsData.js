import {
  FaUserGraduate,
  FaSearch,
  FaCreditCard,
  FaDownload,
  FaClipboardList,
  FaUserCheck,
  FaComments,
  FaCheckCircle,
  FaFileDownload,
} from "react-icons/fa";
import { Users, Briefcase, PenTool, BookOpen } from "lucide-react";

export const acadevaultSteps = [
  {
    id: 1,
    title: "Sign Up & Verify",
    description:
      "Create an account and become part of our vibrant academic community. Verify your email to unlock full platform access and personalized recommendations.",
    icon: "/images/student-cap.png",
  },
  {
    id: 2,
    title: "Browse & Discover",
    description:
      "Explore an extensive collection of academic materials, including research papers, textbooks, study guides, and lecture notes. Use advanced search and filters to find exactly what you need.",
    icon: "/media/logo6.jpg",
  },
  {
    id: 3,
    title: "Add to Cart & Customize",
    description:
      "Select materials that suit your academic needs and add them to your cart. Enjoy personalized recommendations, apply discount codes, and choose preferred formats.",
    icon: "/media/logo2.png",
  },
  {
    id: 4,
    title: "Secure & Flexible Payment",
    description:
      "Complete your purchase with multiple secure payment options, including credit/debit cards, PayPal, cryptocurrency (Bitcoin, Ethereum, USDT), and local payment gateways.",
    icon: "/media/logo3.png",
  },
  {
    id: 5,
    title: "Instant Access & Digital Library",
    description:
      "Gain immediate access to purchased materials. Download securely, access encrypted PDFs, or stream content online with our digital rights management (DRM) protection.",
    icon: "/media/logo1.png",
  },
  {
    id: 6,
    title: "Manage & Track Purchases",
    description:
      "View and manage all your purchased materials in your personal dashboard. Track physical shipments, retrieve receipts, and monitor your learning progress.",
    icon: "/media/logo4.jpg",
  },
  {
    id: 7,
    title: "Earn & Share",
    description:
      "Refer peers and earn commissions through our affiliate program. Share your knowledge by contributing materials and monetize your expertise.",
    icon: "/media/logo5.jpg",
  },
  {
    id: 8,
    title: "Customer Support & Assistance",
    description:
      "Need help? Contact our 24/7 support team for assistance with orders, downloads, refunds, and academic recommendations.",
    icon: "/images/project.png",
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    title: "Create Your Free Account",
    description:
      "Join AcadeVault in seconds. Set up your profile and start exploring a rich library of curated academic materials crafted by professionals and top scholars.",
    icon: <FaUserGraduate />,
    color: "from-blue-500 to-blue-700",
    image: "/images/writer.jpeg",
    alt: "Sign up and explore resources",
    cta: {
      label: "Learn more about accounts",
      href: "/how-it-works#signup",
    },
  },
  {
    id: 2,
    title: "Search, Filter & Purchase",
    description:
      "Use intelligent filters and powerful search tools to discover relevant materials. Browse by field, topic, or type — then purchase securely using flexible payment options.",
    icon: <FaSearch />,
    color: "from-indigo-500 to-indigo-700",
    image: "/images/bg4.jpeg",
    alt: "Search and purchase materials",
    cta: {
      label: "Start Searching",
      href: "/materials",
    },
  },
  {
    id: 3,
    title: "Access & Apply Instantly",
    description:
      "Download your selected resources instantly and start using them in your research, assignments, or projects — anytime, anywhere, on any device.",
    icon: <FaDownload />,
    color: "from-purple-500 to-purple-700",
    image: "/images/material.png",
    alt: "Download and access",
    cta: {
      label: "Start Downloading",
      href: "/downloads",
    },
  },
  {
    id: 4,
    title: "Monitor Performance & Progress",
    description:
      "Track downloads, engagement, and learning progress. Gain insights through real-time analytics to improve your academic journey and usage efficiency.",
    icon: <FaCreditCard />,
    color: "from-emerald-500 to-emerald-700",
    image: "/images/project.png",
    alt: "Analytics and insights",
    cta: {
      label: "View Analytics",
      href: "/analytics",
    },
  },
];

export const becomeSellerSteps = [
  {
    title: "Create Your Reseller Account",
    content:
      "Click on “Become a Partner” and fill in your name, email, phone number, and password to sign up. It only takes 2 minutes.",
    image: "/images/academic-ima.png",
    alt: "Create Account",
    icon: <FaUserGraduate />,
  },
  {
    title: "Details Under Review",
    content:
      "Our team reviews your submission for eligibility and accuracy. We’ll ensure everything is valid before approval.",
    image: "/images/writer-img.png",
    alt: "Details Review",
    icon: <FaCreditCard />,
  },
  {
    title: "Get Approved Within 24 Hours",
    content:
      "You’ll receive an email confirmation with your approval status. We typically respond in under 24 hours.",
    image: "/images/bg.jpg",
    alt: "Approval Email",
  },
  {
    title: "Verify Your Email Address",
    content:
      "Click the verification link in your email to activate your account. Don’t forget to check spam!",
    image: "/images/book-img.png",
    alt: "Email Verification",
  },
  {
    title: "Log In & Update Profile",
    content:
      "Log in to your dashboard and complete your profile. Add your bank account details to receive payouts weekly.",
    image: "/images/project-img.png",
    alt: "Profile Update",
  },
  {
    title: "Upload Your myProjects",
    content:
      "Start uploading your academic work. Be sure to include TOC, Chapter One preview, and complete, high-quality files.",
    image: "/images/binded-project.png",
    alt: "Upload Projects",
  },
  {
    title: "Approval & Quality Check",
    content:
      "Each project undergoes a quick review for format and quality. Approvals are typically processed within an hour.",
    image: "/images/student-cap-1.png",
    alt: "Upload Review",
  },
  {
    title: "Track Sales & Earn Weekly",
    content:
      "Once your myProject is live, track its performance and get paid weekly — earn up to 50% per sale.",
    image: "/images/academic-assistance-bg.jpg",
    alt: "Monitor Earnings",
    cta: {
      label: "View Payout Schedule",
      href: "/seller/payouts",
    },
  },
];

// Feature card data for AcadeVault
export const HowItWorksFeatureCards = [
  {
    icon: Users,
    title: "Access Materials",
    description:
      "Discover high-quality academic resources tailored to your field of study.",
    cta: { label: "Browse Resources", href: "/resources" },
    image: "/images/book-img.png",
    alt: "Academic resources preview",
  },
  {
    icon: Briefcase,
    title: "Sell Materials",
    description:
      "Monetize your notes, papers, or study guides with secure transactions.",
    cta: { label: "Start Selling", href: "/sell" },
    image: "/images/academic-assistance-bg.jpg",
    alt: "Selling academic materials preview",
  },
  {
    icon: PenTool,
    title: "Hire Writers",
    description: "Get custom content from expert academics for your projects.",
    cta: { label: "Find Writers", href: "/writers" },
    image: "/images/writer-img.png",
    alt: "Hiring academic writers preview",
  },
];

// Condensed step data inspired by StepsSection
export const academicSteps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create a free account in seconds to start exploring.",
    icon: BookOpen,
    href: "/signup",
  },
  {
    id: 2,
    title: "Discover",
    description: "Search and filter resources by topic or type.",
    icon: Users,
    href: "/resources",
  },
  {
    id: 3,
    title: "Engage",
    description: "Purchase, download, or sell materials instantly.",
    icon: Briefcase,
    href: "/dashboard",
  },
  {
    id: 4,
    title: "Track",
    description: "Monitor progress with real-time analytics.",
    icon: PenTool,
    href: "/analytics",
  },
];

export const hireWriterSteps = [
  {
    icon: FaClipboardList,
    title: "Submit Your Order",
    description:
      "Fill out a detailed form specifying your academic requirements, topic, citation style, and deadline to start the process.",
    image: "/images/writer-img.png",
    alt: "Person filling out a form",
    color: "from-blue-500 to-indigo-600",
    cta: { href: "/order", label: "Place Order Now" },
  },
  {
    icon: FaCreditCard,
    title: "Secure Payment",
    description:
      "Complete a secure payment through our trusted gateway to confirm your order and initiate writer assignment.",
    image: "/images/monitize-bg.png",
    alt: "Secure payment interface",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: FaUserCheck,
    title: "Writer Assigned",
    description:
      "Our platform matches you with a vetted academic expert in your field, ensuring subject-specific expertise.",
    image: "/images/academic-writer.png",
    alt: "Professional writer at work",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: FaComments,
    title: "Track & Collaborate",
    description:
      "Monitor progress in real-time, review drafts, and communicate directly with your writer via our platform.",
    image: "/images/book-img.png",
    alt: "Collaborative discussion interface",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: FaCheckCircle,
    title: "Quality Assurance",
    description:
      "Your work undergoes rigorous checks for plagiarism, grammar, and adherence to requirements before delivery.",
    image: "/images/student-cap-1.png",
    alt: "Quality assurance process",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: FaFileDownload,
    title: "Receive Your Work",
    description:
      "Download your polished, high-quality academic document, delivered on time and ready for submission.",
    image: "/images/academic-assistance-bg.jpg",
    alt: "Downloading a document",
    color: "from-red-500 to-pink-600",
    cta: { href: "/dashboard", label: "View Dashboard" },
  },
];
