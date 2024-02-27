import { Typography } from '@mui/material';

interface Heading2Props {
  children: string;
  sx?: object;
}

const Heading2 = ({ children, sx }: Heading2Props) => (
  <Typography
    variant="h2"
    sx={{
      fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' },
      lineHeight: { xs: '2rem', md: '2.25rem', lg: '2.5rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading2;
