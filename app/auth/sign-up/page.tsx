'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SignUpForm from '../components/sign-up-form';

export default function SignUpPage() {
  const params = useSearchParams();
  const asAdmin = params.get('as_admin')!;

  return (
    <div className="max-w-sm w-full flex flex-col items-center gap-4">
      <Image src="/nuxt-logo.svg" alt="Prisma Logo" width={70} height={70} />
      <h2 className="text-2xl font-black">Регистрация</h2>
      <SignUpForm asAdmin={asAdmin === 'true'} />
      <span className="text-center self-center flex flex-row items-center gap-2">
        У вас уже есть аккаунт?
        <Link
          href={'/auth/sign-in?as_admin=' + asAdmin}
          className="text-emerald-400 transition hover:underline hover:underline-offset-4"
        >
          Вход в аккаунт
        </Link>
      </span>
    </div>
  );
}
