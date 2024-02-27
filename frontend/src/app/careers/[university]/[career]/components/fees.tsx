import { Box } from '@mui/material';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

import RichTextBlocks from '@/components/rich-text-blocks';
import Heading3 from '@/styles/h3';
import { Fragment } from 'react';

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
            <Heading3
              sx={{
                marginTop: index === 0 ? '0' : { xs: '0.5rem', md: '1rem' }, // TODO - Update Heading3 margin top
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {fee.title}
            </Heading3>
            <RichTextBlocks content={fee.content} />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default Fees;
