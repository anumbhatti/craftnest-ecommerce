import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, products]);

  const fetchProducts = async () => {
    try {
      // Fetch all products
      const { data } = await API.get("/products?limit=100");

      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter((product) => product.category === category);
    }

    setFilteredProducts(temp);
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold text-center mb-10">
        Our <span className="text-emerald-600">Products</span>
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-4 py-3 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3 md:w-72"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No Products Found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;