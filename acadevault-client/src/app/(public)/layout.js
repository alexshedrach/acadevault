import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { MotionMain } from "@/components/MotionMain";
import { cn } from "@/utils/cn";

export default function PublicPageLayout({ children }) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-cover bg-center bg-no-repeat",
        "bg-[url('/images/bg.jpg')]"
      )}
    >
      {/* Optional Overlay for readability */}
      <div className="absolute inset-0 backdrop-blur-sm z-0" />

      {/* Content Layer */}
      <div className="relative">
        <Header />

        <MotionMain
          id="main-content"
          role="main"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </MotionMain>

        <Footer />
      </div>
    </div>
  );
}
