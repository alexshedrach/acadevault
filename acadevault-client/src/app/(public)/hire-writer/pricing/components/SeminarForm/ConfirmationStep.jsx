"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { cn } from "@/utils/cn";
import { formatPriceWithSymbol } from "@/utils/priceUtils";
import { AVAILABLE_ADDONS, MATERIAL_TIERS } from "@/config/priceConfiguration";

export default function ConfirmationStep({
  values,
  onEditStep,
  user,
  setCaptchaValue,
  estimatedPrice,
  promoError,
}) {
  const formattedTotal = formatPriceWithSymbol(estimatedPrice, values.currency);

  const fields = useMemo(() => {
    const addons = (values.selectedAddons || []).map((addonId) => {
      const addon = AVAILABLE_ADDONS[MATERIAL_TIERS["Seminar"]].find(
        (a) => a.id === addonId
      );
      return addon
        ? `${addon.label} (${formatPriceWithSymbol(
            addon.price[values.currency],
            values.currency
          )})`
        : "Unknown Add-on";
    });

    return [
      {
        label: "Name",
        value: values.name || "Not provided",
        editable: true,
        step: 0,
      },
      {
        label: "Email",
        value: values.email || "Not provided",
      },
      {
        label: "Phone",
        value: values.phone || "Not provided",
      },
      {
        label: "Project Topic",
        value: values.topic || "Not provided",
        editable: true,
        step: 1,
      },
      {
        label: "Academic Level",
        value: values.academicLevel?.toUpperCase() || "Not selected",
      },
      {
        label: "Additional Info",
        value: values.additionalInfo || "None provided",
      },
      {
        label: "Submission Deadline",
        value: values.deadline
          ? format(new Date(values.deadline), "PPP 'at' p")
          : "Not set",
        editable: true,
        step: 2,
      },
      {
        label: "Citation Style",
        value: values.citationStyle?.toUpperCase() || "Not selected",
      },
      {
        label: "Writer Expertise",
        value: values.writerExpertise
          ? values.writerExpertise.charAt(0).toUpperCase() +
            values.writerExpertise.slice(1)
          : "Not selected",
      },
      {
        label: "Add-ons",
        value: addons.length > 0 ? addons.join(", ") : "None selected",
        editable: true,
        step: 2,
      },
      {
        label: "Promo Code",
        value: values.promoCode || "None applied",
        error: promoError,
      },
      {
        label: "Content Length",
        value: values.unitCount
          ? `${values.unitCount} ${values.unitType}`
          : "Not specified",
        editable: true,
        step: 3,
      },
      {
        label: "Attached Files",
        value: values.files?.length
          ? `${values.files.length} file(s) attached`
          : "No files attached",
      },
      {
        label: "Total Price",
        value: formattedTotal.formatted || "Not calculated",
      },
    ];
  }, [values, formattedTotal, estimatedPrice, promoError]);

  return (
    <div className="space-y-2">
      <header className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900">
          📝 Final Review Before Submission
        </h3>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Carefully review your seminar project details. Click "Edit" to revise
          a step. Once confirmed, you’ll proceed to secure payment.
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100">
        {fields.map(({ label, value, editable, step, error }, index) => (
          <div
            key={index}
            className={cn(
              "flex justify-between items-center gap-2 p-3",
              label === "Total Price" && "bg-blue-50 font-semibold"
            )}
          >
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {label}
              </p>
              <p
                className={cn(
                  "text-sm text-gray-800 whitespace-pre-wrap",
                  label === "Total Price" && "text-blue-700 text-base",
                  error && "text-red-600"
                )}
              >
                {value}
                {error && ` (${error})`}
              </p>
            </div>
            {editable && typeof onEditStep === "function" && (
              <button
                onClick={() => onEditStep(step)}
                className="text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      {!user && (
        <div className="flex justify-center mt-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setCaptchaValue}
          />
        </div>
      )}

      <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg border border-yellow-200 shadow-sm mt-4">
        <strong className="font-semibold">Note:</strong> Once submitted, changes
        cannot be made. Double-check your details and ensure the email address
        and total amount of {formattedTotal.formatted} are correct.
      </div>
    </div>
  );
}

// "use client";

// import React, { useMemo, useContext } from "react";
// import { format } from "date-fns";
// import ReCAPTCHA from "react-google-recaptcha";
// import { CurrencyContext } from "@/contexts/CurrencyContext";
// import { cn } from "@/utils/cn";
// import { formatPrice } from "@/utils/formatPrice";

// export default function ConfirmationStep({
//   values,
//   onEditStep,
//   user,
//   setCaptchaValue,
//   estimatedPrice,
// }) {
//   const { currency } = useContext(CurrencyContext);
//   const formattedTotal = formatPrice(estimatedPrice, currency);

//   const fields = useMemo(() => {
//     return [
//       {
//         label: "Name",
//         value: values.name || "Not provided",
//         editable: true,
//         step: 0,
//       },
//       {
//         label: "Email",
//         value: values.email || "Not provided",
//       },
//       {
//         label: "Phone",
//         value: values.phone || "Not provided",
//       },
//       {
//         label: "Project Topic",
//         value: values.topic || "Not provided",
//         editable: true,
//         step: 1,
//       },
//       {
//         label: "Academic Level",
//         value: values.academicLevel?.toUpperCase() || "Not selected",
//       },
//       {
//         label: "Additional Info",
//         value: values.additionalInfo || "None provided",
//       },
//       {
//         label: "Submission Deadline",
//         value: values.deadline
//           ? format(new Date(values.deadline), "PPP 'at' p")
//           : "Not set",
//         editable: true,
//         step: 2,
//       },
//       {
//         label: "Citation Style",
//         value: values.citationStyle?.toUpperCase() || "Not selected",
//       },
//       {
//         label: "Complexity Level",
//         value: values.complexity || "Not selected",
//       },
//       {
//         label: "Writer Expertise",
//         value: values.writerExpertise || "Not selected",
//       },
//       {
//         label: "Content Length",
//         value: values.unitCount
//           ? `${values.unitCount} ${values.unitType}`
//           : "Not specified",
//         editable: true,
//         step: 3,
//       },
//       {
//         label: "Attached Files",
//         value: values.files?.length
//           ? `${values.files.length} file(s) attached`
//           : "No files attached",
//       },
//       {
//         label: "Total Price",
//         value: formattedTotal.formatted || "Not calculated",
//       },
//     ];
//   }, [values, formattedTotal, estimatedPrice]);

//   return (
//     <div className="space-y-2">
//       {/* Header */}
//       <header className="text-center mb-4">
//         <h3 className="text-2xl font-bold text-gray-900">
//           📝 Final Review Before Submission
//         </h3>
//         <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
//           Carefully review your seminar project details. Click "Edit" to revise
//           a step. Once confirmed, you’ll proceed to secure payment.
//         </p>
//       </header>

//       {/* Review Summary */}
//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100">
//         {fields.map(({ label, value, editable, step }, index) => (
//           <div
//             key={index}
//             className={cn(
//               "flex justify-between items-center gap-2 p-3",
//               label === "Total Price" && "bg-blue-50 font-semibold"
//             )}
//           >
//             <div className="flex-1">
//               <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
//                 {label}
//               </p>
//               <p
//                 className={cn(
//                   "text-sm text-gray-800 whitespace-pre-wrap",
//                   label === "Total Price" && "text-blue-700 text-base"
//                 )}
//               >
//                 {value}
//               </p>
//             </div>
//             {editable && typeof onEditStep === "function" && (
//               <button
//                 onClick={() => onEditStep(step)}
//                 className="text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* CAPTCHA for guests only */}
//       {!user && (
//         <div className="flex justify-center mt-4">
//           <ReCAPTCHA
//             sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
//             onChange={setCaptchaValue}
//           />
//         </div>
//       )}

//       {/* Submission Note */}
//       <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg border border-yellow-200 shadow-sm mt-4">
//         <strong className="font-semibold">Note:</strong> Once submitted, changes
//         cannot be made. Double-check your details and ensure the email address
//         and total amount of {formattedTotal.symbol}
//         {estimatedPrice?.toLocaleString()} are correct.
//       </div>
//     </div>
//   );
// }
