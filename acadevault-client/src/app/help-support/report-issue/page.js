export default function ReportIssuePage() {
  return (
    <section className="space-y-8 max-w-2xl mx-auto">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Report an Issue</h1>
        <p className="text-gray-600">
          Help us improve: report bugs, errors, or content issues.
        </p>
      </header>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Subject</label>
          <input
            type="text"
            placeholder="Brief summary"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Details</label>
          <textarea
            rows="6"
            placeholder="Describe the issue in detail"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
}
