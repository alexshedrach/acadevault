"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, PlayCircle } from "lucide-react";

// Example testimonials
const testimonials = [
  {
    type: "text",
    quote:
      "Referring my classmates to AcadeVault earned me enough credits to buy premium resources for free!",
    author: "Chika Okoro",
    role: "PhD Candidate, University of Ibadan",
  },
  {
    type: "video",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "/images/bg-img-1.jpg",
    author: "Emma Thompson",
    role: "Researcher, University of Cambridge",
  },
  {
    type: "text",
    quote:
      "AcadeVault’s reward system is seamless, transparent, and truly empowering for students like me.",
    author: "Daniel Eze",
    role: "Undergraduate, UNILAG",
  },
];

export default function ReferralTestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50"
      role="region"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          id="testimonials-heading"
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 flex items-center justify-center gap-3 text-gray-800"
        >
          <Star className="w-10 h-10 text-yellow-500" />
          What Our Referrers Say
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((testimonial, index) =>
            testimonial.type === "video" ? (
              <VideoTestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                onPlay={() => setSelectedVideo(testimonial.videoUrl)}
              />
            ) : (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            )
          )}
        </div>

        {selectedVideo && (
          <VideoTestimonialModal
            videoUrl={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative p-8 bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all group cursor-pointer"
    >
      <div className="absolute top-6 right-6 text-yellow-400 opacity-20 group-hover:opacity-40 transition">
        <Quote size={36} />
      </div>

      <p className="italic text-gray-700 mb-6 leading-relaxed">{`“${testimonial.quote}”`}</p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center shadow-md">
          {testimonial.author
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{testimonial.author}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VideoTestimonialCard({ testimonial, index, onPlay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group rounded-3xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer"
      onClick={onPlay}
    >
      <img
        src={testimonial.thumbnail}
        alt={`Video testimonial by ${testimonial.author}`}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <PlayCircle className="text-white w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <p className="font-semibold">{testimonial.author}</p>
        <p className="text-sm text-gray-300">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}


function VideoTestimonialModal({ videoUrl, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden">
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-auto rounded-xl"
        ></video>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400 transition"
          aria-label="Close video"
        >
          &times;
        </button>
      </div>
    </div>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";

// // Example testimonials (can be API-driven later)
// const testimonials = [
//   {
//     quote:
//       "Referring my classmates to AcadeVault earned me enough credits to buy premium resources for free!",
//     author: "Chika Okoro",
//     role: "PhD Candidate, University of Ibadan",
//   },
//   {
//     quote:
//       "The referral program is so easy to use, and I love the discounts I get for sharing with my study group.",
//     author: "Emma Thompson",
//     role: "Researcher, University of Cambridge",
//   },
//   {
//     quote:
//       "AcadeVault’s reward system is seamless, transparent, and truly empowering for students like me.",
//     author: "Daniel Eze",
//     role: "Undergraduate, UNILAG",
//   },
// ];

// export default function ReferralTestimonialsSection() {
//   return (
//     <section
//       className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50"
//       role="region"
//       aria-labelledby="testimonials-heading"
//     >
//       <div className="container mx-auto px-6 max-w-7xl">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           id="testimonials-heading"
//           className="text-4xl md:text-5xl font-extrabold text-center mb-16 flex items-center justify-center gap-3 text-gray-800"
//         >
//           <Star className="w-10 h-10 text-yellow-500" />
//           What Our Referrers Say
//         </motion.h2>

//         <div className="grid gap-10 md:grid-cols-3">
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard
//               key={index}
//               testimonial={testimonial}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function TestimonialCard({ testimonial, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//       className="relative p-8 bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all group cursor-pointer"
//     >
//       {/* Decorative Quote Icon */}
//       <div className="absolute top-6 right-6 text-yellow-400 opacity-20 group-hover:opacity-40 transition">
//         <Quote size={36} />
//       </div>

//       {/* Testimonial Content */}
//       <p className="italic text-gray-700 mb-6 leading-relaxed">{`“${testimonial.quote}”`}</p>

//       {/* Author Info */}
//       <div className="flex items-center gap-4">
//         {/* Placeholder Avatar with Initials */}
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center shadow-md">
//           {testimonial.author
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .toUpperCase()}
//         </div>
//         <div>
//           <p className="font-semibold text-gray-800">{testimonial.author}</p>
//           <p className="text-sm text-gray-500">{testimonial.role}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
