export default function LiveQnAPage() {
  return (
    <section className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Live Q&A Sessions</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join scheduled live video sessions with experts to get instant
          answers.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside text-gray-700">
        <li>Weekly expert AMA (Ask Me Anything)</li>
        <li>Topic‑focused live workshops</li>
        <li>Real‑time chat & Q&A moderation</li>
        <li>Session recordings available on demand</li>
      </ul>

      <div className="text-center">
        <a
          href="/live-q-and-a/schedule"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          View Schedule
        </a>
      </div>
    </section>
  );
}
