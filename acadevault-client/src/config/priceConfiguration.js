export const WORDS_PER_PAGE = 275; // Standard word count per page

// Pricing units for each material type
export const PRICING_UNITS = {
  Assignment: "page",
  ExamToken: "unit",
  PastQuestion: "set",
  Handout: "page",
  Seminar: "session",
  LectureNotes: "page",
  Flashcards: "set",
  Essay: "page",
  TermPaper: "page",
  CaseStudy: "page",
  Proposal: "page",
  Presentation: "deck",
  Certification: "unit",
  ProjectReport: "page",
  Journal: "page",
  ResearchPaper: "page",
  Thesis: "page",
  Dissertation: "page",
  BusinessPlan: "page",
  Dataset: "dataset",
  Ebook: "unit",
  VideoTutorial: "hour",
  Audio: "hour",
  OnlineCourse: "course",
  Webinar: "event",
  Software: "license",
  SourceCode: "project",
  Book: "unit",
  LabManual: "unit",
  Poster: "unit",
  StudyKit: "unit",
  PrintedMap: "unit",
};

// Base rates per specified unit in local currencies for weak economies, USD for stable economies
// Base rates per specified unit in multiple currencies
export const BASE_RATES = {
  Assignment: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  ExamToken: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  PastQuestion: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  Handout: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  Seminar: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  LectureNotes: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  Flashcards: { USD: 6, NGN: 450, GHS: 40, XAF: 3600, KES: 750 }, // Tier 1
  Essay: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  TermPaper: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  CaseStudy: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  Proposal: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  Presentation: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  Certification: { USD: 8, NGN: 550, GHS: 50, XAF: 4800, KES: 1000 }, // Tier 2
  ProjectReport: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  Journal: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  ResearchPaper: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  Thesis: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  Dissertation: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  BusinessPlan: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  Dataset: { USD: 10, NGN: 650, GHS: 60, XAF: 6000, KES: 1250 }, // Tier 3
  Ebook: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  VideoTutorial: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  Audio: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  OnlineCourse: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  Webinar: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  Software: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  SourceCode: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  Book: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  LabManual: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  Poster: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  StudyKit: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
  PrintedMap: { USD: 15, NGN: 1100, GHS: 100, XAF: 9000, KES: 2000 }, // Tier 4
};

// Material tiers for add-ons and urgency multipliers
export const MATERIAL_TIERS = {
  Assignment: "Tier1",
  ExamToken: "Tier1",
  PastQuestion: "Tier1",
  Handout: "Tier1",
  Seminar: "Tier1",
  LectureNotes: "Tier1",
  Flashcards: "Tier1",

  Essay: "Tier2",
  TermPaper: "Tier2",
  CaseStudy: "Tier2",
  Proposal: "Tier2",
  Presentation: "Tier2",
  Certification: "Tier2",
  ProjectReport: "Tier3",
  Journal: "Tier3",
  ResearchPaper: "Tier3",
  Thesis: "Tier3",
  Dissertation: "Tier3",
  BusinessPlan: "Tier3",
  Dataset: "Tier3",
  Ebook: "Tier4",
  VideoTutorial: "Tier4",
  Audio: "Tier4",
  OnlineCourse: "Tier4",
  Webinar: "Tier4",
  Software: "Tier4",
  SourceCode: "Tier4",
  Book: "Tier4",
  LabManual: "Tier4",
  Poster: "Tier4",
  StudyKit: "Tier4",
  PrintedMap: "Tier4",
};

// Academic level multipliers
export const academicLevelRates = {
  ond: 1.0,
  hnd: 1.05,
  bsc: 1.1,
  pgd: 1.15,
  masters: 1.2,
  phd: 1.3,
};

// Urgency multipliers (immediate is tier-dependent)
// Urgency multipliers per tier
export const urgencyMultipliers = {
  flexible: 1.0,            // > 72 hours
  standard: 1.1,            // 24 – 72 hours
  rush: 1.3,                // 12 – 24 hours
  immediate: {              // < 12 hours, tier‑specific premium
    Tier1: 1.5,
    Tier2: 1.6,
    Tier3: 1.8,
    Tier4: 2.0,
  },
};

