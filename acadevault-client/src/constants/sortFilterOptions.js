export const MATERIAL_SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
  { value: "-views", label: "Most Viewed" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-averageRating", label: "Top Rated" },
];

export const DEPARTMENT_SORT_OPTIONS = [
  { value: "name", label: "Alphabetically (A-Z)" },
  { value: "-name", label: "Alphabetically (Z-A)" },
  { value: "-createdAt", label: "Recently Added" },
  { value: "createdAt", label: "Oldest First" },
];

export const MATERIAL_TYPE_FILTERS = [
  { value: "Project Report", label: "Project Reports" },
  { value: "Past Questions", label: "Past Questions" },
  { value: "Assignment", label: "Assignments" },
];
