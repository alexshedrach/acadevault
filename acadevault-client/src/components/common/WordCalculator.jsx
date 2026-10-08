"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { TextAreaField } from "../forms/FormFields";
import { Button } from "@/components/ui/Button";
import { wordCountFromText } from "@/utils/priceUtils";
import { WORDS_PER_PAGE } from "@/config/priceConfiguration";

export default function WordCalculator({
  control,
  sampleText,
  onSampleTextChange,
  setValue,
  unitType,
}) {
  const [wordCount, setWordCount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const debouncedCalculate = useDebouncedCallback(() => {
    const count = wordCountFromText(sampleText);
    setWordCount(count);
    setIsCalculating(false);
  }, 300);

  useEffect(() => {
    if (sampleText.trim().length === 0) {
      setWordCount(0);
      return;
    }
    setIsCalculating(true);
    debouncedCalculate();
  }, [sampleText, debouncedCalculate]);

  const handleApply = () => {
    if (wordCount > 0) {
      const estimated =
        unitType === "pages"
          ? Math.ceil(wordCount / WORDS_PER_PAGE)
          : wordCount;
      setValue("unitCount", estimated, { shouldValidate: true });
      toast.success("Word count applied to form!");
    } else {
      toast.error("No valid text to apply.");
    }
  };

  const estimatedPages = (wordCount / WORDS_PER_PAGE).toFixed(1);

  return (
    <div className="space-y-4">
      <TextAreaField
        label="Paste Sample Text (Optional)"
        name="sampleText"
        control={control}
        rows={4}
        placeholder="Paste your text here to estimate word count..."
        onChange={(e) => onSampleTextChange(e.target.value)}
        showHint
        hintText="This tool helps you estimate based on a writing sample."
      />

      <AnimatePresence>
        {sampleText && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center justify-between gap-3 text-sm text-gray-600"
          >
            <p id="sample-text-info" className="text-xs" aria-live="polite">
              {isCalculating ? (
                <span className="text-blue-500 animate-pulse">
                  Estimating...
                </span>
              ) : wordCount > 0 ? (
                <>
                  Estimated: <span className="font-medium">{wordCount}</span>{" "}
                  words (≈ <span className="font-medium">{estimatedPages}</span>{" "}
                  pages)
                </>
              ) : (
                <span className="text-gray-400 italic">
                  No valid words detected
                </span>
              )}
            </p>

            {!isCalculating && wordCount > 0 && (
              <Button
                type="button"
                onClick={handleApply}
                variant="outline"
                size="sm"
              >
                Apply to Form
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import { TextAreaField } from "@/components/forms/FormFields";
// import { Button } from "@/components/ui/Button";
// import { wordCountFromText } from "@/utils/pricingUtils";
// import { WORDS_PER_PAGE } from "@/config/pricingConfig";

// export default function WordCalculator({
//   control,
//   sampleText,
//   onSampleTextChange,
//   setValue,
//   unitType,
// }) {
//   const [wordCount, setWordCount] = useState(0);
//   const [isCalculating, setIsCalculating] = useState(false);

//   const debouncedCalculate = useDebouncedCallback(() => {
//     const count = wordCountFromText(sampleText);
//     setWordCount(count);
//     setIsCalculating(false);
//   }, 300);

//   useEffect(() => {
//     if (sampleText.trim().length === 0) {
//       setWordCount(0);
//       return;
//     }
//     setIsCalculating(true);
//     debouncedCalculate();
//   }, [sampleText, debouncedCalculate]);

//   const handleApply = () => {
//     if (wordCount > 0) {
//       const estimated =
//         unitType === "pages"
//           ? Math.ceil(wordCount / WORDS_PER_PAGE)
//           : wordCount;
//       setValue("wordCount", estimated, { shouldValidate: true });
//       toast.success("Word count applied to form!");
//     } else {
//       toast.error("No valid text to apply.");
//     }
//   };

//   const estimatedPages = (wordCount / WORDS_PER_PAGE).toFixed(1);

//   return (
//     <div className="space-y-4">
//       <TextAreaField
//         label="Paste Sample Text (Optional)"
//         name="sampleText"
//         control={control}
//         rows={4}
//         placeholder="Paste your text here to estimate word count..."
//         onChange={(e) => onSampleTextChange(e.target.value)}
//         showHint
//         hintText="This tool helps you estimate based on a writing sample."
//       />

//       <AnimatePresence>
//         {sampleText && (
//           <motion.div
//             initial={{ opacity: 0, y: -4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -4 }}
//             className="flex items-center justify-between gap-3 text-sm text-gray-600"
//           >
//             <p id="sample-text-info" className="text-xs" aria-live="polite">
//               {isCalculating ? (
//                 <span className="text-blue-500 animate-pulse">
//                   Estimating...
//                 </span>
//               ) : wordCount > 0 ? (
//                 <>
//                   Estimated: <span className="font-medium">{wordCount}</span>{" "}
//                   words (≈ <span className="font-medium">{estimatedPages}</span>{" "}
//                   pages)
//                 </>
//               ) : (
//                 <span className="text-gray-400 italic">
//                   No valid words detected
//                 </span>
//               )}
//             </p>

//             {!isCalculating && wordCount > 0 && (
//               <Button
//                 type="button"
//                 onClick={handleApply}
//                 variant="outline"
//                 size="sm"
//               >
//                 Apply to Form
//               </Button>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
