import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders", {
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

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated successfully!");

      fetchOrders();

    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to update order."
);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">

        <table className="w-full">

          <thead className="bg-emerald-600 text-white">

            <tr>

              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b text-center hover:bg-gray-50"
              >

                <td className="p-4">
                  {order.user?.name}
                </td>

                <td className="p-4">
                  {order.user?.email}
                </td>

                <td className="p-4">
                  Rs. {order.totalPrice}
                </td>

                <td className="p-4">
                  {order.paymentMethod}
                </td>

                <td className="p-4">

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >

                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>

                  </select>

                </td>

                <td className="p-4">
                  {order.shippingAddress}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;