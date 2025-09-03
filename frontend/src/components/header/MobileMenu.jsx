// MobileMenu.jsx
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 shadow-md md:hidden mt-6 rounded-lg">
      <NavLink
        to="/login"
        className="px-4 py-2 border-2 rounded-lg text-green-600 hover:bg-green-50"
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Register
      </NavLink>
    </div>
  );
};

export default MobileMenu;
