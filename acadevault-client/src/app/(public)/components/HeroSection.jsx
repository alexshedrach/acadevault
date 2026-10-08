"use client";

import Container from "../../../components/layout/Container";
import CategoryMenu from "../../../components/hero/CategoryMenu";
import PlatformHighlights from "../../../components/hero/PlatformHighlights";
import HeroSlider from "./HeroSlider";

const HeroSection = () => {
  return (
    <Container
      variant="default"
      // background='blue-100'
      section
      fullHeight
      centerContent
      className="relative w-full max-w-7xl mx-auto -my-3 z-10"
    >
      <>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_250px] gap-0 px-4 sm:px-6 lg:px-0 items-stretch">
          {/* Left Sidebar */}
          <aside className="hidden lg:block h-full" aria-label="Categories">
            <CategoryMenu />
          </aside>

          {/* Hero Content */}

          <HeroSlider />

          {/* Right Sidebar */}
          <aside
            className="hidden lg:block h-full"
            aria-label="Platform Highlights"
          >
            <PlatformHighlights />
          </aside>
        </div>
      </>
    </Container>
  );
};

export default HeroSection;
