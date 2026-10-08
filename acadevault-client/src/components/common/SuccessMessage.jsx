import { motion } from "framer-motion";
import Confetti from "react-confetti";

  /**
   * Component: SuccessMessage
   *
   * Displays a thank-you message and one-time confetti burst after successful signup.
   */
  export function SuccessMessage({ windowSize }) {
    return (
      <motion.div
        key="success"
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <p className="text-green-300 text-lg font-semibold">
          🎉 Thank you for subscribing!
        </p>
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
        />
      </motion.div>
    );
  }
  