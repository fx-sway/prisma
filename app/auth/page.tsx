import Image from 'next/image';
import SignInAsUserCard from './components/sign-in-as-user-card';
import SignInAsAdminCard from './components/sign-in-as-admin-card';

export default function AuthPage() {
  return (
    <>
      <Image src="/nuxt-logo.svg" alt="Prisma Logo" width={70} height={70} />
      <h1 className="text-2xl font-bold">Выберите способ авторизации</h1>
      <div className="flex flex-row items-center gap-4">
        <SignInAsAdminCard />
        <SignInAsUserCard />
      </div>
    </>
  );
}
