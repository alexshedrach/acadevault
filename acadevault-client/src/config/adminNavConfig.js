import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaBoxOpen,
  FaChartBar,
  FaMoneyCheckAlt,
  FaUserTag,
  FaHeadset,
  FaUserCog,
} from "react-icons/fa";

export const adminNavGroups = [
  {
    groupLabel: "Core",
    items: [
      { label: "Dashboard", icon: FaTachometerAlt, href: "/dashboard/admin" },
    ],
  },
  {
    groupLabel: "User Management",
    items: [
      { label: "Users", icon: FaUsers, href: "/dashboard/admin/users" },
      {
        label: "Roles & Permissions",
        icon: FaUserShield,
        href: "/dashboard/admin/roles",
      },
      {
        label: "Sellers",
        icon: FaUserShield,
        href: "/dashboard/admin/sellers",
      },
      {
        label: "Affiliates",
        icon: FaUserTag,
        href: "/dashboard/admin/affiliates",
      },
    ],
  },
  {
    groupLabel: "Marketplace",
    items: [
      {
        label: "Materials",
        icon: FaBoxOpen,
        href: "/dashboard/admin/materials",
      },
      {
        label: "Categories",
        icon: FaBoxOpen,
        href: "/dashboard/admin/categories",
      },
      {
        label: "Bundles & Deals",
        icon: FaBoxOpen,
        href: "/dashboard/admin/bundles",
      },
      {
        label: "Advertisements",
        icon: FaBoxOpen,
        href: "/dashboard/admin/ads",
      },
    ],
  },
  {
    groupLabel: "Finance & Transactions",
    items: [
      {
        label: "Orders",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/orders",
      },
      {
        label: "Payments",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/payments",
      },
      {
        label: "Refunds",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/refunds",
      },
      {
        label: "Transactions",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/transactions",
      },
      {
        label: "Discount Coupons",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/coupons",
      },
      {
        label: "Commissions",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/commissions",
      },
      {
        label: "Affiliate Sales",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/admin/affiliate-sales",
      },
      {
        label: "Taxes & Reporting",
        icon: FaChartBar,
        href: "/dashboard/admin/taxes",
      },
    ],
  },
  {
    groupLabel: "Analytics & Monitoring",
    items: [
      {
        label: "Analytics",
        icon: FaChartBar,
        href: "/dashboard/admin/analytics",
      },
      { label: "Reports", icon: FaChartBar, href: "/dashboard/admin/reports" },
      {
        label: "Seller Performance",
        icon: FaChartBar,
        href: "/dashboard/admin/seller-performance",
      },
    ],
  },
  {
    groupLabel: "Content & Licensing",
    items: [
      {
        label: "Content Library",
        icon: FaBoxOpen,
        href: "/dashboard/admin/content",
      },
      {
        label: "Licensing",
        icon: FaUserShield,
        href: "/dashboard/admin/licensing",
      },
    ],
  },
  {
    groupLabel: "Support & Feedback",
    items: [
      {
        label: "Support Tickets",
        icon: FaHeadset,
        href: "/dashboard/admin/support",
      },
      { label: "Reviews", icon: FaUserCog, href: "/dashboard/admin/reviews" },
      {
        label: "Return Requests",
        icon: FaUserCog,
        href: "/dashboard/admin/returns",
      },
    ],
  },
  {
    groupLabel: "Settings & Integrations",
    items: [
      {
        label: "Subscriptions",
        icon: FaUserTag,
        href: "/dashboard/admin/subscriptions",
      },
      {
        label: "Integrations",
        icon: FaUserTag,
        href: "/dashboard/admin/integrations",
      },
      {
        label: "Notifications",
        icon: FaUserTag,
        href: "/dashboard/admin/notifications",
      },
      {
        label: "Site Settings",
        icon: FaUserCog,
        href: "/dashboard/admin/settings",
      },
    ],
  },
];
