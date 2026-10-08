import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import ClientProviders from "./ClientProviders";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ErrorBoundary";
import { baseMetadata } from "@/utils/baseMetadata";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });

export const metadata = baseMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <html lang="en" className={inter.variable} suppressHydrationWarning> */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>

      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 antialiased">
        <ClientProviders>
          <ErrorBoundary>
            {children}
            <div id="__portal-root" />
          </ErrorBoundary>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ClientProviders>
      </body>
    </html>
  );
}
