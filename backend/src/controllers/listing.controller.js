import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Listing from "../models/listing.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";



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
        owner: req.user._id 
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
   if(location) listing.price = price;
   if(country) listing.price = price;

   //Handle Image Changes
   if(req.file){
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
     
    if(!cloudinaryRes){
        throw new ApiError(500, "Image Upload failed")
    };

    listing.image = cloudinaryRes.secure_url;

   };

   //If no change at all
   if(listing.isModified() === false){
    return res.status(400).json(new ApiResponse(400, "No Changes Detected"), listing);
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