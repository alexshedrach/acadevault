import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import Navbar from "@/components/header/Navbar";
import ClientHireWriterOrderPage from "./components/ClientHireWriterOrderPage";

export const metadata = generatePageMetadata({
  title: "Place Order - Hire a Writer",
  description:
    "Place your order for professional academic writing services on AcaDeVault.",
  slug: "hire-writer/order",
  image: "https://acadevault.com/images/hire-writer-order-og.jpg",
});

export default function HireWriterOrderPage() {
  return (
    <>
      <Navbar showSearch showCategories />
      <ClientHireWriterOrderPage />
    </>
  );
}
