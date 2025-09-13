import { Router } from "express";
import {
  getAllListing,
  getListingsById,
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


router.route("/")
.get(getAllListing)   //Get listing
.post(
  verifyJWT,
  validate(createListingSchema), // Post listing
  upload.single("image"),
  createListing
);


router.route("/:id")
.get(getListingsById) //Get single listing
.put(
  verifyJWT,
  validate(updateListingSchema), // Edit listing
  upload.single("image"),
  updateListing
)
.delete(                  //Delete Listing
  verifyJWT,
  deleteListing
)



export default router