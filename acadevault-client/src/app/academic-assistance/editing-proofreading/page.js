export default function EditingPage() {
  return (
    <section className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Editing & Proofreading</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Get a professional editor to refine grammar, style, and clarity.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside text-gray-700">
        <li>Grammar and spelling corrections</li>
        <li>Academic style and tone enhancement</li>
        <li>Structural and logical flow review</li>
        <li>Feedback comments from expert editors</li>
      </ul>

      <div className="text-center">
        <a
          href="/editing-proofreading/book"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Book an Editor
        </a>
      </div>
    </section>
  );
}
