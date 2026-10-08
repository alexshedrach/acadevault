/**
 * @typedef {Object} DigitalContent
 * @property {number} [pageCount]
 * @property {number} [previewDuration]   Preview time in seconds or pages
 * @property {object} [usageRights]
 * @property {boolean} [usageRights.canBeDownloaded]
 * @property {string} [format]
 * @property {string} [language]
 * @property {string[]} [toolsUsed]
 * @property {string} [licenseType]
 *
 * @typedef {Object} Material
 * @property {string} [title]
 * @property {string[]} [tags]
 * @property {DigitalContent} [digitalContent]
 * @property {Array<any>} [previewFiles]
 */

/**
 * Generate a cleaned-up array of “key features” strings for the Overview panel.
 *
 * Production enhancements:
 *  - ✅ Type safety (TS annotations)
 *  - ✅ Null-safety & defaults
 *  - ✅ Intl formatting for counts/durations
 *  - ✅ Split static vs. dynamic entries
 *  - ✅ Ready for i18n/localization hooks
 *
 * @param {Material} material
 * @returns {string[]} filtered list of feature bullet points
 */
export function generateKeyFeatures(material) {
  // Destructure with sensible defaults
  const {
    title = "",
    tags = [],
    previewFiles = [],
    digitalContent: {
      pageCount,
      previewDuration,
      usageRights = {},
      format,
      language,
      toolsUsed = [],
      licenseType,
    } = {},
  } = material;

  // Intl formatters (modify locales as needed)
  const pageFormatter = new Intl.NumberFormat("en-US");
  const durationFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  // 1) Static, always-applicable features
  const staticFeatures = [
    "Peer-oriented academic content tailored for institutional standards",
    "Includes Introduction, Objectives, Methodology, Results, and Conclusion sections",
    "Follows structured academic writing conventions with logical flow and clear segmentation",
    "Supports direct submission or adaptation into dissertations, reports, or journal publications",
    "Ideal reference material for computer science, IT, and engineering domains",
    "Detailed software implementation using technologies like Python & MySQL",
    "Reusable diagrams, code snippets, and analysis for presentations and teaching",
    "Supports individual learning, institutional referencing, and team projects",
    "Rights-cleared for educational and non-commercial use",
    "Optimized for both academic assessment and portfolio demonstration",
    "Crafted with precision to meet institutional rubrics and real-world expectations",
  ];

  // 2) Dynamically-generated features
  const dynamicFeatures = [
    pageCount !== undefined &&
      `Spanning ~${pageFormatter.format(
        pageCount
      )} pages of structured academic insights`,
    previewDuration !== undefined &&
      `Preview access available for first ${durationFormatter.format(
        previewDuration
      )} units`,
    usageRights.canBeDownloaded &&
      "High-resolution content downloadable after purchase",
    format && `Available in ${format} format for flexible consumption`,
    language && `Written in ${language} for academic clarity`,
    toolsUsed.length > 0 &&
      `Built using: ${toolsUsed.map((t) => t.trim()).join(", ")}`,
    licenseType && `Distributed under a ${licenseType} license`,
    previewFiles.length > 0 &&
      "Includes visual snapshots and real previews for fast comprehension",
    title.trim() !== "" && `Based on the project: "${title.trim()}"`,
    tags.length > 0 &&
      `Key topics covered: ${tags
        .slice(0, 5)
        .map((t) => t.trim())
        .join(", ")}`,
  ];

  // 3) Filter out any `false` or empty strings, and return
  return [...staticFeatures, ...dynamicFeatures].filter((feat) =>
    Boolean(feat && feat.trim())
  );
}
