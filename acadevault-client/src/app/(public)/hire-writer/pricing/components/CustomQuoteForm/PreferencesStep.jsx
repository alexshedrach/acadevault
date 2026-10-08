import { motion } from "framer-motion";
import {
  CheckboxGroupField,
  FileUpload,
  RadioGroupField,
  TextAreaField,
} from "@/components/forms/FormFields";
import { AVAILABLE_ADDONS, MATERIAL_TIERS } from "@/config/priceConfiguration";
import { formatPriceWithSymbol } from "@/utils/priceUtils";
import { CURRENCIES } from "@/constants/enums";
import { ChevronDown } from "lucide-react";

export default function PreferencesStep({ control, watch, register, errors }) {
  const currency = watch("currency") || "NGN";
  const materialType = watch("academicType") || "Journal";
  const tier = MATERIAL_TIERS[materialType] || "Tier1";

  const addonOptions = (AVAILABLE_ADDONS[tier] || []).map((addon) => {
    const amount = addon.price[currency] ?? addon.price.USD ?? 0;
    return {
      value: addon.id,
      label: `${addon.label} (+${formatPriceWithSymbol(amount, currency)})`,
    };
  });

  // Log selectedAddons for debugging
  const selectedAddons = watch("selectedAddons");
  console.log("[PreferencesStep] selectedAddons:", selectedAddons);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm border border-gradient-to-r from-blue-100 to-indigo-100"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="md:col-span-2">
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Currency
        </label>
        <div className="relative">
          <select
            id="currency"
            {...register("currency", { required: "Please select a currency." })}
            className={`appearance-none w-full bg-white border ${
              errors.currency ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
        {errors.currency && (
          <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
        )}
      </div>

      <RadioGroupField
        name="citationStyle"
        label="Citation Style"
        control={control}
        options={[
          { value: "apa", label: "APA" },
          { value: "mla", label: "MLA" },
          { value: "chicago", label: "Chicago" },
          { value: "harvard", label: "Harvard" },
        ]}
        layout="grid"
        rules={{ required: "Citation style is required." }}
      />

      <CheckboxGroupField
        name="documentFormats"
        label="Preferred Document Formats"
        control={control}
        options={[
          { value: "docx", label: "Word Document (.docx)" },
          { value: "pdf", label: "PDF (.pdf)" },
          { value: "txt", label: "Plain Text (.txt)" },
        ]}
        rules={{
          validate: (formats) =>
            formats?.length > 0 || "Select at least one document format.",
        }}
      />

      <div>
        <CheckboxGroupField
          name="selectedAddons"
          label="Add-ons"
          control={control}
          options={addonOptions}
        />
        {addonOptions.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            No add-ons available for this material type.
          </p>
        )}
      </div>

      <FileUpload
        name="files"
        label="Reference Files (optional)"
        control={control}
        accept=".pdf,.doc,.docx"
        multiple
        maxSizeMB={10}
        rules={{
          validate: (files) => {
            if (!files) return true;
            const validTypes = [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            for (const file of files) {
              if (!validTypes.includes(file.type)) {
                return "Only PDF, DOC, and DOCX files are allowed.";
              }
              if (file.size > 10 * 1024 * 1024) {
                return "Max file size is 10MB.";
              }
            }
            return true;
          },
        }}
        helpText="Upload reference materials (PDF, DOC, DOCX; max 10MB each)."
      />

      <div className="md:col-span-2">
        <TextAreaField
          name="instructions"
          label="Additional Instructions (optional)"
          control={control}
          placeholder="Specify tone, special instructions, or additional project details..."
          rows={6}
          showHint
          hintText="Use this field to describe audience, tone, or unique requirements."
        />
      </div>
    </motion.div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import {
//   CheckboxGroupField,
//   FileUpload,
//   RadioGroupField,
//   TextAreaField,
// } from "@/components/forms/FormFields";
// import { AVAILABLE_ADDONS, MATERIAL_TIERS } from "@/config/priceConfiguration";
// import { formatPriceWithSymbol } from "@/utils/priceUtils";
// import { CURRENCIES } from "@/constants/enums";
// import { ChevronDown } from "lucide-react";

// export default function PreferencesStep({ control, watch, register, errors }) {
//   // 1. Pull the selected currency from the form
//   const currency = watch("currency") || "NGN";

//   const materialType = watch("academicType") || "Journal";
//   const tier = MATERIAL_TIERS[materialType] || "Tier1";

//   // 2. Build addon options using the dynamic currency
//   const addonOptions = (AVAILABLE_ADDONS[tier] || []).map((addon) => {
//     // pick the amount in selected currency, or fall back to USD
//     const amount = addon.price[currency] ?? addon.price.USD;
//     return {
//       value: addon.id,
//       label: `${addon.label} (+${formatPriceWithSymbol(amount, currency)})`,
//     };
//   });

//   return (
//     <motion.div
//       className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm border border-gradient-to-r from-blue-100 to-indigo-100"
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* 1. Currency Selector */}
//       <div className="md:col-span-2">
//         <label
//           htmlFor="currency"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Currency
//         </label>
//         <div className="relative">
//           <select
//             id="currency"
//             {...register("currency", { required: "Please select a currency." })}
//             className={`appearance-none w-full bg-white border ${
//               errors.currency ? "border-red-500" : "border-gray-300"
//             } rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//           >
//             {CURRENCIES.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//             size={20}
//           />
//         </div>
//         {errors.currency && (
//           <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
//         )}
//       </div>

//       {/* 3. Citation Style */}
//       <RadioGroupField
//         name="citationStyle"
//         label="Citation Style"
//         control={control}
//         options={[
//           { value: "apa", label: "APA" },
//           { value: "mla", label: "MLA" },
//           { value: "chicago", label: "Chicago" },
//           { value: "harvard", label: "Harvard" },
//         ]}
//         layout="grid"
//         rules={{ required: "Citation style is required." }}
//       />

//       {/* 4. Document Formats */}
//       <CheckboxGroupField
//         name="documentFormats"
//         label="Preferred Document Formats"
//         control={control}
//         options={[
//           { value: "docx", label: "Word Document (.docx)" },
//           { value: "pdf", label: "PDF (.pdf)" },
//           { value: "txt", label: "Plain Text (.txt)" },
//         ]}
//         rules={{
//           validate: (formats) =>
//             formats?.length > 0 || "Select at least one document format.",
//         }}
//       />

//       {/* 5. Add‑ons (Now dynamic based on currency) */}
//       <CheckboxGroupField
//         name="selectedAddons"
//         label="Add‑ons"
//         control={control}
//         options={addonOptions}
//       />

//       {/* 6. Reference File Upload */}
//       <FileUpload
//         name="files"
//         label="Reference Files (optional)"
//         control={control}
//         accept=".pdf,.doc,.docx"
//         multiple
//         maxSizeMB={10}
//         rules={{
//           validate: (files) => {
//             if (!files) return true;
//             const validTypes = [
//               "application/pdf",
//               "application/msword",
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             ];
//             for (const file of files) {
//               if (!validTypes.includes(file.type)) {
//                 return "Only PDF, DOC, and DOCX files are allowed.";
//               }
//               if (file.size > 10 * 1024 * 1024) {
//                 return "Max file size is 10MB.";
//               }
//             }
//             return true;
//           },
//         }}
//         helpText="Upload reference materials (PDF, DOC, DOCX; max 10MB each)."
//       />

//       {/* 7. Additional Instructions */}
//       <div className="md:col-span-2">
//         <TextAreaField
//           name="instructions"
//           label="Additional Instructions (optional)"
//           control={control}
//           placeholder="Specify tone, special instructions, or additional project details..."
//           rows={6}
//           showHint
//           hintText="Use this field to describe audience, tone, or unique requirements."
//         />
//       </div>
//     </motion.div>
//   );
// }
