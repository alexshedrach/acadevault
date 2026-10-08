import StepCard from "@/components/cards/StepCard";
import { becomeSellerSteps } from "@/data/stepsData";

const VendorHowItWorksSection = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24"
      >
        {/* Section Heading */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-indigo-600 uppercase border-b-4 border-red-500 inline-block pb-2">
            How it Works
          </h2>
          <p className="mt-5 text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Learn how to become a verified seller on AcadeVault and start
            earning from your academic projects in 8 simple, actionable steps.
          </p>
        </div>

        {/* Step Cards */}
        <div className="mt-20 flex flex-col space-y-10">
          {becomeSellerSteps.map((step, index) => (
            <StepCard
              key={index}
              step={{
                id: index + 1,
                title: step.title,
                description: step.content,
                image: step.image,
                icon: step.icon, // Optional: add icon if needed
                alt: step.alt || step.title,
                color: step.color || "from-orange-500 to-red-500", // Optional: override per step
                cta: step.cta || null, // Optional
              }}
              index={index}
              totalSteps={becomeSellerSteps.length}
              variant="cta"
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default VendorHowItWorksSection;
