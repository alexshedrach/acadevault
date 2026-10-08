import dynamic from "next/dynamic";

// Lazy-loaded Icons
const FaUserGraduate = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaUserGraduate),
  { ssr: false }
);
const FaComments = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaComments),
  { ssr: false }
);
const FaClipboardCheck = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaClipboardCheck),
  { ssr: false }
);
const FaMoneyBillAlt = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaMoneyBillAlt),
  { ssr: false }
);
const FaClock = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaClock),
  { ssr: false }
);
const FaLock = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaLock),
  { ssr: false }
);
const FaHandshake = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaHandshake),
  { ssr: false }
);
const FaCheckCircle = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaCheckCircle),
  { ssr: false }
);

// Benefits Data with Tooltips and Sizes
export const writersBenefitsData = [
  {
    title: "Vetted Subject-Matter Experts",
    description:
      "Partner with PhD-level academics who provide in-depth, research-driven content, tailored to your unique objectives with unmatched precision and academic rigor.",
    icon: <FaUserGraduate />,
    tooltip: "Our writers are rigorously vetted for expertise.",
    size: "large",
    group: "Expertise",
  },
  {
    title: "24/7 Support & Tracking",
    description:
      "Get real-time order updates and around-the-clock support whenever you need assistance.",
    icon: <FaComments />,
    tooltip: "Access support anytime, anywhere.",
    size: "regular",
    group: "Reliability",
  },
  {
    title: "Plagiarism-Free Guarantee",
    description:
      "Receive fully original content supported by comprehensive plagiarism reports, strict quality controls, and industry-leading academic integrity standards.",
    icon: <FaClipboardCheck />,
    tooltip: "Every project includes a plagiarism report.",
    size: "large",
    group: "Quality",
  },
  {
    title: "Transparent Pricing",
    description:
      "Enjoy clear, upfront pricing with no hidden fees and flexible options to suit your budget.",
    icon: <FaMoneyBillAlt />,
    tooltip: "Clear pricing with no surprises.",
    size: "regular",
    group: "Affordability",
  },
  {
    title: "Timely Delivery",
    description:
      "We guarantee punctual delivery to keep your academic and project timelines on track.",
    icon: <FaClock />,
    tooltip: "On-time delivery or your money back.",
    size: "regular",
    group: "Reliability",
  },
  {
    title: "Secure Data Handling",
    description:
      "Your personal and academic information is fully protected with advanced security protocols.",
    icon: <FaLock />,
    tooltip: "Your data is protected with advanced encryption.",
    size: "regular",
    group: "Security",
  },
  {
    title: "Customized Solutions",
    description:
      "Receive content precisely tailored to your discipline, academic level, and specific project needs.",
    icon: <FaHandshake />,
    tooltip: "Tailored to your unique needs.",
    size: "regular",
    group: "Personalization",
  },
  {
    title: "Direct Writer Communication",
    description:
      "Communicate directly with your assigned writer for smooth collaboration and personalized results.",
    icon: <FaCheckCircle />,
    tooltip: "Communicate directly with your writer.",
    size: "large",
    group: "Personalization",
  },
];
