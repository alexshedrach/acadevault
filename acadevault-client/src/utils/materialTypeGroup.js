import {
  FaFileAlt,
  FaVideo,
  FaDatabase,
  FaBook,
  FaCode,
  FaKey,
} from "react-icons/fa";

export const materialTypeGroups = [
  {
    group: "Documents",
    icon: <FaFileAlt className="text-orange-500 w-4 h-4" />,
    items: [
      "Lecture Note",
      "Past Question",
      "Assignment",
      "Term Paper",
      "Proposal",
      "Business Plan",
      "Case Study",
      "Dissertation",
      "Thesis",
      "Research Paper",
      "Journal",
      "Project Report",
    ],
  },
  {
    group: "Multimedia",
    icon: <FaVideo className="text-orange-500 w-4 h-4" />,
    items: ["Video Tutorial", "Online Course"],
  },
  {
    group: "Digital Content",
    icon: <FaDatabase className="text-orange-500 w-4 h-4" />,
    items: ["Dataset", "Ebook"],
  },
  {
    group: "Software & Code",
    icon: <FaCode className="text-orange-500 w-4 h-4" />,
    items: ["Source Code", "Academic Software"],
  },
  {
    group: "Access Tools",
    icon: <FaKey className="text-orange-500 w-4 h-4" />,
    items: ["Exam Token & Pin"],
  },
];

export function groupMaterialCategories(categories) {
  return materialTypeGroups
    .map(({ group, icon, items }) => {
      const matched = categories.filter((cat) => items.includes(cat.name));
      return matched.length ? { group, icon, categories: matched } : null;
    })
    .filter(Boolean);
}
