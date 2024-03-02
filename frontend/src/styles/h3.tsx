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
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading3;
