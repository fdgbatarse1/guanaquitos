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
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading5;
