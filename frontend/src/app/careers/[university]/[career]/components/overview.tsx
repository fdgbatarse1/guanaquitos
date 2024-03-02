import { Box, Typography } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
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
        <Typography
          variant="h3"
          sx={{
            marginBottom: '0.5rem',
          }}
        >
          Descripción
        </Typography>
        <RichTextBlocks content={description} />
      </>
    )}
    {studyAreas && studyAreas.length > 0 && (
      <>
        <Typography
          variant="h3"
          sx={{
            marginTop: spacing3,
          }}
        >
          Áreas de estudio
        </Typography>
        <List
          array={studyAreas}
          type="ul"
          sx={{
            marginTop: spacing3,
            marginLeft: '1rem',
          }}
        />
      </>
    )}
    {jobAreas && jobAreas.length > 0 && (
      <>
        <Typography
          variant="h3"
          sx={{
            marginTop: spacing3,
          }}
        >
          Áreas de desempeño laboral
        </Typography>
        <List
          array={jobAreas}
          type="ul"
          sx={{
            marginTop: spacing3,
            marginLeft: '1rem',
          }}
        />
      </>
    )}
  </Box>
);

export default Overview;
