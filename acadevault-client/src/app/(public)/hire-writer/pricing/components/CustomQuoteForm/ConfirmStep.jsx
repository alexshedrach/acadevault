"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckboxField } from "@/components/forms/FormFields";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ConfirmationDetails from "./ConfirmationDetails";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useWatch } from "react-hook-form";

export default function ConfirmStep({
  formData,
  displayedPrice,
  user,
  captchaToken,
  setCaptchaToken,
  formErrors,
  control,
  isSubmitting,
  showDetails = true,
}) {
  const termsChecked = useWatch({ control, name: "terms" });
  const { mode } = formData || {};
  const isPlanMode = mode === "plan";
  const isWriterMode = mode === "writer";
  const isCustomMode = mode === "custom";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
          {isPlanMode || isWriterMode ? (
            <SectionHeader
              title="Agreements & Submission"
              description="Please agree to the terms before placing your order"
              icon={<CheckCircle2 className="w-6 h-6 text-indigo-600" />}
            />
          ) : (
            <SectionHeader
              title="Review Your Quote"
              description="Please verify all details before proceeding to payment. You can edit any section by navigating back."
              icon={<CheckCircle2 className="w-6 h-6 text-indigo-600" />}
            />
          )}
        </div>
        {isWriterMode ||
          (isCustomMode && (
            <div className="lg:col-span-5">
              <ConfirmationDetails
                form={formData}
                displayedPrice={displayedPrice}
                deadline={formData?.deadline}
                formErrors={formErrors}
                currency={formData?.currency}
              />
            </div>
          ))}

        <div
          className={`lg:col-span-5 bg-gradient-to-r from-blue-50/20 to-indigo-50/60 rounded-lg p-6 shadow-sm flex flex-col 
          ${isPlanMode || isWriterMode ? "sm:flex-col" : "sm:flex-row"} 
          justify-between items-start gap-4`}
        >
          {!user && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Verify Your Request
              </h3>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  console.log("ReCAPTCHA token:", token);
                  setCaptchaToken(token);
                }}
                onExpired={() => {
                  console.log("ReCAPTCHA expired");
                  setCaptchaToken(null);
                }}
                className="mx-auto"
                disabled={isSubmitting}
              />
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Agree to Proceed
            </h3>
            <div className="space-y-4">
              <CheckboxField
                name="terms"
                control={control}
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                    .
                  </>
                }
                rules={{
                  required: "You must agree to the terms and conditions.",
                }}
                error={formErrors?.terms?.message}
                disabled={isSubmitting}
                onChange={(e) => {
                  console.log("Terms checkbox changed:", e.target.checked);
                }}
              />
              <CheckboxField
                name="agreeToNonDisclosure"
                control={control}
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      href="/nda"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Non-Disclosure Agreement
                    </Link>
                    .
                  </>
                }
                disabled={isSubmitting}
                onChange={(e) => {
                  console.log("NDA checkbox changed:", e.target.checked);
                }}
              />
              <CheckboxField
                name="allowWriterToContactClient"
                control={control}
                label="Allow the writer to contact me for clarifications."
                disabled={isSubmitting}
                onChange={(e) => {
                  console.log("Contact checkbox changed:", e.target.checked);
                }}
              />

              <AnimatePresence>
                {termsChecked && (user || captchaToken) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-green-600 pt-4"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Ready to submit your quote!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import ReCAPTCHA from "react-google-recaptcha";
// import { CheckboxField } from "@/components/forms/FormFields";
// import Link from "next/link";
// import ConfirmationDetails from "./ConfirmationDetails";
// import { CheckCircle, CheckCircle2 } from "lucide-react";
// import SectionHeader from "@/components/common/SectionHeader";
// import { useWatch } from "react-hook-form";

// export default function ConfirmStep({
//   formData,
//   displayedPrice,
//   user,
//   captchaToken,
//   setCaptchaToken,
//   formErrors,
//   control,
// }) {
//   // ← watch the RHF "terms" field
//   const termsChecked = useWatch({ control, name: "terms" });

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//         <div className="lg:col-span-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
//           <SectionHeader
//             title="Review Your Quote"
//             description="Please verify all details before proceeding to payment. You can edit any section by navigating back."
//             icon={<CheckCircle2 className="w-6 h-6 text-indigo-600" />}
//           />
//         </div>z

//         <div className="lg:col-span-5">
//           <ConfirmationDetails
//             form={formData}
//             displayedPrice={displayedPrice}
//             deadline={formData.deadline}
//             formErrors={formErrors}
//             currency={formData.currency}
//           />
//         </div>

//         <div className="lg:col-span-5 bg-gradient-to-r from-blue-50/20 to-indigo-50/60 rounded-lg p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
//           {/* CAPTCHA */}
//           {!user && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
//             <div>
//               <h3 className="text-sm font-semibold text-gray-600 mb-2">
//                 Verify Your Request
//               </h3>
//               <ReCAPTCHA
//                 sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
//                 onChange={setCaptchaToken}
//                 onExpired={() => setCaptchaToken(null)}
//                 className="mx-auto"
//               />
//             </div>
//           )}

//           {/* Terms checkbox */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-600 mb-2">
//               Agree to Proceed
//             </h3>
//             <CheckboxField
//               name="terms"
//               control={control}
//               label={
//                 <>
//                   I agree to the{" "}
//                   <Link
//                     href="/terms"
//                     target="_blank"
//                     className="text-blue-600 hover:underline"
//                   >
//                     Terms & Conditions
//                   </Link>
//                 </>
//               }
//               rules={{ required: true }}
//             />

//             {/* Ready indicator */}
//             <AnimatePresence>
//               {termsChecked && (user || captchaToken) && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center gap-2 text-green-600 pt-7"
//                 >
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Ready to submit your quote!</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /**
//  * ConfirmStep.jsx
//  * Handles the "Review & Confirm" step with a modern, elegant design.
//  * Displays order details, CAPTCHA (for non-authenticated users), and terms agreement checkbox
//  * in a structured grid layout with smooth animations and accessibility features.
//  */
// import { motion, AnimatePresence } from "framer-motion";
// import ReCAPTCHA from "react-google-recaptcha";
// import { CheckboxGroupField } from "@/components/forms/fields/CheckboxGroupField";
// import Link from "next/link";
// import ConfirmationDetails from "./ConfirmationDetails";
// import { CheckCircle, CheckCircle2 } from "lucide-react";
// import SectionHeader from "@/components/common/SectionHeader";

// export default function ConfirmStep({
//   formData,
//   displayedPrice,
//   user,
//   captchaToken,
//   setCaptchaToken,
//   agreeToTerms,
//   setAgreeToTerms,
//   formErrors,
//   setFormErrors,
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className=""
//     >
//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-5">
//         {/* Header */}
//         <div className="lg:col-span-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
//           <SectionHeader
//             title="Review Your Quote"
//             description=" Please verify all details below before proceeding to payment. You can edit any section by navigating back."
//             icon={
//               <CheckCircle2
//                 className="w-6 h-6 text-indigo-600"
//                 aria-hidden="true"
//               />
//             }
//           />
//         </div>

//         {/* Left Column: Confirmation Details */}
//         <div className="lg:col-span-5">
//           <ConfirmationDetails
//             form={formData}
//             displayedPrice={displayedPrice}
//             deadline={formData.deadline}
//             formErrors={formErrors}
//           />
//         </div>

//         {/* Right Column: CAPTCHA and Terms */}
//         <div className="lg:col-span-5 bg-gradient-to-r from-blue-50/20 to-indigo-50/60 rounded-lg p-6 shadow-sm flex justify-between items-center">
//           {/* CAPTCHA Section */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-600 mb-3">
//               Verify Your Request
//             </h3>
//             {!user && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.2, duration: 0.3 }}
//               >
//                 <ReCAPTCHA
//                   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
//                   onChange={setCaptchaToken}
//                   onExpired={() => setCaptchaToken(null)}
//                   aria-label="CAPTCHA verification for quote submission"
//                   className="mx-auto"
//                 />
//               </motion.div>
//             ) : (
//               !user && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2, duration: 0.3 }}
//                   className="text-red-500 text-sm font-medium text-center"
//                   role="alert"
//                 >
//                   CAPTCHA is unavailable. Please try again later.
//                 </motion.p>
//               )
//             )}
//           </div>

//           {/* Terms Agreement Section */}
//           <div className="">
//             <h3 className="text-sm font-semibold text-gray-600 mb-3">
//               Agree to Proceed
//             </h3>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.3 }}
//               className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               <CheckboxGroupField
//                 name="terms"
//                 options={[
//                   {
//                     value: "agreed",
//                     label: (
//                       <>
//                         I agree to the{" "}
//                         <Link
//                           href="/terms"
//                           target="_blank"
//                           className="text-blue-600 hover:underline font-medium"
//                           aria-label="Read terms and conditions"
//                         >
//                           Terms & Conditions
//                         </Link>
//                       </>
//                     ),
//                   },
//                 ]}
//                 selected={agreeToTerms ? ["agreed"] : []}
//                 onChange={(selected) => {
//                   const agreed = selected.includes("agreed");
//                   setAgreeToTerms(agreed);
//                   setFormErrors((errs) =>
//                     agreed
//                       ? errs.filter(
//                           (e) =>
//                             e !== "You must agree to the terms and conditions"
//                         )
//                       : [...errs, "You must agree to the terms and conditions"]
//                   );
//                 }}
//                 error={
//                   formErrors.includes(
//                     "You must agree to the terms and conditions"
//                   )
//                     ? "You must agree to the terms and conditions"
//                     : undefined
//                 }
//                 className="text-sm text-gray-700"
//                 aria-describedby={
//                   formErrors.includes(
//                     "You must agree to the terms and conditions"
//                   )
//                     ? "terms-error"
//                     : undefined
//                 }
//               />
//               {formErrors.includes(
//                 "You must agree to the terms and conditions"
//               ) && (
//                 <span
//                   id="terms-error"
//                   className="text-red-500 text-xs italic ml-2"
//                 >
//                   (Required)
//                 </span>
//               )}
//             </motion.div>
//           </div>

//           {/* Confirmation Indicator */}
//           <AnimatePresence>
//             {agreeToTerms && captchaToken && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mt-4"
//               >
//                 <CheckCircle className="w-5 h-5" />
//                 <span>Ready to submit your quote!</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
