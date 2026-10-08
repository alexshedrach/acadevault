import { Rocket } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center max-w-3xl mx-auto my-16">
      <Rocket className="mx-auto w-10 h-10 text-blue-500 mb-4" />
      <h3 className="text-xl font-bold text-blue-800 mb-2">Join the Mission</h3>
      <p className="text-gray-600 mb-4">
        Whether you're a student, researcher, institution, or creator — there's
        a place for you at AcadeVault. Let’s shape the future of academic access
        together.
      </p>
      <a
        href="/contact"
        className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      >
        Contact Us
      </a>
    </section>
  );
}
