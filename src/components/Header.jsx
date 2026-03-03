// src/components/Header.jsx
import { useState } from "react";

export default function Header({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  sizeSort,
  setSizeSort,
}) {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="mb-6 relative">

      {/* Search bar with icons */}
      <div className="flex items-center border rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 flex-grow outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort icon */}
        <img
          src="../src/assets/icons/sort.png"
          alt="Sort"
          className="h-7 w-7 p-1 cursor-pointer"
          onClick={() => setShowSort(!showSort)}
        />

        {/* Filter icon */}
        <img
          src="../src/assets/icons/filter.png"
          alt="Filter"
          className="h-7 w-7 p-1 cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>

      {/* Sort options */}
      {showSort && (
        <div className="border rounded p-4 mt-2 bg-white shadow w-full max-w-sm">
          <h3 className="font-semibold mb-2">Sort</h3>

          {/* Sort by Price or Size */}
          <div className="flex justify-between mb-2">
            <button
              className={`px-2 py-1 rounded ${sort ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              onClick={() => { setSort("priceAsc"); setSizeSort(""); }}
            >
              Price
            </button>
            <button
              className={`px-2 py-1 rounded ${sizeSort ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              onClick={() => { setSizeSort("sizeAsc"); setSort(""); }}
            >
              Size
            </button>
          </div>

          <hr className="my-2" />

          {/* Sort order */}
          <div className="flex justify-between">
            <button
              className={`px-2 py-1 rounded ${sort?.includes("Asc") || sizeSort?.includes("Asc") ? "bg-green-500 text-white" : "bg-gray-100"}`}
              onClick={() => {
                if (sort) setSort("priceAsc");
                if (sizeSort) setSizeSort("sizeAsc");
              }}
            >
              Asc
            </button>
            <button
              className={`px-2 py-1 rounded ${sort?.includes("Desc") || sizeSort?.includes("Desc") ? "bg-red-500 text-white" : "bg-gray-100"}`}
              onClick={() => {
                if (sort) setSort("priceDesc");
                if (sizeSort) setSizeSort("sizeDesc");
              }}
            >
              Desc
            </button>
          </div>
        </div>
      )}

      {/* Filter options */}
      {showFilter && (
        <div className="border rounded p-4 mt-2 bg-white shadow w-full max-w-sm">
          <h3 className="font-semibold mb-2">Filter</h3>
          <label className="flex items-center gap-2">
            Category:
            <select
              className="border p-1 ml-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="doll">Doll</option>
              <option value="amigurumi">Amigurumi</option>
              <option value="keychain">Keychain</option>
              <option value="wearable">Wearable</option>
              <option value="hat">Hat</option>
              <option value="band">Band</option>
              <option value="bookmark">Bookmark</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}