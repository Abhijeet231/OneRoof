import { Router } from "express";
import {
  createListing,
  updateListing,
  deleteListing
} from "../controllers/listing.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createListingSchema,
  updateListingSchema,
} from "../validators/listing.validator.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

//Create New Listing
router.post(
  "/",
  verifyJWT,
  validate(createListingSchema),

  upload.single("image"),
  createListing
);

//Update Listing
router.put(
  "/:id",
  verifyJWT,
  validate(updateListingSchema),

  upload.single("image"),
  updateListing
);


//Delete Listing
router.delete(
    "/:id",
    verifyJWT,
    deleteListing
    
);


export default router