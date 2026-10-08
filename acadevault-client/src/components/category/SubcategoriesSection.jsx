import Link from 'next/link';
import React from 'react'

const SubcategoriesSection = ({ subcategories }) => {
  if (!subcategories || subcategories.length === 0) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Subcategories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory._id}
              href={`/departments/${subcategory.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{subcategory.name}</h3>
              <p className="text-gray-600">{subcategory.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubcategoriesSection