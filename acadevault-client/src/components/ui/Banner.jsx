"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { useLocalStorage } from "react-use";

// Animation variants
const animationVariants = {
  "kenburns-left": {
    initial: { scale: 1.05, x: 0 },
    animate: { scale: 1.1, x: -20 },
  },
  "kenburns-right": {
    initial: { scale: 1.05, x: 0 },
    animate: { scale: 1.1, x: 20 },
  },
  "zoom-out": { initial: { scale: 1.1 }, animate: { scale: 1.0 } },
  parallax: {
    initial: { y: 0 },
    animate: {
      y: -50,
      transition: { duration: 10, repeat: Infinity, repeatType: "reverse" },
    },
  },
  fade: { initial: { opacity: 0.8 }, animate: { opacity: 1 } },
  static: { initial: { scale: 1 }, animate: { scale: 1 } },
};

// Button variants
const BUTTON_VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  tertiary:
    "border border-white text-white hover:bg-white hover:text-black shadow-md",
  gradient:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
};

/**
 * A flexible, reusable banner component with advanced features.
 * @param {Object} props - Component props
 * @param {string} [props.titleLine1] - First line of the title
 * @param {string} [props.titleLine2] - Second line of the title
 * @param {string} [props.subtitle] - Subtitle text
 * @param {string} [props.description] - Description text
 * @param {string} [props.badgeText] - Text for the badge
 * @param {React.ReactNode} [props.customBadge] - Custom badge component
 * @param {React.ReactNode} [props.extraContent] - Extra content below CTAs
 * @param {string} [props.ctaText] - Primary CTA text
 * @param {string} [props.ctaHref] - Primary CTA link
 * @param {React.ReactNode} [props.secondaryCTA] - Secondary CTA component
 * @param {Array} [props.ctaButtons] - Array of custom CTA buttons
 * @param {string} [props.backgroundImage] - Background image URL
 * @param {string} [props.backgroundVideo] - Background video URL
 * @param {string} [props.backgroundAlt] - Alt text for background media
 * @param {string} [props.gradientFrom] - Gradient start color
 * @param {string} [props.gradientTo] - Gradient end color
 * @param {number} [props.overlayOpacity] - Overlay opacity (0-100)
 * @param {string} [props.overlayColor] - Overlay color
 * @param {string} [props.textAlignment] - Text alignment (left, center, right)
 * @param {string} [props.buttonAlignment] - Button alignment (left, center, right)
 * @param {string} [props.buttonLayout] - Button layout (inline, stacked, grid)
 * @param {string} [props.animationType] - Animation type
 * @param {string} [props.imagePosition] - Image position (cover, contain)
 * @param {boolean} [props.imagePriority] - Image priority loading
 * @param {string} [props.maxWidth] - Maximum content width
 * @param {string} [props.padding] - Content padding
 * @param {string} [props.height] - Banner height (auto, full, fixed)
 * @param {string} [props.headingSize] - Heading size
 * @param {boolean} [props.showCTA] - Show primary CTA
 * @param {string} [props.tagline] - Tagline text
 * @param {boolean} [props.enableAnimation] - Enable animations
 * @param {boolean} [props.dismissible] - Allow banner to be dismissed
 * @param {string} [props.dismissId] - Unique ID for dismiss persistence
 * @param {string} [props.locale] - Locale for i18n
 * @param {React.ReactNode} [props.customHeader] - Custom header content
 * @param {React.ReactNode} [props.customFooter] - Custom footer content
 * @param {React.ReactNode} [props.sideContent] - Side content for split layouts
 * @param {string} [props.className] - Additional classes
 */
