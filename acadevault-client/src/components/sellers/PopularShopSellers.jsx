"use client";

import React from "react";
import Image from "next/image";
import { useGetTopSellersQuery } from "@/features/shop/shopApi";
import { getImageUrl } from "@/utils/getImageUrl";
import Container from "../layout/Container";
import ErrorState from "../states/ErrorState";
import LoadingState from "../states/LoadingState";
import EmptyState from "../states/EmptyState";
import Loader from "../ui/Loader";
import SectionHeader from "../common/SectionHeader";

const fallbackInstructors = [
  {
    name: "Academind by Maximilian...",
    avatar: "/avatars/default-avatar.png",
    expertise: "React JS, React Hooks",
    rating: 4.6,
    students: "3,271,979",
    courses: 48,
  },
  {
    name: "Jose Portilla",
    avatar: "/avatars/default-avatar.png",
    expertise: "Python, Computer Vision",
    rating: 4.6,
    students: "4,226,607",
    courses: 87,
  },
  {
    name: "Tim Buchalka",
    avatar: "/avatars/default-avatar.png",
    expertise: "Java, Python",
    rating: 4.6,
    students: "1,671,709",
    courses: 13,
  },
  {
    name: "Tim Buchalka's Learn Programming Academy",
    avatar: "/avatars/default-avatar.png",
    expertise: "C++, C (programming language)",
    rating: 4.6,
    students: "2,183,302",
    courses: 59,
  },
];

function PopularShopSellers() {
  const { data, isLoading, isError, error } = useGetTopSellersQuery();
  const sellers = data?.data;

  const instructorsToShow = sellers?.length
    ? sellers.map((seller) => ({
        name: seller.owner?.name || seller.shopName,
        avatar:
          seller.owner?.profilePicture?.url || "/avatars/default-avatar.png",
        expertise: "Top-rated seller",
        rating: seller.averageRating?.toFixed(1) ?? "N/A",
        students: `${seller.totalSales?.toLocaleString() ?? "0"} sales`,
        courses: `${seller.totalTransactions ?? 0} transactions`,
      }))
    : [];

  return (
    <Container background="gray-50" section className="py-16 px-0 sm:px-8">
      <SectionHeader
        title="Top Academic Materials Sellers"
        description=" Meet the most trusted and high-performing academic sellers on
          AcadeVault recognized for consistent excellence and learner
          satisfaction."
        align="left"
        size="md"
        headingLevel="h2"
      />

      {isLoading && (
        <LoadingState
          message="Loading top sellers..."
          centered
          customSpinner={<Loader type="spinner" size="lg" />}
          className="min-h-[40vh]"
        />
      )}

      {isError && (
        <ErrorState
          title="Failed to load top sellers"
          message={
            error?.data?.message ??
            "Something went wrong while fetching instructors."
          }
          centered
          className="min-h-[40vh]"
        />
      )}

      {!isLoading && !isError && instructorsToShow.length === 0 && (
        <EmptyState
          title="No sellers found"
          message="We couldn't find any top-rated sellers at the moment. Please check back later."
          centered
          className="min-h-[40vh]"
        />
      )}

      {!isLoading && !isError && instructorsToShow.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {instructorsToShow.map((instructor, index) => (
            <div
              key={`${instructor.name}-${index}`}
              className="border border-gray-400 p-5 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={"/avatars/default-avatar.png"}
                    alt={instructor.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold truncate">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {instructor.expertise}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold text-yellow-600">
                    {instructor.rating}
                  </span>{" "}
                  ★ Instructor Rating
                </p>
                <p>{instructor.students}</p>
                <p>{instructor.courses}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default PopularShopSellers;
