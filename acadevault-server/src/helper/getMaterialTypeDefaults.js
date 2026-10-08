// Helper function to get material type defaults from a static source
function getMaterialTypeDefaults(materialType) {
  // Predefined set of default values per material type
  const defaults = {
    project_report: { minLimit: 10, maxLimit: 1000 },
    epins: { minLimit: 5, maxLimit: 500 },
    journal: { minLimit: 20, maxLimit: 2000 },
    research_paper: { minLimit: 15, maxLimit: 1500 },
    thesis: { minLimit: 50, maxLimit: 3000 },
    dissertation: { minLimit: 50, maxLimit: 3000 },
    case_study: { minLimit: 10, maxLimit: 500 },
    business_plan: { minLimit: 30, maxLimit: 1000 },
    proposal: { minLimit: 10, maxLimit: 500 },
    term_paper: { minLimit: 5, maxLimit: 300 },
    assignment: { minLimit: 5, maxLimit: 100 },
    past_question: { minLimit: 5, maxLimit: 500 },
    lecture_notes: { minLimit: 5, maxLimit: 500 },
    seminar: { minLimit: 10, maxLimit: 1000 },
    ebook: { minLimit: 5, maxLimit: 1000 },
    tutorial: { minLimit: 10, maxLimit: 1000 },
    audio: { minLimit: 5, maxLimit: 500 },
    course: { minLimit: 20, maxLimit: 1500 },
    webinar: { minLimit: 20, maxLimit: 1500 },
    dataset: { minLimit: 10, maxLimit: 1000 },
    software: { minLimit: 50, maxLimit: 3000 },
    source_code: { minLimit: 30, maxLimit: 2000 },
    presentation: { minLimit: 10, maxLimit: 1000 },
    certification: { minLimit: 5, maxLimit: 200 },
    infographic: { minLimit: 10, maxLimit: 500 },
  };

  // Return the defaults based on materialType, or an empty object if not found
  return defaults[materialType] || {};
}


export default getMaterialTypeDefaults;
