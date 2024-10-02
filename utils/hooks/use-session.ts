'use client';

import { User } from '@prisma/client';

export function useSession(): User {
  return JSON.parse(localStorage.getItem('current_user')!);
}
