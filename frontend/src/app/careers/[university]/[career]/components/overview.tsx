import { Box } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import Heading3 from '@/styles/h3';
import List from '@/styles/list';
import { spacing3 } from '@/styles/spacing';

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
            marginTop: spacing3, // TODO - Update Heading3 margin top
          }}
        >
          Áreas de estudio
        </Heading3>
        <List
          array={studyAreas}
          type="ul"
          sx={{
            marginTop: spacing3, // TODO - Update List margin top
            marginLeft: '1rem',
          }}
        />
      </>
    )}
    {jobAreas && jobAreas.length > 0 && (
      <>
        <Heading3
          sx={{
            marginTop: spacing3, // TODO - Update Heading3 margin top
          }}
        >
          Áreas de desempeño laboral
        </Heading3>
        <List
          array={jobAreas}
          type="ul"
          sx={{
            marginTop: spacing3, // TODO - Update List margin top
            marginLeft: '1rem',
          }}
        />
      </>
    )}
  </Box>
);

export default Overview;
