import { Typography } from '@mui/material';

interface Heading1Props {
  children: string;
  sx?: object;
}

const Heading1 = ({ children, sx }: Heading1Props) => (
  <Typography
    variant="h1"
    sx={{
      fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' },
      lineHeight: { xs: '2.25rem', md: '2.5rem', lg: '3rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading1;
