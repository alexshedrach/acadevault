export function getFileDescription(materialType) {
  switch (materialType.toLowerCase()) {
    case "lecture notes":
      return "annotated slides, lecture outlines, or instructor commentary";
    case "past questions":
    case "exam questions":
      return "previous exam papers, question banks, and model answers";
    case "course summary":
    case "revision guide":
      return "condensed notes, key concepts, or exam-ready overviews";
    case "textbook":
      return "sample chapters, practice exercises, or reference sections";
    case "project report":
    case "research paper":
    case "journal article":
    case "thesis":
    case "dissertation":
    case "business plan":
    case "feasibility study":
      return "abstract, table of contents, or introduction chapter";
    case "assignment":
      return "assignment brief, sample response, or grading rubric";
    case "lab report":
      return "experiment overview, raw data excerpts, or observation summaries";
    case "case study":
      return "real-world scenario overview, analysis framework, or introduction";
    default:
      return "supporting documents, academic references, or course-related previews";
  }
}
