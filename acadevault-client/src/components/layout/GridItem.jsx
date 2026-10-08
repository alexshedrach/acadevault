import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * ────────────────────────────────────────────────────────────────────────────
 * GridItem
 *
 * Helps position an individual grid cell, supporting:
 *  - colSpan, rowSpan (span across multiple columns/rows)
 *  - colStart, rowStart (start position)
 *  - Custom HTML element via "as"
 *  - Additional Tailwind classes via "className"
 *
 * Usage:
 * <GridItem colSpan={2} rowSpan={1} colStart={1} rowStart={2}>
 *   <SomeCard />
 * </GridItem>
 * ────────────────────────────────────────────────────────────────────────────
 */
export const GridItem = React.forwardRef(
  (
    {
      as: Component = "div",
      colSpan,
      rowSpan,
      colStart,
      rowStart,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const colSpanCls = colSpan ? `col-span-${colSpan}` : "";
    const rowSpanCls = rowSpan ? `row-span-${rowSpan}` : "";
    const colStartCls = colStart ? `col-start-${colStart}` : "";
    const rowStartCls = rowStart ? `row-start-${rowStart}` : "";

    return (
      <Component
        ref={ref}
        className={cn(
          colSpanCls,
          rowSpanCls,
          colStartCls,
          rowStartCls,
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

GridItem.displayName = "GridItem";

GridItem.propTypes = {
  as: PropTypes.elementType,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  colStart: PropTypes.number,
  rowStart: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

GridItem.defaultProps = {
  as: "div",
  colSpan: undefined,
  rowSpan: undefined,
  colStart: undefined,
  rowStart: undefined,
  className: "",
  children: null,
};
