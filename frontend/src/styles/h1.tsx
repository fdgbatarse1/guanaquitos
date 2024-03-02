import { Typography } from '@mui/material';

interface Heading1Props {
  children: string;
  sx?: object;
}

const Heading1 = ({ children, sx }: Heading1Props) => (
  <Typography
    variant="h1"
    sx={{
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading1;
