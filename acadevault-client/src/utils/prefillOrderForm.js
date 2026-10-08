import { addDays } from "date-fns";
import { WORDS_PER_PAGE } from "@/config/priceConfiguration";

export function prefillOrderForm({
  mode,
  planSlug,
  writerId,
  currency,
  allPlans = [],
  writers = [],
  setValue,
  getValues,
}) {
  // console.log("Prefilling with:", { mode, planSlug, writerId });
  setValue("currency", currency, { shouldValidate: false });

  if (mode === "plan" && planSlug && allPlans.length > 0) {
    const plan = allPlans.find((p) => p.slug === planSlug);
    if (!plan) {
      // console.warn("prefillOrderForm: plan not found", planSlug);
      return;
    }

    const {
      price = {},
      pageLength = "",
      deliveryTime = "",
      references = "",
      features = [],
      disclaimers = [],
      documentFormat = "",
      contentNature = [],
      plagiarismLevel = "",
    } = plan;

    // Parse pageLength for page count (e.g., "~10–15 pages" or "~10 pages")
    const pgMatch = pageLength.match(/~(\d+)(?:–(\d+))?\s*pages/i);
    const pageEstimate = pgMatch
      ? pgMatch[2]
        ? Math.round((parseInt(pgMatch[1], 10) + parseInt(pgMatch[2], 10)) / 2)
        : parseInt(pgMatch[1], 10)
      : 1;

    // Calculate word count based on pageEstimate * WORDS_PER_PAGE
    const wordEstimate = pageEstimate * WORDS_PER_PAGE;

    // Parse deliveryTime for deadline (e.g., "5–7 business days")
    const dtMatch = deliveryTime.match(/(\d+)(?:–(\d+))?\s*business days/i);
    const days = dtMatch ? parseInt(dtMatch[2] || dtMatch[1], 10) : 7;
    const deadlineISO = addDays(new Date(), days).toISOString();

    // Parse references (e.g., "20–40 references, APA, MLA, Chicago, or Harvard")
    const refMatch = references.match(/(\d+)(?:–(\d+))?\s*references?/i);
    const refCount = refMatch ? parseInt(refMatch[2] || refMatch[1], 10) : 0;

    // Determine citation style
    const styleMatch = references.match(/APA|MLA|Chicago|Harvard|IEEE/i);
    const citationStyle = styleMatch ? styleMatch[0].toLowerCase() : "apa";

    // Derive academicType
    const projectType = contentNature[0]?.toLowerCase() || "proposal";

    // Set form values only if they differ to prevent unnecessary updates
    const currentValues = getValues();
    if (currentValues.plan !== planSlug) {
      setValue("plan", planSlug, { shouldValidate: true });
    }
    if (currentValues.unitType !== "pages") {
      setValue("unitType", "pages", { shouldValidate: true });
    }
    if (currentValues.unitCount !== pageEstimate) {
      setValue("unitCount", pageEstimate, { shouldValidate: true });
    }
    if (currentValues.wordCount !== wordEstimate) {
      setValue("wordCount", wordEstimate, { shouldValidate: true });
    }
    if (currentValues.deadline !== deadlineISO) {
      setValue("deadline", deadlineISO, { shouldValidate: true });
    }
    if (currentValues.referenceSources !== refCount) {
      setValue("referenceSources", refCount, { shouldValidate: true });
    }
    if (currentValues.academicFormat !== citationStyle) {
      setValue("academicFormat", citationStyle, { shouldValidate: true });
    }
    if (currentValues.academicType !== projectType) {
      setValue("academicType", projectType, { shouldValidate: true });
    }
    if (currentValues.plagiarismTolerance !== plagiarismLevel) {
      setValue("plagiarismTolerance", plagiarismLevel, {
        shouldValidate: true,
      });
    }
    if (JSON.stringify(currentValues.features) !== JSON.stringify(features)) {
      setValue("features", features, { shouldValidate: true });
    }
    if (
      JSON.stringify(currentValues.disclaimers) !== JSON.stringify(disclaimers)
    ) {
      setValue("disclaimers", disclaimers, { shouldValidate: true });
    }
    if (
      currentValues.documentFormat !==
      (documentFormat.split(" or ")[0]?.toLowerCase() || "")
    ) {
      setValue(
        "documentFormat",
        documentFormat.split(" or ")[0]?.toLowerCase() || "",
        {
          shouldValidate: true,
        }
      );
    }
  }

  if (mode === "writer" && writerId && writers.length > 0) {
    const writer = writers.find((w) => String(w.id) === String(writerId));
    if (!writer) {
      // console.warn("prefillOrderForm: writer not found", writerId);
      return;
    }

    const currentValues = getValues();
    if (currentValues.writerId !== writerId) {
      setValue("writerId", writerId, { shouldValidate: true });
    }
    if (currentValues.writerExpertise !== (writer.tier || "standard")) {
      setValue("writerExpertise", writer.tier || "standard", {
        shouldValidate: true,
      });
    }

    // Clear plan-specific fields
    if (currentValues.plan !== "") {
      setValue("plan", "", { shouldValidate: true });
    }
    if (JSON.stringify(currentValues.features) !== JSON.stringify([])) {
      setValue("features", [], { shouldValidate: true });
    }
    if (JSON.stringify(currentValues.disclaimers) !== JSON.stringify([])) {
      setValue("disclaimers", [], { shouldValidate: true });
    }
    if (currentValues.documentFormat !== "") {
      setValue("documentFormat", "", { shouldValidate: true });
    }
    if (currentValues.unitCount !== 0) {
      setValue("unitCount", 0, { shouldValidate: true });
    }
    if (currentValues.wordCount !== 0) {
      setValue("wordCount", 0, { shouldValidate: true });
    }
  }
}
