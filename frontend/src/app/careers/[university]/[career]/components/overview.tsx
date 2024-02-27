import { Box } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import Heading3 from '@/styles/h3';
import List from '@/styles/list';

interface OverviewProps {
  description: BlocksContent;
  studyAreas?: (string | null | undefined)[];
  jobAreas?: (string | null | undefined)[];
}

const Overview = ({ description, studyAreas, jobAreas }: OverviewProps) => (
  <Box
    sx={{
      gridArea: 'overview',
    }}
  >
    <Heading3
      sx={{
        marginBottom: '0.5rem',
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      Descripción
    </Heading3>
    <RichTextBlocks content={description} />
    {studyAreas && (
      <>
        <Heading3
          sx={{
            marginTop: '1rem',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Áreas de estudio
        </Heading3>
        <List array={studyAreas} type="ul" sx={{ marginTop: '1rem', marginLeft: '1rem' }} />
      </>
    )}
    {jobAreas && (
      <>
        <Heading3
          sx={{
            marginTop: '1rem',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Áreas de desempeño laboral
        </Heading3>
        <List array={jobAreas} type="ul" sx={{ marginTop: '1rem', marginLeft: '1rem' }} />
      </>
    )}
  </Box>
);

export default Overview;
