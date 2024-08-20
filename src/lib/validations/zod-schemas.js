import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "must be at least 3 characters" })
    .max(12, { message: "must not be more than 12 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "must be at least 3 characters" })
    .max(12, { message: "must not be more than 12 characters" }),
});

