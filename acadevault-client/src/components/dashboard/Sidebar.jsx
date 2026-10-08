import { adminNavGroups } from "@/config/adminNavConfig";
import { affiliateNavGroups } from "@/config/affiliateNavConfig";
import { agentNavGroups } from "@/config/agentNavConfig";
import { sellerNavGroups } from "@/config/sellerNavConfig";
import { userNavGroups } from "@/config/userNavConfig";
import { SidebarGroup } from "../common/SidebarGroup";

export default function Sidebar({ role }) {
  let groups = [];

  switch (role) {
    case "Admin":
      groups = adminNavGroups;
      break;
    case "Seller":
      groups = sellerNavGroups;
      break;
    case "User":
      groups = userNavGroups;
      break;
    case "Affiliate":
      groups = affiliateNavGroups;
      break;
    case "Agent":
      groups = agentNavGroups;
      break;
    default:
      groups = [];
  }

  return (
    <div className="h-full flex flex-col group">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-blue-100 bg-white/60 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold shadow-inner">
            {role?.[0] ?? "U"}
          </div>

          <h2 className="text-xl font-semibold text-blue-900 tracking-tight capitalize">
            {role} Panel
          </h2>
        </div>
      </div>

      {/* Nav with hover-visible scrollbar */}
      {/* <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-hidden group-hover:overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent transition-all duration-300">
        {groups.map((group) => (
          <SidebarGroup
            key={group.groupLabel}
            groupLabel={group.groupLabel}
            items={group.items}
            defaultOpen={index === 0} // Only the first group open by default
          />
        ))}
      </nav> */}

      <nav
        className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide transition-all duration-200"
        onMouseEnter={(e) => {
          e.currentTarget.classList.remove("scrollbar-hide");
          e.currentTarget.classList.add("scrollbar-show");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.classList.remove("scrollbar-show");
          e.currentTarget.classList.add("scrollbar-hide");
        }}
      >
        {groups.map((group, index) => (
          <SidebarGroup
            key={group.groupLabel}
            groupLabel={group.groupLabel}
            items={group.items}
            defaultOpen={index === 0} // Only the first group open by default
          />
        ))}
      </nav>
    </div>
  );
}
