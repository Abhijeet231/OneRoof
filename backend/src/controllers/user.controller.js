import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js"




//Generating Access and Refresh Token
const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    }catch(err){
        throw new ApiError(500, "Error while generating Refresh and Access Token")
    }
};

//Register User
const registerUser = asyncHandler(async(req,res) => {

    console.log("Incoming Body:", req.body);
    
    const{userName, email, fullName, password } = req.body;

    //Checkign Duplicate Users
    const existedUser = await User.findOne({
        $or:[{userName}, {email}]
    });
   
    if(existedUser){
        throw new ApiError(409, "User Already Exists")
    };

    //Creating User and saving it to DB
    const user = await User.create({
        userName,
        email: email.toLowerCase(),
        fullName,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While Registering the User!!")
    };

    const newResponse = new ApiResponse(201, createdUser, "User Registered Successfully");

    return res.status(newResponse.statusCode).json(newResponse);
    
});

//Login User
const loginUser = asyncHandler(async(req,res) => {
    const{userName, password} = req.body;

    const user = await User.findOne({userName});

    if(!user){
        throw new ApiError(404, "Invalid Credentials")
    };

    //Checking Password
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Credentials")
    };

    const{accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //Setting Up Cookie Options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ,
        sameSite:"strict"
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User LoggedIn Successfully"
        )
    )
});

//Logout User
const logoutUser = asyncHandler(async(req,res) => {

    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized request");
    };

const user =   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    if(!user){
        throw new ApiError(404, "User not Found!")
    }

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
};

return res
.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(new ApiResponse(200, {}, "User Logged Out"))

});

//sending User Details
const getCurrentUser = asyncHandler(async (req, res) => {
  const currUser = await User.findById(req.user._id) ;
  if (!currUser) {
    return res.status(404).json(
      new ApiResponse(404, null, "User not found")
    );
  }

  let listingIds = [];

  if(currUser.isHost){
    listingIds = await Listing.find({owner: currUser._id}).distinct("_id");
  }

  return res.status(200).json(
    new ApiResponse(200, { currUser,listingIds }, "Current user fetched successfully")
  );
});



//Refresh Access Token
const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    };

    try{
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if(!user){
            throw new ApiError(401, 'Invalid Refresh Token')
        };

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, 'Refresh Token is Expired or Used')
        };

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        };

        const{accessToken, refreshToken:newRefreshToken} = await generateAccessAndRefreshToken(user._id);

        return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken:newRefreshToken },
                "Access Token Refreshed Successfully"
            )
        )
    }catch(err){
        throw new ApiError (401, err?.message || "Invalid refresh token")
    }

});

//Update User Profile
const updateProfile = asyncHandler(async(req,res) => {

    
const {userName, email, fullName, password, about, language} = req.body;

// Find User
const user = await User.findById(req.user._id);
if(!user){
    throw new ApiError(404, "User not found")
};

//Update fileds if provided
if(userName) user.userName = userName;
if(email) user.email = email;
if(fullName) user.fullName = fullName;
if(about) user.about = about;
if(language && Array.isArray(language)) user.language = language; // language must be an array
if(password) user.password = password;

// Handling Image Changes
if(req.file){

    //Delte old image if exists
    if(user.profileImage?.public_id){
        await deleteFromCloudinary(user.profileImage.public_id);
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path);

    if(!cloudinaryRes) {
        throw new ApiError(500, "Image upload failed")
    };

    user.profileImage = {
        url: cloudinaryRes.secure_url,
        public_id: cloudinaryRes.public_id
    };
};

// If no changes at all
const hasChanges =
    user.isModified('userName') ||
    user.isModified('email') ||
    user.isModified('fullName') ||
    user.isModified('about') ||
    user.isModified('language') ||
    user.isModified('password') ||
    req.file; // profileImage updated
if(!hasChanges) return res.status(400).json(new ApiResponse(400, "No Changes Detected"));

await user.save();

const safeUser = await User.findById(req.user._id).select("-password -refreshToken");

return res.status(200).json(new ApiResponse(200, "User Profile Updated Successfully", safeUser));


});

//Delete User 
const deleteUser  = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    //Deleting all Reviews created by user
    await Review.deleteMany({author: user._id});

    //Deletign all  Listings created by user
      
    const listings = await Listing.find({ owner: user._id });
    for (const listing of listings) {
        // If listings have images on Cloudinary, clean them up
        if (listing.images && listing.images.length > 0) {
            for (const img of listing.images) {
                if (img.public_id) {
                    await deleteFromCloudinary(img.public_id);
                }
            }
        }
    }

    await Listing.deleteMany({owner: user._id});

     //Delete User and other related details
     if(user.profileImage?.public_id){
        await deleteFromCloudinary(user.profileImage.public_id);
     }

   const deletedUser = await User.findByIdAndDelete(user._id);

    return res.status(200).json(new ApiResponse(200,{}, "User Deleted Successfully" ))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    updateProfile,
    deleteUser
}