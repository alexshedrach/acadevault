export const isBestsellerMaterial = ({
  averageRating,
  totalRatings,
  totalStudents,
}) => totalStudents >= 1000 && totalRatings >= 50 && averageRating >= 4.5;

export const isTopRatedMaterial = ({ averageRating, totalRatings }) =>
  totalRatings >= 15 && averageRating >= 4.8;

export const isFeaturedMaterial = ({ tags, isFeatured }) =>
  tags?.includes("featured") || isFeatured === true;

export const getMaterialHighlightTag = (material) => {
  const averageRating = material.rating?.average ?? 4.7;
  const totalRatings = material.rating?.count ?? 222709;
  const totalStudents = material?.studentsEnrolled ?? 983836;

  const { tags, isFeatured } = material;

  if (isFeaturedMaterial({ tags, isFeatured })) {
    return { label: "Featured", color: "indigo" };
  }

  if (isBestsellerMaterial({ averageRating, totalRatings, totalStudents })) {
    return { label: "Bestseller", color: "green" };
  }

  if (isTopRatedMaterial({ averageRating, totalRatings })) {
    return { label: "Top Rated", color: "purple" };
  }

  return null;
};
