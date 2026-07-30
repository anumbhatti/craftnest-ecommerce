import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTags,
  FaDollarSign,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.statistics);
      setRecentOrders(data.recentOrders);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="flex gap-4 mb-8">

  <button
    onClick={() => window.location.href = "/admin/products"}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
  >
    Manage Products
  </button>

</div>

<button
  onClick={() =>
    window.location.href = "/admin/orders"
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
>
  Manage Orders
</button>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <FaUsers className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-gray-500">Users</h3>
          <p className="text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaBoxOpen className="text-4xl text-emerald-500 mb-4" />
          <h3 className="text-gray-500">Products</h3>
          <p className="text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaTags className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-gray-500">Categories</h3>
          <p className="text-3xl font-bold">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaShoppingCart className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-3xl font-bold">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <FaDollarSign className="text-4xl text-red-500 mb-4" />
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold">
            Rs. {stats.totalRevenue}
          </p>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-6">
          Recent Orders
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-xl">

          <table className="w-full">

            <thead className="bg-emerald-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
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
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {order.orderStatus}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;