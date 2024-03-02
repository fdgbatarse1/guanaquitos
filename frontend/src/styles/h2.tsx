import { Typography } from '@mui/material';

interface Heading2Props {
  children: string;
  sx?: object;
}

const Heading2 = ({ children, sx }: Heading2Props) => (
  <Typography
    variant="h2"
    sx={{
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default Heading2;
