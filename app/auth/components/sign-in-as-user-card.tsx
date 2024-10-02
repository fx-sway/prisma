'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignInAsUserCard() {
  const router = useRouter();

  return (
    <Card
      className="aspect-video cursor-pointer transition hover:shadow-lg"
      onClick={() => router.push('/auth/sign-in?as_admin=false')}
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold flex flex-row items-center gap-2">
          <User className="w-8 h-8" />
          Пользователь
        </CardTitle>
      </CardHeader>
      <CardContent className="max-w-xs">
        Создайте аккаунт пользователя, либо войдите как пользователь используя
        ваш личный пароль
      </CardContent>
    </Card>
  );
}
