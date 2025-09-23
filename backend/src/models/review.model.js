import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min:1,
        max:5,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    }

}, {timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;