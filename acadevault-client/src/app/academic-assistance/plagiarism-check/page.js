export default function PlagiarismPage() {
  return (
    <section className="space-y-8">
      {/* Hero */}
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Plagiarism Checking</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Upload your document and receive a detailed originality report in
          minutes.
        </p>
      </header>

      {/* Features */}
      <ul className="grid md:grid-cols-2 gap-6 text-gray-700 list-disc list-inside">
        <li>Deep scan against academic databases</li>
        <li>Highlight matching text and sources</li>
        <li>Detailed percentage and section-wise breakdown</li>
        <li>Exportable PDF report</li>
      </ul>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="/plagiarism-check/upload"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Start Your Free Check
        </a>
      </div>
    </section>
  );
}
