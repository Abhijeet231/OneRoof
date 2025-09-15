import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";




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
const getCurrentUser = asyncHandler(async(req,res) => {
    return res.status(200).json(
        new ApiResponse(200, {user: req.user}, "Current user fetched Successfully")
    )
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


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken
}