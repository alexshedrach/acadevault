import { ShieldCheck, Users, BookOpenCheck, Scale } from "lucide-react";

const pillars = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "Verified & Ethical Content",
    desc: "Each upload is vetted and tagged for originality and compliance. Plagiarism is flagged. Authorship is rewarded.",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: "Community-Powered",
    desc: "Lecturers, students, and researchers co-create our growing academic library and uphold our value-driven model.",
  },
  {
    icon: <BookOpenCheck className="w-6 h-6 text-orange-600" />,
    title: "Access-First",
    desc: "A hybrid of open-access and paid content ensures inclusivity, while grants and free-tier options support disadvantaged users.",
  },
  {
    icon: <Scale className="w-6 h-6 text-blue-600" />,
    title: "Academic Fairness",
    desc: "We redirect revenue to content creators and scholarship pools — preserving ownership, accountability, and impact.",
  },
];

export default function CorePillarsSection() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Our Core Pillars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-4 bg-white p-5 rounded-lg shadow hover:shadow-md border transition"
          >
            <div className="mt-1">{pillar.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900">{pillar.title}</h4>
              <p className="text-sm text-gray-600">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
