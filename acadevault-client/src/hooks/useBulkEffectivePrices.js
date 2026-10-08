import { useEffect, useState, useContext } from "react";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { fetchEffectivePrice } from "@/utils/priceUtils";

const useTotalEffectivePrice = (materials = []) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    let isMounted = true;

    const calculate = async () => {
      setLoading(true);

      const results = await Promise.all(
        materials.map((mat) =>
          fetchEffectivePrice({
            materialId: mat.id,
            basePrice: mat.basePrice,
            materialType: mat.type,
            currency,
          })
        )
      );

      const computedTotal = results.reduce((sum, { price }) => {
        return sum + (price?.amount ?? 0);
      }, 0);

      if (isMounted) {
        setTotal(computedTotal);
        setLoading(false);
      }
    };

    if (materials.length > 0 && currency) {
      calculate();
    } else {
      setTotal(0);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [materials, currency]);

  return { totalPrice: total, currency, loading };
};

export default useTotalEffectivePrice;
