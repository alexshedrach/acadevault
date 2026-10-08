import { Users } from "lucide-react";

export default function HireWriterCTA() {
  return (
    <a
      href="/hire-writer"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md transition animate-pulse hover:animate-none"
    >
      <Users className="w-4 h-4" />
      Hire a Professional Writer
    </a>
  );
}
