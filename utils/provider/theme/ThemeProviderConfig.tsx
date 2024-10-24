'use client';

import { theme } from '@/utils/provider/theme/theme';
import { ThemeProvider } from '@mui/material';

export default function ThemeProviderConfig({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
