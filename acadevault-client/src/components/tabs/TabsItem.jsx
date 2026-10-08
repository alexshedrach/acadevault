import { cn } from "@/utils/cn";
import { useTabsContext } from "./Tabs";

export function TabsItem({
  tabKey,
  label,
  icon: Icon = null,
  className = "",
  variant = "default",
}) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === tabKey;

  const baseClasses =
    "inline-flex items-center cursor-pointer whitespace-nowrap";

  const variantClasses = {
    default: isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-gray-800",

    shop: isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-500 hover:text-gray-700",

    carousel: isActive
      ? "border-indigo-600 text-indigo-600 font-semibold pb-2 border-b-2"
      : "border-transparent text-gray-500 hover:text-gray-700 pb-2 border-b-2",
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      onClick={() => setActiveTab(tabKey)}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {Icon && (
        <Icon
          className={cn(
            "w-4 h-4 mr-1 shrink-0",
            variant === "carousel" && "mr-2"
          )}
        />
      )}
      {label}
    </button>
  );
}


// 🛠️ How to Use It in Your TabsList

{/* <TabsList variant="carousel">
  {tabs.map((tab) => (
    <TabsItem
      key={tab.key}
      tabKey={tab.key}
      label={tab.label}
      icon={tab.icon}
      variant="carousel"
    />
  ))}
</TabsList>; */}


// 🎯 Example Data Setup:
// const tabs = [
//   { key: "popular", label: "Most popular", icon: Star },
//   { key: "new", label: "New", icon: Sparkles },
//   { key: "trending", label: "Trending", icon: Flame },
// ];
  