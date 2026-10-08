import {
  FaTachometerAlt,
  FaHeadset,
  FaChartBar,
  FaUserCog,
} from "react-icons/fa";

export const agentNavGroups = [
  {
    groupLabel: "Core",
    items: [
      { label: "Dashboard", icon: FaTachometerAlt, href: "/dashboard/agent" },
    ],
  },
  {
    groupLabel: "Support Management",
    items: [
      { label: "Tickets", icon: FaHeadset, href: "/dashboard/agent/tickets" },
      { label: "Resolved", icon: FaHeadset, href: "/dashboard/agent/resolved" },
    ],
  },
  {
    groupLabel: "Analytics",
    items: [
      {
        label: "Performance",
        icon: FaChartBar,
        href: "/dashboard/agent/performance",
      },
    ],
  },
  {
    groupLabel: "Account",
    items: [
      { label: "Profile", icon: FaUserCog, href: "/dashboard/agent/profile" },
      { label: "Settings", icon: FaUserCog, href: "/dashboard/agent/settings" },
    ],
  },
];
