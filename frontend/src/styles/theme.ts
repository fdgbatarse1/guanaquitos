'use client';

import { Montserrat, Lato } from 'next/font/google';

import { ThemeOptions, createTheme } from '@mui/material/styles';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
});

export const themeOptions: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // A vibrant shade of blue for primary actions
      dark: '#115293', // A darker shade of blue for primary actions on hover or active
      light: '#4791db', // A lighter shade of blue for primary buttons, links, etc.
      contrastText: '#FFFFFF', // White text for better readability on primary colors
    },
    secondary: {
      main: '#F3F8FF',
      dark: '#EBF3FF',
      light: '#FFFFFF',
      contrastText: '#232323',
    },
    background: {
      paper: '#FFFFFF',
      default: '#E3E6F3', // A slightly different shade for the general background
    },
    divider: '#3a3637',
    text: {
      primary: '#3a3637',
      secondary: '#4A4546',
      disabled: '#6A6264',
    },
    error: {
      light: '#e57373', // Light red for error highlights
      main: '#f44336', // Standard error red
      dark: '#d32f2f', // Dark red for deeper error states
      contrastText: '#FFFFFF', // White text for better visibility on error backgrounds
    },
    warning: {
      light: '#ffb74d', // Light orange for warning highlights
      main: '#ff9800', // Standard warning orange
      dark: '#f57c00', // Dark orange for deeper warning states
      contrastText: '#232323', // Dark text for better visibility on warning backgrounds
    },
    info: {
      light: '#64b5f6', // Light blue for info highlights
      main: '#2196f3', // Standard info blue
      dark: '#1976d2', // Dark blue for deeper info states
      contrastText: '#FFFFFF', // White text for better visibility on info backgrounds
    },
    success: {
      light: '#81c784', // Light green for success highlights
      main: '#4caf50', // Standard success green
      dark: '#388e3c', // Dark green for deeper success states
      contrastText: '#FFFFFF', // White text for better visibility on success backgrounds
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      letterSpacing: '0em',
    },
    h2: {
      letterSpacing: '0em',
    },
    h3: {
      letterSpacing: '0em',
    },
    h4: {
      letterSpacing: '0em',
    },
    h5: {
      letterSpacing: '0em',
    },
    h6: {
      letterSpacing: '0em',
    },
    subtitle1: {
      letterSpacing: '0em',
    },
    subtitle2: {
      letterSpacing: '0em',
    },
    body1: {
      letterSpacing: '0em',
    },
    body2: {
      letterSpacing: '0em',
    },
  },
};

