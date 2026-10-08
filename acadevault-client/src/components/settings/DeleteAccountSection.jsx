"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccountSection() {
  const { deleteAccount } = useAuth();
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;
    const result = await deleteAccount();
    if (result.success) {
      router.push("/login");
    } else {
      setStatus(
        `❌ Failed to delete account: ${
          result.error?.data?.message || result.error.message
        }`
      );
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete My Account
      </button>
      {status && <p className="text-red-500">{status}</p>}
    </div>
  );
}