function Banner({
  titleLine1,
  titleLine2,
  subtitle,
  description,
  badgeText,
  customBadge,
  extraContent,
  ctaText = "",
  ctaHref = "",
  secondaryCTA,
  ctaButtons = [],
  backgroundImage = "/images/bg4.jpeg",
  backgroundVideo,
  backgroundAlt = "Banner Background",
  gradientFrom = "rgba(30, 58, 138, 0.7)",
  gradientTo = "rgba(37, 99, 235, 0.7)",
  overlayOpacity = 50,
  overlayColor = "rgba(0,0,0,0.5)",
  textAlignment = "center",
  buttonAlignment = "center",
  buttonLayout = "inline",
  animationType = "kenburns-left",
  imagePosition = "cover",
  imagePriority = false,
  maxWidth = "max-w-4xl",
  padding = "px-4 sm:px-8 md:px-12",
  height = "auto",
  headingSize = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  showCTA = true,
  tagline,
  enableAnimation = true,
  dismissible = false,
  dismissId = "banner-default",
  locale = "en",
  customHeader,
  customFooter,
  sideContent,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isDismissed, setIsDismissed] = useLocalStorage(
    `banner-${dismissId}`,
    false
  );
  const [mediaError, setMediaError] = useState(false);
  const animationControls = useAnimationControls();
  const animation =
    animationVariants[animationType] ?? animationVariants.static;
  const alignmentMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };
  const buttonLayoutMap = {
    inline: "flex-row flex-wrap",
    stacked: "flex-col space-y-4",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  };
  const heightMap = {
    auto: "min-h-[400px]",
    full: "min-h-screen",
    fixed: "h-[600px]",
  };

  // Track banner impression
  useEffect(() => {
    if (!isDismissed) {
      // Mock analytics (replace with real provider)
      console.log("Banner impression", { dismissId, locale });
    }
  }, [dismissId, isDismissed, locale]);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    console.log("Banner dismissed", { dismissId });
  }, [dismissId, setIsDismissed]);

  // Start animation if enabled and no reduced motion
  useEffect(() => {
    if (enableAnimation && !prefersReducedMotion && !isDismissed) {
      animationControls.start(animation.animate);
    }
  }, [
    animationControls,
    animation,
    enableAnimation,
    prefersReducedMotion,
    isDismissed,
  ]);

  if (isDismissed) return null;

  return (
    <section
      className={cn(
        "relative overflow-hidden text-white",
        heightMap[height],
        className
      )}
      role="banner"
      aria-labelledby="banner-title"
    >
      {/* Background Media */}
      {!mediaError && (
        <motion.div
          initial={prefersReducedMotion ? {} : animation.initial}
          animate={animationControls}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0 z-0"
        >
          {backgroundVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                `object-${imagePosition} brightness-75 w-full h-full`
              )}
              onError={() => setMediaError(true)}
              aria-hidden="true"
              loading="lazy"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              sizes="100vw"
              priority={imagePriority}
              className={cn(
                `object-${imagePosition} brightness-75`,
                "transition-all duration-300 ease-in-out"
              )}
              onError={() => setMediaError(true)}
              loading={imagePriority ? "eager" : "lazy"}
            />
          )}
        </motion.div>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }}
      />

      {/* Color Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
      />

      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-30 container mx-auto flex flex-col md:flex-row justify-center h-full",
          padding,
          maxWidth
        )}
      >
        {/* Main Content */}
        <header
          className={cn(
            "flex flex-col justify-center",
            alignmentMap[textAlignment],
            sideContent ? "md:w-1/2" : "w-full"
          )}
        >
          {customHeader && <div className="mb-4">{customHeader}</div>}

          {customBadge ? (
            <div className="mb-4">{customBadge}</div>
          ) : badgeText ? (
            <Badge
              variant="outline"
              className="text-sm text-white border-blue-100 mb-4"
            >
              {badgeText}
            </Badge>
          ) : null}

          {(titleLine1 || titleLine2) && (
            <h1
              id="banner-title"
              className={cn(
                "font-extrabold text-gray-100 leading-snug drop-shadow-lg",
                headingSize
              )}
            >
              {titleLine1}
              {titleLine2 && (
                <>
                  <br className="hidden md:block" />
                  {titleLine2}
                </>
              )}
            </h1>
          )}

          {subtitle && (
            <p className="text-base sm:text-lg text-gray-200 mt-2 max-w-3xl">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-sm text-gray-300 mt-2 max-w-xl">{description}</p>
          )}

          {(showCTA || secondaryCTA || ctaButtons.length > 0) && (
            <nav
              className={cn(
                "mt-6 flex gap-4",
                alignmentMap[buttonAlignment],
                buttonLayoutMap[buttonLayout]
              )}
              aria-label="Banner call-to-action"
            >
              {showCTA && ctaText && (
                <Button
                  as="a"
                  href={ctaHref}
                  variant="gradient"
                  size="md"
                  className="flex items-center"
                  aria-label={ctaText}
                  onClick={() =>
                    console.log("Primary CTA clicked", { ctaText, ctaHref })
                  }
                >
                  {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}

              {secondaryCTA}

              {ctaButtons.map(
                (
                  { label, href, variant = "primary", target = "_self" },
                  idx
                ) => (
                  <Link
                    key={idx}
                    href={href}
                    target={target}
                    rel={
                      target === "_blank" ? "noopener noreferrer" : undefined
                    }
                    className={cn(
                      "py-3 px-6 rounded-full text-base font-semibold transition duration-300 transform hover:scale-105",
                      BUTTON_VARIANTS[variant]
                    )}
                    aria-label={label}
                    onClick={() =>
                      console.log("Custom CTA clicked", { label, href })
                    }
                  >
                    {label}
                  </Link>
                )
              )}
            </nav>
          )}

          {extraContent && <div className="mt-6">{extraContent}</div>}
          {tagline && (
            <span className="text-xs text-gray-50 mt-4 block">{tagline}</span>
          )}

          {customFooter && <div className="mt-4">{customFooter}</div>}
        </header>

        {/* Side Content */}
        {sideContent && (
          <aside className="md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
            {sideContent}
          </aside>
        )}
      </motion.div>
    </section>
  );
}

