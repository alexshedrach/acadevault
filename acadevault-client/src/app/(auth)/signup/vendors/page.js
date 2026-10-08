import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { ClientVendorRegister } from "./ClientVendorRegister";

export const metadata = generatePageMetadata({
  title: "Vendor Registration - Acadavault",
  description:
    "Join Acadavault as a vendor to offer academic services like writing, editing, or research support.",
  slug: "vendors/register",
  image: "https://acadevault.com/images/vendor-registration-og.jpg",
});

export default function VendorRegistrationPage() {
  return <ClientVendorRegister />;
}
