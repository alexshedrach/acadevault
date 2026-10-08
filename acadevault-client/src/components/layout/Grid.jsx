import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

/**
 * ────────────────────────────────────────────────────────────────────────────
 * Grid
 *
 * A highly flexible, responsive CSS grid component supporting:
 *  - Configurable column counts at breakpoints (cols, colsSm, colsMd, colsLg, colsXl)
 *  - Configurable row counts at breakpoints (rows, rowsSm, rowsMd, rowsLg, rowsXl)
 *  - Gap utilities (gap, gapX, gapY)
 *  - Alignment utilities (items, justify)
 *  - Auto-sizing utilities (autoRows, autoCols)
 *  - Custom HTML element via "as"
 *  - Additional Tailwind classes via "className"
 *
 * Usage:
 * <Grid
 *   as="ul"
 *   role="list"
 *   cols={1}
 *   colsSm={2}
 *   colsMd={3}
 *   colsLg={4}
 *   gap="gap-6"
 *   gapX="gap-x-4"
 *   gapY="gap-y-8"
 *   items="items-start"
 *   justify="justify-center"
 *   rows={null}
 *   autoRows="auto-rows-min"
 *   autoCols=""
 *   className="bg-gray-50 p-4"
 * >
 *   <GridItem key="1" colSpan={2}>
 *     <SomeCard />
 *   </GridItem>
 *   <GridItem key="2">
 *     <OtherCard />
 *   </GridItem>
 *   ...
 * </Grid>
 *
 * ────────────────────────────────────────────────────────────────────────────
 */
export const Grid = React.forwardRef(
  (
    {
      as: Component = "div",
      cols = 1,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      rows,
      rowsSm,
      rowsMd,
      rowsLg,
      rowsXl,
      gap = "gap-6",
      gapX,
      gapY,
      items,
      justify,
      autoRows,
      autoCols,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // Column classes
    const baseCols = `grid-cols-${cols}`;
    const smCols = colsSm ? `sm:grid-cols-${colsSm}` : "";
    const mdCols = colsMd ? `md:grid-cols-${colsMd}` : "";
    const lgCols = colsLg ? `lg:grid-cols-${colsLg}` : "";
    const xlCols = colsXl ? `xl:grid-cols-${colsXl}` : "";

    // Row classes
    const baseRows = rows ? `grid-rows-${rows}` : "";
    const smRows = rowsSm ? `sm:grid-rows-${rowsSm}` : "";
    const mdRows = rowsMd ? `md:grid-rows-${rowsMd}` : "";
    const lgRows = rowsLg ? `lg:grid-rows-${rowsLg}` : "";
    const xlRows = rowsXl ? `xl:grid-rows-${rowsXl}` : "";

    // Gap classes
    const gapCls = gap || "";
    const gapXCls = gapX || "";
    const gapYCls = gapY || "";

    // Alignment
    const itemsCls = items || "";
    const justifyCls = justify || "";

    // Auto-sizing
    const autoRowsCls = autoRows || "";
    const autoColsCls = autoCols || "";

    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          // Columns
          baseCols,
          smCols,
          mdCols,
          lgCols,
          xlCols,
          // Rows
          baseRows,
          smRows,
          mdRows,
          lgRows,
          xlRows,
          // Gaps
          gapCls,
          gapXCls,
          gapYCls,
          // Alignment
          itemsCls,
          justifyCls,
          // Auto-sizing
          autoRowsCls,
          autoColsCls,
          // Extra classes
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";

Grid.propTypes = {
  as: PropTypes.elementType,
  cols: PropTypes.number,
  colsSm: PropTypes.number,
  colsMd: PropTypes.number,
  colsLg: PropTypes.number,
  colsXl: PropTypes.number,

  rows: PropTypes.number,
  rowsSm: PropTypes.number,
  rowsMd: PropTypes.number,
  rowsLg: PropTypes.number,
  rowsXl: PropTypes.number,

  gap: PropTypes.string,
  gapX: PropTypes.string,
  gapY: PropTypes.string,

  items: PropTypes.string,
  justify: PropTypes.string,
  autoRows: PropTypes.string,
  autoCols: PropTypes.string,

  className: PropTypes.string,
  children: PropTypes.node,
};

Grid.defaultProps = {
  as: "div",
  cols: 1,
  colsSm: undefined,
  colsMd: undefined,
  colsLg: undefined,
  colsXl: undefined,

  rows: undefined,
  rowsSm: undefined,
  rowsMd: undefined,
  rowsLg: undefined,
  rowsXl: undefined,

  gap: "gap-6",
  gapX: "",
  gapY: "",

  items: "",
  justify: "",
  autoRows: "",
  autoCols: "",

  className: "",
  children: null,
};

