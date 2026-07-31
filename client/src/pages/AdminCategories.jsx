import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {


    try {
      await API.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();

      toast.success("Category deleted successfully!");

    } catch (error) {
      console.log(error);
      toast.error(
  error.response?.data?.message ||
  "Failed to delete category."
);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Manage Categories
        </h1>

        <Link
          to="/admin/categories/add"
          className="bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700"
        >
          Add Category
        </Link>

      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">

        <table className="w-full">

          <thead className="bg-emerald-600 text-white">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category._id}
                className="border-b"
              >

                <td className="p-4">
                  {category.name}
                </td>

                <td className="p-4">
                  {category.description}
                </td>

                <td className="p-4 flex justify-center gap-3">

                  <Link
                    to={`/admin/categories/edit/${category._id}`}
                    className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="bg-rose-500 hover:bg-rose-600 transition duration-300 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminCategories;