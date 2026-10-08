"use client";
import DownloadOrPurchaseButton from "./DownloadOrPurchaseButton";
import ContactUploaderCTA from "./ContactUploaderCTA";

export default function MaterialActionPanel({ material }) {
  const handleAccess = () => {
    if (material.isFree) {
      console.log("Triggering download for:", material.id);
      // downloadMaterial(material.id);
    } else {
      window.location.href = `/checkout/${material.id}`;
    }
  };

  return (
    <fieldset className="rounded-2xl shadow-sm p-4 bg-white">
      <legend className="text-sm font-semibold text-gray-700">
        📥 Get Full Access or Reach Out
      </legend>
      <p className="text-base block font-medium px-16">
        If this preview aligns with your academic needs, you can proceed to
        access the full material or contact the uploader for more details.
      </p>
      <DownloadOrPurchaseButton
        isFree={material.isFree}
        onClick={handleAccess}
      />
      <ContactUploaderCTA uploaderId={material.uploaderId} />
    </fieldset>
  );
}
