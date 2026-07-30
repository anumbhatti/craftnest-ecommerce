import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put(
        `/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
      await fetchCartCount();

    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCart();
      await fetchCartCount();

    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  <div>

                    <h2 className="text-xl font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500">
                      Rs. {item.product.price}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                  >
                    +
                  </button>

                </div>

                <div>

                  <p className="font-bold text-lg text-emerald-600">
                    Rs. {item.product.price * item.quantity}
                  </p>

                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="mt-10 bg-white shadow rounded-xl p-6 flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Total:
            </h2>

            <h2 className="text-3xl font-bold text-emerald-600">
              Rs. {total}
            </h2>

          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Proceed To Checkout
          </button>

        </>
      )}

    </div>
  );
}

export default Cart;