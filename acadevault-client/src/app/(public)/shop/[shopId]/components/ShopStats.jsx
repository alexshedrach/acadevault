// components/shop/ShopStats.jsx
"use client";

import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
} from "lucide-react";
import { HiArrowPath, HiDocumentText } from "react-icons/hi2";

// 1) Role‑based card definitions
const PUBLIC_CARDS = [
  {
    icon: ChartBarIcon,
    label: "Materials",
    field: "totalMaterials",
    default: 0,
  },
  {
    icon: StarIcon,
    label: "Avg. Rating",
    field: "averageRating",
    tooltipField: "ratingCount",
    default: 0,
    format: (v) => `${v.toFixed(1)} ★`,
  },
  {
    icon: UsersIcon,
    label: "Followers",
    field: "realTimeFollowerCount",
    default: 0,
  },
];

const USER_CARDS = [
  ...PUBLIC_CARDS,
  {
    icon: HiDocumentText,
    label: "Return Policy",
    field: "returnPolicy",
    default: "—",
  },
  {
    icon: HiDocumentText,
    label: "Shipping Policy",
    field: "shippingPolicy",
    default: "—",
  },
];

const SELLER_CARDS = [
  { icon: ChartBarIcon, label: "Total Sales", field: "totalSales", default: 0 },
  { icon: HiArrowPath, label: "Items Sold", field: "itemsSold", default: 0 },
  { icon: ChartBarIcon, label: "Revenue", field: "totalRevenue", default: 0 },
  {
    icon: HiArrowPath,
    label: "Return Rate",
    field: "returnRate",
    default: "0%",
  },
  {
    icon: UsersIcon,
    label: "Followers",
    field: "realTimeFollowerCount",
    default: 0,
  },
  {
    icon: StarIcon,
    label: "Avg. Rating",
    field: "averageRating",
    tooltipField: "ratingCount",
    default: 0,
    format: (v) => `${v.toFixed(1)} ★`,
  },
  {
    icon: CalendarIcon,
    label: "Joined",
    field: "joinedDate",
    default: null,
    format: (v) =>
      new Date(v).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
  },
  {
    icon: ClockIcon,
    label: "Last Active",
    field: "lastActive",
    default: null,
    format: (v) =>
      new Date(v).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
  },
];

const ADMIN_CARDS = [
  ...SELLER_CARDS,
  { icon: HiDocumentText, label: "Status", field: "status", default: "—" },
  {
    icon: HiDocumentText,
    label: "Verified",
    field: "isVerified",
    default: false,
    format: (v) => (v ? "Yes" : "No"),
  },
  {
    icon: HiDocumentText,
    label: "Bank Details",
    field: "primaryBankDetails",
    default: "—",
  },
  {
    icon: HiDocumentText,
    label: "Updated By",
    field: "lastUpdatedBy",
    default: "—",
  },
];

const CARDS_BY_ROLE = {
  Public: PUBLIC_CARDS,
  User: USER_CARDS,
  Seller: SELLER_CARDS,
  Admin: ADMIN_CARDS,
};

export default function ShopStats({ stats = {}, role = "Public" }) {
  const cards = CARDS_BY_ROLE[role] || PUBLIC_CARDS;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm max-w-6xl mx-auto">
      {cards.map(
        ({ icon: Icon, label, field, tooltipField, default: def, format }) => {
          // 2) Pull raw value, fall back to `def`
          let raw = stats[field];
          if (raw == null) {
            raw = def;
          }

          // 3) Format if needed
          let value;
          if (format) {
            value = format(raw);
          } else if (typeof raw === "number") {
            value = raw.toLocaleString();
          } else if (typeof raw === "boolean") {
            value = raw ? "Yes" : "No";
          } else if (raw === null) {
            value = "—";
          } else {
            value = raw;
          }

          // 4) Tooltip for tooltipField
          let tooltip;
          if (tooltipField && stats[tooltipField] != null) {
            tooltip = stats[tooltipField].toLocaleString();
          }

          return (
            <div
              key={field}
              className="flex flex-col items-center text-center gap-1"
            >
              <Icon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">
                {value}
              </span>
              <span className="text-xs text-gray-500">
                {label}
                {tooltip && (
                  <span className="ml-1" title={tooltip}>
                    ℹ️
                  </span>
                )}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}

// import {
//   CalendarIcon,
//   ChartBarIcon,
//   ClockIcon,
//   EyeIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import { HiArrowPath, HiDocumentText } from "react-icons/hi2";

// export default function ShopStats({ stats }) {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm max-w-6xl mx-auto">
//       <StatCard
//         icon={ChartBarIcon}
//         label="Total Sales"
//         value={stats.totalSales}
//       />
//       <StatCard
//         icon={StarIcon}
//         label="Avg. Rating"
//         value={`${stats.averageRating?.toFixed(1)} ★`}
//         tooltip={`${stats.ratingCount} reviews`}
//       />
//       <StatCard
//         icon={CalendarIcon}
//         label="Member Since"
//         value={new Date(stats.joinedDate).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//         })}
//       />
//       <StatCard
//         icon={ClockIcon}
//         label="Response Time"
//         value={stats.responseTime}
//       />
//       <StatCard
//         icon={HiDocumentText}
//         label="Materials"
//         value={stats.totalMaterials}
//       />
//       <StatCard
//         icon={UsersIcon}
//         label={`Follower${stats.followersCount === 1 ? "" : "s"}`}
//         value={stats.followersCount}
//       />
//       <StatCard
//         icon={HiArrowPath}
//         label="Return Rate"
//         value={stats.returnRate}
//         tooltip="90-day metric"
//       />
//       <StatCard
//         icon={EyeIcon}
//         label="Last Active"
//         value={new Date(stats.lastActive).toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         })}
//       />
//     </div>
//   );
// }

// function StatCard({ icon: Icon, label, value, tooltip }) {
//   return (
//     <div className="flex flex-col items-center text-center gap-1">
//       <Icon className="w-5 h-5 text-blue-600" />
//       <span className="text-sm font-semibold text-gray-900">{value}</span>
//       <span className="text-xs text-gray-500">
//         {label}
//         {tooltip && (
//           <span className="ml-1" title={tooltip}>
//             ℹ️
//           </span>
//         )}
//       </span>
//     </div>
//   );
// }
