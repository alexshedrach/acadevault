"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { AlertBox } from "@/components/ui/AlertBox";
import { formatPriceWithSymbol } from "@/utils/priceUtils";
import PropTypes from "prop-types";

export default function ConfirmationDetails({
  form = {},
  displayedPrice = 0,
  deadline,
  formErrors = [],
  currency = "USD",
  exchangeRate = null,
}) {
  const {
    topic,
    level,
    academicType,
    discipline,
    unitCount,
    unitType,
    documentFormats = [],
    citationStyle,
    writerExpertise,
    files,
    instructions,
  } = form;

  return (
    <motion.section
      aria-labelledby="confirmation-details-title"
      className="bg-white p-6 sm:p-8 border border-gray-200 shadow-lg max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Errors */}
      <AnimatePresence>
        {formErrors.length > 0 && (
          <div className="max-w-2xl mx-auto w-full mb-6">
            <AlertBox
              variant="error"
              title="Please address the following issues:"
              dismissible
              autoDismiss={false}
              className="w-full"
            >
              <ul className="list-disc list-inside text-sm text-red-700">
                {formErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </AlertBox>
          </div>
        )}
      </AnimatePresence>

      {/* Project Details */}
      <h4 className="text-base font-extrabold text-gray-700 border-b pb-2">
        Project Details
      </h4>
      <dl className="space-y-1 text-sm text-gray-700">
        <DetailItem label="Topic / Title" value={topic} />
        <DetailItem label="Academic Level" value={level} />
        <DetailItem label="Material Type" value={academicType} />
        <DetailItem label="Discipline" value={discipline} />
        <DetailItem
          label="Word / Page Count"
          value={isValidCount(unitCount) ? `${unitCount} ${unitType}` : null}
        />
      </dl>

      {/* Additional Details */}
      <h4 className="text-base font-extrabold text-gray-700 border-b py-2 mt-4">
        Additional Details
      </h4>
      <dl className="space-y-1 text-sm text-gray-700">
        <DetailItem
          label="Document Formats"
          value={documentFormats.join(", ")}
        />
        <DetailItem label="Citation Style" value={citationStyle} />
        <DetailItem label="Writer Expertise" value={writerExpertise} />
        {files?.length > 0 && (
          <DetailItem
            label="Uploaded Files"
            value={Array.from(files)
              .map((f) => f.name)
              .join(", ")}
          />
        )}
        <DetailItem
          label="Preferred Deadline"
          value={deadline ? format(new Date(deadline), "PPpp") : null}
        />
        <DetailItem
          label="Additional Instructions"
          value={instructions || "None"}
        />
      </dl>

      {/* Price */}
      <div className="text-center border-t pt-4 mt-6">
        <p className="text-base font-bold uppercase text-gray-500 mb-2">
          Total Due:
        </p>
        <motion.div
          className="text-3xl font-bold text-indigo-600"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
        >
          {formatPriceWithSymbol(displayedPrice, currency, exchangeRate)}
        </motion.div>
      </div>

      <p className="text-sm text-gray-500 italic mt-2 text-center">
        If anything looks incorrect, use "Back" to make adjustments.
      </p>
    </motion.section>
  );
}

function isValidCount(val) {
  return val != null && !isNaN(Number(val));
}

function DetailItem({ label, value }) {
  const missing = value == null || value === "";
  return (
    <motion.div
      className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <dt className="w-1/3 font-medium text-gray-800">{label}:</dt>
      <dd className={cn("flex-1", missing ? "text-red-500" : "text-gray-700")}>
        {missing ? "Not specified" : value}
      </dd>
    </motion.div>
  );
}

ConfirmationDetails.propTypes = {
  form: PropTypes.object.isRequired,
  displayedPrice: PropTypes.number.isRequired,
  deadline: PropTypes.string,
  formErrors: PropTypes.arrayOf(PropTypes.string),
  currency: PropTypes.string.isRequired,
  exchangeRate: PropTypes.number,
};
