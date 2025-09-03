// Hamburger.jsx
const Hamburger = ({ open, toggle }) => {
  return (
    <button
      className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
      onClick={toggle}
    >
      <span
        className={`block h-0.5 w-6 bg-gray-800 transition-transform ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-gray-800 transition-opacity ${
          open ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-gray-800 transition-transform ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  );
};

export default Hamburger;
