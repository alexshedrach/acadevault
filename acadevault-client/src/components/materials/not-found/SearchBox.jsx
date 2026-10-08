import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm mb-8">
      <label
        htmlFor="material-search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Try another search
      </label>
      <div className="flex items-center w-full max-w-xl mx-auto">
        <input
          id="material-search"
          type="text"
          placeholder="Search academic materials, topics..."
          className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
