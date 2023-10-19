import { z } from "zod";

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// TODO: add regex for the id
const currentSchema = z.object({
  id: z.string(),
});

export { registerSchema, loginSchema, currentSchema };
