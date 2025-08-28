import {Router} from "express";
import {registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = Router();

//Register a new user
router.post('/register', validate, registerUser);

//Login user
router.post('/login', validate, loginUser);

//Logout user (Protected route)
router.post('/logout', verifyJWT, logoutUser);

export default router;