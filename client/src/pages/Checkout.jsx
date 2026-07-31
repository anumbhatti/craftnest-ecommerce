import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [shippingAddress, setShippingAddress] = useState("");


const [phoneNumber, setPhoneNumber] = useState("");

const [transactionId, setTransactionId] = useState("");

const [processingPayment, setProcessingPayment] = useState(false);

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
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.warning("Please enter your shipping address.");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderItems = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      // Validate payment details
if (
  (paymentMethod === "JazzCash" ||
    paymentMethod === "EasyPaisa") &&
  (!phoneNumber.trim() || !transactionId.trim())
) {
  toast.warning(
    `Please enter your ${paymentMethod} number and Transaction ID.`
  );
  return;
}

if (
  paymentMethod === "Bank Transfer" &&
  !transactionId.trim()
) {
  toast.warning("Please enter the Bank Transfer Transaction ID.");
  return;
}

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

      await fetchCartCount();

      toast.success("Order placed successfully!");

      setTimeout(() => {
        navigate("/orders");
      }, 1200);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

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

        {/* Shipping Details */}

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
            required
          />

          <div className="mt-6">

            <label className="font-semibold">
              Payment Method
            </label>

            <div className="mt-6">

  <div className="grid grid-cols-2 gap-4 mt-4">

    <div
      onClick={() => setPaymentMethod("Cash on Delivery")}
      className={`cursor-pointer rounded-xl border-2 p-5 transition shadow-sm
      ${
        paymentMethod === "Cash on Delivery"
          ? "border-emerald-600 bg-emerald-50"
          : "border-gray-200 hover:border-emerald-400"
      }`}
    >
      <h3 className="font-semibold">
        Cash on Delivery
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Pay when your order arrives.
      </p>

    </div>

    <div
      onClick={() => setPaymentMethod("JazzCash")}
      className={`cursor-pointer rounded-xl border-2 p-5 transition shadow-sm
      ${
        paymentMethod === "JazzCash"
          ? "border-emerald-600 bg-emerald-50"
          : "border-gray-200 hover:border-emerald-400"
      }`}
    >
      <h3 className="font-semibold">
        JazzCash
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Secure mobile wallet payment.
      </p>

    </div>

    <div
      onClick={() => setPaymentMethod("EasyPaisa")}
      className={`cursor-pointer rounded-xl border-2 p-5 transition shadow-sm
      ${
        paymentMethod === "EasyPaisa"
          ? "border-emerald-600 bg-emerald-50"
          : "border-gray-200 hover:border-emerald-400"
      }`}
    >
      <h3 className="font-semibold">
        EasyPaisa
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Fast and secure payment.
      </p>

    </div>

    <div
      onClick={() => setPaymentMethod("Bank Transfer")}
      className={`cursor-pointer rounded-xl border-2 p-5 transition shadow-sm
      ${
        paymentMethod === "Bank Transfer"
          ? "border-emerald-600 bg-emerald-50"
          : "border-gray-200 hover:border-emerald-400"
      }`}
    >
      <h3 className="font-semibold">
        Bank Transfer
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Direct transfer to our bank account.
      </p>

    </div>

  </div>

</div>

{(paymentMethod === "JazzCash" ||
  paymentMethod === "EasyPaisa") && (

  <div className="mt-6 space-y-4">

    <input
      type="text"
      placeholder={`${paymentMethod} Number`}
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Transaction ID"
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
      className="w-full border rounded-lg p-3"
    />

  </div>

)}

{paymentMethod === "Bank Transfer" && (
  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">

    <h3 className="font-bold text-lg mb-3">
      Bank Account Details
    </h3>

    <p><strong>Bank:</strong> HBL</p>

    <p><strong>Account Title:</strong> CraftNest</p>

    <p><strong>Account No:</strong> 1234567890123</p>

    <p><strong>IBAN:</strong> PK36HABB0001234567890123</p>

    <input
      type="text"
      placeholder="Transaction ID"
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
      className="w-full border rounded-lg p-3 mt-5"
    />

  </div>
)}

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
  onClick={placeOrder}
  disabled={placingOrder}
  className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow"
>
  {placingOrder
    ? "Processing..."
    : paymentMethod === "Cash on Delivery"
    ? "Place Order"
    : paymentMethod === "Bank Transfer"
    ? "Verify Payment"
    : "Pay Now"}
</button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;