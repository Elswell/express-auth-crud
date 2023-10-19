import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});
type contactTypes = z.infer<typeof contactSchema>;

const emailSchema = z.object({
  email: z.string().email(),
});
type emailType = z.infer<typeof emailSchema>;

// TODO: add regex for the id
const updateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});
type updateType = z.infer<typeof emailSchema>;

export {
  contactSchema,
  contactTypes,
  emailSchema,
  emailType,
  updateSchema,
  updateType,
};
