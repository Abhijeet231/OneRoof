import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().trim().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
