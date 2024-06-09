'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem('sessionId')) return;

    window.sessionStorage.setItem('sessionId', crypto.randomUUID());
    window.sessionStorage.setItem(
      'chatHistory',
      JSON.stringify([
        {
          type: 'system',
          text: 'Este servicio está diseñado para proporcionar recomendaciones. Sin embargo, es importante recordar que solo es una herramienta de apoyo y no debe ser utilizado como el único recurso para sus decisiones. No podemos asegurar la precisión completa de las recomendaciones por lo que es aconsejable también acudir a un orientador vocacional.',
          sourceDocuments: null,
        },
      ]),
    );
  }, []);

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
