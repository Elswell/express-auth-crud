import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const deleteSchema = z.object({
  id: z.string(),
});

// TODO: add regex for the id
const updateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export { contactSchema, deleteSchema, updateSchema };
