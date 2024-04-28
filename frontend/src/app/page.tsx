'use client';

import { Box } from '@mui/material';

import Announcements from './components/announcements';
import Video from './components/video';

const Home = () => {
  const videos = [
    {
      id: '1',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Orientación Vocacional',
      description: 'This is a video',
    },
    {
      id: '2',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Carreras',
      description: 'This is a video',
    },
    {
      id: '3',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Becas',
      description: 'This is a video',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '2rem', sm: '4rem' } }}>
      <Announcements />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {videos.map(({ id, title, description, url }, index) => (
          <Video
            title={title}
            description={description}
            url={url}
            key={id}
            right={index % 2 === 0}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
