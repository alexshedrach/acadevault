"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import { SidebarProvider } from "@/contexts/SidebarContext";

export default function DashboardLayoutClient({ children }) {
  const { user, isRedirecting, hasInitialized } = useRequireAuth({
    redirectTo: "/login",
  });

  if (!hasInitialized || isRedirecting) {
    return <DashboardSkeleton />;
  }

  return (
    <SidebarProvider>
      <div
        className="dashboard-layout flex h-screen bg-gray-50 overflow-hidden"
        id="dashboard-layout"
      >
        {/* === Sidebar === */}
        <aside
          className="w-64 shrink-0 h-full bg-gradient-to-b from-blue-100 via-purple-100 to-white border-r border-purple-200 shadow-xl backdrop-blur-sm"
          role="complementary"
          aria-label="Dashboard Navigation Sidebar"
        >
          <Sidebar role={user?.role} />
        </aside>
        {/* === Main Dashboard Area === */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* === Topbar === */}
          <header
            className="sticky top-0 z-50 bg-gradient-to-r from-blue-200 to-purple-200 shadow-sm border-b border-blue-100 backdrop-blur-md px-6 py-2"
            role="banner"
          >
            <Topbar />
          </header>

          {/* === Main Content Area === */}

          <div
            role="main"
            id="dashboard-main-content"
            aria-labelledby="dashboard-content-heading"
            className="flex-1 p-6 overflow-y-auto"
          >
            {children}
          </div>

          {/* === Optional Footer (for stats, links, etc.) === */}
          <footer className="w-full px-4 py-6 md:py-4 bg-gradient-to-t from-white via-purple-100 to-blue-50 border-t border-purple-200 shadow-inner backdrop-blur-md text-sm text-blue-900">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Branding or Copyright */}
              <div className="text-center md:text-left">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold">AcadeVault</span>. All rights
                reserved.
              </div>

              {/* Optional Footer Links */}
              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-blue-800 text-xs font-medium">
                <a
                  href="/terms"
                  className="hover:underline hover:text-blue-900 transition"
                >
                  Terms
                </a>
                <a
                  href="/privacy"
                  className="hover:underline hover:text-blue-900 transition"
                >
                  Privacy
                </a>
                <a
                  href="/support"
                  className="hover:underline hover:text-blue-900 transition"
                >
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
