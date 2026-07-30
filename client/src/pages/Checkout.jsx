import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

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

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Checkout...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Shipping */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <textarea
            rows="5"
            placeholder="Enter your shipping address..."
            className="w-full border rounded-lg p-4"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
          />

          <div className="mt-6">

            <label className="font-semibold">
              Payment Method
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option>Cash on Delivery</option>
              <option>Bank Transfer</option>
            </select>

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.product.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  Rs. {item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span className="text-emerald-600">
              Rs. {totalPrice}
            </span>
          </div>

                    <button
            onClick={async () => {
              if (!shippingAddress.trim()) {
                alert("Please enter shipping address.");
                return;
              }

              if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
              }

              try {
                const orderItems = cart.map((item) => ({
                  product: item.product._id,
                  quantity: item.quantity,
                }));

                await API.post(
                  "/orders",
                  {
                    orderItems,
                    totalPrice,
                    shippingAddress,
                    paymentMethod,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                // Update Navbar Cart Count
                await fetchCartCount();

                alert("Order placed successfully!");

                navigate("/orders");

              } catch (error) {
                console.log(error);

                alert(
                  error.response?.data?.message ||
                    "Failed to place order."
                );
              }
            }}
            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;