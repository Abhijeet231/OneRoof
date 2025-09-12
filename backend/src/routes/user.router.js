import {Router} from "express";
import {registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "../validators/user.validator.js"

const router = Router();

//Register a new user
router.post('/register', validate(signupSchema), registerUser);

//Login user
router.post('/login', validate(loginSchema), loginUser);

//Logout user (Protected route)
router.post('/logout', verifyJWT, logoutUser);

//Refresh token
router.post('/refresh', refreshAccessToken);

export default router;