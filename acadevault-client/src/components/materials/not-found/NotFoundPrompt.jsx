import NotFoundHeader from "./NotFoundHeader";
import ContactOptions from "./ContactOptions";
import SearchBox from "./SearchBox";
import HireWriterCTA from "./HireWriterCTA";

export default function NotFoundPrompt() {
  return (
    <section className="mt-20 mb-24 px-4 sm:px-8 md:px-16 max-w-4xl mx-auto text-center">
      <NotFoundHeader />
      <ContactOptions />
      <SearchBox />
      <div className="mb-6">
        <span className="text-sm text-gray-400 uppercase tracking-widest">
          Or
        </span>
      </div>
      <HireWriterCTA />
    </section>
  );
}
