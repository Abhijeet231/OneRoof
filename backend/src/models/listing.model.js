import mongoose from "mongoose";
import Review from "./review.model.js";
import User from "./user.model.js";



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
        
       url: { type: String,required: true},
       public_id: {type: String, required: true}
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
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },

    availability: {
        startDate: Date,
        endDate: Date
    },
    bookings: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Booking"}
    ]
});

//Post Middleware for deleting reviews
listingSchema.post('findOneAndDelete', async function(listing){
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})

    }
});// will run on - Listing.findByIdAndDelete(id);

//Post  Middleware for Checkign if user is Host 
listingSchema.post("save", async function(doc) {
    try{
        const userId = doc.owner;
        const user = await User.findById(userId);

        if(user && !user.isHost){
            user.isHost = true;
            await user.save();
        }
       
    }catch(err){
      console.log(err);
      
    }
})


//Post Middleware for isHost when listing deleted
listingSchema.post("findOneAndDelete", async function(listing) {
    try{
        if(listing && listing.owner){
            const count = await Listing.countDocuments({owner: listing.owner});

            if(count === 0) {
                await User.findByIdAndUpdate(listing.owner, {isHost: false});
            }
        }
        
    }catch(err){
       console.log(err);
       
    }
});


const Listing = mongoose.model("Listing", listingSchema);

export default Listing;