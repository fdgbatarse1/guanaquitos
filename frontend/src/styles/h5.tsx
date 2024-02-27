import { Typography } from '@mui/material';

interface Heading5Props {
  children: string;
  sx?: object;
}

const Heading5 = ({ children, sx }: Heading5Props) => (
  <Typography
    variant="h5"
    sx={{
      fontSize: { xs: '1.125rem', md: '1.5rem' },
      lineHeight: { xs: '1.75rem', md: '2rem' },
      letterSpacing: { xs: '0' },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading5;
