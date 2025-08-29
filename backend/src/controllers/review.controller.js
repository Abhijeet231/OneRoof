import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { mongo } from "mongoose";

// Create new Review
const createReview = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { comment, rating } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    // 1. Find parent listing
    const listing = await Listing.findById(id).session(session);
    if (!listing) {
      throw new ApiError(404, "Listing Not Found");
    }

    // 2. Prevent duplicate review
    const existedReview = await Review.findOne({
      author: userId,
      _id: { $in: listing.reviews },
    }).session(session);

    if (existedReview) {
      throw new ApiError(400, "You have already reviewed this property");
    }

    // 3. Create review
    const review = new Review({
      comment,
      rating,
      author: userId,
    });
    await review.save({ session });

    // 4. Add review ref to listing
    listing.reviews.push(review._id);
    await listing.save({ session });

    // 5. Commit transaction
    await session.commitTransaction();
    session.endSession();

    // 6. Populate author before sending response
    await review.populate("author", "userName email");

    return res
      .status(201)
      .json(new ApiResponse(201, "Review Created Successfully", review));

  } catch (error) {

    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});
/////////////////////////////////////////////////////////////////////////////////////

//Update Review
const updateReview = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { comment, rating } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    // 1. Find review
    const review = await Review.findById(id).session(session);
    if (!review) {
      throw new ApiError(404, "Review Not Found");
    }

    // 2. Check if user is the author
    if (review.author.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to update this review");
    }

    // 3. Update review
    let updated = false;

  if (comment && comment !== review.comment){
     review.comment = comment;
     updated = true;
  };

  if(rating && rating !==review.rating ) {
    review.rating = rating;
    updated = true;
  };

  if(updated){
    await review.save({session});
  }

    // 4. Commit transaction
    await session.commitTransaction();
    session.endSession();

    // 5. Populate author before sending response
    await review.populate("author", "userName email");

    return res
      .status(200)
      .json(new ApiResponse(200, "Review Updated Successfully", review));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

////////////////////////////////////////////////////////////////////////////////////

//Delete Review
 const deleteReview = asyncHandler(async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {id} = req.params; //review id
        const userId = req.user._id;

        //Find review
        const review = await Review.findById(id).session(session);
        if(!review){
            throw new ApiError(404, 'Review Not Found')
        };

        //Find the listing that contains this review
        const listing = await Listing.findOne({reviews: id}).session(session);
        if(!listing){
            throw new ApiError(404, "Parent Listing not found for this review")
        };

        //Authorization : must be Review author or Listing author
        if(
            review.author.toString() !== userId.toString() &&
            listing.owner.toString() !== userId.toString()
        ){
            throw new ApiError(403, "You are not Authorized to delete this review")
        };

        //Delete Review from collection
        await Review.findByIdAndDelete(id, {session});

        //Remove review reference from listing
        listing.reviews.pull(id);
        await listing.save({session});

        //Commit transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(
            new ApiResponse(200, "Review Deleted Successfully", null)
        )

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, error.message || "Internal Server Error");

    }
 })

