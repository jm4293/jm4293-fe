'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorConfig } from '@/types/interface';
import LoadingSpinner from '@/utils/provider/query/LoadingSpinner';

export default function QueryProviderConfig({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: (err: unknown) => {
            if (isAxiosError(err)) {
              const axiosError = err as AxiosError<ErrorConfig>;

              if (axiosError.response && axiosError.response.data) {
                const { message } = axiosError.response.data;

                alert('알림: ' + message);
              }
            }
          },
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {/*<LoadingSpinner>{children}</LoadingSpinner>*/}
      {children}
    </QueryClientProvider>
  );
}
