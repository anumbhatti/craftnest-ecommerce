import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: null,
});

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
  if (e.target.name === "image") {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.description ||
    !formData.price ||
    !formData.category
  ) {
    toast.warning("Please fill all required fields.");
return;
  }

  try {
    setLoading(true);

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("category", formData.category);
    productData.append("stock", formData.stock);

    if (formData.image) {
      productData.append("image", formData.image);
    }

    await API.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Product added successfully!");

setTimeout(() => {
  navigate("/admin/products");
}, 1000);

  } catch (error) {

    console.log(error);

    toast.error(
  error.response?.data?.message ||
  "Failed to add product."
);
  } finally {

    setLoading(false);

  }
};

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 space-y-6"
      >

        <div>
          <label className="font-semibold">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            className="w-full border rounded-lg p-3 mt-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            className="w-full border rounded-lg p-3 mt-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">
              Price
            </label>

            <input
              type="number"
              name="price"
              className="w-full border rounded-lg p-3 mt-2"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              className="w-full border rounded-lg p-3 mt-2"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

        </div>

        <div>

          <label className="font-semibold">
            Category
          </label>

          <select
            name="category"
            className="w-full border rounded-lg p-3 mt-2"
            value={formData.category}
            onChange={handleChange}
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category._id}
                value={category.name}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        <div>
          <label className="font-semibold">
            Image URL
          </label>

          <input
  type="file"
  name="image"
  accept="image/*"
  className="w-full border rounded-lg p-3 mt-2"
  onChange={handleChange}
/>
        </div>

        {formData.image && (
  <div>

    <p className="font-semibold mb-3">
      Image Preview
    </p>

    <img
      src={URL.createObjectURL(formData.image)}
      alt="Preview"
      className="w-56 h-56 rounded-xl object-cover border"
    />

  </div>
)}

        <button
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;