export const themeBlue: ThemeOptions = {
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
    divider: '#3a3637',
    text: {
      primary: '#3a3637',
      secondary: '#4A4546',
      disabled: '#6A6264',
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
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

export const anotherTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // A strong green, evoking growth and learning
      dark: '#005005', // A deeper green for contrast and depth
      light: '#60ad5e', // A lighter green for highlights and accents
      contrastText: '#ffffff', // White for clear readability against the green shades
    },
    secondary: {
      main: '#ffcc80', // A soft orange, for a warm, inviting contrast to the green
      dark: '#ca9b52', // A darker shade of the secondary color for depth
      light: '#ffe0b2', // A lighter shade for highlights and softer elements
      contrastText: '#232323', // Dark grey for secondary text, providing good readability
    },
    background: {
      default: '#f9f9f9', // A light grey to keep the background calm and unintrusive
      paper: '#ffffff', // Pure white for paper elements to stand out
    },
    divider: '#bdbdbd', // Light grey for dividers, ensuring subtlety and distinction without overpowering
    text: {
      primary: '#212121', // Dark grey for primary text, offering strong contrast and readability
      secondary: '#757575', // Medium grey for secondary text, softer than the primary
      disabled: '#9e9e9e', // Light grey for disabled text, ensuring it's recognized but not the focus
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
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

export const themeInnovative: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e', // A deep navy, symbolizing depth of knowledge and reliability
      dark: '#000051', // An even deeper navy for added contrast and sophistication
      light: '#534bae', // A lighter navy for a subtle contrast and visual montserratest
      contrastText: '#ffffff', // Pure white for clear legibility against the dark backgrounds
    },
    secondary: {
      main: '#26c6da', // A vibrant teal for creativity and innovation
      dark: '#0095a8', // A darker teal for depth and variation
      light: '#6ff9ff', // A light, luminous teal for highlights and visual relief
      contrastText: '#000000', // Black for maximum contrast on secondary elements
    },
    background: {
      default: '#e0e0e0', // A soft grey to keep the overall look light and airy
      paper: '#ffffff', // Crisp white for clean, sharp contrasts in paper elements
    },
    divider: '#c7c7c7', // A mid-tone grey for subtle division that blends into the background
    text: {
      primary: '#212121', // A strong, readable dark grey for primary text
      secondary: '#727272', // A lighter grey for secondary text, ensuring hierarchy and readability
      disabled: '#9e9e9e', // A muted grey for disabled elements, keeping them legible but understated
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
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

export const guanaquitosTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1392C9', // A vibrant shade of blue for primary actions
      dark: '#115293', // A darker shade of blue for primary actions on hover or active
      light: '#4791db', // A lighter shade of blue for primary buttons, links, etc.
      contrastText: '#FFFFFF', // White text for better readability on primary colors
    },
    secondary: {
      main: '#E6EAE9',
      dark: '#EBF3FF',
      light: '#FFFFFF',
      contrastText: '#232323',
    },
    background: {
      paper: '#E6EAE9',
      default: '#F5F5F5',
    },
    divider: '#3a3637',
    text: {
      primary: '#3a3637',
      secondary: '#4A4546',
      disabled: '#6A6264',
    },
    error: {
      light: '#e57373', // Light red for error highlights
      main: '#f44336', // Standard error red
      dark: '#d32f2f', // Dark red for deeper error states
      contrastText: '#FFFFFF', // White text for better visibility on error backgrounds
    },
    warning: {
      light: '#ffb74d', // Light orange for warning highlights
      main: '#ff9800', // Standard warning orange
      dark: '#f57c00', // Dark orange for deeper warning states
      contrastText: '#232323', // Dark text for better visibility on warning backgrounds
    },
    info: {
      light: '#64b5f6', // Light blue for info highlights
      main: '#2196f3', // Standard info blue
      dark: '#1976d2', // Dark blue for deeper info states
      contrastText: '#FFFFFF', // White text for better visibility on info backgrounds
    },
    success: {
      light: '#81c784', // Light green for success highlights
      main: '#4caf50', // Standard success green
      dark: '#388e3c', // Dark green for deeper success states
      contrastText: '#FFFFFF', // White text for better visibility on success backgrounds
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      letterSpacing: '0em',
    },
    h2: {
      letterSpacing: '0em',
    },
    h3: {
      letterSpacing: '0em',
    },
    h4: {
      letterSpacing: '0em',
    },
    h5: {
      letterSpacing: '0em',
    },
    h6: {
      letterSpacing: '0em',
    },
    subtitle1: {
      letterSpacing: '0em',
    },
    subtitle2: {
      letterSpacing: '0em',
    },
    body1: {
      letterSpacing: '0em',
    },
    body2: {
      letterSpacing: '0em',
    },
  },
};

const theme = createTheme(guanaquitosTheme);

// h1
theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: '1.875rem',
  lineHeight: '2.25rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3rem',
    lineHeight: '3rem',
  },
};

// h2
theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: '1.5rem',
  lineHeight: '2rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  },
};

// h3
theme.typography.h3 = {
  ...theme.typography.h3,
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },
};

// h4
theme.typography.h4 = {
  ...theme.typography.h4,
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
};

// h5
theme.typography.h5 = {
  ...theme.typography.h5,
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },
};

// h6
theme.typography.h6 = {
  ...theme.typography.h6,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
};

// subtitle1
theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },
};

// subtitle2
theme.typography.subtitle2 = {
  ...theme.typography.subtitle2,
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  fontWeight: 700,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
};

// body1
theme.typography.body1 = {
  ...theme.typography.body1,
  fontFamily: lato.style.fontFamily,
  maxWidth: 'calc(100vw - 3rem)',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
};

// body2
theme.typography.body2 = {
  ...theme.typography.body2,
  fontFamily: lato.style.fontFamily,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
};

export default theme;
