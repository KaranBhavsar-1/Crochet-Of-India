// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/folder/${product.folder}`}
      className="border rounded-lg shadow hover:scale-105 transition overflow-hidden"
    >
      <img
        src={`/gallery/${product.folder}/1.jpg`}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-3">
        <h2 className="font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="font-bold mt-2">₹ {product.price}</p>
      </div>
    </Link>
  );
}