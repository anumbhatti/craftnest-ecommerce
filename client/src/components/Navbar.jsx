import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">

        <Link
          to="/"
          className="text-3xl font-bold text-emerald-600"
        >
          CraftNest
        </Link>

        <nav className="hidden md:flex gap-8 font-medium">

          <Link to="/" className="hover:text-emerald-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-emerald-600">
            Products
          </Link>

          <Link to="/about" className="hover:text-emerald-600">
            About
          </Link>

          <Link to="/contact" className="hover:text-emerald-600">
            Contact
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="hover:text-emerald-600 flex items-center gap-2"
            >
              <FaTachometerAlt />
              Dashboard
            </Link>
          )}

          {token && (
            <Link
              to="/orders"
              className="hover:text-emerald-600"
            >
              My Orders
            </Link>
          )}

        </nav>

        <div className="flex items-center gap-5">

          {token && (
            <>
              <Link to="/cart" className="relative">
                <FaShoppingCart size={23} />

                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>

              <Link to="/wishlist" className="relative">
                <FaHeart
                  size={23}
                  className="text-red-500"
                />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>
            </>
          )}

          {!token ? (
            <Link
              to="/login"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            >
              <FaUser />
              Login
            </Link>
          ) : (
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;