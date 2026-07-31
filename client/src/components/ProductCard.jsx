import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const image =
    product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl duration-300 overflow-hidden flex flex-col h-full">

      <img
        src={image}
        alt={product.name}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800";
        }}
        className="w-full h-64 object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">

        <h2 className="text-xl font-bold line-clamp-2 min-h-[56px]">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-3 line-clamp-3 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-2xl text-emerald-600 font-bold">
            Rs. {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;