// Writer tier multipliers
export const writerTiers = {
  standard: 1.0,
  expert: 1.1,
  premium: 1.25,
};

// Tiered add-ons with multi-currency pricing (adjusted for real-world rates)
export const AVAILABLE_ADDONS = {
  Tier1: [
    {
      id: "plagiarismReport",
      label: "Plagiarism Report",
      price: { USD: 10, NGN: 1500, GHS: 133.33, XAF: 12000, KES: 1250 },
    },
    {
      id: "consultation",
      label: "Consultation Session",
      price: { USD: 12, NGN: 1800, GHS: 160, XAF: 14400, KES: 1500 },
    },
    {
      id: "proofreading",
      label: "Proofreading & Language Enhancement",
      price: { USD: 18, NGN: 2700, GHS: 240, XAF: 21600, KES: 2250 },
    },
    {
      id: "formatting",
      label: "Formatting & Styling Package",
      price: { USD: 15, NGN: 2250, GHS: 200, XAF: 18000, KES: 2000 },
    },
  ],
  Tier2: [
    {
      id: "plagiarismReport",
      label: "Plagiarism Report",
      price: { USD: 20, NGN: 3000, GHS: 266.67, XAF: 24000, KES: 2500 },
    },
    {
      id: "consultation",
      label: "Consultation Session",
      price: { USD: 22, NGN: 3300, GHS: 293.33, XAF: 26400, KES: 2750 },
    },
    {
      id: "slides",
      label: "Presentation Slides",
      price: { USD: 40, NGN: 6000, GHS: 533.33, XAF: 48000, KES: 5000 },
    },
    {
      id: "expedited",
      label: "Expedited Turnaround",
      price: { USD: 30, NGN: 4500, GHS: 400, XAF: 36000, KES: 3750 },
    },
    {
      id: "citationManagement",
      label: "Reference & Citation Management",
      price: { USD: 25, NGN: 3750, GHS: 333.33, XAF: 30000, KES: 3125 },
    },
  ],
  Tier3: [
    {
      id: "plagiarismReport",
      label: "Plagiarism Report",
      price: { USD: 30, NGN: 4500, GHS: 400, XAF: 36000, KES: 3750 },
    },
    {
      id: "consultation",
      label: "Consultation Session",
      price: { USD: 35, NGN: 5250, GHS: 466.67, XAF: 42000, KES: 4375 },
    },
    {
      id: "slides",
      label: "Presentation Slides",
      price: { USD: 45, NGN: 6750, GHS: 600, XAF: 54000, KES: 5625 },
    },
    {
      id: "dataAnalysis",
      label: "Data Analysis Report",
      price: { USD: 50, NGN: 7500, GHS: 666.67, XAF: 60000, KES: 6250 },
    },
    {
      id: "infographics",
      label: "Custom Infographics & Charts",
      price: { USD: 55, NGN: 8250, GHS: 733.33, XAF: 66000, KES: 6875 },
    },
    {
      id: "unlimitedRevisions",
      label: "Unlimited Revisions (2 weeks)",
      price: { USD: 28, NGN: 4200, GHS: 373.33, XAF: 33600, KES: 4375 },
    },
  ],
  Tier4: [
    {
      id: "plagiarismReport",
      label: "Plagiarism Report",
      price: { USD: 45, NGN: 6750, GHS: 600, XAF: 54000, KES: 5625 },
    },
    {
      id: "consultation",
      label: "Consultation Session",
      price: { USD: 50, NGN: 7500, GHS: 666.67, XAF: 60000, KES: 6250 },
    },
    {
      id: "slides",
      label: "Presentation Slides",
      price: { USD: 60, NGN: 9000, GHS: 800, XAF: 72000, KES: 7500 },
    },
    {
      id: "transcription",
      label: "Transcription Service",
      price: { USD: 55, NGN: 8250, GHS: 733.33, XAF: 66000, KES: 6875 },
    },
    {
      id: "hosting",
      label: "Course Hosting & LMS Setup",
      price: { USD: 70, NGN: 10500, GHS: 933.33, XAF: 84000, KES: 8750 },
    },
    {
      id: "customization",
      label: "Software Customization",
      price: { USD: 80, NGN: 12000, GHS: 1066.67, XAF: 96000, KES: 10000 },
    },
    {
      id: "editing",
      label: "Content Editing & Proofread",
      price: { USD: 25, NGN: 3750, GHS: 333.33, XAF: 30000, KES: 3125 },
    },
    {
      id: "researchHour",
      label: "Research Consultation Hour (Live)",
      price: { USD: 65, NGN: 9750, GHS: 773.33, XAF: 69600, KES: 8125 },
    },
    {
      id: "turnitinGuarantee",
      label: "Turnitin® Similarity Guarantee",
      price: { USD: 35, NGN: 5250, GHS: 426.67, XAF: 38400, KES: 4375 },
    },
  ],
};

