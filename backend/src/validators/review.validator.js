import Joi from "joi";
//add review, update review

//Schema for Creating a new Review
export const createReviewSchema = Joi.object({
    comment: Joi.string().min(1).max(500).required(),
    author: Joi.string().hex().length(24).required(),
    rating: Joi.number().min(1).max(5).required()
});

//Schema for Updating a Review
export const updateReviewSchema = Joi.object({
    comment: Joi.string().min(1).max(500),
}).min(1);
