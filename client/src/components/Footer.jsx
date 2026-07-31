import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <h2 className="text-3xl font-bold text-white">

            Craft<span className="text-emerald-500">Nest</span>

          </h2>

          <p className="mt-5 leading-7">

            CraftNest is your destination for premium handmade
            products, wooden décor, personalized gifts and
            beautiful artisan creations.

          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">

            Quick Links

          </h3>

          <ul className="space-y-3">

            <li>
              <Link to="/" className="hover:text-emerald-500">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-emerald-500">
                Products
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-emerald-500">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-emerald-500">
                Cart
              </Link>
            </li>

          </ul>

        </div>

        {/* Customer */}

        {/* Customer */}

<div>

  <h3 className="text-xl font-bold text-white mb-5">
    Customer Service
  </h3>

  <ul className="space-y-3">

    <li>
      <Link
        to="#"
        onClick={(e) => e.preventDefault()}
        className="hover:text-emerald-500 transition"
      >
        FAQs
      </Link>
    </li>

    <li>
      <Link
        to="#"
        onClick={(e) => e.preventDefault()}
        className="hover:text-emerald-500 transition"
      >
        Shipping
      </Link>
    </li>

    <li>
      <Link
        to="#"
        onClick={(e) => e.preventDefault()}
        className="hover:text-emerald-500 transition"
      >
        Returns
      </Link>
    </li>

    <li>
      <Link
        to="#"
        onClick={(e) => e.preventDefault()}
        className="hover:text-emerald-500 transition"
      >
        Support
      </Link>
    </li>

  </ul>

</div>
        {/* Contact */}

        <div>

          <h3 className="text-xl font-bold text-white mb-5">

            Contact

          </h3>

          <p>Email: anumsanaulah@gmail.com</p>

          <p className="mt-2">Phone: +92 320 9118134</p>

          <p className="mt-2">

            Islamabad, Pakistan

          </p>

          <div className="flex gap-4 mt-6">

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition"
            >
              <FaGithub />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700 py-6 text-center">

        © {new Date().getFullYear()} CraftNest.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;