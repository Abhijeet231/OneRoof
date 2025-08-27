import mongoose from "mongoose";
import Review from "./review.model";


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
       
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

//Post Middleware
listingSchema.post('findOneAndDelete', async function(listing){
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});// will run on - Listing.findByIdAndDelete(id);


const Listing = mongoose.model("Listing", listingSchema);

export default Listing;