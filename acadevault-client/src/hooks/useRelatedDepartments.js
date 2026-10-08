import { fetchRelatedDepartments } from "@/lib/categories/fetchRelatedDepartments";
import { useEffect, useState } from "react";

export function useRelatedDepartments(currentDepartmentId) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentDepartmentId) return;

    async function loadRelated() {
      try {
        setLoading(true);
        const departments = await fetchRelatedDepartments(currentDepartmentId);
        setRelated(departments);
        setError(null);
      } catch (err) {
        console.error("Error fetching related departments:", err);
        setError(err.message || "Failed to load related departments.");
      } finally {
        setLoading(false);
      }
    }

    loadRelated();
  }, [currentDepartmentId]);

  return { related, loading, error };
}
