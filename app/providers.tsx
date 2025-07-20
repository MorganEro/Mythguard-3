'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children, state }: { children: React.ReactNode; state: unknown }) {
  const queryClient = new QueryClient();



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={state}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default Providers;
