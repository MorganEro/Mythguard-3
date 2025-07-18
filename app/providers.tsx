'use client';

import { fetchAllGuardians, fetchUserLikes } from '@/actions/guardian/guardian-server-actions';
import { fetchAllProducts, fetchUserFavorites } from '@/actions/product/product-server-actions';
import { fetchAllReviewsByUserWithDetails } from '@/actions/review/review-server-actions';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { guardianKeys } from '@/lib/queries/guardian';
import { productKeys } from '@/lib/queries/product';
import { useUser } from '@clerk/nextjs';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  });

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery({
        queryKey: ['reviews', 'user', user.id],
        queryFn: fetchAllReviewsByUserWithDetails,
      });
      queryClient.prefetchQuery({
        queryKey: guardianKeys.likes,
        queryFn: fetchUserLikes,
      });
      queryClient.prefetchQuery({
        queryKey: productKeys.favorites,
        queryFn: fetchUserFavorites,
      });
      queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
      });
      queryClient.prefetchQuery({
        queryKey: ['guardians'],
        queryFn: fetchAllGuardians,
      });
    }
  }, [user, queryClient]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Toaster
            richColors
            expand
            visibleToasts={1}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default Providers;
