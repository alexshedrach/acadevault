import DashboardLayoutClient from "./DashboardLayoutClient";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export const metadata = generatePageMetadata({
  title: "Dashboard",
  description: "Access and manage your academic resources securely.",
  slug: "dashboard",
  image: "https://acadevault.com/images/dashboard-og.jpg",
});

export default function DashboardLayout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
