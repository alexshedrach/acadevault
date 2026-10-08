export default function ResearchPage() {
  return (
    <section className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Research Assistance</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Bespoke research support: literature reviews, data analysis, and
          methodology guidance.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside text-gray-700">
        <li>Custom literature review service</li>
        <li>Quantitative & qualitative data analysis</li>
        <li>Research design & methodology consultation</li>
        <li>Statistical support with R, SPSS, Python</li>
      </ul>

      <div className="text-center">
        <a
          href="/research-assistance/request"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Request Assistance
        </a>
      </div>
    </section>
  );
}
