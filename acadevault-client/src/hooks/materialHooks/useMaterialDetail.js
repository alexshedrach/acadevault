import { useGetMaterialDetailsQuery } from "@/features/materials/academicMaterialsApi";

export const useMaterialDetail = (slug) => {
  const {
    data: materialDetail,
    error: materialDetailError,
    isLoading: materialDetailLoading,
    isFetching: isMaterialDetailFetching,
  } = useGetMaterialDetailsQuery(slug, { skip: !slug });

  return {
    materialDetail,
    materialDetailLoading,
    isMaterialDetailFetching,
    materialDetailError,
  };
};
