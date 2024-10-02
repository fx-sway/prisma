'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

import { toast } from 'sonner';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignInAsAdminCard() {
  const router = useRouter();
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');

  const verifyPassword = async () => {
    if (
      adminPasswordInput ==
      (await import('@/config/application.config.json')).admin.password
    ) {
      router.push('/auth/sign-in?as_admin=true');
    } else {
      setAdminPasswordInput('');
      toast.error('Неправильно указан пароль администратора');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="aspect-video cursor-pointer transition hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex flex-row items-center gap-2">
              <ShieldCheck className="w-8 h-8" />
              Администратор
            </CardTitle>
          </CardHeader>
          <CardContent className="max-w-xs">
            Создайте аккаунт администратора, либо войдите как администратор
            используя специальный пароль
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Введите пароль</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Введите пароль администратора, чтобы получить доступ ко входу или
          регистрации в приложении как администратор.
        </p>
        <InputOTP
          maxLength={9}
          className="w-full"
          value={adminPasswordInput}
          onChange={setAdminPasswordInput}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
          </InputOTPGroup>
        </InputOTP>
        <DialogFooter>
          <Button className="w-full" onClick={verifyPassword}>
            Продолжить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