// Promo codes with currency eligibility (unchanged)
export const validPromoCodes = {
  SAVE10: {
    discount: 10,
    eligibleCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
  },
  FIRSTORDER: { discount: 15, eligibleCurrencies: ["all"] },
  AFRICA10: {
    discount: 10,
    eligibleCurrencies: [
      "NGN",
      "GHS",
      "XAF",
      "XOF",
      "KES",
      "ETB",
      "ZAR",
      "SLE",
      "GNF",
      "UGX",
      "RWF",
      "AOA",
      "STN",
      "MWK",
    ],
  },
};

// export const validPromoCodes = {
//   SAVE10: {
//     discount: 10,
//     eligibleCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
//     minOrder: {
//       stable: 50, // $50 USD for international currencies
//       unstable: {
//         NGN: 50000, // ₦50,000 for Nigeria
//         GHS: 600, // ₠600 for Ghana
//         XAF: 30000, // CFA 30,000 for Central Africa
//         XOF: 30000, // CFA 30,000 for West Africa
//         KES: 6500, // KSh 6,500 for Kenya
//         ETB: 3000, // Br 3,000 for Ethiopia
//         ZAR: 900, // R 900 for South Africa
//         SLE: 1000000, // Le 1,000,000 for Sierra Leone
//         GNF: 450000, // FG 450,000 for Guinea
//         UGX: 180000, // USh 180,000 for Uganda
//         RWF: 70000, // RF 70,000 for Rwanda
//         AOA: 45000, // Kz 45,000 for Angola
//         STN: 1100000, // Db 1,100,000 for São Tomé and Príncipe
//         MWK: 85000, // MK 85,000 for Malawi
//       },
//     },
//     message: "Save 10% on orders over the minimum amount!",
//   },
//   FIRSTORDER: {
//     discount: 15,
//     eligibleCurrencies: ["all"],
//     minOrder: {
//       stable: 50, // $50 USD for international currencies
//       unstable: {
//         NGN: 50000,
//         GHS: 600,
//         XAF: 30000,
//         XOF: 30000,
//         KES: 6500,
//         ETB: 3000,
//         ZAR: 900,
//         SLE: 1000000,
//         GNF: 450000,
//         UGX: 180000,
//         RWF: 70000,
//         AOA: 45000,
//         STN: 1100000,
//         MWK: 85000,
//       },
//     },
//     message: "Save 15% on your first order over the minimum amount!",
//   },
//   AFRICA10: {
//     discount: 10,
//     eligibleCurrencies: [
//       "NGN",
//       "GHS",
//       "XAF",
//       "XOF",
//       "KES",
//       "ETB",
//       "ZAR",
//       "SLE",
//       "GNF",
//       "UGX",
//       "RWF",
//       "AOA",
//       "STN",
//       "MWK",
//     ],
//     minOrder: {
//       stable: 50, // $50 USD for international currencies (though unlikely to apply)
//       unstable: {
//         NGN: 50000,
//         GHS: 600,
//         XAF: 30000,
//         XOF: 30000,
//         KES: 6500,
//         ETB: 3000,
//         ZAR: 900,
//         SLE: 1000000,
//         GNF: 450000,
//         UGX: 180000,
//         RWF: 70000,
//         AOA: 45000,
//         STN: 1100000,
//         MWK: 85000,
//       },
//     },
//     message: "Save 10% on orders over the minimum amount!",
//   },
// };
