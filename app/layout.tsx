import type { Metadata } from 'next';
import { Cinzel, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';
import Providers from './providers';

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
});

const open_Sans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MythGuard Agency',
  description: 'A non-profit agency for hiring mythological guardians',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${cinzel.variable} ${open_Sans.variable} antialiased`}>
        <Providers>
          <Navbar />
          <Container className="py-20">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
