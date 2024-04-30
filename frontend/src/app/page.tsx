'use client';

import { Box } from '@mui/material';

import { useQuery } from '@apollo/client';
import homepageQuery from '@/services/gql/homepageQuery';
import { GetHomepageQuery } from '@/gql/graphql';

import Announcement from './components/announcement';
import Video from './components/video';
import Loading from './loading';

const Home = () => {
  const { loading, error, data } = useQuery<GetHomepageQuery>(homepageQuery);

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const { announcements = [], videos = [] } = data?.homepage?.data?.attributes || {};
  const announcement = announcements[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '2rem' } }}>
      {announcement && (
        <Announcement
          title={announcement.title}
          description={announcement.description}
          url={announcement.url}
        />
      )}
      {videos && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {videos.map((video, index) => {
            if (!video) return null;
            const { title, description, url, id } = video;
            if (!title || !description || !url || !id) return null;
            return (
              <Video
                title={title}
                description={description}
                url={url}
                key={id}
                right={index % 2 === 0}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Home;
