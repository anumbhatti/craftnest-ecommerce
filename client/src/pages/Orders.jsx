import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white shadow rounded-xl p-6"
            >

              <div className="flex flex-col md:flex-row justify-between gap-4">

                <div>

                  <p className="font-semibold">
                    Order ID
                  </p>

                  <p className="text-gray-500 break-all">
                    {order._id}
                  </p>

                  <p className="mt-3">
                    <strong>Total:</strong> Rs. {order.totalPrice}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-emerald-600 font-semibold">
                      {order.orderStatus}
                    </span>
                  </p>

                </div>

                <div className="flex items-center">

                  <Link
                    to={`/order/${order._id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;