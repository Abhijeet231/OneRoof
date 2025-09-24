import { useAuth } from "@/components/provider/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-4xl text-white shadow-md">
            {currentUser?.fullName?.charAt(0) || "U"}
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome, {currentUser?.fullName || "User"}
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your profile and listings from here ✨
        </p>

        {/* User Info */}
        <div className="text-center space-y-2 max-w-md mx-auto text-gray-700">
          <p>
            <span className="font-semibold">User Name:</span>{" "}
            {currentUser?.userName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {currentUser?.email}
          </p>
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {currentUser?.fullName}
          </p>
          <p>
            <span className="font-semibold">About:</span>{" "}
            {currentUser?.about || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {currentUser?.language?.length > 0
              ? currentUser.language.join(", ")
              : "Not provided"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition">
            ✏️ Edit Profile
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition">
            🗑️ Delete Profile
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10" />

      {/* Listings Section or Become Host */}
      <div>
        {currentUser?.isHost ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Example listings – replace with dynamic data */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Listing"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Cozy Apartment</h3>
                  <p className="text-gray-600 text-sm">$25.00 / night</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Listing"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Lakeside Cabin</h3>
                  <p className="text-gray-600 text-sm">$45.00 / night</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              You don’t have any listings yet.
            </p>
            <Link to= "/listings" className="px-6 py-3 rounded-lg bg-green-500 text-white font-medium shadow-md hover:bg-green-600 transition">
              🌟 Become a Host
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
