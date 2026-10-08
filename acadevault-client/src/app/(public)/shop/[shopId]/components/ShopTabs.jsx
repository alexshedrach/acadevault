import { Tabs } from "@/components/tabs/Tabs";
import { TabsItem } from "@/components/tabs/TabsItem";
import { TabsList } from "@/components/tabs/TabsList";
import { Info, Mail, HelpCircle, MessageSquareText } from "lucide-react";
import { ShopTabPanels } from "./ShopTabPanels";

const SHOP_TABS = [
  { key: "about", label: "About", icon: Info },
  { key: "contact", label: "Contact", icon: Mail },
  { key: "faqs", label: "FAQs", icon: HelpCircle },
  { key: "reviews", label: "Customer Reviews", icon: MessageSquareText },
];

export default function ShopTabs({
  shop,
  owner,
  reviewsData,
  isReviewsFetching,
  reviewsError,
  isReviewsLoading,
}) {
  return (
    <Tabs defaultValue="about">
      <TabsList variant="shop">
        {SHOP_TABS.map((tab) => (
          <TabsItem
            key={tab.key}
            tabKey={tab.key}
            label={tab.label}
            icon={tab.icon}
            variant="carousel"
          />
        ))}
      </TabsList>

      <div className="mt-4">
        <ShopTabPanels
          shop={shop}
          owner={owner}
          reviewsData={reviewsData}
          isReviewsFetching={isReviewsFetching}
          isReviewsLoading={isReviewsLoading}
          reviewsError={reviewsError}
        />
      </div>
    </Tabs>
  );
}
