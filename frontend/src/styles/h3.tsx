import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Heading3Props {
  children: ReactNode;
  sx?: object;
}

const Heading3 = ({ children, sx }: Heading3Props) => (
  <Typography
    variant="h3"
    sx={{
      fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
      lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading3;
