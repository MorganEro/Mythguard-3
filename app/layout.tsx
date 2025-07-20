import type { Metadata } from 'next';
import { Cinzel, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';
import CalendarButton from '@/components/calendar/Calendar_Button';
import { auth } from '@clerk/nextjs/server';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchAllReviewsByUserWithDetails } from '@/actions/review/review-server-actions';
import { fetchAllUsersContracts } from '@/actions/contract/contract-server-actions';
import {
  fetchAllGuardians,
  fetchUserLikes,
} from '@/actions/guardian/guardian-server-actions';
import {
  fetchAllProducts,
  fetchUserFavorites,
} from '@/actions/product/product-server-actions';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  const queryClient = new QueryClient();
  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ['reviews', 'user', userId],
      queryFn: fetchAllReviewsByUserWithDetails,
    });

    await queryClient.prefetchQuery({
      queryKey: ['contracts'],
      queryFn: () => fetchAllUsersContracts({ userId }),
    });

    await queryClient.prefetchQuery({
      queryKey: ['likes', userId],
      queryFn: fetchUserLikes,
    });

    await queryClient.prefetchQuery({
      queryKey: ['favorites', userId],
      queryFn: fetchUserFavorites,
    });
  }

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  await queryClient.prefetchQuery({
    queryKey: ['guardians'],
    queryFn: fetchAllGuardians,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning>
        <body
          className={`${cinzel.variable} ${open_Sans.variable} antialiased`}>
          <Providers state={dehydratedState}>
            <Navbar />
            <Container className="py-8">
              {children}
              <CalendarButton />
            </Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
