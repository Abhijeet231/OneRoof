import { useState } from "react";
import Hamburger from "../header/Hamburger.jsx";
import MobileMenu from "../header/MobileMenu.jsx";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-10 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-400 bg-clip-text text-transparent">
              OneRoof
            </h1>

            <i className="fa-solid fa-people-roof text-black-600"></i>
          </div>
        </Link>

        {/* Search (hidden on very small screens) */}
        <div className="hidden sm:flex items-center flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
          <button className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Search
          </button>
        </div>

        {/* Auth buttons / Hamburger */}
        <div className="flex items-center space-x-3">
          {/* Medium+ screens */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 border rounded-lg font-medium transition duration-300 ${
                  isActive
                    ? "border-transparent bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-orange-400"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  isActive
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`
              }
            >
              Register
            </NavLink>
      </div>
          

          {/* Small screens: Hamburger */}
          <Hamburger open={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={menuOpen} />
    </nav>
  );
};

export default Navbar;