// PropTypes for runtime validation
Banner.propTypes = {
  titleLine1: PropTypes.string,
  titleLine2: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  badgeText: PropTypes.string,
  customBadge: PropTypes.node,
  extraContent: PropTypes.node,
  ctaText: PropTypes.string,
  ctaHref: PropTypes.string,
  secondaryCTA: PropTypes.node,
  ctaButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "tertiary",
        "gradient",
      ]),
      target: PropTypes.string,
    })
  ),
  backgroundImage: PropTypes.string,
  backgroundVideo: PropTypes.string,
  backgroundAlt: PropTypes.string,
  gradientFrom: PropTypes.string,
  gradientTo: PropTypes.string,
  overlayOpacity: PropTypes.number,
  overlayColor: PropTypes.string,
  textAlignment: PropTypes.oneOf(["left", "center", "right"]),
  buttonAlignment: PropTypes.oneOf(["left", "center", "right"]),
  buttonLayout: PropTypes.oneOf(["inline", "stacked", "grid"]),
  animationType: PropTypes.oneOf([
    "kenburns-left",
    "kenburns-right",
    "zoom-out",
    "parallax",
    "fade",
    "static",
  ]),
  imagePosition: PropTypes.oneOf(["cover", "contain"]),
  imagePriority: PropTypes.bool,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.oneOf(["auto", "full", "fixed"]),
  headingSize: PropTypes.string,
  showCTA: PropTypes.bool,
  tagline: PropTypes.string,
  enableAnimation: PropTypes.bool,
  dismissible: PropTypes.bool,
  dismissId: PropTypes.string,
  locale: PropTypes.string,
  customHeader: PropTypes.node,
  customFooter: PropTypes.node,
  sideContent: PropTypes.node,
  className: PropTypes.string,
};

export default Banner;

// "use client";

// import React, { useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useReducedMotion } from "framer-motion";
// import { cn } from "@/utils/cn";
// import { ArrowRight } from "lucide-react";
// import { Button } from "./Button";
// import { Badge } from "./Badge";

// const animationVariants = {
//   "kenburns-left": {
//     initial: { scale: 1.05, x: 0 },
//     animate: { scale: 1.1, x: -20 },
//   },
//   "kenburns-right": {
//     initial: { scale: 1.05, x: 0 },
//     animate: { scale: 1.1, x: 20 },
//   },
//   "zoom-out": { initial: { scale: 1.1 }, animate: { scale: 1.0 } },
//   static: { initial: { scale: 1 }, animate: { scale: 1 } },
// };

// const BUTTON_VARIANTS = {
//   primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
//   secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
//   tertiary:
//     "border border-white text-white hover:bg-white hover:text-black shadow-md",
//   gradient:
//     "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
// };

// export default function Banner({
//   titleLine1,
//   titleLine2,
//   subtitle,
//   description,
//   badgeText,
//   customBadge,
//   extraContent,
//   ctaText = "",
//   ctaHref = "",
//   secondaryCTA,
//   ctaButtons = [],
//   backgroundImage = "/images/bg4.jpeg",
//   backgroundAlt = "Banner Background",
//   gradientFrom = "rgba(30, 58, 138, 0.7)",
//   gradientTo = "rgba(37, 99, 235, 0.7)",
//   overlayOpacity = 50, // ← restored default
//   overlayColor = "rgba(0,0,0,0.5)",
//   textAlignment = "center",
//   buttonAlignment = "center",
//   buttonLayout = "inline",
//   animationType = "kenburns-left",
//   imagePosition = "cover",
//   imagePriority = false,
//   maxWidth = "max-w-4xl",
//   padding = "px-4 sm:px-8 md:px-12",
//   headingSize = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
//   showCTA = true,
//   tagline,
//   enableAnimation = true,
//   className,
// }) {
//   const prefersReducedMotion = useReducedMotion();
//   const animation =
//     animationVariants[animationType] ?? animationVariants.static;
//   const alignmentMap = {
//     left: "items-start text-left",
//     center: "items-center text-center",
//     right: "items-end text-right",
//   };
//   const buttonLayoutMap = {
//     inline: "flex-row flex-wrap",
//     stacked: "flex-col space-y-4",
//     grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
//   };

