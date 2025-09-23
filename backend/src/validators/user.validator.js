import Joi from "joi";
// signup, login, update

//Schema for Registerign a new User
export const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(60).required(),
    email: Joi.string().email().lowercase().required(),
    fullName: Joi.string().min(3).max(60).required(),
    password: Joi.string().min(6).required(),
   
});

// https://chatgpt.com/s/t_68ad9b8b31748191910aa64115899b15  - refer this chatgpt response about how to use confirmPassword.

//Schema for Login
export const loginSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().required()
});

//Schema for Updating User Profile
export const updateUserSchema = Joi.object({
    userName: Joi.string().min(3).max(30),
    email: Joi.string().email().lowercase(),
    fullName: Joi.string().min(3).max(100),
    password: Joi.string().min(6),
    about: Joi.string().max(500),
    language: Joi.array().items(Joi.string()),
}).min(1);
