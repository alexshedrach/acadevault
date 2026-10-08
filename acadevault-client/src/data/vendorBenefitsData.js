import {
  CheckCircle,
  Bell,
  BarChart,
  Lock,
  Globe,
  ShoppingBag,
  UploadCloud,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { BsArrowRepeat } from "react-icons/bs";
import { HiCurrencyDollar, HiInboxIn } from "react-icons/hi";

export const vendorsBenefits = [
  {
    title: "Easy Uploads",
    description:
      "Upload PDF, Word, Videos, Slides, or Scanned Notes. Tag topics, set pricing, and publish.",
    icon: UploadCloud,
  },
  {
    title: "Earn Recurring Revenue",
    description:
      "Get paid every time your content is purchased. Withdraw earnings securely.",
    icon: DollarSign,
  },
  {
    title: "Secure & Protected",
    description:
      "Your work is encrypted, watermarked, and protected against unauthorized distribution.",
    icon: ShieldCheck,
  },
  {
    icon: HiInboxIn,
    title: "Earn Passive Income",
    description:
      "Generate income from your academic materials with minimal effort. Every download means earnings — even while you sleep.",
  },
  {
    icon: HiCurrencyDollar,
    title: "Set Your Own Price",
    description:
      "Stay in control. Dictate your pricing strategy for each upload and adjust anytime to match demand.",
  },
  {
    icon: CheckCircle,
    title: "Unlimited Uploads",
    description:
      "There’s no cap. Upload unlimited projects, notes, or research — maximize exposure and sales potential.",
  },
  {
    icon: Globe,
    title: "Global Academic Reach",
    description:
      "Your content gets discovered by students and professionals from all around the world, across diverse fields.",
  },
  {
    icon: BarChart,
    title: "Real-Time Sales Dashboard",
    description:
      "Monitor views, downloads, and revenue with powerful analytics — stay informed, optimize performance.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Receive real-time alerts for every transaction, rating, and activity related to your content.",
  },
  {
    icon: BsArrowRepeat,
    title: "Weekly Payouts",
    description:
      "Withdraw earnings conveniently every week. We ensure fast, secure, and transparent payments.",
  },
  {
    icon: Lock,
    title: "Protect Your Intellectual Property",
    description:
      "You keep full rights. Define your own licensing terms while we handle the security and distribution.",
  },
  {
    title: "Free Online Selling Platform",
    description:
      "No upfront costs, no hidden fees. Upload and manage your digital content through our streamlined dashboard — completely free to start.",
    icon: ShoppingBag,
  },
];
