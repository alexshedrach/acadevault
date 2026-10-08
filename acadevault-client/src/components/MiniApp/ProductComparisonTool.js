"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compare, ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeIn, cardVariants } from "@/lib/animations";
import useAnalytics from "@/hooks/useAnalytics";

// Mock product data
const products = [
  {
    id: "1",
    name: "Calculus Master Course",
    price: 99.99,
    duration: "12 weeks",
    content: "Videos, Quizzes, Notes",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: "2",
    name: "Data Science E-Book Bundle",
    price: 49.99,
    duration: "Self-paced",
    content: "PDFs, Exercises",
    rating: 4.5,
    reviews: 85,
  },
  {
    id: "3",
    name: "Research Writing Subscription",
    price: 29.99,
    duration: "Monthly",
    content: "Templates, Guides, Webinars",
    rating: 4.7,
    reviews: 60,
  },
];

const ProductComparisonTool = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { trackEvent } = useAnalytics();

  const toggleProduct = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedProducts.filter((p) => p.id !== product.id);
    } else if (selectedProducts.length < 3) {
      updatedSelection = [...selectedProducts, product];
    } else {
      return; // Limit to 3 products
    }
    setSelectedProducts(updatedSelection);
    trackEvent("comparison_product_toggled", {
      productId: product.id,
      action: isSelected ? "removed" : "added",
      selectionCount: updatedSelection.length,
    });
  };

  const handleAddToCart = (product) => {
    // Mock add-to-cart logic
    console.log(`Added ${product.name} to cart`);
    trackEvent("add_to_cart", {
      productId: product.id,
      productName: product.name,
    });
  };

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Compare className="w-6 h-6 text-blue-600" />
        Compare Products
      </h3>
      <div className="space-y-4">
        {/* Product Selection */}
        <div className="flex flex-wrap gap-2">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => toggleProduct(product)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm",
                selectedProducts.some((p) => p.id === product.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300",
                selectedProducts.length >= 3 &&
                  !selectedProducts.some((p) => p.id === product.id) &&
                  "opacity-50 cursor-not-allowed"
              )}
              disabled={
                selectedProducts.length >= 3 &&
                !selectedProducts.some((p) => p.id === product.id)
              }
              aria-label={`Toggle ${product.name} for comparison`}
            >
              {product.name}
            </button>
          ))}
        </div>
        {/* Comparison Table */}
        {selectedProducts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold text-gray-700">
                    Feature
                  </th>
                  {selectedProducts.map((product) => (
                    <th
                      key={product.id}
                      className="p-3 text-sm font-semibold text-gray-700"
                    >
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Price",
                    key: "price",
                    format: (v) => `$${v.toFixed(2)}`,
                  },
                  { label: "Duration", key: "duration" },
                  { label: "Content", key: "content" },
                  { label: "Rating", key: "rating", format: (v) => `${v} / 5` },
                  { label: "Reviews", key: "reviews" },
                ].map(({ label, key, format }) => (
                  <tr key={label} className="border-t">
                    <td className="p-3 text-sm text-gray-600">{label}</td>
                    {selectedProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-3 text-sm text-gray-800"
                      >
                        {format ? format(product[key]) : product[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="p-3 text-sm text-gray-600">Action</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {selectedProducts.length === 0 && (
          <p className="text-gray-600 text-sm">
            Select up to 3 products to compare.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductComparisonTool;

// Usage Example

// import ProductComparisonTool from '@/components/ProductComparisonTool';
// import { Suspense } from 'react';

// export default function ShopPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Shop Academic Resources</h1>
//       <Suspense fallback={<div>Loading comparison tool...</div>}>
//         <ProductComparisonTool />
//       </Suspense>
//       {/* Product grid */}
//     </div>
//   );
// }
