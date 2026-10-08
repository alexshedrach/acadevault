import {
  FaTachometerAlt,
  FaHeart,
  FaShoppingCart,
  FaMoneyCheckAlt,
  FaBookOpen,
  FaStar,
  FaUserCog,
} from "react-icons/fa";

export const userNavGroups = [
  {
    groupLabel: "Core",
    items: [
      { label: "Dashboard", icon: FaTachometerAlt, href: "/dashboard/user" },
    ],
  },
  {
    groupLabel: "My Library",
    items: [
      { label: "Purchased", icon: FaBookOpen, href: "/dashboard/user/library" },
      { label: "Wishlist", icon: FaHeart, href: "/dashboard/user/wishlist" },
    ],
  },
  {
    groupLabel: "Orders & Payments",
    items: [
      { label: "Cart", icon: FaShoppingCart, href: "/dashboard/user/cart" },
      {
        label: "Orders",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/user/orders",
      },
      {
        label: "Refunds",
        icon: FaMoneyCheckAlt,
        href: "/dashboard/user/refunds",
      },
    ],
  },
  {
    groupLabel: "Reviews",
    items: [
      { label: "My Reviews", icon: FaStar, href: "/dashboard/user/reviews" },
    ],
  },
  {
    groupLabel: "Account",
    items: [
      { label: "Profile", icon: FaUserCog, href: "/dashboard/user/profile" },
      { label: "Settings", icon: FaUserCog, href: "/dashboard/user/settings" },
    ],
  },
];
