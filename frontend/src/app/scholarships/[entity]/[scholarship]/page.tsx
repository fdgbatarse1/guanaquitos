'use client';

import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

import Loading from '@/components/loading';
import scholarshipQuery from '@/services/gql/scholarshipQuery';
import { spacing3 } from '@/styles/spacing';
import { GetScholarshipQuery } from '@/gql/graphql';

import Banner from './components/banner';
import Details from './components/details';
import Entity from './components/entity';
import Overview from './components/overview';
import Resources from './components/resources';
import Specifics from './components/specifics';
import format from './utils/format';

interface ScholarshipPageProps {
  params: {
    entity: string;
    scholarship: string;
  };
}

const ScholarshipPage = ({ params }: ScholarshipPageProps) => {
  const { entity: entityName, scholarship: scholarshipName } = params;

  const { loading, error, data } = useQuery<GetScholarshipQuery>(scholarshipQuery, {
    variables: {
      career: decodeURIComponent(scholarshipName),
      university: decodeURIComponent(entityName),
    },
  });

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const scholarship = format(data);

  if (!scholarship) return <p>Error: No data</p>;

  console.log(scholarship);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '800px', lg: '1024px', xl: '1280px' },
        }}
      >
        <Banner name={scholarship.name} documents={scholarship?.documents} />
        <Box
          sx={{
            marginTop: spacing3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
            gridTemplateRows: 'min-content 1fr',
            gridTemplateAreas: {
              xs: '"details" "overview" "specifics" "entity" "resources"',
              sm: '"overview details" "overview resources" "specifics specifics" "entity entity"',
            },
            gridGap: spacing3,
          }}
        >
          <Overview
            description={scholarship?.description}
            goals={scholarship?.goals}
            studyAreas={scholarship?.studyAreas}
          />
          <Details
            type={scholarship?.type}
            category={scholarship?.category}
            modality={scholarship?.modality}
            applicationStartDate={scholarship?.applicationStartDate}
            applicationFinalDate={scholarship?.applicationFinalDate}
            studiesStartDate={scholarship?.studiesStartDate}
            studiesFinalDate={scholarship?.studiesFinalDate}
          />
          <Specifics
            benefits={scholarship?.benefits}
            requirements={scholarship?.requirements}
            conditions={scholarship?.conditions}
            howToApply={scholarship?.howToApply}
            requiredDocuments={scholarship?.requiredDocuments}
            selectionCriteria={scholarship?.selectionCriteria}
          />
          <Entity
            entityLogo={scholarship?.entityLogo}
            entityName={scholarship?.entityName}
            entityLogoWidth={scholarship?.entityLogoWidth}
            entityLogoHeight={scholarship?.entityLogoHeight}
            entityAddresses={scholarship?.entityAddresses}
            entityWebsites={scholarship?.entityWebsites}
            entityPhones={scholarship?.entityPhones}
            entityEmails={scholarship?.entityEmails}
            entityAcronym={scholarship?.entityAcronym}
          />
          <Resources links={scholarship?.links} />
        </Box>
      </Box>
    </Box>
  );
};

export default ScholarshipPage;
