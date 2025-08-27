import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;