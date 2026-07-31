import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

import {
  FaShippingFast,
  FaLeaf,
  FaLock,
  FaUndoAlt,
} from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Show latest 8 products
      const { data } = await API.get("/products?limit=8");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50">

      {/* ================= Hero ================= */}

      <section className="bg-gradient-to-r from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

              Handmade Crafts
              <br />

              <span className="text-emerald-600">
                Crafted With Love
              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">

              Discover unique handmade products, wooden décor,
              home accessories and personalized gifts created
              by talented artisans.

            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/products"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Shop Now
              </Link>

              <button
  onClick={() =>
    document
      .getElementById("categories")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
>
  Explore
</button>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1517705008128-361805f42e86?w=900"
              alt="Craft"
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>
      </section>

      {/* ================= Categories ================= */}

      <section
  id="categories"
  className="max-w-7xl mx-auto px-6 py-16"
>
  <h2 className="text-4xl font-bold text-center mb-3">
    Shop By Categories
  </h2>

  <p className="text-center text-gray-500 mb-12">
    Discover unique handmade collections crafted with love.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {/* Wooden Crafts */}

    <div className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-2xl transition">

      <img
        src="https://images.unsplash.com/photo-1517705008128-361805f42e86?w=700"
        alt="Wooden Crafts"
        className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-5 text-center">

        <h3 className="text-2xl font-bold">
          Wooden Crafts
        </h3>

      </div>

    </div>

    {/* Home Decor */}

    <div className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-2xl transition">

      <img
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700"
        alt="Home Decor"
        className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-5 text-center">

        <h3 className="text-2xl font-bold">
          Home Decor
        </h3>

      </div>

    </div>

    {/* Gift Items */}

    <div className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-2xl transition">

      <img
        src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&auto=format&fit=crop&q=80"
        alt="Gift Items"
        className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-5 text-center">

        <h3 className="text-2xl font-bold">
          Gift Items
        </h3>

      </div>

    </div>

    {/* Handmade Art */}

    <div className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-2xl transition">

      <img
        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700"
        alt="Handmade Art"
        className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-5 text-center">

        <h3 className="text-2xl font-bold">
          Handmade Art
        </h3>

      </div>

    </div>

  </div>

</section>

{/* Featured Products */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="text-center mb-12">

    <h2 className="text-4xl font-bold">
      Featured Products
    </h2>

    <p className="text-gray-500 mt-3">
      Discover our most loved handmade creations.
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {products.slice(0, 4).map((product) => (

      <div
        key={product._id}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
      >

        <div className="overflow-hidden">

          <img
  src={product.image}
  alt={product.name}
  className="w-full h-72 object-cover object-center group-hover:scale-105 transition duration-500"
/>

        </div>

        <div className="p-5">

         <h3 className="text-xl font-bold text-gray-800 mt-2 line-clamp-1">
  {product.name}
</h3>

          <p className="text-gray-500 text-sm mt-2 h-10 line-clamp-2">
  {product.description}
</p>
          <div className="flex items-center justify-between mt-5">

            <span className="text-emerald-600 font-bold text-xl">
              Rs. {product.price}
            </span>

            <span className="text-yellow-500">
              ⭐ 4.9
            </span>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>

    

      {/* ================= Why Choose Us ================= */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">

            Why Choose CraftNest?

          </h2>

          <div className="grid md:grid-cols-4 gap-10">

            <div className="text-center">

              <FaShippingFast className="text-5xl text-emerald-600 mx-auto mb-5" />

              <h3 className="font-bold text-xl">
                Free Shipping
              </h3>

              <p className="text-gray-500 mt-3">
                Fast and reliable delivery.
              </p>

            </div>

            <div className="text-center">

              <FaLeaf className="text-5xl text-emerald-600 mx-auto mb-5" />

              <h3 className="font-bold text-xl">
                Handmade Quality
              </h3>

              <p className="text-gray-500 mt-3">
                Crafted with care by artisans.
              </p>

            </div>

            <div className="text-center">

              <FaLock className="text-5xl text-emerald-600 mx-auto mb-5" />

              <h3 className="font-bold text-xl">
                Secure Payments
              </h3>

              <p className="text-gray-500 mt-3">
                Safe and trusted checkout.
              </p>

            </div>

            <div className="text-center">

              <FaUndoAlt className="text-5xl text-emerald-600 mx-auto mb-5" />

              <h3 className="font-bold text-xl">
                Easy Returns
              </h3>

              <p className="text-gray-500 mt-3">
                Hassle-free return policy.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Newsletter ================= */}

      <section className="bg-emerald-600 text-white py-20">

        <div className="max-w-3xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">

            Stay Updated

          </h2>

          <p className="mt-4 text-lg">

            Subscribe to receive updates on new handmade products
            and exclusive offers.

          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <input
  type="email"
  placeholder="Enter your email"
  className="flex-1 p-4 rounded-xl bg-white border-2 border-white text-gray-800 placeholder-gray-500 outline-none focus:ring-4 focus:ring-emerald-300"
/>

            <button
  onClick={() => setSubscribed(true)}
  className={`px-8 rounded-xl transition duration-300 ${
    subscribed
      ? "bg-green-700"
      : "bg-black hover:bg-gray-800"
  }`}
>
  {subscribed ? "Subscribed ✓" : "Subscribe"}
</button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;