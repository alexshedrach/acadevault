export default function CitationPage() {
  return (
    <section className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Citation & Referencing</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Generate perfectly formatted references in APA, MLA, Chicago, and
          more.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside text-gray-700">
        <li>Support for 50+ citation styles</li>
        <li>Automatic DOI and ISBN lookup</li>
        <li>In‑text citation generator</li>
        <li>Export to Word, LaTeX, and RIS formats</li>
      </ul>

      <div className="text-center">
        <a
          href="/citation-referencing/generate"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Generate Now
        </a>
      </div>
    </section>
  );
}
