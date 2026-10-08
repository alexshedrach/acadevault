import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

const MotionArrow = motion(ArrowRight);

// type ButtonVariant = "default" | "dark" | "glass" | "icon";

export const ViewAllMaterialsButton = ({ variant = "default" }) => {
  const baseClasses =
    "inline-flex items-center transition-all duration-300 ease-in-out relative overflow-hidden group";

  const variantStyles = {
    default:
      "gap-2 px-6 py-3 text-white rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-xl",
    dark: "gap-2 px-6 py-3 text-white rounded-full bg-neutral-900 hover:bg-neutral-800 shadow-md hover:shadow-xl border border-white/10",
    glass:
      "gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 text-white border border-white/20 shadow-md hover:shadow-lg",
    icon: "p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-110 shadow-lg",
  };

  const showText = variant !== "icon";

  return (
    <div className="mt-12 text-center">
      <Link href="/materials" target="_blank" passHref>
        <motion.a
          className={cn(baseClasses, variantStyles[variant])}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {showText && (
            <span className="relative z-10 font-medium text-base">
              View All Materials
            </span>
          )}
          <MotionArrow
            className={cn(
              "relative z-10 w-5 h-5 transition-transform duration-300 ease-in-out",
              showText && "group-hover:translate-x-1"
            )}
            strokeWidth={2}
          />
          {/* shimmer effect for default and icon */}
          {(variant === "default" || variant === "icon") && (
            <span
              className="absolute inset-0 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              aria-hidden
            />
          )}
        </motion.a>
      </Link>
    </div>
  );
};
