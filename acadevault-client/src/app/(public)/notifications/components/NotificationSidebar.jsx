

export default function NotificationSidebar() {
    const filters = ["All", "Purchases", "Account", "Messages", "Promotions"];
  
    return (
      <aside className="w-full md:w-64 space-y-6">
        <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        <ul className="space-y-2">
          {filters.map((filter) => (
            <li key={filter}>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium">
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  