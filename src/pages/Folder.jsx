import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Folder() {
  const { id } = useParams();
  const { name } = useParams(); // folder name
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Load product details
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p.folder === name);
        setProduct(prod);

        // If product has total images info, use it
        const totalImages = prod?.totalImages || 20; // fallback max 20
        const tempImages = [];
        for (let i = 1; i <= totalImages; i++) {
          tempImages.push(`/gallery/${name}/${i}.jpg`);
        }
        setImages(tempImages);
        setMainImage(tempImages[0]);
      });
  }, [name]);

  if (!product) return <div className="p-6">Loading...</div>;

  const productUrl = `${window.location.origin}/product/${product.id}`;
  const productImage = `${window.location.origin}/gallery/${product.folder}/1.jpg`;
// Handle Add to Cart
  const handleAddToCart = () => {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.includes(product.id)) {
      // Already in cart
      alert(`Product "${product.name}" is already in cart!`);
    } else {
      cart.push(product.id); // add product id
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Product "${product.name}" added to cart!`);
    }
    // Remove message after 2s
    // setTimeout(() => setMessage(""), 2000);
  };

  // Handle Buy Now
  const handleBuyNow = () => {
  // URL of the product page
  const productUrl = `${window.location.origin}/product/${product.id}`;
  
  // Instagram DM link (opens Instagram app)
  // Note: You can only send them to a profile or story, not direct DM with a message programmatically
  // Fallback: open product page in new tab
  window.open(productUrl, "_blank");
};

  return (
    <div className="p-6 md:flex md:gap-10 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-200 p-2 rounded hover:bg-gray-300 transition z-10"
      >
        ← Back
      </button>

      {/* Left: Images */}
      <div className="flex-1">
        {/* Main Image */}
        <div className="w-full md:h-[500px] mb-4 flex items-center justify-center border rounded shadow overflow-hidden bg-gray-50">
          <img
            src={mainImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex-1 mt-6 md:mt-0">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 capitalize mb-2">Category: {product.category}</p>
        <p className="mb-2">Sizes: {product.sizes.join(", ")}</p>
        <p className="mb-2">Colors: {product.colors.join(", ")}</p>
        <p className="text-2xl font-bold mb-4">₹ {product.price}</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAddToCart}>
            
            Add to Cart
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}