import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import { spacing3 } from '@/styles/spacing';

interface SpecificsProps {
  benefits?: BlocksContent;
  requirements?: BlocksContent;
  conditions?: BlocksContent;
  howToApply?: BlocksContent;
  requiredDocuments?: BlocksContent;
  selectionCriteria?: BlocksContent;
}

const Specifics = ({
  benefits,
  requirements,
  conditions,
  howToApply,
  requiredDocuments,
  selectionCriteria,
}: SpecificsProps) => {
  const specifics = [
    { title: 'Beneficios', content: benefits },
    { title: 'Requerimientos', content: requirements },
    { title: 'Condiciones', content: conditions },
    { title: 'Cómo aplicar', content: howToApply },
    { title: 'Documentos requeridos', content: requiredDocuments },
    { title: 'Criterios de selección', content: selectionCriteria },
  ];

  return (
    <Box sx={{ gridArea: 'specifics' }}>
      {specifics.map((specific, index) => {
        if (!specific.content) return null;
        return (
          <Fragment key={specific.title}>
            <Typography
              variant="h3"
              sx={{
                marginTop: index === 0 ? '0' : spacing3,
              }}
            >
              {specific.title}
            </Typography>
            <RichTextBlocks content={specific.content} />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default Specifics;
