import ForgotPasswordClient from "./ForgotPasswordClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export const metadata = generatePageMetadata({
  title: "Forgot Password",
  description:
    "Reset your AcadeVault account password securely. Receive a reset link and regain access to your dashboard.",
  slug: "forgot-password",
  image: "https://acadevault.com/images/acadevault-forgot-password-og.jpg",
});


export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
