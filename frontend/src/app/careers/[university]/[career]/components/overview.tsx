import { Box } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import Heading3 from '@/styles/h3';
import List from '@/styles/list';

interface OverviewProps {
  description?: BlocksContent;
  studyAreas?: (string | null | undefined)[];
  jobAreas?: (string | null | undefined)[];
}

const Overview = ({ description, studyAreas, jobAreas }: OverviewProps) => (
  <Box
    sx={{
      gridArea: 'overview',
    }}
  >
    {description && (
      <>
        <Heading3
          sx={{
            marginBottom: '0.5rem',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Descripción
        </Heading3>
        <RichTextBlocks content={description} />
      </>
    )}
    {studyAreas && studyAreas.length > 0 && (
      <>
        <Heading3
          sx={{
            marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update Heading3 margin top
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Áreas de estudio
        </Heading3>
        <List
          array={studyAreas}
          type="ul"
          sx={{
            marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update List margin top
            marginLeft: '1rem',
          }}
        />
      </>
    )}
    {jobAreas && jobAreas.length > 0 && (
      <>
        <Heading3
          sx={{
            marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update Heading3 margin top
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Áreas de desempeño laboral
        </Heading3>
        <List
          array={jobAreas}
          type="ul"
          sx={{
            marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update List margin top
            marginLeft: '1rem',
          }}
        />
      </>
    )}
  </Box>
);

export default Overview;
