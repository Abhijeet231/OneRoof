import { z } from "zod";

export const editProfileSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  about: z.string().max(200, "About section cannot exceed 200 characters").optional(),
language: z.string().optional(),


});
