import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";


const ShowListing = () => {

    const {id} = useParams(); // grabs the :id from the url
    const [listing,setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async() => {
            try{
                const res = await api.get(`/listings/${id}`);
                setListing(res.data.message);
                console.log(res);
                
            }catch(err){
                console.log(err.response?.data || err.message, "Error Fetching Listing Details");
                toast.error("⚠️ Could not load listing details");
                
            }
        }
        fetchListing();
    }, [id])

    if(!listing) return <p>Loading...</p>;

    return(
        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">

  {/* Image with Title overlay */}
  <div className="relative">
    <img
      src={listing.image.url}
      alt="Listing"
      className="w-full h-80 object-cover"
    />
    <h1 className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-lg text-xl font-bold text-gray-800 shadow">
      {listing.title}
    </h1>
  </div>

  {/* Content */}
  <div className="p-6 space-y-4">
    {/* Description */}
    <p className="text-gray-700 text-lg leading-relaxed">
      {listing.description}
    </p>

    {/* Price */}
    <p className="text-2xl font-semibold text-gray-900">
      ₹{listing.price} <span className="text-base text-gray-500">/ night</span>
    </p>

    {/* Location */}
    <div className="text-gray-600">
      <p className="font-medium">{listing.location}</p>
      <p className="text-sm">{listing.country}</p>
    </div>

    {/* Host info */}
    <div className="pt-4 border-t">
      <p className="text-sm text-gray-500">
        Hosted by:{" "}
        <span className="font-medium text-gray-800">
          {listing.owner.userName}
        </span>
      </p>
    </div>

    {/* Book Button */}
  <div className="pt-6 flex gap-4">
  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md transition">
    Book Now
  </button>
 <button className="flex-1 border-2 border-green-500 hover:bg-green-50 text-green-600 py-3 rounded-xl font-semibold shadow-sm transition flex items-center justify-center gap-2">
   Chat with Host
</button>

</div>

  </div>
</div>

    )
};

export default ShowListing;