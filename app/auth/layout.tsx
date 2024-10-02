import { Nunito } from 'next/font/google';

const font = Nunito({
  subsets: ['cyrillic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000']
});

interface Properties {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<Properties>) {
  return (
    <main
      className={`w-full h-screen overflow-hidden flex flex-col gap-4 items-center justify-center ${font.className} antialiased`}
    >
      {children}
    </main>
  );
}
