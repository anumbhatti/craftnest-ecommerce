import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <Link
        to="/orders"
        className="text-emerald-600 font-semibold"
      >
        ← Back to Orders
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-8">
        Order Details
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mt-3">
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>

        <p className="mt-3">
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>

        <p className="mt-3">
          <strong>Status:</strong>{" "}
          <span className="text-emerald-600 font-semibold">
            {order.orderStatus}
          </span>
        </p>

        <p className="mt-3">
          <strong>Total:</strong> Rs. {order.totalPrice}
        </p>

      </div>

      <h2 className="text-2xl font-bold mb-6">
        Ordered Products
      </h2>

      <div className="space-y-5">

        {order.orderItems?.map((item) => (

          <div
            key={item._id}
            className="bg-white shadow rounded-xl p-5"
          >

            {item.product ? (

              <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                <div className="flex items-center gap-5">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div>

                    <h3 className="text-xl font-bold">
                      {item.product.name}
                    </h3>

                    <p className="text-gray-500">
                      Rs. {item.product.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                </div>

                <div className="text-xl font-bold text-emerald-600">
                  Rs. {item.product.price * item.quantity}
                </div>

              </div>

            ) : (

              <div className="text-center text-red-500 font-semibold py-4">
                This product is no longer available.
              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrderDetails;