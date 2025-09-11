


import { useState } from "react";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
   <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-10 py-3 relative">
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

        {/* Search */}
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

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Host Button (still visible on desktop) */}
          <NavLink
            to="/host"
            className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-600 to-orange-400 text-white hover:opacity-90 transition"
          >
          
            Host with OneRoof
          </NavLink>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border hover:shadow-md transition"
            >
              <i className="fa-solid fa-user text-green-600"></i>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

         
        </div>
      </div>

    
    </nav>
  );
};

export default Navbar;
