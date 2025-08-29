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

const router = Router();

//Create Review
router.post(
    "/:id/reviews",
    verifyJWT,
    validate(createReviewSchema),
    createReview
);

//Update Review
router.put(
    "/:id/reviews/:reviewId",
    verifyJWT,
    validate(updateReviewSchema),
    updateReview
);

//Delete Review
router.delete(
    "/:id/reviews/:reviewId",
    verifyJWT,
    deleteReview
);