import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { FaCheckCircle, FaShieldAlt, FaStar } from "react-icons/fa";

export const trustItems = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Originality Guaranteed",
    description:
      "Every paper is custom-written, 100% plagiarism-free, and backed by a detailed originality report.",
    accent: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    icon: Lock,
    title: "Secure & Confidential",
    description:
      "Bank-level encryption protects your data; we never share or sell your information.",
    accent: "from-green-400 to-green-600",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "On-Time Delivery",
    description:
      "Guaranteed delivery by your deadline or your money back, no questions asked.",
    accent: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    icon: FaStar,
    title: "Top-Rated Experts",
    description:
      "Hand-selected scholars with 4.8+ star ratings and domain-specific expertise.",
    accent: "from-orange-400 to-orange-600",
  },
  {
    id: 5,
    icon: FaShieldAlt,
    title: "Privacy Assured",
    description:
      "We adhere to strict confidentiality policies and GDPR compliance.",
    accent: "from-teal-400 to-teal-600",
  },
  {
    id: 6,
    icon: FaCheckCircle,
    title: "Verified Quality",
    description:
      "Each submission is reviewed by our academic panel to ensure excellence.",
    accent: "from-red-400 to-red-600",
  },
];
