'use client';

import { Inter } from 'next/font/google';

import { ThemeOptions, createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#003366',
      dark: '#00234f',
      light: '#083c72',
      contrastText: '#e5e9ef',
    },
    secondary: {
      main: '#c0c0c0',
      dark: '#a1a1a1',
      light: '#e3e3e3',
      contrastText: '#232323',
    },
    background: {
      default: '#f0f0f0',
      paper: '#fafafa',
    },
    divider: '#3E363FFF',
    text: {
      primary: '#232323',
      secondary: 'rgba(35,35,35,0.8)',
      disabled: 'rgba(35,35,35,0.6)',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '3.75rem',
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h2: {
      fontSize: '3rem',
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h3: {
      fontSize: '2.25rem',
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.875rem',
      lineHeight: 1.33,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    subtitle1: {
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    subtitle2: {
      fontSize: '1.125rem',
      lineHeight: 1.55,
      letterSpacing: '0em',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.55,
      letterSpacing: '0em',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
  },
};

export default createTheme(themeOptions);
