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
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading4;
