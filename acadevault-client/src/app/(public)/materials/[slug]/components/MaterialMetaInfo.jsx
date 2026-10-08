import React, { useMemo } from "react";
import {
  BookOpenIcon,
  GraduationCapIcon,
  LayoutTemplateIcon,
  LayersIcon,
  TruckIcon,
  CheckCircleIcon,
  FileIcon,
  InfoIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tooltip from "@/components/ui/Tooltip"; // Robust Tooltip
import { Badge } from "@/components/ui/Badge"; // Badge component

/**
 * MaterialMetaInfo
 *
 * Displays metadata about an academic material.
 */
export const MaterialMetaInfo = React.memo(({ material }) => {
  const {
    materialType = "Material",
    academicLevel = "Unknown Level",
    academicDegree = "N/A",
    department,
    digitalContent,
  } = material || {};

  const departmentName = department?.name || "Unknown Department";
  const pageCount = Number(digitalContent?.pageCount) || 0;

  // Estimated reading time (2 min per page)
  const estimatedReadingTime = useMemo(() => {
    return pageCount > 0 ? `${Math.round(pageCount * 2)} min read` : "N/A";
  }, [pageCount]);

  // Usage rights summary
  const rightsSummary = useMemo(() => {
    const rights = digitalContent?.usageRights || {};
    const flags = [
      rights.canBeDownloaded && "Downloadable",
      rights.canBePrinted && "Printable",
      !rights.canBeModified && "View Only",
    ].filter(Boolean);
    return flags.join(" • ") || "Standard access";
  }, [digitalContent]);

  return (
    <fieldset
      className="mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
      aria-labelledby="meta-info-legend"
    >
      {/* Legend / Heading */}
      <legend
        id="meta-info-legend"
        className="flex items-center gap-2 text-lg font-semibold text-gray-900"
      >
        <BookOpenIcon className="w-5 h-5 text-blue-600" aria-hidden />
        This {materialType} Includes:
      </legend>

      {/* Grid of meta items */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        {/* Type */}
        <MetaItem
          icon={<BookOpenIcon className="w-4 h-4" aria-hidden />}
          label={`Type: ${materialType}`}
        />

        {/* Level & Degree */}
        <MetaItem
          icon={<GraduationCapIcon className="w-4 h-4" aria-hidden />}
          label={`Level: ${academicDegree} – ${academicLevel}`}
        />

        {/* Department */}
        <MetaItem
          icon={<LayersIcon className="w-4 h-4" aria-hidden />}
          label={`Department: ${departmentName}`}
        />

        {/* Page count & reading time */}
        <MetaItem
          icon={<LayoutTemplateIcon className="w-4 h-4" aria-hidden />}
          label={`Page Count: ${pageCount || "N/A"} (${estimatedReadingTime})`}
        />

        {/* Access method with Tooltip */}
        <MetaItem
          icon={<TruckIcon className="w-4 h-4" aria-hidden />}
          label={
            <>
              Access: Instant digital download{" "}
              <Badge variant="info">Instant</Badge>
              <Tooltip
                content="You’ll get access immediately after payment."
                placement="right"
                delayShow={200}
                ariaLabel="Instant access information"
              >
                <InfoIcon className="ml-1 w-4 h-4 text-gray-400" />
              </Tooltip>
            </>
          }
        />

        {/* Coverage */}
        <MetaItem
          icon={<LayersIcon className="w-4 h-4" aria-hidden />}
          label="Coverage: Introduction through References"
        />

        {/* Quality assurance with Badge */}
        <MetaItem
          icon={<CheckCircleIcon className="w-4 h-4" aria-hidden />}
          label={
            <>
              Quality: Supervisor Approved{" "}
              <Badge variant="success">Verified</Badge>
            </>
          }
        />

        {/* Usage rights with Tooltip */}
        <MetaItem
          icon={<FileIcon className="w-4 h-4" aria-hidden />}
          label={
            <>
              Rights: {rightsSummary}{" "}
              <Tooltip
                content="Determines your download, print, and modify permissions."
                placement="top"
                delayShow={200}
                ariaLabel="Usage rights information"
              >
                <span className="ml-1 text-gray-400">
                  <InfoIcon className="w-4 h-4" aria-hidden />
                </span>
              </Tooltip>
            </>
          }
        />
      </div>
    </fieldset>
  );
});

export default MaterialMetaInfo;

/** ─── Sub-component ───────────────────────────────────────────────────────── */

const MetaItem = ({ icon, label }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-blue-50 rounded-md text-blue-600">{icon}</div>
    <div className="leading-snug">{label}</div>
  </div>
);
