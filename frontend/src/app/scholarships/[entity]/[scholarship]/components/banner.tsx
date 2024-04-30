import Link from 'next/link';

import { School } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';

import { spacing3 } from '@/styles/spacing';

interface BannerProps {
  name: string;
  documents?: string;
}

const Banner = ({ name, documents }: BannerProps) => (
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
      <Typography
        variant="h1"
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        {name}
      </Typography>
      {documents && (
        <Link href={documents} target="_blank">
          <Button
            sx={{
              marginTop: { xs: '1rem', sm: '0' },
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: { xs: '1.5rem', md: '1.75rem' },
              letterSpacing: { xs: '0' },
            }}
            variant="contained"
            color="primary"
            startIcon={<School />}
          >
            Documentos
          </Button>
        </Link>
      )}
    </Box>
    <Divider
      sx={{
        marginTop: spacing3,
      }}
    />
  </>
);

export default Banner;
