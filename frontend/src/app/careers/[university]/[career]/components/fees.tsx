import { Box, Typography } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import { Fragment } from 'react';
import { spacing3 } from '@/styles/spacing';

interface FeesProps {
  costs?: BlocksContent;
  discounts?: BlocksContent;
}

const Fees = ({ costs, discounts }: FeesProps) => {
  const fees = [
    { title: 'Costos', content: costs },
    { title: 'Descuentos', content: discounts },
  ];

  return (
    <Box sx={{ gridArea: 'fees' }}>
      {fees.map((fee, index) => {
        if (!fee.content) return null;
        return (
          <Fragment key={fee.title}>
            <Typography
              variant="h3"
              sx={{
                marginTop: index === 0 ? '0' : spacing3, // TODO - Update Heading3 margin top
              }}
            >
              {fee.title}
            </Typography>
            <RichTextBlocks content={fee.content} />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default Fees;
