'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import SignInForm from '../components/sign-in-form';
import Link from 'next/link';

export default function SignInPage() {
  const params = useSearchParams();
  const asAdmin = params.get('as_admin')!;

  return (
    <div className="max-w-sm w-full flex flex-col items-center gap-4">
      <Image src="/nuxt-logo.svg" alt="Prisma Logo" width={70} height={70} />
      <h2 className="text-2xl font-black">Вход в аккаунт</h2>
      <SignInForm asAdmin={asAdmin === 'true'} />
      <span className="text-center self-center flex flex-row items-center gap-2">
        У вас ещё нету аккаунта?
        <Link
          href={'/auth/sign-up?as_admin=' + asAdmin}
          className="text-emerald-400 transition hover:underline hover:underline-offset-4"
        >
          Регистрация
        </Link>
      </span>
    </div>
  );
}
