import { generatePageMetadata } from "@/utils/generatePageMetadata";

import Navbar from "@/components/header/Navbar";
import PaymentOptionsClient from "./components/PaymentOptionsClient";

export const metadata = generatePageMetadata({
  title: "Payment Options",
  description:
    "Learn how to make payments easily using our offline and online payment options. Enjoy a secure and seamless payment experience.",
  slug: "cart",
  image: "https://acadevault.com/images/payment-options-og.jpg",
});

export default function CartPage() {
  return (
    <>
      <Navbar showSearch showCategories />

      <PaymentOptionsClient />
    </>
  );
}
