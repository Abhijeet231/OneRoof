import { z } from "zod";

export const registerSchema = z.object({
  userName: z.string().min(4, "Username must be at least 4 characters"),
  fullName: z.string().min(4, "Full name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
