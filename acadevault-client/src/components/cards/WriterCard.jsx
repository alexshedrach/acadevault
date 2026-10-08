import React from "react";
import Image from "next/image";
import { Card } from "../ui/Card";
import { FaStar, FaBriefcase, FaBookOpen, FaFileAlt } from "react-icons/fa";
import classNames from "classnames";

const getWriterTier = (writer) => {
  if (writer.rating >= 4.9 && writer.completedProjects >= 150) {
    return { tier: "gold", label: "Elite Writer" };
  } else if (writer.rating >= 4.7 && writer.completedProjects >= 100) {
    return { tier: "silver", label: "Top Rated" };
  } else {
    return { tier: "bronze", label: "Trusted" };
  }
};

const tierColors = {
  gold: "bg-yellow-400 text-black",
  silver: "bg-gray-300 text-black",
  bronze: "bg-orange-300 text-black",
};

const BadgeRibbon = ({ label, tier }) => (
  <div
    className={classNames(
      "absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase rounded-md shadow-md z-10",
      tierColors[tier]
    )}
  >
    {label}
  </div>
);

const WriterInfoGrid = ({ rating, experience, completedProjects, format }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-400" />
        <span>{rating.toFixed(1)} Rating</span>
      </div>
      <div className="flex items-center gap-2">
        <FaBriefcase className="text-blue-400" />
        <span>{experience}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaBookOpen className="text-green-400" />
        <span>{completedProjects}+ Projects</span>
      </div>
      <div className="flex items-center gap-2">
        <FaFileAlt className="text-purple-400" />
        <span>{format} Format</span>
      </div>
    </div>
  );
};

const WriterCard = ({ writer, onClick }) => {
  const { tier, label } = getWriterTier(writer);

  return (
    <Card
      onClick={onClick}
      clickable
      theme="dark"
      variant="shadowed"
      className="relative p-6 group transition-transform duration-300 hover:scale-[1.015]"
    >
      {/* Tier Ribbon */}
      <BadgeRibbon tier={tier} label={label} />

      {/* Top Section */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <Image
            src={writer.image}
            alt={writer.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white leading-tight">
            {writer.name}
          </h3>
          <p className="text-sm text-blue-300">{writer.subject}</p>
          <p className="text-xs text-gray-400 italic">{writer.expertise}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-blue-800/30" />

      {/* Info */}
      <WriterInfoGrid
        rating={writer.rating}
        experience={writer.experience}
        completedProjects={writer.completedProjects}
        format={writer.format}
      />

      {/* Hover Call-to-Action */}
      <div className="mt-6 text-center text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition duration-300">
        View Full Profile →
      </div>
    </Card>
  );
};

export default WriterCard;
