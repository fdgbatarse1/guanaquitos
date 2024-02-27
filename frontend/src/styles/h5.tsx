import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Heading5Props {
  children: ReactNode;
  sx?: object;
}

const Heading5 = ({ children, sx }: Heading5Props) => (
  <Typography
    variant="h5"
    sx={{
      fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
      lineHeight: { xs: '1.5rem', md: '1.75rem', lg: '1.75' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading5;
