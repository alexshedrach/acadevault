"use client";

import { BookCheck } from "lucide-react";

export default function TrustedByStudentsSection() {
  return (
    <section className="bg-green-50 p-6 rounded-lg shadow-inner space-y-4 text-center">
      <h2 className="text-xl font-bold text-green-800 flex justify-center gap-2 items-center">
        <BookCheck className="w-5 h-5" />
        Trusted by 10,000+ Students
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto text-sm">
        From project reports to past questions, our verified resources help
        students achieve more — confidently and securely.
      </p>
    </section>
  );
}
