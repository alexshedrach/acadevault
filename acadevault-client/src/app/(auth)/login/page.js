import { generatePageMetadata } from "@/utils/generatePageMetadata";
import LoginClient from "./LoginClient";

export const metadata = generatePageMetadata({
  title: "Login to access academic materials",
  description:
    "Log in to your AcadeVault account to access academic materials, courses, and your personalized dashboard. Secure, fast, and easy access.",
  slug: "login",
  image: "https://acadevault.com/images/acadevault-login-og.jpg",
});

export default function LoginPage() {
  return <LoginClient />;
}
