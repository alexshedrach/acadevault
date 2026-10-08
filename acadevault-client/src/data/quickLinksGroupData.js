import {
  BookOpen,
  MessageCircle,
  Star,
  Upload,
  User,
  CreditCard,
  HelpCircle,
  BarChart2,
  LogIn,
  UserPlus,
} from "lucide-react";

export const quickLinksGroupData = [
  {
    title: "Discover",
    key: "discover",
    links: [
      {
        href: "/materials",
        label: "Browse Materials",
        icon: <BookOpen className="w-5 h-5 text-blue-600" />,
        description: "Explore academic resources",
        show: () => true,
      },
      {
        href: "/reviews",
        label: "Read Reviews",
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        description: "See what others say about materials",
        show: () => true,
      },
      {
        href: "/categories",
        label: "Explore Departments",
        icon: <BookOpen className="w-5 h-5 text-green-600" />,
        description: "Find resources by department",
        show: () => true,
      },
    ],
  },
  {
    title: "Engage",
    key: "engage",
    links: [
      {
        href: "/materials/upload",
        label: "Upload Material",
        icon: <Upload className="w-5 h-5 text-purple-600" />,
        description: "Share your academic content",
        show: (user, isAuthenticated) =>
          isAuthenticated &&
          (user?.role === "Seller" || user?.role === "Admin"),
      },
      {
        href: "/contact",
        label: "Contact Support",
        icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
        description: "Get help from our team",
        show: () => true,
      },
      {
        href: "/dashboard",
        label: "My Dashboard",
        icon: <BarChart2 className="w-5 h-5 text-teal-600" />,
        description: "Manage your account and materials",
        show: (user, isAuthenticated) => isAuthenticated,
      },
    ],
  },
  {
    title: "Account",
    key: "account",
    links: [
      {
        href: "/profile",
        label: "My Profile",
        icon: <User className="w-5 h-5 text-indigo-600" />,
        description: "Update your profile details",
        show: (user, isAuthenticated) => isAuthenticated,
      },
      {
        href: "/subscriptions",
        label: "Manage Subscription",
        icon: <CreditCard className="w-5 h-5 text-green-600" />,
        description: "View or upgrade your plan",
        show: (user, isAuthenticated) =>
          isAuthenticated && user?.role === "Seller",
      },
      {
        href: "/login",
        label: "Log In",
        icon: <LogIn className="w-5 h-5 text-blue-600" />,
        description: "Access your account",
        show: (user, isAuthenticated) => !isAuthenticated,
      },
      {
        href: "/signup",
        label: "Sign Up",
        icon: <UserPlus className="w-5 h-5 text-blue-600" />,
        description: "Join the Acadavault community",
        show: (user, isAuthenticated) => !isAuthenticated,
      },
    ],
  },
  {
    title: "Learn More",
    key: "learn-more",
    links: [
      {
        href: "/about",
        label: "About Us",
        icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
        description: "Learn about Acadavault’s mission",
        show: () => true,
      },
      {
        href: "/security",
        label: "Security",
        icon: <HelpCircle className="w-5 h-5 text-red-600" />,
        description: "Understand our security measures",
        show: () => true,
      },
      {
        href: "/faq",
        label: "FAQs",
        icon: <HelpCircle className="w-5 h-5 text-purple-600" />,
        description: "Find answers to common questions",
        show: () => true,
      },
    ],
  },
];
