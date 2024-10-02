import { User } from '@prisma/client';
import { SignUpFormData } from '../schema/sign-up-schema';
import { endpoints } from '../endpoints';
import { SignInFormData } from '../schema/sign-in-schema';

export async function signUp(
  data: SignUpFormData,
  asAdmin: boolean
): Promise<User> {
  const response = await fetch(
    endpoints.authEndpoint + '/sign-up?as_admin=' + asAdmin,
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  ).then((result) => result.json());

  if (response.success) {
    return response.payload;
  }

  throw new Error(response.message);
}

export async function signIn(
  data: SignInFormData,
  asAdmin: boolean
): Promise<User> {
  const response = await fetch(
    endpoints.authEndpoint + '/sign-in?as_admin=' + asAdmin,
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  ).then((result) => result.json());

  if (response.success) {
    return response.payload;
  }

  throw new Error(response.message);
}
