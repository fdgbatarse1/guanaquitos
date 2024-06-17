'use client';

import { ReactNode, useEffect } from 'react';

import { ApolloProvider } from '@apollo/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import client from '@/lib/apollo-client';
import theme from '@/styles/theme';

const Providers = ({ children }: { children: ReactNode }) => {
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
    <ApolloProvider client={client}>
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </ApolloProvider>
  );
};

export default Providers;
