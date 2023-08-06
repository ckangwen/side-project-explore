import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export type UserAuthSchema = z.infer<typeof userAuthSchema>;
