'use client';

import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

import Loading from '@/components/loading';
import { GetScholarshipQuery } from '@/gql/graphql';
import scholarshipQuery from '@/services/gql/scholarshipQuery';

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

  console.log(data);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      hello world!
    </Box>
  );
};

export default ScholarshipPage;
