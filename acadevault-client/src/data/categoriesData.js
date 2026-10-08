export const categories = [
  {
    name: "General Navigation",
    icon: "🌐",
    subCategories: {
      "Quick Access": [
        { name: "Home", path: "/" },
        { name: "Hire A Writer", path: "/hire-writer" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Payments & Pricing", path: "/payment" },
        { name: "FAQs", path: "/faqs" },
        { name: "Downloads", path: "/downloads" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Discounts & Offers", path: "/materials/deals" },
        { name: "Academic Blogs", path: "/blogs" },
        { name: "Referral Program", path: "/refer-and-earn" },
        { name: "Affiliate Program", path: "/affiliate" },
      ],

      "Academic Assistance": [
        {
          name: "Plagiarism Checking",
          path: "/academic-assistance/plagiarism-check",
        },
        {
          name: "Editing/Proofreading",
          path: "/academic-assistance/editing-proofreading",
        },
        {
          name: "Citation/Referencing",
          path: "/academic-assistance/citation-referencing",
        },
        {
          name: "Research Assistance",
          path: "/academic-assistance/research-assistance",
        },
        {
          name: "Discussion Forums",
          path: "/academic-assistance/discussion-forums",
        },
        {
          name: "Live Q&A Sessions",
          path: "/academic-assistance/live-q-and-a",
        },
      ],

      "Help & Support": [
        { name: "Report an Issue", path: "/report-issue" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ],
    },
  },
  {
    name: "Academic Disciplines",
    icon: "📚",
    subCategories: {},
    isDynamic: true,
  },
  {
    name: "Academic Levels",
    icon: "🎓",
    subCategories: {},
    isDynamic: true,
  },
  {
    name: "Departments",
    icon: "🏛️",
    path: "/departments",
  },
  {
    name: "Project Topics",
    icon: "📑",
    path: "/materials/category/project-report",
  },
  {
    name: "Journals",
    icon: "💾",
    path: "/materials/category/journals",
  },
  {
    name: "Assignments",
    icon: "📝",
    path: "/materials/category/assignments",
  },
  {
    name: "Past Questions",
    icon: "📜",
    path: "/materials/category/past-questions",
  },
  {
    name: "Exam Token & Pin",
    icon: "📜",
    path: "/materials/category/exam-token-pin",
  },
  {
    name: "E-Learning & Tutorials",
    icon: "🖥️",
    subCategories: {
      "Programming & IT": [
        "Web Development",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
      ],
      "Business & Finance": ["Marketing", "Accounting", "Entrepreneurship"],
      "Creative Arts": ["Graphic Design", "Photography", "Animation"],
    },
  },
  {
    name: "Other Categories",
    icon: "➕",
    subCategories: {},
    isDynamic: true,
  },
];
