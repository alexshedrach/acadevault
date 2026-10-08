import {
  FaTachometerAlt,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaChartBar,
  FaUserCog,
  FaStar,
  FaTag,
  FaLayerGroup,
} from "react-icons/fa";

export const sellerNavGroups = [
  {
    groupLabel: "Core",
    items: [
      { label: "Dashboard", icon: FaTachometerAlt, href: "/dashboard/seller" },
    ],
  },
  {
    groupLabel: "Product Management",
    items: [
      {
        label: "My Products",
        icon: FaBoxOpen,
        href: "/dashboard/seller/products",
      },
      {
        label: "Add Product",
        icon: FaBoxOpen,
        href: "/dashboard/seller/products/new",
      },
      {
        label: "Bundles",
        icon: FaLayerGroup,
        href: "/dashboard/seller/bundles",
      },
      {
        label: "Categories",
        icon: FaBoxOpen,
        href: "/dashboard/seller/categories",
      },
    ],
  },
  {
    groupLabel: "Sales & Earnings",
    items: [
      {
        label: "Orders",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/seller/orders",
      },
      {
        label: "Earnings",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/seller/earnings",
      },
      {
        label: "Withdrawals",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/seller/withdrawals",
      },
      {
        label: "Discounts & Coupons",
        icon: FaTag,
        href: "/dashboard/seller/coupons",
      },
    ],
  },
  {
    groupLabel: "Analytics",
    items: [
      {
        label: "Sales Report",
        icon: FaChartBar,
        href: "/dashboard/seller/reports",
      },
      {
        label: "Product Insights",
        icon: FaChartBar,
        href: "/dashboard/seller/insights",
      },
    ],
  },
  {
    groupLabel: "Customer Engagement",
    items: [
      { label: "Reviews", icon: FaStar, href: "/dashboard/seller/reviews" },
      {
        label: "Support Tickets",
        icon: FaUserCog,
        href: "/dashboard/seller/support",
      },
    ],
  },
  {
    groupLabel: "Account Settings",
    items: [
      { label: "Profile", icon: FaUserCog, href: "/dashboard/seller/profile" },
      {
        label: "Settings",
        icon: FaUserCog,
        href: "/dashboard/seller/settings",
      },
    ],
  },
];
