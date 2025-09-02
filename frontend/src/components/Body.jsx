import { useState, useEffect } from "react";
import Card from "./Card.jsx";


const Body = () => {
    let[listings, setListings] = useState([]);

    useEffect(() => {
    const fetchData = async() => {
       try {
         let data = await fetch("http://localhost:8000/api/v1/listings");
         let jsonData = await data.json();
         setListings(jsonData.message);
         console.log(jsonData);
       } catch (error) {
        console.log(error, "Error While Fetching Listings");
        
       }
    };

    fetchData();
        
}, [])
    
    return(
        <div className="mt-10 flex flex-wrap px-6 sm:px-4 md:px-5 lg:px-20">
            
            {listings.map((listing) => 
             <Card key={listing._id} data = {listing} />
            )}
          
        </div>
    )
};

export default Body;