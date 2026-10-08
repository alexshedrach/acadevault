"use client";

import { useContext, useEffect, useState, useMemo } from "react";
import { CurrencyContext } from "@/contexts/CurrencyContext";

const useEffectivePrice = ({ materialId, materialType, region = null }) => {
  const { currency } = useContext(CurrencyContext);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = {};
    if (currency) params.currency = currency;
    if (region) params.region = region;
    if (materialId) params.materialId = materialId;
    if (materialType) params.materialType = materialType;
    return new URLSearchParams(params).toString();
  }, [currency, materialId, materialType, region]);

  useEffect(() => {
    if (!currency || !materialId || !materialType) return;

    const fetchPrice = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v2/prices/current-price?${query}`
        );
        const json = await res.json();
        setPrice(json?.data ?? null);
      } catch (error) {
        console.error("Failed to fetch price:", error);
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [query, currency, materialId, materialType]);

  return { price, loading };
};

export default useEffectivePrice;
