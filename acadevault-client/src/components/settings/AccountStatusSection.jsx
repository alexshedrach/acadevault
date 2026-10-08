"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AccountStatusSection() {
  const { accountStatus, isCheckingStatus } = useAuth();

  if (isCheckingStatus) {
    return <p className="p-6">Loading account status...</p>;
  }

  if (!accountStatus) {
    return <p className="p-6 text-red-600">Failed to load account status.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Status</h1>
      <ul className="space-y-2">
        <li>
          <strong>Role:</strong> {accountStatus.role}
        </li>
        <li>
          <strong>Login Attempts:</strong> {accountStatus.loginAttempts}
        </li>
        <li>
          <strong>Account Locked:</strong>{" "}
          {accountStatus.isLocked ? "Yes" : "No"}
        </li>
        {accountStatus.unlockTime && (
          <li>
            <strong>Unlock Time:</strong> {accountStatus.unlockTime}
          </li>
        )}
      </ul>
    </div>
  );
}
