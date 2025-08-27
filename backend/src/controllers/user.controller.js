import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
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

    const{userName, email, fullName, password } = req.body;

    //Checkign Duplicate Users
    const existedUser = await User.findOne({
        $or:[{userName, email}]
    });
   
    if(existedUser){
        throw new ApiError(409, "User Already Exists")
    };

    //Creating User and saving it to DB
    const user = await User.create({
        userName,
        email,
        fullName,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While Registering the User!!")
    };

    const newResponse = new ApiResponse(200, createdUser, "User Registered Successfully");

    return res.status(newResponse.statusCode).json(newResponse);
    

});
    