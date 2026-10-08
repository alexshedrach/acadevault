"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function UpdateProfileForm({ user }) {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setStatus("✅ Profile updated successfully!");
    } else {
      setStatus(
        `❌ Failed to update profile: ${
          result.error?.data?.message || result.error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Update Profile</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <button type="submit">Save Changes</button>
      {status && <p>{status}</p>}
    </form>
  );
}
