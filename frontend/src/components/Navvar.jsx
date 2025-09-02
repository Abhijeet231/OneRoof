
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-10 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            OneRoof
          </h1>
          <i className="fa-solid fa-people-roof text-gray-800"></i>
        </div>

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
            <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium">
              Login
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Register
            </button>
          </div>

          {/* Small screens: Hamburger */}
          <button
            className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-800 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2">
          <button className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium">
            Login
          </button>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
            Register
          </button>
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition mt-2"
          />
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mt-2">
            Search
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
