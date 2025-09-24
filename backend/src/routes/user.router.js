import {Router} from "express";
import {registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateProfile,deleteUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema, updateUserSchema } from "../validators/user.validator.js"

const router = Router();

//Register a new user
router.post('/register', validate(signupSchema), registerUser);

//Login user
router.post('/login', validate(loginSchema), loginUser);

//Logout user (Protected route)
router.post('/logout', verifyJWT, logoutUser);

//Refresh token
router.post('/refresh', refreshAccessToken);

//Get User Details
router.get("/me", verifyJWT, getCurrentUser);

//Update user profile (protected route)
router.put('/me', verifyJWT, validate(updateUserSchema), updateProfile);

//Delete user 
router.delete('/me',verifyJWT, deleteUser);

export default router;