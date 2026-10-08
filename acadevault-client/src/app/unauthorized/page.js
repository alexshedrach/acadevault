import UnauthorizedClient from "./UnauthorizedClient";

export const metadata = {
  title: "Unauthorized - Access Denied",
  description: "You do not have permission to access this page.",
};

export default function UnauthorizedPage() {
  return <UnauthorizedClient />;
}
