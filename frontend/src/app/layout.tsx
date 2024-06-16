import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box } from '@mui/material';

import Navbar from '@/components/navbar';

import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Guanaquitos',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Box
            component="main"
            sx={{
              backgroundColor: '#E3E6F3',
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
