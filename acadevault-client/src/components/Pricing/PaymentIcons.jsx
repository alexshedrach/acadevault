import Image from "next/image";

/**
 * PaymentIcons component
 *
 * @param {Object[]} icons - Array of payment method icons (src, alt, title).
 * @param {string} className - Additional classes for the container.
 * @param {string} iconClassName - Classes applied to each icon image.
 * @param {number} iconHeight - Image height in pixels.
 * @param {number} iconWidth - Image width in pixels.
 * @param {boolean} grayscale - Enable grayscale effect.
 * @param {string} direction - "row" or "column" layout.
 */
export default function PaymentIcons({
  icons = [],
  className = "",
  iconClassName = "",
  iconHeight = 24,
  iconWidth = 40,
  grayscale = true,
  direction = "row", // or "column"
}) {
  const layout =
    direction === "column" ? "flex-col items-start" : "flex-row items-center";

  return (
    <div
      className={`flex ${layout} justify-center gap-3 ${className}`}
      aria-label="Supported payment methods"
    >
      {icons.map((method) => (
        <Image
          key={method.alt}
          src={method.src}
          alt={method.alt}
          title={method.title}
          height={iconHeight}
          width={iconWidth}
          className={`
            object-contain
            ${
              grayscale
                ? "grayscale hover:grayscale-0 transition duration-200"
                : ""
            }
            ${iconClassName}
          `}
        />
      ))}
    </div>
  );
}
