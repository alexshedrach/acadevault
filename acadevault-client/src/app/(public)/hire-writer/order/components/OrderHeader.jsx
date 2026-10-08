import Link from "next/link";

export function OrderHeader() {
  return (
    <header
      className="mb-12 px-4"
      role="banner"
      aria-labelledby="order-page-heading"
    >
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1
          id="order-page-heading"
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3"
        >
          Place Your Order
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-2">
          Fill out your project details and hire a qualified academic writer.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-4">
          We ensure quality, originality, and timely delivery tailored to your
          academic needs.
        </p>

        <Link
          href="/hire-writer/pricing"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          ← Back to Pricing
        </Link>
      </div>
    </header>
  );
}
