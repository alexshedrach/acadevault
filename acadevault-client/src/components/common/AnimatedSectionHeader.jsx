"use client";

import { TypeAnimation } from "react-type-animation";
import { cn } from "@/utils/cn";

const AnimatedSectionHeader = ({
  sequences,
  description,
  className = "",
  displayDuration = 2000,
  typingSpeed = 50,
  titleClassName = "",
  descClassName = "",
}) => {
  const animationSequence = sequences.flatMap((phrase) => [
    phrase,
    displayDuration,
  ]);

  return (
    <div
      className={cn(
        "text-center mb-12 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Animated Heading */}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500",
          titleClassName
        )}
      >
        <TypeAnimation
          sequence={animationSequence}
          speed={typingSpeed}
          repeat={Infinity}
          wrapper="span"
          cursor
          style={{ display: "inline-block", whiteSpace: "pre-line" }}
        />
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed",
            descClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default AnimatedSectionHeader;
