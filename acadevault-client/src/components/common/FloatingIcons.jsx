"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PropTypes from "prop-types";

const FloatingIcons = ({
  icons,
  size = "medium",
  radius = 40,
  animationSpeed = 20,
}) => {
  const sizeMap = {
    small: { width: 48, height: 48, smWidth: 64, smHeight: 64 },
    medium: { width: 64, height: 64, smWidth: 80, smHeight: 80 },
    large: { width: 80, height: 80, smWidth: 96, smHeight: 96 },
  };

  const { width, height, smWidth, smHeight } = sizeMap[size] || sizeMap.medium;

  return (
    <div className="relative w-full h-[150px] sm:h-[250px] lg:h-[350px]">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className={`absolute w-${width / 4} h-${height / 4} sm:w-${
            smWidth / 4
          } sm:h-${smHeight / 4} group`}
          style={{
            top: `${50 + radius * Math.sin((i / icons.length) * 2 * Math.PI)}%`,
            left: `${
              50 + radius * Math.cos((i / icons.length) * 2 * Math.PI)
            }%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 360 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: {
              duration: 0.6,
              delay: i * 0.2,
              type: "spring",
              stiffness: 100,
            },
            scale: {
              duration: 0.6,
              delay: i * 0.2,
              type: "spring",
              stiffness: 100,
            },
            rotate: {
              duration: animationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{
            scale: 1.2,
            boxShadow: "0 0 20px rgba(255,255,255,0.7)",
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={icon.src}
            alt={`${icon.name} icon`}
            width={smWidth}
            height={smHeight}
            className="rounded-2xl shadow-lg object-cover"
            priority={i < 3}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md">
            {icon.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

FloatingIcons.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  radius: PropTypes.number,
  animationSpeed: PropTypes.number,
};

export default FloatingIcons;
