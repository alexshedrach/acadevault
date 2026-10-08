import ActivatePromptClient from "./ActivatePromptClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export const metadata = generatePageMetadata({
  title: "Registration Successful",
  description:
    "Thank you for registering with AcadeVault. Please check your email for the activation link.",
  slug: "activate-prompt",
  image: "https://acadevault.com/images/acadevault-registration-success-og.jpg",
});

export default function ActivatePromptPage() {
  return <ActivatePromptClient />;
}
