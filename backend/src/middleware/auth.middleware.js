import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookie or header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request - No token provided");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized request - User not found");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired Access Token");
  }
});

export default verifyJWT;
