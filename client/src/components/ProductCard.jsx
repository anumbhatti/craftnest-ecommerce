import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const image =
    product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl duration-300 overflow-hidden">

      <img
        src={image}
        alt={product.name}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800";
        }}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl text-emerald-600 font-bold">
            Rs. {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;