"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ParticleBackgroundAnimation = ({
  particleImage = "/media/particle-bg2.jpg",
  opacity = 0.1,
  animationSpeed = 10,
  parallaxY = null,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Base Particle Layer */}
      <div
        className="absolute inset-0 bg-cover animate-pulse"
        style={{
          backgroundImage: `url(${particleImage})`,
          opacity,
          animationDuration: `${animationSpeed}s`,
        }}
      />
      {/* Additional Particle Layer for Depth */}
      <div
        className="absolute inset-0 bg-cover animate-pulse"
        style={{
          backgroundImage: `url(${particleImage})`,
          opacity: opacity * 0.5,
          animationDuration: `${animationSpeed * 1.5}s`,
          transform: "scale(1.2)",
        }}
      />
      {/* Parallax Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"
        style={{ y: parallaxY }}
      />
    </div>
  );
};

ParticleBackgroundAnimation.propTypes = {
  particleImage: PropTypes.string,
  opacity: PropTypes.number,
  animationSpeed: PropTypes.number,
  parallaxY: PropTypes.object,
};

export default ParticleBackgroundAnimation;
