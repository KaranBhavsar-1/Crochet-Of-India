// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import SocialSidebar from "../components/SocialSidebar";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");       // priceAsc / priceDesc
  const [sizeSort, setSizeSort] = useState(""); // sizeAsc / sizeDesc

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const sizeToNum = (size) => {
    let s = Array.isArray(size) ? size[0] : size;
    switch (s?.toLowerCase()) {
      case "xs": return 1;
      case "s": return 2;
      case "m": return 3;
      case "l": return 4;
      case "xl": return 5;
      case "small": return 2;
      case "medium": return 3;
      case "large": return 4;
      case "free size": return 3;
      default: return 0;
    }
  };

  const filtered = products
    .filter(p => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
    .filter(p => category ? p.category === category : true)
    .sort((a, b) => {
      // Price sorting
      if (sort) {
        return sort === "priceAsc" ? a.price - b.price : b.price - a.price;
      }
      // Size sorting
      if (sizeSort) {
        return sizeSort === "sizeAsc" ? sizeToNum(a.sizes) - sizeToNum(b.sizes) : sizeToNum(b.sizes) - sizeToNum(a.sizes);
      }
      return 0;
    });

  return (
    <div className="p-6">
      <SocialSidebar/>
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        sizeSort={sizeSort}
        setSizeSort={setSizeSort}
      />
      <ProductGrid products={filtered} />
    </div>
  );
}