import React from "react";
import { cn } from "@/utils/cn";

const Container = React.forwardRef(
  (
    {
      as: Component = "div",
      variant = "default", // 'default' | 'responsive' | 'fluid'
      section = false,
      background = "", // e.g. "gray-50", "white", "blue-100"
      padded = false,
      fullHeight = false,
      centerContent = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const basePadding = padded ? "pt-10 pb-16" : "";

    const layoutClass =
      variant === "fluid"
        ? padded
          ? "w-full px-4 sm:px-6 lg:px-8"
          : "w-full"
        : variant === "responsive"
        ? "mx-auto w-full max-w-screen-lg px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16"
        : "mx-auto w-full max-w-7xl px-2 sm:px-4";

    return (
      <Component
        ref={ref}
        className={cn(
          section && "",
          background && `bg-${background}`,
          layoutClass,
          fullHeight && "min-h-[calc(100vh-160px)]",
          centerContent && "flex flex-col justify-center",
          basePadding,
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export default Container;

// 🧪 Usage Examples

{
  /* <Container>
  <h1>Default container</h1>
</Container>

<Container variant="responsive">
  <p>This container adapts padding & max-width per screen size</p>
</Container>

<Container variant="fluid" padded={false}>
  <div className="bg-blue-200 p-4">Fluid edge-to-edge with no padding</div>
</Container>

<Container
  variant="default"
  section
  background="gray-50"
  centerContent
  fullHeight
>
  <h2 className="text-center text-2xl">Hero Section</h2>
</Container> */
}
