/**
 * Maps a materialType string to the correct section heading and internal component.
 *
 * @param materialType   Raw type value from the API (e.g. "Course", "Research Paper")
 * @returns `{ section, component }`
 */
export function getMaterialSectionConfig(materialType) {
  const type = materialType?.trim().toLowerCase() ?? "";

  const map = [
    {
      keys: ["course", "ebook", "tutorial", "notes", "summary"],
      config: { section: "What You'll Learn", component: "learn" },
    },
    {
      keys: [
        "thesis",
        "dissertation",
        "research paper",
        "project report",
        "journal",
      ],
      config: { section: "Material Overview", component: "overview" },
    },
    {
      keys: ["business plan", "feasibility study"],
      config: { section: "Executive Summary", component: "overview" },
    },
    {
      keys: ["template", "form", "toolkit"],
      config: { section: "What's Included", component: "resources" },
    },
  ];

  for (const entry of map) {
    if (entry.keys.includes(type)) {
      return entry.config;
    }
  }

  // Fallback for unrecognized types
  return { section: "Highlights", component: "overview" };
}
