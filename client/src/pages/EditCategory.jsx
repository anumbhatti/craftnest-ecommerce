import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await API.get(`/categories/${id}`);

      setFormData({
        name: data.category.name,
        description: data.category.description,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/categories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category updated successfully!");

      navigate("/admin/categories");

    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to update category."
);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Edit Category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-6"
      >

        <div>

          <label className="font-semibold">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            className="w-full border rounded-lg p-3 mt-2"
            value={formData.name}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            className="w-full border rounded-lg p-3 mt-2"
            value={formData.description}
            onChange={handleChange}
          />

        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Update Category
        </button>

      </form>

    </div>
  );
}

export default EditCategory;