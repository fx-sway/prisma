'use client';

import { useSession } from '@/utils/hooks/use-session';

export default function DashboardPage() {
  const user = useSession();

  return <pre>{JSON.stringify(user, null, 4)}</pre>;
}
