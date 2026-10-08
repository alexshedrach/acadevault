"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/7sDY4m8KNLc",
    thumbnail: "https://i.ytimg.com/vi/7sDY4m8KNLc/maxresdefault.jpg",
    name: "Dr. Sophia Rodriguez",
    role: "Stanford University",
    quote: "AcadeVault has revolutionized how I manage my research materials.",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumbnail: "https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg",
    name: "Prof. James Wilson",
    role: "University of Oxford",
    quote:
      "The collaboration features have made working with my team seamless.",
  },
];

export default function TestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-20 bg-[#f4f9fc]">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Testimonials
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          From AcadeVault media center and global collaborators — see what
          researchers and academics say about their experience.
        </p>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedVideo(t.videoUrl)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={t.thumbnail}
                  alt={`Testimonial by ${t.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-white text-5xl" />
                </div>
              </div>

              <div className="mt-5 text-left">
                <p className="text-lg font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
                <p className="mt-2 text-gray-700 italic">"{t.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-[90%] md:w-3/4 lg:w-1/2 bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full aspect-video"
                src={selectedVideo}
                title="User Testimonial"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-3 text-white text-3xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
