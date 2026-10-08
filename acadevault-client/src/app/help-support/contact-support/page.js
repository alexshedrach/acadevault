export default function ContactSupportPage() {
  return (
    <section className="space-y-8 max-w-2xl mx-auto">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Contact Support</h1>
        <p className="text-gray-600">
          We’re here to help—reach out with any questions or feedback.
        </p>
      </header>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Your Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Message</label>
          <textarea
            rows="6"
            placeholder="How can we help you?"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
