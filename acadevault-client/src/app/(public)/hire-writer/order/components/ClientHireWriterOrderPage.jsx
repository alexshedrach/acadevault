"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchWriters } from "@/lib/writers/fetchWriters";
import { fetchPricing } from "@/lib/writers/fetchPricing";

import OrderForm from "./OrderForm";
import Loader from "@/components/ui/Loader";
import { OrderHeader } from "./OrderHeader";

export default function ClientHireWriterOrderPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [writers, setWriters] = useState([]);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [writerError, setWriterError] = useState(null);
  const [planError, setPlanError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine inferred mode from URL query params
  const inferredMode = useMemo(() => {
    const hasWriter = !!searchParams.get("writerId");
    const hasPlan = !!searchParams.get("plan");
    return hasWriter ? "writer" : hasPlan ? "plan" : "plan";
  }, [searchParams]);

  useEffect(() => {
    const writerId = searchParams.get("writerId");
    const planSlug = searchParams.get("plan");

    console.log("ClientHireWriterOrderPage - searchParams:", {
      writerId,
      planSlug,
    });

    const loadData = async () => {
      try {
        // Fetch writers
        const writerData = await fetchWriters();
        const writerList = Array.isArray(writerData) ? writerData : [];
        setWriters(writerList);

        if (writerId) {
          const numericId = Number(writerId);
          const foundWriter = writerList.find((w) => w.id === numericId);
          if (foundWriter) {
            setSelectedWriter(foundWriter);
            console.log("Selected writer:", foundWriter);
          } else {
            console.warn(`Writer with ID ${writerId} not found.`);
            setWriterError("Selected writer not found.");
          }
        }

        // Fetch pricing to validate planSlug
        if (planSlug) {
          const pricingData = await Promise.all(
            ["ond", "hnd", "pgd", "masters"].map(fetchPricing)
          ).then(([ond, hnd, pgd, masters]) => ({ ond, hnd, pgd, masters }));

          const allPlans = [
            ...(pricingData.ond || []).map((p) => ({ ...p, category: "ond" })),
            ...(pricingData.hnd || []).map((p) => ({ ...p, category: "hnd" })),
            ...(pricingData.pgd || []).map((p) => ({ ...p, category: "pgd" })),
            ...(pricingData.masters || []).map((p) => ({
              ...p,
              category: "masters",
            })),
          ];

          console.log(
            "All plans:",
            allPlans.map((p) => p.slug)
          );

          const planExists = allPlans.some((p) => p.slug === planSlug);
          if (planExists) {
            setSelectedPlan(planSlug);
            console.log(`Selected plan: ${planSlug}`);
          } else {
            console.warn(`Plan with slug ${planSlug} not found.`);
            setPlanError("Selected plan not found.");
          }
        } else {
          console.log("No planSlug provided in URL.");
        }
      } catch (err) {
        console.error("Data fetching error:", err);
        setWriterError("Failed to load writers or plans.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <OrderHeader />

        <div className="max-w-6xl">
          {(writerError || planError) && (
            <p className="text-red-600 mb-4 text-sm">
              {writerError || planError}
            </p>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader type="spinner" size="lg" />
            </div>
          ) : (
            <OrderForm
              user={user}
              selectedWriter={selectedWriter}
              selectedPlan={selectedPlan}
              writers={writers}
              inferredMode={inferredMode}
            />
          )}
        </div>
      </div>
    </section>
  );
}
