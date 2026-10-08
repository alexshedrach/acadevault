import { generatePageMetadata } from "@/utils/generatePageMetadata";
import SignupClient from "./SignupClient";

export const metadata = generatePageMetadata({
  title: "Sign Up",
  description:
    "Create your AcadeVault account to buy, sell, or manage academic materials. Fast registration with email or social login options.",
  slug: "login",
  image: "https://acadevault.com/images/acadevault-signup-og.jpg",
});

export default function SignupPage() {
  return <SignupClient />;
}
