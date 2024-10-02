import './globals.css';
import { Nunito } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

import QueryProvider from '@/components/providers/query-provider';

interface Properties {
  children: React.ReactNode;
}

const font = Nunito({
  subsets: ['cyrillic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000']
});

export default function DefaultLayout({ children }: Readonly<Properties>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
