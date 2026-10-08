"use client";

import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { validateEmail, validateName } from "@/utils/formValidation";
import { InputField } from "./fields/InputField";
import { SelectField } from "./fields/SelectField";
import { TextAreaField } from "./fields/TextAreaField";
import { FormStatusWithSuccess } from "./FormStatusWithSuccess";

/**
 * GenericContactForm
 *
 * Props:
 * - endpoint (string): URL to POST form data
 * - hiddenFields (object): e.g. { vendorId: "abc123", role: "vendor" }
 * - reasonOptions (array): overrides the default select options
 * - onSuccess (fn): callback after successful submission
 */
export function ContactForm({
  endpoint,
  hiddenFields = {},
  reasonOptions,
  onSuccess,
}) {
  // 1) State
  const [data, setData] = useState({
    fullName: "",
    email: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // 2) Validation
  const fieldsConfig = useMemo(
    () => [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        validate: validateName,
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        validate: validateEmail,
        required: true,
      },
      {
        name: "reason",
        label: "Reason",
        type: "select",
        required: true,
        options: reasonOptions,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        minLength: 10,
      },
    ],
    [reasonOptions]
  );

  const validateField = useCallback(
    (name, value) => {
      const cfg = fieldsConfig.find((f) => f.name === name);
      if (!cfg) return "";
      if (cfg.required && !value.trim()) return `${cfg.label} is required.`;
      if (cfg.validate) {
        const msg = cfg.validate(value);
        if (msg) return msg;
      }
      if (cfg.minLength && value.trim().length < cfg.minLength) {
        return `${cfg.label} must be at least ${cfg.minLength} characters.`;
      }
      return "";
    },
    [fieldsConfig]
  );

  const validateAll = useCallback(() => {
    const errs = {};
    fieldsConfig.forEach(({ name }) => {
      const err = validateField(name, data[name]);
      if (err) errs[name] = err;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [validateField, data, fieldsConfig]);

  // 3) Handlers
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((d) => ({ ...d, [name]: value }));
      setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateAll()) return;

      setStatus("submitting");
      try {
        const payload = { ...data, ...hiddenFields };
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Network error");
        setStatus("success");
        onSuccess?.(payload);
        setTimeout(() => setStatus("idle"), 2500);
      } catch (err) {
        console.error(err);
        setStatus("idle");
      }
    },
    [data, hiddenFields, endpoint, onSuccess, validateAll]
  );

  // 4) Render
  return (
    <div>
      <AnimatePresence>
        {status === "success" ? (
          <FormStatusWithSuccess formStatus="success" />
        ) : (
          <motion.form
            key="contact"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {fieldsConfig.map(({ name, label, type, options }) => {
              // Build the props *without* key:
              const common = {
                name,
                label,
                value: data[name],
                onChange: handleChange,
                error: errors[name],
                required: true,
              };

              // Then return with key explicitly
              if (type === "text" || type === "email") {
                return (
                  <InputField
                    key={name}
                    {...common}
                    type={type}
                    placeholder={
                      type === "email" ? "you@example.com" : undefined
                    }
                  />
                );
              }

              if (type === "select") {
                return <SelectField key={name} {...common} options={options} />;
              }

              if (type === "textarea") {
                return (
                  <div key={name} className="col-span-1 md:col-span-2">
                    <TextAreaField {...common} rows={4} />
                  </div>
                );
              }

              return null;
            })}

            <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() =>
                  setData(
                    fieldsConfig.reduce(
                      (acc, f) => ({ ...acc, [f.name]: "" }),
                      {}
                    )
                  )
                }
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`bg-blue-700 text-white px-5 py-2 rounded flex items-center justify-center transition ${
                  status === "submitting"
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-blue-800"
                }`}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

ContactForm.propTypes = {
  endpoint: PropTypes.string.isRequired,
  hiddenFields: PropTypes.object,
  reasonOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  onSuccess: PropTypes.func,
};

// "use client";

// import { validateEmail, validateName } from "@/utils/formValidation";
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useCallback, useMemo, useState } from "react";
// import { FormStatusWithSuccess } from "./FormStatusWithSuccess";
// import { InputField } from "./fields/InputField";
// import { SelectField } from "./fields/SelectField";
// import { TextAreaField } from "./fields/TextAreaField";
// import { NumberInputField } from "./fields/NumberInputField";

// /**
//  * ContactForm
//  *
//  * Renders a multi-field contact form with inline validation. On successful submission,
//  * it shows a thank-you message + one-time confetti (via FormStatusWithSuccess).
//  *
//  * Fields:
//  *  • fullName     (required)
//  *  • email        (required, must be valid email format)
//  *  • phoneNumber  (optional, numeric/“+” only)
//  *  • reason       (required, dropdown)
//  *  • message      (required, min 10 chars)
//  *
//  * Validation functions are imported from "@/utils/validation".
//  */
// export const ContactForm = React.memo(() => {
//   // ─────────────────────────────────────────────────────────────
//   // 1) Form State Declarations
//   // ─────────────────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     reason: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [formStatus, setFormStatus] = useState("idle");

//   // ─────────────────────────────────────────────────────────────
//   // 2) Validation Logic
//   // ─────────────────────────────────────────────────────────────

//   /**
//    * validateField
//    *
//    * Takes a single field name and its value, returns an error string or an empty string.
//    */
//   const validateField = useCallback((name, value) => {
//     switch (name) {
//       case "fullName": {
//         const errorMsg = validateName(value);
//         return errorMsg || "";
//       }

//       case "email": {
//         const errorMsg = validateEmail(value);
//         return errorMsg || "";
//       }

//       case "phoneNumber": {
//         // Phone is optional; only validate format if non-empty
//         if (!value.trim()) return "";
//         // Simple allow digits, spaces, parentheses, hyphen, plus sign
//         const phoneRegex = /^[0-9+\-()\s]+$/;
//         return phoneRegex.test(value) ? "" : "Enter a valid phone number.";
//       }

//       case "reason": {
//         return value ? "" : "Please select a reason for contacting.";
//       }

//       case "message": {
//         if (!value.trim()) return "Message is required.";
//         return value.trim().length >= 10
//           ? ""
//           : "Message must be at least 10 characters.";
//       }

//       default:
//         return "";
//     }
//   }, []);

//   /**
//    * validateForm
//    *
//    * Iterates through all fields in formData, sets `errors` state, and
//    * returns `true` if no errors remain.
//    */
//   const validateForm = useCallback(() => {
//     const newErrors = {};

//     Object.entries(formData).forEach(([fieldName, fieldValue]) => {
//       const errorMsg = validateField(fieldName, fieldValue);
//       if (errorMsg) {
//         newErrors[fieldName] = errorMsg;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData, validateField]);

//   // ─────────────────────────────────────────────────────────────
//   // 3) Handle Input Changes
//   // ─────────────────────────────────────────────────────────────

//   /**
//    * handleChange
//    *
//    * Updates formData on each keystroke or select change, and also
//    * runs validation for that specific field.
//    */
//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;

//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));

//       // Re-validate that single field on every change
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, value),
//       }));
//     },
//     [validateField]
//   );

//   // ─────────────────────────────────────────────────────────────
//   // 4) Handle Reset / Cancel
//   // ─────────────────────────────────────────────────────────────

//   /**
//    * handleCancel
//    *
//    * Clears all fields and validation errors; leaves formStatus as "idle".
//    */
//   const handleCancel = useCallback(() => {
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       reason: "",
//       message: "",
//     });
//     setErrors({});
//     // If we’d been showing a success message, reset back to idle
//     setFormStatus("idle");
//   }, []);

//   // ─────────────────────────────────────────────────────────────
//   // 5) Form Submission
//   // ─────────────────────────────────────────────────────────────

//   /**
//    * handleSubmit
//    *
//    * Prevents default, validates all fields, simulates an async API call,
//    * transitions through "submitting" → "success" → back to "idle".
//    */
//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();

//       // 1) Validate entire form
//       if (!validateForm()) {
//         return; // If invalid, do not proceed
//       }

//       // 2) Show loading state
//       setFormStatus("submitting");

//       try {
//         // Simulated API call (e.g., fetch("/api/contact", {...}))
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         // 3) On success, show success UI
//         setFormStatus("success");

//         console.log("ContactForm submission:", formData);

//         // 4) After 2.5 seconds, reset form data and go back to idle
//         setTimeout(() => {
//           handleCancel();
//         }, 2500);
//       } catch (apiError) {
//         console.error("ContactForm API error:", apiError);
//         // If API fails, revert to idle so user can try again
//         setFormStatus("idle");
//       }
//     },
//     [formData, validateForm, handleCancel]
//   );

//   // ─────────────────────────────────────────────────────────────
//   // 6) Field Definitions (for dynamic rendering)
//   // ─────────────────────────────────────────────────────────────

//   /**
//    * fields
//    *
//    * Defines each form field’s name, label, type, and extra props. We
//    * can easily add or reorder fields here without touching JSX below.
//    */
//   const fields = useMemo(
//     () => [
//       {
//         name: "fullName",
//         label: "Full Name",
//         type: "text",
//         required: true,
//       },
//       {
//         name: "email",
//         label: "Email",
//         type: "email",
//         required: true,
//       },
//       {
//         name: "phoneNumber",
//         label: "Phone Number",
//         type: "number",
//         required: false,
//       },
//       {
//         name: "reason",
//         label: "Reason for Contact",
//         type: "select",
//         required: true,
//         options: [
//           { value: "", label: "Select a reason…" },
//           { value: "Inquiry", label: "Inquiry" },
//           { value: "Support", label: "Support" },
//           { value: "Collaboration", label: "Collaboration" },
//           { value: "Others", label: "Others" },
//         ],
//       },
//       {
//         name: "message",
//         label: "Message",
//         type: "textarea",
//         required: true,
//       },
//     ],
//     []
//   );

//   // ─────────────────────────────────────────────────────────────
//   // 7) Render
//   // ─────────────────────────────────────────────────────────────

//   return (
//     <div>
//       {/* ─────────────────────────────────────────────────────────
//             AnimatePresence will swap between the form vs. success UI
//            ───────────────────────────────────────────────────────── */}
//       <AnimatePresence>
//         {formStatus === "success" ? (
//           // When status is "success", show one-time confetti + thank-you
//           <FormStatusWithSuccess formStatus="success" />
//         ) : (
//           // Otherwise, render the actual form
//           <motion.form
//             key="contact-form"
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             {fields.map((field) => {
//               const { name, label, type, required, options } = field;
//               const fieldError = errors[name] || "";

//               const commonProps = {
//                 name,
//                 label,
//                 value: formData[name],
//                 onChange: handleChange,
//                 required,
//                 error: fieldError,
//               };

//               if (type === "text" || type === "email") {
//                 return (
//                   <InputField
//                     key={name}
//                     {...commonProps}
//                     type={type}
//                     placeholder={
//                       type === "email" ? "you@example.com" : "Enter your name"
//                     }
//                   />
//                 );
//               }

//               if (type === "phone") {
//                 return (
//                   <NumberInputField
//                     key={name}
//                     {...commonProps}
//                     type="phone"
//                     placeholder="+1 555 555 5555"
//                   />
//                 );
//               }

//               if (type === "number") {
//                 return (
//                   <NumberInputField
//                     key={name}
//                     {...commonProps}
//                     type="number"
//                     placeholder="Enter a number"
//                     min={0}
//                     max={100}
//                     step={1}
//                   />
//                 );
//               }

//               if (type === "select") {
//                 return (
//                   <SelectField key={name} {...commonProps} options={options} />
//                 );
//               }

//               if (type === "textarea") {
//                 return (
//                   <div key={name} className="col-span-1 md:col-span-2">
//                     <TextAreaField {...commonProps} rows={4} />
//                   </div>
//                 );
//               }

//               return null;
//             })}

//             {/* ─────────────────────────────────────────────────────────
//                   Buttons Row (spans two columns on small screens)
//               ───────────────────────────────────────────────────────── */}
//             <div className="col-span-1 md:col-span-2 flex justify-end space-x-2 mt-2">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={formStatus === "submitting"}
//                 className={`
//                   bg-blue-700 text-white px-5 py-2 rounded flex items-center justify-center transition
//                   ${
//                     formStatus === "submitting"
//                       ? "opacity-60 cursor-not-allowed"
//                       : "hover:bg-blue-800"
//                   }
//                 `}
//               >
//                 {formStatus === "submitting" ? "Sending..." : "Send Message"}
//               </button>
//             </div>
//           </motion.form>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// // No props to validate, so no PropTypes needed for ContactForm itself.
// ContactForm.displayName = "ContactForm";
