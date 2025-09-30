import { z } from "zod";

//Create Listing SChema
export const listingSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(3, "Title must be at least 3 characters"),

  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }).min(10, "Description must be at least 10 characters"),

  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }).gt(0, "Price must be greater than 0"),

  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location must be a string",
  }).min(3, "Location Needed!"),

  country: z.string({
    required_error: "Country is required",
    invalid_type_error: "Country must be a string",
  }).min(3, "Country required!"),

  image: z
  .any()
  .refine((files) => files instanceof FileList && files.length > 0, {
    message: "Image is required",
  })
  .transform((files) => files[0]) // ✅ converts FileList → File
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File must be under 5MB",
  }),

 
});



//Edit Listing SCheam
export const editListingSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  location: z
    .string()
    .min(3, "Location is required"),

  country: z
    .string()
    .min(3, "Country is required"),

  image: z
    .any()
    .optional(), // ✅ only optional field
});
