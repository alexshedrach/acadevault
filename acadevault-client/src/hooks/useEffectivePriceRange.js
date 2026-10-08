"use client";

import { CurrencyContext } from "@/contexts/CurrencyContext";
import { useState, useEffect, useContext } from "react";

const useEffectivePriceRange = ({ materialType, region = null }) => {
  const { currency } = useContext(CurrencyContext);
  const [range, setRange] = useState([0, 10000]); // Default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currency || !materialType) return;

    const fetchPriceRange = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          currency,
          materialType,
          ...(region && { region }),
        });

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/v2/prices/price-range?${query.toString()}`
        );
        const json = await res.json();
        const { minPrice, maxPrice } = json.data || {
          minPrice: 0,
          maxPrice: 10000,
        };
        setRange([minPrice, maxPrice]);
      } catch (err) {
        console.error("Error fetching price range:", err);
        setRange([0, 10000]);
      }
      setLoading(false);
    };

    fetchPriceRange();
  }, [currency, materialType, region]);

  return { range, loading };
};

export default useEffectivePriceRange;
