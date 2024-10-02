import { z } from 'zod';

export const signInFormSchema = z.object({
  phoneNumber: z.string(),
  password: z.string()
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
