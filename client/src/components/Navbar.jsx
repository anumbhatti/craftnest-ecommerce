import { Link, NavLink, useNavigate } from "react-router-dom";
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
  className="text-3xl font-extrabold tracking-wide"
>
  <span className="text-slate-900">Craft</span>
  <span className="text-emerald-600">Nest</span>
</Link>

        <nav className="hidden md:flex gap-8 font-medium">

          <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  Home
</NavLink>

          <NavLink
  to="/products"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  Products
</NavLink>

          <NavLink
  to="/about"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  About
</NavLink>

          <NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  Contact
</NavLink>

          {user?.role === "admin" && (
            <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  Dashboard
</NavLink>
          )}

          {token && (
            <NavLink
  to="/orders"
  className={({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "hover:text-emerald-600 transition"
  }
>
  My Orders
</NavLink>
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
              className="border-2 border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition duration-300 flex items-center gap-2"
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