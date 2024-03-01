import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Heading4Props {
  children: ReactNode;
  sx?: object;
}

const Heading4 = ({ children, sx }: Heading4Props) => (
  <Typography
    variant="h4"
    sx={{
      fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
      lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading4;
