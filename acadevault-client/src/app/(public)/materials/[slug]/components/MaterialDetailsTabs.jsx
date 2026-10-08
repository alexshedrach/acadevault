"use client";

import { Tabs } from "@/components/tabs/Tabs";
import { TabsButton } from "@/components/tabs/TabsButton";
import { TabsContent } from "@/components/tabs/TabsContent";
import { TabsList } from "@/components/tabs/TabsList";
import { useMaterialReviews } from "@/hooks/useMaterialReviews";
import MaterialDescription from "./MaterialDescription";
import UsageAndPolicy from "./UsageAndPolicy";
import Loader from "@/components/ui/Loader";
import { AlertBox } from "@/components/ui/AlertBox";
import Reviews from "@/components/reviews/Reviews";
import ShareAndGift from "./share/ShareAndGift";
import FAQSection from "@/components/faq/FAQSection";
import RelatedMaterials from "./RelatedMaterials";

export default function MaterialDetailsTabs({ material }) {
  const materialId = material._id;

  const {
    reviews,
    currentPage,
    totalPages,
    isFetchingReviews,
    isFetching,
    fetchError,
    submitReview,
    isSubmitting,
    submitError,
    setPage,
  } = useMaterialReviews(materialId);

  return (
    <Tabs defaultValue="description" lazy className="mt-8">
      <TabsList className="custom-tabs">
        <TabsButton value="description">Material Contents</TabsButton>
        <TabsButton value="policy">Usage and Policy</TabsButton>
        <TabsButton value="reviews">Reviews</TabsButton>
        <TabsButton value="faqs">FAQs</TabsButton>
        <TabsButton value="share">Share</TabsButton>
        <TabsButton value="related">Related Materials</TabsButton>
      </TabsList>

      <TabsContent value="description">
        <MaterialDescription material={material} />
      </TabsContent>

      <TabsContent value="policy">
        <UsageAndPolicy />
      </TabsContent>

      {/* <TabsContent value="reviews">
        {isFetchingReviews ? (
          <div role="status" className="py-8 text-center">
            <Loader type="spinner" size="xl" />
          </div>
        ) : fetchError ? (
          <AlertBox variant="error" title="Unable to load reviews">
            Please try again later.
          </AlertBox>
        ) : (
          <Reviews
            reviews={reviews}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            onSubmit={submitReview}
            isSubmitting={isSubmitting}
            submitError={submitError}
            isFetching={isFetching}
          />
        )}
      </TabsContent> */}
      <TabsContent value="reviews">
        {isFetchingReviews ? (
          <div role="status" className="py-8 text-center">
            <Loader type="spinner" size="xl" />
          </div>
        ) : (
          <Reviews
            reviews={reviews}
            fetchError={fetchError}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            onSubmit={submitReview}
            isSubmitting={isSubmitting}
            submitError={submitError}
            isFetching={isFetching}
          />
        )}
      </TabsContent>

      <TabsContent value="faqs">
        <FAQSection />
      </TabsContent>

      <TabsContent value="share">
        <ShareAndGift material={material} />
      </TabsContent>

      <TabsContent value="related">
        {/* Related materials (lazy) */}
        <RelatedMaterials materialId={material._id} />
      </TabsContent>
    </Tabs>
  );
}
