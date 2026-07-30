import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const navigate = useNavigate();

  const { fetchWishlistCount } = useWishlist();
  const { fetchCartCount } = useCart();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(data.wishlist);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Remove From Wishlist
  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWishlist();
      fetchWishlistCount();

    } catch (error) {
      console.log(error);
    }
  };

  // Move To Cart
  const moveToCart = async (item) => {
    try {
      await API.post(
        "/cart",
        {
          product: item.product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await API.delete(`/wishlist/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWishlist();
      fetchWishlistCount();
      fetchCartCount();

      alert("Moved to Cart!");

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="space-y-6">

          {wishlist.map((item) => (

            <div
              key={item._id}
              className="bg-white shadow rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-5"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-28 h-28 rounded-lg object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Rs. {item.product.price}
                  </p>

                  <p className="text-gray-600 mt-2">
                    {item.product.category}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => moveToCart(item)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
                >
                  Move To Cart
                </button>

                <button
                  onClick={() => removeWishlist(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;