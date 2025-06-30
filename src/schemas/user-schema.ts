import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  password: z.string({ message: "Password is required" }),
  email: z.string().email({ message: "Invalid email" }),
});
