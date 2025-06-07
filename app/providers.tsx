'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
