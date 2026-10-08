import { AlertTriangle, Clock } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { isPast, formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import {
  calculateUrgencyText,
  calculateUrgencyMultiplier,
} from "@/utils/pricingUtils";

/**
 * EstimatedDelivery
 *
 * Displays delivery date information based on the selected deadline.
 * Shows urgency label, countdown timer, and urgency multiplier tooltip.
 *
 * Props:
 * - deadline: ISO string of selected deadline
 * - urgencyMultiplier: number (not directly used, see note below)
 * - onEditDeadline: optional callback if deadline needs to be edited
 *
 * Note: urgencyMultiplier is passed in from parent for consistency,
 * but actual value shown is recalculated here using deadline.
 */
export const EstimatedDelivery = ({
  deadline,
  urgencyMultiplier,
  onEditDeadline,
}) => {
  if (!deadline) {
    return (
      <div className="mt-2 text-sm text-gray-600 text-center">
        <p>Please select a deadline to see estimated delivery.</p>
      </div>
    );
  }

  // Prepare deadline and urgency states
  const endDate = new Date(deadline);
  const timeZone = "UTC";
  const isDatePast = isPast(endDate);
  const { text: urgencyText, color: urgencyColor } =
    calculateUrgencyText(deadline);
  const urgencyMultiplierValue = calculateUrgencyMultiplier(deadline);
  const formattedDate = formatInTimeZone(endDate, timeZone, "MMM d, yyyy");
  const countdown = formatDistanceToNowStrict(endDate, { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2 text-sm text-gray-600 text-center space-y-1 max-w-full overflow-hidden text-ellipsis"
      role="region"
      aria-label="Estimated delivery information"
    >
      {isDatePast ? (
        // Deadline in the past → show error with edit option
        <p
          className="text-sm text-red-600 flex justify-center items-center gap-1"
          aria-live="assertive"
        >
          <AlertTriangle size={16} className="text-red-500" />
          <span>
            Selected deadline is in the past.{" "}
            {onEditDeadline && (
              <button
                onClick={onEditDeadline}
                className="text-blue-600 underline"
                aria-label="Edit deadline"
              >
                Choose a new date
              </button>
            )}
          </span>
        </p>
      ) : (
        <>
          {/* Display formatted delivery date and countdown */}
          <p className="flex justify-center items-center gap-1">
            <Clock size={16} className="text-orange-500" />
            <span>
              Delivery by <strong>{formattedDate}</strong> ({countdown})
            </span>
          </p>

          {/* Urgency breakdown */}
          <p className="text-xs">
            Urgency: <strong className={urgencyColor}>{urgencyText}</strong>{" "}
            <span
              data-tooltip-id="urgency-tooltip"
              data-tooltip-content={`Urgency multiplier (x${urgencyMultiplierValue.toFixed(
                2
              )}) increases price for faster delivery.`}
            >
              (x{urgencyMultiplierValue.toFixed(2)})
            </span>
            <Tooltip id="urgency-tooltip" className="z-50 max-w-xs text-xs" />
          </p>
        </>
      )}
    </motion.div>
  );
};
