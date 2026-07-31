import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: null,
});

const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setFormData({
  name: data.product.name,
  description: data.product.description,
  price: data.product.price,
  category: data.product.category,
  stock: data.product.stock,
  image: null,
});

setPreview(data.product.image);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
  if (e.target.name === "image") {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });

    setPreview(URL.createObjectURL(e.target.files[0]));
  } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
};

  const updateProduct = async (e) => {
  e.preventDefault();

  try {

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("category", formData.category);
    productData.append("stock", formData.stock);

    if (formData.image) {
      productData.append("image", formData.image);
    }

    await API.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

   toast.success("Product updated successfully!");

setTimeout(() => {
  navigate("/admin/products");
}, 1000);

  } catch (error) {

    console.log(error);

    toast.error(
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

        <div>
          <label className="font-semibold">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
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
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

        </div>

        <div>

          <label className="font-semibold">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
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
        

          <div>

  <label className="font-semibold">
    Product Image
  </label>

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="w-full border rounded-lg p-3 mt-2"
  />

</div>
        </div>

        {formData.image && (
          <div>

            <p className="font-semibold mb-3">
              Image Preview
            </p>

            {preview && (

  <div>

    <p className="font-semibold mb-3">
      Current Image
    </p>

    <img
      src={preview}
      alt="Preview"
      className="w-56 h-56 rounded-lg object-cover border"
    />

  </div>

)}

          </div>
        )}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;