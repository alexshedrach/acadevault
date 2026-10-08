"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiLinkedin, FiTwitter, FiX } from "react-icons/fi";
import useAnalytics from "@/hooks/useAnalytics";

async function fetchTeamMembers() {
  return new Promise((res) =>
    setTimeout(() => {
      res([
        {
          id: "1",
          name: "Dr. Emily Chen",
          role: "Founder & CEO",
          department: "Leadership",
          image: "/avatars/james.png",
          bio: "Dr. Emily Chen founded AcadeVault in 2020 after a decade of research in AI-driven knowledge management. She holds a PhD from Stanford University.",
          social: {
            linkedin: "https://linkedin.com/in/emily-chen",
            twitter: "https://twitter.com/emilychen",
          },
        },
        {
          id: "2",
          name: "Prof. Marcus Lee",
          role: "Chief Academic Officer",
          department: "Academics",
          image: "/avatars/divine.png",
          bio: "Prof. Lee oversees academic strategy and partnerships. He formerly led research at University of Oxford.",
          social: { linkedin: "https://linkedin.com/in/marcus-lee" },
        },
        {
          id: "3",
          name: "Sarah Johnson",
          role: "Head of Engineering",
          department: "Engineering",
          image: "/avatars/tony.png",
          bio: "Sarah helms our engineering team, specializing in scalable Node.js and microservices architectures.",
          social: {
            linkedin: "https://linkedin.com/in/sarah-johnson",
            twitter: "https://twitter.com/sjohnson_dev",
          },
        },
        {
          id: "4",
          name: "David Patel",
          role: "Lead Designer",
          department: "Design",
          image: "/avatars/jenny.png",
          bio: "David creates intuitive, accessible UI/UX for our users, with a background at Google and Adobe.",
          social: { twitter: "https://twitter.com/dpatel_design" },
        },
      ]);
    }, 800)
  );
}

export default function OurTeamSection() {
  const { trackEvent } = useAnalytics();
  const [team, setTeam] = useState(null);
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers()
      .then((data) => setTeam(data))
      .catch(() => setError("Failed to load team members."));
  }, []);

  const departments = useMemo(
    () =>
      team
        ? ["All", ...Array.from(new Set(team.map((m) => m.department)))]
        : ["All"],
    [team]
  );

  const filtered = useMemo(() => {
    if (!team) return [];
    return team.filter((m) => {
      const matchesDept = activeDept === "All" || m.department === activeDept;
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [team, activeDept, search]);

  // Keyboard and Backdrop Close Handler
  const handleModalClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    if (selected) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected, handleModalClose]);

  if (error) {
    return (
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (team === null) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="mx-auto mb-4 w-32 h-32 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="team-heading">
      <div className="container mx-auto px-4">
        <h2 id="team-heading" className="text-3xl font-bold mb-4 text-center">
          Meet Our Team
        </h2>

        {/* Search & Department Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
          <input
            type="search"
            placeholder="Search by name or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search team members"
          />
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setActiveDept(dept);
                  trackEvent("Team:filter_dept", { dept });
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeDept === dept
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((member) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mx-auto mb-4 w-32 h-32 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  placeholder="blur"
                  blurDataURL="/images/blur-placeholder-sm.png"
                  priority={member.department === "Leadership"}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
              <div className="flex justify-center space-x-4 mb-4">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <FiLinkedin
                      size={24}
                      className="text-gray-600 hover:text-indigo-600"
                    />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter profile of ${member.name}`}
                  >
                    <FiTwitter
                      size={24}
                      className="text-gray-600 hover:text-blue-400"
                    />
                  </a>
                )}
              </div>
              <button
                onClick={() => {
                  setSelected(member);
                  trackEvent("Team:view_bio", { id: member.id });
                }}
                className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                View Bio
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bio-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
          >
            <motion.div
              className="bg-white rounded-lg max-w-lg w-full p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={handleModalClose}
                aria-label="Close bio modal"
              >
                <FiX size={24} />
              </button>
              <h3 id="bio-title" className="text-2xl font-bold mb-2">
                {selected.name}
              </h3>
              <p className="text-indigo-600 font-medium mb-4">
                {selected.role}
              </p>
              <div className="mb-4">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                  placeholder="blur"
                  blurDataURL="/images/blur-placeholder-sm.png"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">{selected.bio}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
