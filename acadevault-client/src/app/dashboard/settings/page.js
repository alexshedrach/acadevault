"use client";
import AccountStatusSection from "@/components/settings/AccountStatusSection";
import DeleteAccountSection from "@/components/settings/DeleteAccountSection";
import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm";
import UpdateProfileForm from "@/components/settings/UpdateProfileForm";
import { useAuth } from "@/hooks/useAuth";

export default function AccountSettingsPage() {
  const { user, hasInitialized, isLoading } = useAuth();

  if (!hasInitialized || isLoading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to access account settings.</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <UpdateProfileForm user={user} />
      <UpdatePasswordForm />
      <AccountStatusSection />
      <DeleteAccountSection />
    </div>
  );
}
