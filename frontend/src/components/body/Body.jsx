import { useState, useEffect } from "react";
import Card from "@/components/card/Card.jsx";
import api from "@/lib/api.js"; // ✅ use your configured axios instance
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ShimmerBody from "@/components/shimmer/ShimmerBody";

const Body = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ use api instead of plain axios
        const res = await api.get("/listings");
        setListings(res.data.data.listings);
      } catch (error) {
        console.log(
          error.response?.data || error.message,
          "Error While Fetching Listingsxxxxx"
        );
        toast.error("⚠️ Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log("THIS IS LISTINGS", listings);
  }, []);

  if (loading) return <ShimmerBody />;

  return (
    <div className="mt-10 flex flex-wrap px-6 sm:px-4 md:px-5 lg:px-20">
      {Array.isArray(listings) &&
        listings.map((listing) => (
          <Link key={listing._id} to={`/listings/${listing._id}`}>
            <Card data={listing} />
          </Link>
        ))}
    </div>
  );
};

export default Body;
