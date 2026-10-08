import {
  FaTachometerAlt,
  FaUserTag,
  FaMoneyCheckAlt,
  FaChartBar,
  FaUserCog,
} from "react-icons/fa";

export const affiliateNavGroups = [
  {
    groupLabel: "Core",
    items: [
      {
        label: "Dashboard",
        icon: FaTachometerAlt,
        href: "/dashboard/affiliate",
      },
    ],
  },
  {
    groupLabel: "Referrals & Earnings",
    items: [
      {
        label: "My Referrals",
        icon: FaUserTag,
        href: "/dashboard/affiliate/referrals",
      },
      {
        label: "Commission",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/affiliate/commissions",
      },
      {
        label: "Payouts",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/affiliate/payouts",
      },
    ],
  },
  {
    groupLabel: "Analytics",
    items: [
      {
        label: "Performance",
        icon: FaChartBar,
        href: "/dashboard/affiliate/analytics",
      },
    ],
  },
  {
    groupLabel: "Account",
    items: [
      {
        label: "Profile",
        icon: FaUserCog,
        href: "/dashboard/affiliate/profile",
      },
      {
        label: "Settings",
        icon: FaUserCog,
        href: "/dashboard/affiliate/settings",
      },
    ],
  },
];
