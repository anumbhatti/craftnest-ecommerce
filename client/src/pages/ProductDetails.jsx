import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchCartCount } = useCart();
  const { fetchWishlistCount } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= Add To Cart =================

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCartCount();

      alert("Product added to cart!");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product to cart."
      );
    }
  };

  // ================= Add To Wishlist =================

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/wishlist",
        {
          product: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchWishlistCount();

      alert("Product added to wishlist!");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product to wishlist."
      );
    }
  };

  // ================= Loading =================

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <Link
        to="/products"
        className="text-emerald-600 font-semibold"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-8">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl shadow-lg h-[500px] object-cover"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-emerald-600 text-3xl font-bold mt-4">
            Rs. {product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-8">
            {product.description}
          </p>

          <div className="mt-8 space-y-3">

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-600">
                  Out of Stock
                </span>
              )}
            </p>

          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={addToCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
            >
              Add To Cart
            </button>

            <button
              onClick={addToWishlist}
              className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-600 hover:text-white"
            >
              Add Wishlist
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;