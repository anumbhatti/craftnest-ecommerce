import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AddCategory() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category added successfully!");

      navigate("/admin/categories");

    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to add category."
);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Add Category
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Add Category
        </button>

      </form>

    </div>
  );
}

export default AddCategory;