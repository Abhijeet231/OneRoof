import { Router } from "express";
import{
    createReview,
  updateReview,
  deleteReview,
  getAllReviewForListing,
  getReviewById
} from "../controllers/review.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createReviewSchema,
    updateReviewSchema
} from "../validators/review.validator.js";



const router = Router();

router.route("/")
.get(getAllReviewForListing)
.post(verifyJWT, validate(createReviewSchema), createReview)


router.route("/:reviewId")
.get(getReviewById)
.put(verifyJWT, validate(updateReviewSchema), updateReview)
.delete(verifyJWT, deleteReview)




export default router;