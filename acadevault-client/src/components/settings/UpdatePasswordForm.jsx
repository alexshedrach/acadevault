"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function UpdatePasswordForm() {
  const { updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return setStatus("❌ Passwords do not match.");
    }

    const result = await updatePassword(formData);
    if (result.success) {
      setStatus("✅ Password updated successfully!");
    } else {
      setStatus(
        `❌ Failed to update password: ${
          result.error?.data?.message || result.error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <input
        name="oldPassword"
        type="password"
        onChange={handleChange}
        placeholder="Old Password"
        required
      />
      <input
        name="newPassword"
        type="password"
        onChange={handleChange}
        placeholder="New Password"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        placeholder="Confirm New Password"
        required
      />
      <button type="submit">Update Password</button>
      {status && <p>{status}</p>}
    </form>
  );
}
