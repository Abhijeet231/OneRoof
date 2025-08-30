import { Router } from "express";
import{
    createReview,
  updateReview,
  deleteReview
} from "../controllers/review.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createReviewSchema,
    updateReviewSchema
} from "../validators/review.validator.js";
import Listing from "../models/listing.model.js";

const router = Router();

//Create Review
router.post(
    "/",
    verifyJWT,
    validate(createReviewSchema),
    createReview
);

//Update Review
router.put(
    "/:reviewId",
    verifyJWT,
    validate(updateReviewSchema),
    updateReview
);

//Delete Review
router.delete(
    "/:reviewId",
    verifyJWT,
    deleteReview
);


export default router;