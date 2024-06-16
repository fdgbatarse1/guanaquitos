'use client';

import ReactPlayer from 'react-player/lazy';
import { Typography, Box, useTheme } from '@mui/material';

import Loading from '@/components/loading';

interface VideoProps {
  url: string;
  title: string;
  description: string;
  right?: boolean;
}

const Video = ({ url, title, description, right }: VideoProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        height: 'auto',
        marginTop: { xs: '1rem', sm: '2rem', md: '4rem' },
        paddingRight: { sm: '2rem', md: '4rem' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: { xs: '56.25%', sm: '28.125%' },
          flex: { sm: '1 0 50%' },
        }}
      >
        <ReactPlayer
          controls
          url={url}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, borderRadius: '1rem' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: { xs: '1rem', sm: '0' },
          marginLeft: {
            xs: '0',
            sm: right ? '0' : '2rem',
            md: right ? '0' : '4rem',
          },
          marginRight: {
            xs: '0',
            sm: right ? '2rem' : '0',
            md: right ? '4rem' : '0',
          },
          flex: { sm: '1 0 50%' },
          order: { xs: 2, sm: right ? -1 : 2 },
        }}
      >
        <Typography variant="h3" color={theme.palette.primary.main}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Video;
