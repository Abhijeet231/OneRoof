import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;