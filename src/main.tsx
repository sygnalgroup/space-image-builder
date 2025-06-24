import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './contexts/AuthContext';
import { queryClient } from '~/core/queryClient.ts';
import { Routes } from '~/routes';
import '~/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>,
);
