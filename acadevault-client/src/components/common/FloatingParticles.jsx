"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * FloatingParticles
 *
 * A configurable, animated background of floating dots/circles.
 * Combines the functionality of the old ParticleBackground and FloatingParticles
 * into a single, reusable component.
 *
 * Props:
 *   • count         (number)   – how many particles to render (default: 15)
 *   • minSize       (number)   – minimum diameter in px for each particle (default: 2)
 *   • maxSize       (number)   – maximum diameter in px for each particle (default: 8)
 *   • color         (string)   – CSS color for particles (default: "white")
 *   • minOpacity    (number)   – minimum opacity (0–1) for animation (default: 0.1)
 *   • maxOpacity    (number)   – maximum opacity (0–1) for animation (default: 0.3)
 *   • minDuration   (number)   – shortest animation cycle in seconds (default: 5)
 *   • maxDuration   (number)   – longest animation cycle in seconds (default: 8)
 *   • variation     (boolean)  – if true, each particle will randomly vary its animation magnitude
 *
 * Usage:
 *   <FloatingParticles
 *     count={20}
 *     minSize={3}
 *     maxSize={10}
 *     color="rgba(255, 255, 255, 0.15)"
 *     minOpacity={0.1}
 *     maxOpacity={0.4}
 *     minDuration={4}
 *     maxDuration={10}
 *     variation={true}
 *   />
 */
export function FloatingParticles({
  count = 15,
  minSize = 2,
  maxSize = 8,
  color = "white",
  minOpacity = 0.1,
  maxOpacity = 0.3,
  minDuration = 5,
  maxDuration = 8,
  variation = true,
}) {
  // Internal state: an array of particle definitions
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate `count` random particles with properties
    const particleArray = Array.from({ length: count }).map(() => {
      // Random position between 0% and 100%
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;

      // Random size between minSize and maxSize
      const size = Math.random() * (maxSize - minSize) + minSize;

      // Random delay so they don’t all move in sync
      const delay = Math.random() * 3;

      // Random animation duration between minDuration and maxDuration
      const duration =
        Math.random() * (maxDuration - minDuration) + minDuration;

      // Base opacity for the particle (will animate between this and a lower bound)
      const baseOpacity =
        Math.random() * (maxOpacity - minOpacity) + minOpacity;

      // If variation is true, we vary movement amplitude per particle:
      const xAmp = variation ? Math.random() * 15 + 5 : 10; // between 5–20px
      const yAmp = variation ? Math.random() * 15 + 5 : 10; // between 5–20px

      return {
        xPos,
        yPos,
        size,
        delay,
        duration,
        baseOpacity,
        xAmp,
        yAmp,
      };
    });

    setParticles(particleArray);
  }, [
    count,
    minSize,
    maxSize,
    minOpacity,
    maxOpacity,
    minDuration,
    maxDuration,
    variation,
  ]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.yPos}%`,
            left: `${p.xPos}%`,
            backgroundColor: color,
          }}
          animate={{
            // Animate Y: 0 → -yAmp% → 0
            y: ["0%", `-${p.yAmp}%`, "0%"],
            // Animate X: 0 → +xAmp% → -xAmp% → 0
            x: ["0%", `${p.xAmp}%`, `-${p.xAmp}%`, "0%"],
            // Animate opacity: baseOpacity → minOpacity/2 → baseOpacity
            opacity: [p.baseOpacity, p.baseOpacity / 2, p.baseOpacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
