'use client';

import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

import { GetCareerQuery } from '@/gql/graphql';
import careerQuery from '@/services/gql/careerQuery';

import Banner from './components/banner';
import Details from './components/details';
import Fees from './components/fees';
import Overview from './components/overview';
import Resources from './components/resources';
import University from './components/university';
import format from './utils/format';

interface CareerPageProps {
  params: {
    university: string;
    career: string;
  };
}

const CareerPage = ({ params }: CareerPageProps) => {
  const { university: universityAcronym, career: careerName } = params;

  const { loading, error, data } = useQuery<GetCareerQuery>(careerQuery, {
    variables: {
      career: decodeURIComponent(careerName),
      university: decodeURIComponent(universityAcronym),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const career = format(data);

  if (!career) return <p>Error: No data</p>;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#F0F0F0',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '800px', lg: '1024px', xl: '1280px' },
        }}
      >
        <Banner name={career.name} curriculum={career?.curriculum} />
        <Box
          sx={{
            marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update Box margin top
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
            gridTemplateRows: 'min-content 1fr',
            gridTemplateAreas: {
              xs: '"details" "overview" "fees" "university" "resources"',
              sm: '"overview details" "overview resources" "fees fees" "university university"',
            },
            gridGap: { xs: '0.5rem', md: '1rem' },
          }}
        >
          <Overview
            description={career?.description}
            studyAreas={career?.studyAreas}
            jobAreas={career?.jobAreas}
          />
          <Details
            title={career.title}
            modality={career.modality}
            academicDegree={career.academicDegree}
            educationalField={career.educationalField}
            duration={career.duration}
          />
          <Resources links={career?.links} />
          <Fees costs={career?.costs} discounts={career?.discounts} />
          <University
            universityLogo={career?.universityLogo}
            universityName={career?.universityName}
            universityLogoWidth={career?.universityLogoWidth}
            universityLogoHeight={career?.universityLogoHeight}
            universityAddresses={career?.universityAddresses}
            universityWebsites={career?.universityWebsites}
            universityPhones={career?.universityPhones}
            universityEmails={career?.universityEmails}
            universityAcronym={career?.universityAcronym}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CareerPage;
