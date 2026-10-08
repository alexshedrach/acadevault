import { useTabsContext } from "@/components/tabs/Tabs";
import AboutSection from "./AboutSection";
import ShopContactSection from "./ShopContactSection";
import Reviews from "@/components/reviews/Reviews";
import ShopFAQSection from "./ShopFAQSection";

export function ShopTabPanels({
  shop,
  owner,
  reviewsData,
  isReviewsFetching,
  reviewsError,
  isReviewsLoading,
  currentPage,
  totalPages,
  onPageChange,
  onSubmit,
  isSubmitting,
  submitError,
}) {
  const { activeTab } = useTabsContext();

  let setPage;
  let submitReview;

  if (activeTab === "about") return <AboutSection shop={shop} />;
  if (activeTab === "contact")
    return <ShopContactSection shop={shop} owner={owner} />;
  if (activeTab === "faqs")
    return <ShopFAQSection shop={shop} owner={owner} />;
  if (activeTab === "reviews")
    return (
      <>
        {isReviewsLoading ? (
          <div role="status" className="py-8 text-center">
            <Loader type="spinner" size="xl" />
          </div>
        ) : (
          <Reviews
            reviews={reviewsData}
            fetchError={reviewsError}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            onSubmit={submitReview}
            isSubmitting={isSubmitting}
            submitError={submitError}
            isFetching={isReviewsFetching}
          />
        )}
        ;
      </>
    );
  return null;
}
