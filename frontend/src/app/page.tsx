'use client';

import { Box } from '@mui/material';

import Announcement from './components/announcement';
import Video from './components/video';

const Home = () => {
  const videos = [
    {
      id: '1',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Orientación Vocacional',
      description:
        'Para descubrir tu verdadera vocación tienes que tener la disposición de aprender y sobre todo de estar dispuesto a dar tu mayor esfuerzo para descubrir quién eres y las cosas que te hacen diferente de otros.',
    },
    {
      id: '2',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Carreras',
      description:
        'Para descubrir tu verdadera vocación tienes que tener la disposición de aprender y sobre todo de estar dispuesto a dar tu mayor esfuerzo para descubrir quién eres y las cosas que te hacen diferente de otros.',
    },
    {
      id: '3',
      url: 'https://www.youtube.com/embed/DKGW4l73wM4?si=isrdFCer9F7_RJcx',
      title: 'Becas',
      description:
        'Para descubrir tu verdadera vocación tienes que tener la disposición de aprender y sobre todo de estar dispuesto a dar tu mayor esfuerzo para descubrir quién eres y las cosas que te hacen diferente de otros.',
    },
  ];

  const announcement = {
    title: 'Feria de Orientación Vocacional 2024',
    description:
      'La "Feria de Orientación Vocacional 2024: Explorando Futuros" es un evento interactivo y enriquecedor diseñado para estudiantes de secundaria y universitarios que están en la búsqueda de su camino profesional.',
    url: 'https://calendar.app.google/3qBCMEUwCBnXVmq96',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '2rem' } }}>
      <Announcement
        title={announcement.title}
        description={announcement.description}
        url={announcement.url}
      />
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
