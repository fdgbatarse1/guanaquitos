'use client';

import { useQuery } from '@apollo/client';
import placeholder from '@/assets/images/no_image_available.png';
import Loading from '@/components/loading';
import { Grid, Typography, useTheme } from '@mui/material';
import advisorsQuery from '@/services/gql/advisorsQuery';
import { spacing1 } from '@/styles/spacing';
import { GetAdvisorsQuery } from '@/gql/graphql';

import Advisor from './advisor';

const Advisors = () => {
  const { loading, error, data } = useQuery<GetAdvisorsQuery>(advisorsQuery);
  const theme = useTheme();

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const advisors = data?.advisors?.data;

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h3" color={theme.palette.primary.main}>
        Asesores
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: spacing1 }}>
        {advisors?.map((advisor, index) => {
          const name = advisor.attributes?.name || '';
          const description = advisor?.attributes?.description || '';
          const picture = advisor?.attributes?.picture
            ? {
                width: 100,
                height: 100,
                url: advisor?.attributes?.picture?.data?.attributes?.url || '',
              }
            : {
                width: 100,
                height: 100,
                url: placeholder,
              };
          const resume = advisor?.attributes?.resume?.data?.attributes?.url || '';
          const linkedIn = advisor?.attributes?.linkedin || '';
          return (
            <Grid key={advisor.id} item xs={12} md={advisors?.length < 2 ? 12 : 6}>
              <Advisor
                name={name}
                description={description}
                picture={picture}
                resume={resume}
                linkedIn={linkedIn}
                left={index % 2 === 0}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Advisors;
