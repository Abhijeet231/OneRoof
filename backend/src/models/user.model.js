import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },

    // Profile Section
    about: {type: String, trim: true},
    language: [{type: String}],
    profileImage: {
        url: {type: String},
        public_id: {type: String}
    },

    // Host / Guest Differentiation
    isHost: {type: Boolean, default: false},

    // Verifications (for email/OTP)
    emailVerified: {type: Boolean, default: false},
    otp: {type: String}, // if you choose OTP route
    otpExpiry: {type: Date},
}, 
{timestamps: true}
);

//Hashing Password
userSchema.pre('save', async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 8)
    next();
});

//Checking Password
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
};

//Generating AccessToken
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

//Generating RefreshToken
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};



const User = mongoose.model('User', userSchema);

export default User;