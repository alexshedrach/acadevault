"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutHeroSection = () => {
  return (
    <section
      className="py-20 px-6 bg-gradient-to-br from-blue-200 to-white"
      aria-labelledby="about-hero-title"
    >
      {/* Background Decorative Element */}
      {/* <div className="absolute inset-0 bg-[url('/images/acadevault-hero-img-1.png')] bg-no-repeat bg-center bg-contain opacity-10"></div> */}

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          id="about-hero-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-blue-700"
        >
          About AcadeVault
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          AcadeVault is the academic backbone of emerging markets — a trusted
          platform designed to empower access, authorship, and academic
          excellence. We’re on a mission to streamline how students,
          researchers, and institutions access and share trusted academic
          content, fostering a global community of knowledge creators and
          learners.
        </p>
        <Link href="/signup">
          <motion.button
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Join AcadeVault today"
          >
            Join Our Community
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutHeroSection;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function AboutHero() {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-blue-200 to-white">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center justify-center gap-8">
//           <motion.div
//             className="max-w-lg"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl font-bold text-blue-700 mb-4">
//               About AcadeVault
//             </h1>
//             <p className="text-lg text-gray-700 mb-6">
//               AcadeVault: Empowering academic excellence in emerging markets.
//               Our trusted platform streamlines access to and sharing of
//               high-quality academic materials, fostering a community of
//               knowledge and integrity.
//             </p>
//             <Link href="/signup">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 Join the Community
//               </button>
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <img
//               src="/images/acadevault-hero-img-1.png"
//               alt="Students collaborating on academic materials"
//               className="max-w-md w-full h-auto rounded-lg shadow-lg"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
