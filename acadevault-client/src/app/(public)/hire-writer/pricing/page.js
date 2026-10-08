import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import Navbar from "@/components/header/Navbar";
import HireWriterPricingClient from "./components/HireWriterPricingClient";

export const metadata = generatePageMetadata({
  title: "Pricing & Order - Hire a Writer",
  description:
    "Explore tailored pricing plans across academic categories, request custom quotes, or order professional writing services at AcaDeVault.",
  slug: "hire-writer/pricing",
  image: "https://acadevault.com/images/hire-writer-pricing-og.jpg",
  keywords: "academic writing, pricing plans, custom quote, hire writer",
});

export default async function HireWriterPricingPage({ searchParams }) {
  return (
    <>
      <Navbar showSearch showCategories />
      <HireWriterPricingClient searchParams={searchParams} />
    </>
  );
}
