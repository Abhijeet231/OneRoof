import { useState, useEffect } from "react";
import Card from "@/components/card/Card.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Body = () => {
    let[listings, setListings] = useState([]);

    useEffect(() => {
    const fetchData = async() => {
       try {
         const res = await axios.get("http://localhost:8000/api/v1/listings");
         setListings(res.data.message);
         console.log(res.data);
         
        } catch (error) {
            console.log(error.response?.data || error.message, "Error While Fetching Listingsxxxxx");
            toast.error(`⚠️ ${error.message}` || "Error While Fetching data from backend")

        }
    };
        

    fetchData();
        
}, [])
    
    return(
        <div className="mt-10 flex flex-wrap px-6 sm:px-4 md:px-5 lg:px-20">
            
            {listings.map((listing) => 
             <Link key={listing._id} to= {`/listings/${listing._id}`}>
             <Card  data = {listing} />
             </Link>
            )}
          
        </div>
    )
};

export default Body;