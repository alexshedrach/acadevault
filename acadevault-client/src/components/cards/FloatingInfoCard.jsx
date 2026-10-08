"use client";

import {
  Truck,
  BadgeCheck,
  Eye,
  Download,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { cn } from "@/utils/cn";
import MaterialPrice from "../materials/MaterialPrice";
import { Card } from "../ui/Card";

const FloatingInfoCard = ({
  material,
  className,
  clickable = false,
  onClick,
}) => {
  const {
    _id,
    title,
    deliveryFormat,
    digitalContent,
    analytics,
    materialType,
    price,
  } = material || {};

  const delivery =
    deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";

  return (
    <Card
      variant="shadowed"
      theme="glass"
      clickable={clickable}
      onClick={onClick}
      className={cn("hover:shadow-2xl hover:scale-[1.02] p-0", className)}
      header={
        <div className="text-center text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-2 rounded-t-xl cursor-pointer">
          {price?.amount === 0 ? "Download Free" : "Download Now"}
        </div>
      }
    >
      {/* Price Section */}
      <div className="flex justify-center items-center mx-5 my-2 px-6 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md rounded-xl">
        <MaterialPrice
          materialId={_id}
          materialType={materialType}
          basePrice={price?.amount}
          className="justify-center text-center"
        />
      </div>

      {/* Details Section */}
      <div className="space-y-4 px-6 py-5 text-sm text-gray-800 border-t">
        <DetailRow
          icon={<Truck size={16} className="text-indigo-600" />}
          label="Delivery"
          value={delivery}
        />
        <DetailRow
          icon={<BadgeCheck size={16} className="text-green-600" />}
          label="License"
          value={digitalContent?.license || "Standard"}
        />
        <DetailRow
          icon={<Eye size={16} className="text-blue-500" />}
          label="Views"
          value={analytics?.viewsCount ?? 0}
        />
        <DetailRow
          icon={<Download size={16} className="text-purple-600" />}
          label="Usage Rights"
          value={
            digitalContent?.usageRights?.canBeDownloaded
              ? "Downloadable"
              : "Restricted"
          }
        />
        <DetailRow
          icon={<ShieldCheck size={16} className="text-red-500" />}
          label="DRM"
          value={digitalContent?.digitalRightsManagement ? "Enabled" : "None"}
        />
        <DetailRow
          icon={<Clock size={16} className="text-yellow-600" />}
          label="Access"
          value={
            digitalContent?.expirationPolicy === "never"
              ? "Lifetime Access"
              : digitalContent?.expirationPolicy || "Limited"
          }
        />
      </div>
    </Card>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex items-center gap-2 font-medium">
      {icon}
      <span>{label}</span>
    </div>
    <span className="text-gray-600 text-right">{value}</span>
  </div>
);

export default FloatingInfoCard;

// "use client";

// import PropTypes from "prop-types";
// import {
//   Truck,
//   BadgeCheck,
//   Eye,
//   Download,
//   ShieldCheck,
//   Clock,
// } from "lucide-react";
// import MaterialPrice from "../materials/MaterialPrice";
// import { Card } from "../ui/Card";

// export default function FloatingInfoCard({ material }) {
//   const {
//     _id,
//     materialType,
//     price: basePrice = 0,
//     deliveryFormat,
//     digitalContent,
//     analytics,
//   } = material || {};

//   const delivery =
//     deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";

//   return (
//     <Card
//       // header={title}
//       // clickable={clickable}
//       // onClick={onClick}
//       variant="shadowed"
//       theme="glass"
//       className="backdrop-blur-xl"
//     >
//       {/* Pricing Section */}
//       <div className="p-6 flex flex-col items-center gap-4">
//         <ResourcePrice
//           materialId={_id}
//           materialType={materialType}
//           basePrice={basePrice?.amount}
//         />
//       </div>

//       {/* Details Section */}
//       <div className="border-t px-6 py-5 space-y-4 text-sm text-gray-700">
//         <ResourceDetails
//           details={[
//             {
//               icon: <Truck size={16} className="text-indigo-600" />,
//               label: "Delivery",
//               value: delivery,
//             },
//             {
//               icon: <BadgeCheck size={16} className="text-green-600" />,
//               label: "License",
//               value: digitalContent?.license,
//             },
//             {
//               icon: <Eye size={16} className="text-blue-500" />,
//               label: "Views",
//               value: analytics?.viewsCount ?? 0,
//             },
//             {
//               icon: <Download size={16} className="text-purple-600" />,
//               label: "Usage Rights",
//               value: digitalContent?.usageRights?.canBeDownloaded
//                 ? "Downloadable"
//                 : "Restricted",
//             },
//             {
//               icon: <ShieldCheck size={16} className="text-red-500" />,
//               label: "DRM",
//               value: digitalContent?.digitalRightsManagement
//                 ? "Enabled"
//                 : "None",
//             },
//             {
//               icon: <Clock size={16} className="text-yellow-600" />,
//               label: "Access",
//               value:
//                 digitalContent?.expirationPolicy === "never"
//                   ? "Lifetime Access"
//                   : digitalContent?.expirationPolicy,
//             },
//           ]}
//         />
//       </div>
//     </Card>
//   );
// }

// FloatingInfoCard.propTypes = {
//   resource: PropTypes.object.isRequired,
//   onClick: PropTypes.func,
//   clickable: PropTypes.bool,
// };

// function ResourcePrice({ materialId, materialType, basePrice }) {
//   return (
//     <div className="relative flex items-center justify-center">
//       <MaterialPrice
//         materialId={materialId}
//         materialType={materialType}
//         basePrice={basePrice}
//         className="text-center justify-center"
//       />
//     </div>
//   );
// }

// function ResourceDetails({ details }) {
//   return (
//     <div className="space-y-4">
//       {details.map((detail, idx) => (
//         <DetailRow
//           key={idx}
//           icon={detail.icon}
//           label={detail.label}
//           value={detail.value}
//         />
//       ))}
//     </div>
//   );
// }

// ResourceDetails.propTypes = {
//   details: PropTypes.arrayOf(
//     PropTypes.shape({
//       icon: PropTypes.node.isRequired,
//       label: PropTypes.string.isRequired,
//       value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//         .isRequired,
//     })
//   ).isRequired,
// };

// const DetailRow = ({ icon, label, value }) => (
//   <div className="flex items-start justify-between gap-4">
//     <div className="flex items-center gap-2 font-medium text-gray-800">
//       {icon}
//       <span>{label}</span>
//     </div>
//     <span className="text-gray-600 text-right">{value}</span>
//   </div>
// );
