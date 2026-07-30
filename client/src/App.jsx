import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./pages/Dashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/products/add" element={<AddProduct />} />
<Route path="/admin/products/edit/:id" element={<EditProduct />} />
<Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
      </Routes>
    </MainLayout>
  );
}

export default App;