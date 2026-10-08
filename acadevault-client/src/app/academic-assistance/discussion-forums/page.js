export default function ForumsPage() {
  return (
    <section className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Discussion Forums</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join topic‑specific forums: collaborate, ask questions, and share
          insights.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-6 text-gray-700">
        <li>Subject‑specific threads (Engineering, Science, Humanities)</li>
        <li>Peer‑to‑peer Q&A & knowledge sharing</li>
        <li>Moderator‑led discussion groups</li>
        <li>Upvote best answers & earn reputation</li>
      </ul>

      <div className="text-center">
        <a
          href="/discussion-forums"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Browse Forums
        </a>
      </div>
    </section>
  );
}