//   return (
//     <section className={cn("relative overflow-hidden text-white", className)}>
//       {/* 1) Photo as motion.Image at z-0 */}
//       <motion.div
//         initial={prefersReducedMotion ? {} : animation.initial}
//         animate={prefersReducedMotion ? {} : animation.animate}
//         transition={{
//           duration: 20,
//           ease: "easeInOut",
//           repeat: Infinity,
//           repeatType: "mirror",
//         }}
//         className="absolute inset-0 z-0"
//       >
//         <Image
//           src={backgroundImage}
//           alt={backgroundAlt}
//           fill
//           sizes="100vw"
//           priority={imagePriority}
//           className={cn(
//             `object-${imagePosition} brightness-75`,
//             "transition-all duration-300 ease-in-out"
//           )}
//           onError={(e) =>
//             e.currentTarget && (e.currentTarget.style.display = "none")
//           }
//         />
//       </motion.div>

//       {/* 2) CSS Gradient overlay at z-10 */}
//       <div
//         className="absolute inset-0 z-10"
//         style={{
//           background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
//         }}
//       />

//       {/* 3) Semi-opaque color overlay at z-20 */}
//       <div
//         className="absolute inset-0 z-20"
//         style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
//       />

//       {/* 4) Your content at z-30 */}
//       <motion.header
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className={cn(
//           "relative z-30 container mx-auto flex flex-col justify-center h-full",
//           padding,
//           maxWidth,
//           alignmentMap[textAlignment]
//         )}
//         id="banner-content"
//       >
//         {customBadge ? (
//           <div className="mb-4">{customBadge}</div>
//         ) : badgeText ? (
//           <Badge
//             variant="outline"
//             className="text-sm text-white border-blue-100 mb-4"
//           >
//             {badgeText}
//           </Badge>
//         ) : null}

//         {(titleLine1 || titleLine2) && (
//           <h1
//             className={cn(
//               "font-extrabold text-gray-100 leading-snug drop-shadow-lg",
//               headingSize
//             )}
//           >
//             {titleLine1}
//             {titleLine2 && (
//               <>
//                 <br className="hidden md:block" />
//                 {titleLine2}
//               </>
//             )}
//           </h1>
//         )}

//         {subtitle && (
//           <p className="text-base sm:text-lg text-gray-200 mt-2 max-w-3xl">
//             {subtitle}
//           </p>
//         )}
//         {description && (
//           <p className="text-sm text-gray-300 mt-2 max-w-xl">{description}</p>
//         )}

//         {(showCTA || secondaryCTA || ctaButtons.length > 0) && (
//           <nav
//             className={cn(
//               "mt-6 flex gap-4",
//               alignmentMap[buttonAlignment],
//               buttonLayoutMap[buttonLayout]
//             )}
//             aria-label="Banner call-to-action"
//           >
//             {showCTA && ctaText !== '' && (
//               <Button
//                 as="a"
//                 href={ctaHref}
//                 variant="gradient"
//                 size="md"
//                 className="flex items-center"
//                 aria-label={ctaText}
//               >
//                 {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             )}

//             {secondaryCTA}

//             {ctaButtons.map(
//               ({ label, href, variant = "primary", target = "_self" }, idx) => (
//                 <Link
//                   key={idx}
//                   href={href}
//                   target={target}
//                   rel={target === "_blank" ? "noopener noreferrer" : undefined}
//                   className={cn(
//                     "py-3 px-6 rounded-full text-base font-semibold transition duration-300 transform hover:scale-105",
//                     BUTTON_VARIANTS[variant]
//                   )}
//                   aria-label={label}
//                 >
//                   {label}
//                 </Link>
//               )
//             )}
//           </nav>
//         )}

//         {extraContent && <div className="mt-6">{extraContent}</div>}
//         {tagline && (
//           <span className="text-xs text-gray-50 mt-4 block">{tagline}</span>
//         )}
//       </motion.header>
//     </section>
//   );
// }
