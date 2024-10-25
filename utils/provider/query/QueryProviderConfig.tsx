'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function QueryProviderConfig({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/*<LoadingSpinner />*/}
      {children}
    </QueryClientProvider>
  );
}
