'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { appQueryClient } from '@/libs/frontend/query-client';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={appQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
