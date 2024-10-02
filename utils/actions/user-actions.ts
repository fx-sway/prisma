'use server';

import { User } from '@prisma/client';
import { endpoints } from '../endpoints';

export async function findAllUsers(): Promise<User[]> {
  const response = await fetch(endpoints.usersEndpoint, {
    method: 'GET'
  }).then((result) => result.json());

  if (response.success) {
    return response.payload;
  }

  throw new Error(response.message);
}
