"use client";

import NotificationsHeader from "./components/NotificationsHeader";
import NotificationSidebar from "./components/NotificationSidebar";
import NotificationsList from "./components/NotificationsList";

export default function NotificationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-screen bg-white">
      <NotificationSidebar />
      <div className="flex-1 space-y-8">
        <NotificationsHeader />
        <NotificationsList />
      </div>
    </main>
  );
}
