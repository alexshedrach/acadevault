import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSoftDeleteCategoryMutation,
} from "@/features/category/categoryApi";

export const useCategoryMutations = () => {
  const [createCategory, createMeta] = useCreateCategoryMutation();
  const [updateCategory, updateMeta] = useUpdateCategoryMutation();
  const [deleteCategory, deleteMeta] = useDeleteCategoryMutation();
  const [softDeleteCategory, softDeleteMeta] = useSoftDeleteCategoryMutation();

  return {
    // ─── Actions ───
    createCategory,
    updateCategory,
    deleteCategory,
    softDeleteCategory,

    // ─── Loading States ───
    isCreating: createMeta.isLoading,
    isUpdating: updateMeta.isLoading,
    isDeleting: deleteMeta.isLoading,
    isSoftDeleting: softDeleteMeta.isLoading,

    // ─── Success ───
    isSuccess: {
      create: createMeta.isSuccess,
      update: updateMeta.isSuccess,
      delete: deleteMeta.isSuccess,
      softDelete: softDeleteMeta.isSuccess,
    },

    // ─── Errors ───
    errors: {
      createError: createMeta.error,
      updateError: updateMeta.error,
      deleteError: deleteMeta.error,
      softDeleteError: softDeleteMeta.error,
    },
  };
};
