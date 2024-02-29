'use client';

import { Inter } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

import client from '@/lib/apollo-client';

import './globals.css';
import Navbar from '@/components/navbar';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider theme={theme}>
              <Navbar />
              <Box component="main" sx={{ marginTop: { xs: '4rem', md: '80px' } }}>
                {children}
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}