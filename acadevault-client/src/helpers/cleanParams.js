/**
 * Remove undefined/null/empty-string/empty-array keys
 */
export const cleanParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
};
