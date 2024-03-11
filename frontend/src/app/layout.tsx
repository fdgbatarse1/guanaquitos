'use client';

import { Inter } from 'next/font/google';

import { ApolloProvider } from '@apollo/client';
import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from '@/components/navbar';
import client from '@/lib/apollo-client';
import theme from '@/styles/theme';

import './globals.css';

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
              <Box
                component="main"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  marginTop: { xs: '4rem', md: '80px' },
                  minHeight: { xs: 'calc(100vh - 4rem)', sm: 'calc(100vh - 80px)' },
                }}
              >
                {children}
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
