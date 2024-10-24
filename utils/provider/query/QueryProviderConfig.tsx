'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoadingSpinner from '@/utils/provider/query/LoadingSpinner';

export default function QueryProviderConfig({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/*<LoadingSpinner />*/}
      {children}
    </QueryClientProvider>
  );
}
