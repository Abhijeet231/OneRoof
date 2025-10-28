import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js"


const isProduction = process.env.NODE_ENV === "production";

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
       throw new ApiError(400, "User Already Exists")
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

    let listingIds = [];
    if(loggedInUser.isHost){
        listingIds = await Listing.find({owner: loggedInUser._id}).distinct("_id");
    }

    //Setting Up Cookie Options
    const options = {
        httpOnly: true,
        secure: isProduction ,
        sameSite: isProduction ? "none" : "Strict" ,
        
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, listingIds ,accessToken, refreshToken
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
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict"
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
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict"
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

//Unique checks
if(email && email !== user.email){
    const emailExists = await User.findOne({email});
    if(emailExists) throw new ApiError(400, "Email already in use");
    user.email = email.toLowerCase();
}

if(userName && userName !== user.userName){
    const userNameExists = await User.findOne({userName});
    if(userNameExists) throw new ApiError(400, "Username already in use");
    user.userName = userName;
}

//Update other fields if provided
if(fullName && fullName !== user.fullName) user.fullName = fullName;
if(about && about !== user.about) user.about = about;
if (language && Array.isArray(language) && language.length > 0) {
  user.language = language;
}

if(password) user.password = password;


//Handle Profile Image upload 
if(req.file) {
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    if(!cloudinaryRes) throw new ApiError(500, "Image Upload Failed");

    //delete old image only after new one is uploaded
    if(user.profileImage?.public_id){
        await deleteFromCloudinary(user.profileImage.public_id);
    }

    user.profileImage = {
        url: cloudinaryRes.secure_url,
        public_id: cloudinaryRes.public_id,
    };
}

//Check if any changes were amde
const hasUpdates = Object.keys(req.body).length > 0 || req.file;

if (!hasUpdates) {
  return res.status(400).json(new ApiResponse(400, "No data provided"));
}


//Save Changes
await user.save();

//Return safe user object
const safeUser = await User.findById(req.user._id).select("-password -refreshToken");

return res.status(200).json(new ApiResponse(200,  safeUser ,"User Profile Updated Successfully"));


});

//Delete User 
const deleteUser  = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    //Get all listings with their images
    const listings = await Listing.find({owner: user._id}).select('image');

    //Collect all cloudinary public_ids to delete
    const cloudinaryPromise = listings.filter(listing => listing.image?.public_id).map(listing => 
        deleteFromCloudinary(listing.image.public_id).catch(err => 
            console.log('Failed to delete listing images', listing.image.public_id, err)
            
        )
    );
 
    //Adding User profile image to the deletion array
    if(user.profileImage?.public_id){
        cloudinaryPromise.push(
            deleteFromCloudinary(user.profileImage.public_id).catch(err => console.log("Failed to delete profile image", user.profileImage.public_id, err)
            )
        )
    }

    //Executing all cloudinary deletions in parallel
    if(cloudinaryPromise.length > 0){
        await Promise.allSettled(cloudinaryPromise);
    }
      
    //Deleting all reviews created by user
    await Review.deleteMany({author: user._id});

    //Deleting all Listings from database
    await Listing.deleteMany({owner: user._id});

     //Deleting the user 
     const deletedUser = await User.findByIdAndDelete(user._id);


     // 8. Clear authentication cookies
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true, 
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict"
    });

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