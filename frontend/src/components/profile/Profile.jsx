import { useAuth } from "@/components/provider/AuthProvider";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";





const Profile = () => {
  const { currentUser } = useAuth();
  const [listings ,setListing] = useState([]);
console.log("Current user is : ", currentUser);


useEffect(() => {
  const fetchListing = async() => {
    if(!currentUser?.listings?.length) return;

    try{
      const res = await api.get(`/listings?ids=${currentUser.listings.join(",")}`);
      setListing(res?.data?.data?.listings);
      console.log("This is RESSSSPONSSS", listings);
      
    }catch(err){
      console.log("Failed to feetch all listings", err.message);
      toast.error(`⚠️ ${"Failed to fetch all Listings"}`)
      
    }
  };
  if(currentUser?.listings){
    fetchListing();
  }

}, [currentUser]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-purple-50 rounded-2xl shadow-lg p-8 text-center border border-gray-200">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-4xl text-white shadow-md">
            {currentUser.user?.fullName?.charAt(0) || "U"}
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome, {currentUser.user?.fullName || "User"}
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your profile and listings from here ✨
        </p>

        {/* User Info */}
        <div className="text-center space-y-2 max-w-md mx-auto text-gray-700">
          <p>
            <span className="font-semibold">User Name:</span>{" "}
            {currentUser.user?.userName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {currentUser.user?.email}
          </p>
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {currentUser.user?.fullName}
          </p>
          <p>
            <span className="font-semibold">About:</span>{" "}
            {currentUser.user?.about || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {currentUser.user?.language?.length > 0
              ? currentUser.user.language.join(", ")
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
        {currentUser.user?.isHost ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Example listings – replace with dynamic data */}

             {listings.map((listing) => 
 
                <Link
                 key={listing._id}
                 to={`/listings/${listing._id}`}
                 className="block"
                >
                    
                   <div
                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src= {listing?.image?.url}
                  alt="Listing"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {listing?.title}
                  </h3>
                  <p className="text-gray-600 text-sm">₹{listing?.price} / night</p>
                </div>
              </div>  </Link>            

             )}

             
             
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
