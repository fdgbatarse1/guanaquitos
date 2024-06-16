import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { Box } from '@mui/material';

import Navbar from '@/components/navbar';

import './globals.css';
import Providers from './providers';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Guanaquitos',
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Navbar />
          <Box
            component="main"
            className={styles.layoutBox}
            sx={{
              backgroundColor: '#F5F5F5',
              marginTop: { xs: '4rem', md: '80px' },
              minHeight: { xs: 'calc(100vh - 4rem)', sm: 'calc(100vh - 80px)' },
            }}
          >
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
