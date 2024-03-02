import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  sx?: object;
}

const Paragraph = ({ children, sx }: ParagraphProps) => (
  <Typography
    variant="body1"
    sx={{
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Paragraph;
