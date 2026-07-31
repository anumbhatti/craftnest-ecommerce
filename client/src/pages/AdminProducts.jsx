import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products?limit=100");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {


    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted successfully.");

fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to delete product."
);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Product Management
        </h1>

        <Link
          to="/admin/products/add"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">

        <table className="w-full">

          <thead className="bg-emerald-600 text-white">

            <tr>

              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 text-center"
              >

                <td className="p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover mx-auto"
                  />

                </td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  Rs. {product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      cclassName="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;