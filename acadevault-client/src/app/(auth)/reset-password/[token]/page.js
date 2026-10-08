import ResetPasswordClient from "./ResetPasswordClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export const metadata = generatePageMetadata({
  title: "Reset Password",
  description:
    "Enter a new password to securely reset your AcadeVault account. This link will expire shortly for your security.",
  slug: "reset-password", // avoid including the token here for SEO/clean URLs
  image: "https://acadevault.com/images/acadevault-reset-password-og.jpg",
});

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
