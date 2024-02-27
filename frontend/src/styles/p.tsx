import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  sx?: object;
}

const Paragraph = ({ children, sx }: ParagraphProps) => (
  <Typography
    sx={{
      fontSize: { xs: '1rem', md: '1.125rem' },
      lineHeight: { xs: '1.5rem', md: '1.75rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Paragraph;
