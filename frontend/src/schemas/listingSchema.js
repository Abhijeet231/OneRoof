import { z } from "zod";

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
  }),

  country: z.string({
    required_error: "Country is required",
    invalid_type_error: "Country must be a string",
  }),

  image: z
    .instanceof(File, { message: "Image file is required" })   // ✅ Use instanceof instead of z.custom
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size must be under 5MB",
    }),
 
});



// need to implement this but for later

    //  image: z
    // .custom<File>((val) => val instanceof File, {
    //   message: "An image file is required",
    // })
    // .refine((file) => file && file.type.startsWith("image/"), {
    //   message: "File must be an image",
    // })
    // .refine((file) => file && file.size <= 5 * 1024 * 1024, {
    //   message: "Image size must be under 5MB",
    // }),