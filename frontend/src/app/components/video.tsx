import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Typography, Box, useTheme } from '@mui/material';

interface VideoProps {
  url: string;
  title: string;
  description: string;
  right?: boolean;
}

const Video = ({ url, title, description, right }: VideoProps) => {
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        height: 'auto',
        marginTop: '2rem',
        paddingRight: '1rem',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: { xs: '56.25%', sm: '28.125%' },
          flex: { sm: '1 0 50%' },
        }}
      >
        {isClient ? (
          <ReactPlayer
            controls
            url={url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, borderRadius: '1rem' }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: { xs: '1rem', sm: '0' },
          marginLeft: {
            xs: '0',
            sm: right ? '0' : '1rem',
          },
          marginRight: {
            xs: '0',
            sm: right ? '1rem' : '0',
          },
          flex: { sm: '1 0 50%' },
          order: { xs: 2, sm: right ? -1 : 2 },
        }}
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
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
