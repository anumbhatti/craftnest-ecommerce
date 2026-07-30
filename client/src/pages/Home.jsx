import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products?limit=4");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50">

      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">
          Welcome to <span className="text-emerald-600">CraftNest</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Handmade Crafts • Wooden Decor • Unique Gifts
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;