import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setFormData({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        image: data.product.image,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product updated successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update failed."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={updateProduct}
        className="bg-white shadow-xl rounded-xl p-8 space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows="4"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-56 h-56 rounded-lg object-cover border"
          />
        )}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;