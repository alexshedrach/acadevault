import { cn } from "@/utils/cn";
import { Flame, Star, Sparkles } from "lucide-react";

const TAB_ICONS = {
  "Most popular": <Star className="w-4 h-4 mr-1 shrink-0" />,
  New: <Sparkles className="w-4 h-4 mr-1 shrink-0" />,
  Trending: <Flame className="w-4 h-4 mr-1 shrink-0" />,
};

const CarouselTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div
      role="tablist"
      className="flex gap-6 border-b mb-4 text-lg font-extrabold overflow-x-auto no-scrollbar"
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        const Icon = TAB_ICONS[tab] ?? null;

        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            aria-controls={`carousel-panel-${tab}`}
            id={`tab-${tab}`}
            onClick={() => onTabChange(tab)}
            className={cn(
              "pb-2 flex items-center whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer",
              isActive
                ? "border-indigo-600 text-indigo-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {Icon}
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default CarouselTabs;
