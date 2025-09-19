import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Listing from "../models/listing.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import axios from "axios";
import countries from "i18n-iso-countries";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const enLocale = require("i18n-iso-countries/langs/en.json");

countries.registerLocale(enLocale);

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;


//GeoCoding Helper Code
const geocodeLocationV6 = async(location, country) => {
    //Convert full countries name to ISO Alpha-2 code
    const countryCode = countries.getAlpha2Code(country, "en");

    if(!countryCode) {
        countryCode = countries.alpha3ToAlpha2(country.toUpperCase());
    }
         
    // Fallback: use raw input if still not found
    const query = countryCode
    ? `${location}, ${countryCode}`
    : `${location}, ${country}`;
    
   const url = `https://api.mapbox.com/search/geocode/v6/forward`;

   const params = {
    q: query,
    access_token: MAPBOX_TOKEN,
    limit: 1,
   
   };


   const res = await axios.get(url, {params});

   if(!res.data.features || res.data.features.length === 0) {
    console.error("Mapbox returned no result:", res.data);
    throw new ApiError(400, "Could not find  location in", country, "please Check Spelling or Enter Valid Location");
    
   }

  const feature = res.data.features[0];
  
  return{
    type: feature.geometry.type,
    coordinates: feature.geometry.coordinates,
  };
};


//Get All Listing
const getAllListing = asyncHandler(async(req,res) => {
    const listings = await Listing.find().populate("owner", "userName email");

    res.status(200)
    .json(new ApiResponse(200, "All Listing Fetched", listings));
});

//Get Single Listing
const getListingsById = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const listing = await Listing.findById(id).populate("owner", "userName email");
    if(!listing){
        throw new ApiError(404, "Listing not Found");
    }

    res.status(200)
    .json(new ApiResponse(200, "Listing Fetched Successfully", listing))
});




//Create New Listing
const createListing = asyncHandler(async(req,res) => {

    const {title, description, price, location, country } = req.body;
    console.log("Location:", location, "country:", country);
    
    
    const geoData = await geocodeLocationV6(location, country);

   if(!req.file){
       throw new ApiError(400, "Image Required")
   }

    //Upload to Cloudinary
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    if(!cloudinaryRes){
        throw new ApiError(500, "Image Upload Failed");
    }

    //Create New Listing
    const listing = new Listing({
        title,
        description,
        image:{
            url: cloudinaryRes.secure_url,
            public_id: cloudinaryRes.public_id
        },
        price,
        location,
        country,
        owner: req.user._id ,
        geometry: {
            type: geoData.type,
            coordinates: geoData.coordinates
        },
    });

    await listing.save();

    res.status(201).json(new ApiResponse(201, "listing created successfully", listing));

});

//Update Listing
const updateListing = asyncHandler(async(req,res) => {
   const {id} = req.params;
   const {title, description, price, location, country} = req.body;
   
   //Find Listing
   const listing = await Listing.findById(id);
   if(!listing){
    throw new ApiError(404, "Listing not found")
   };

   //Check Ownership
   if(listing.owner.toString() !== req.user._id.toString()){
    throw new ApiError(403, "You are not authorized to update this listing");
   }

   //Update fileds if provided
   if(title) listing.title = title;
   if(description) listing.description = description;
   if(price) listing.price = price;
  if(location || country){
    listing.location = location || listing.location;
    listing.country = country || listing.country;

    //Re-geocode if location or country chagned
    const geoData = await geocodeLocationV6(listing.location, listing.country);
    listing.geometry = {
        type: geoData.type,
        coordinates: geoData.coordinates
    };
    
  }

   //Handle Image Changes
   if(req.file){
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
     
    if(!cloudinaryRes){
        throw new ApiError(500, "Image Upload failed")
    };

    listing.image = {
        url: cloudinaryRes.secure_url,
        public_id: cloudinaryRes.public_id
    }

   };

   //If no change at all
   if(listing.isModified() === false){
    return res.status(400).json(new ApiResponse(400, "No Changes Detected")); // here used to send listing after Detected"),listing
   };

   await listing.save();

   return res.status(200).json(new ApiResponse(200, "Listing Updated Successfully", listing));

});

//Delete Listing
const deleteListing = asyncHandler(async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing){
        throw new ApiError(404, "Listing Not found")
    };

    //Checkign Ownership
    if(listing.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are Not authorized to Delete this listing")
    };

    //Delete image from Cloudinary
    if(listing.image?.public_id){
        await deleteFromCloudinary(listing.image.public_id);
    }

    //Delete Listing
    const trashedListing = await Listing.findByIdAndDelete(listing.id);

    res.status(200).json(new ApiResponse(200, "Listing Deleted SuccessFully", trashedListing))

})



export {
    getAllListing,
    getListingsById,
    createListing,
    updateListing,
    deleteListing
}