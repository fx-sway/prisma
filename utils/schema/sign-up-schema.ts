import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  phoneNumber: z.string(),
  password: z.string()
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
