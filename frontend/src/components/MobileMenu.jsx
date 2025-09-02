const MobileMenu = ({ isOpen }) => {
  if (!isOpen) return null; // optional early return

  return (
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
  );
};

export default MobileMenu;
