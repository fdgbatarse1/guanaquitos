import Link from 'next/link';

import { Box, Button, Divider } from '@mui/material';
import { School } from '@mui/icons-material';

import Heading1 from '@/styles/h1';

interface BannerProps {
  name: string;
  curriculum?: string;
}

const Banner = ({ name, curriculum }: BannerProps) => (
  <>
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
      }}
    >
      <Heading1
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        {name}
      </Heading1>
      {curriculum && (
        <Link href={curriculum} target="_blank">
          <Button
            sx={{
              marginTop: { xs: '1rem', sm: '0' }, // TODO - Update Button margin top
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: { xs: '1.5rem', md: '1.75rem' },
              letterSpacing: { xs: '0' },
            }}
            variant="contained"
            color="primary"
            startIcon={<School />}
          >
            Malla curricular
          </Button>
        </Link>
      )}
    </Box>
    <Divider
      sx={{
        marginTop: '1rem', // TODO - Update Divider margin top
      }}
    />
  </>
);

export default Banner;
