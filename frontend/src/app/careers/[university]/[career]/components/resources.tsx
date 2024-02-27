import { Box, List, ListItem, ListItemText } from '@mui/material';

import Heading4 from '@/styles/h4';
import Link from 'next/link';
import Paragraph from '@/styles/p';

interface ResourcesProps {
  links?: (string | null | undefined)[];
}

const Resources = ({ links }: ResourcesProps) => {
  if (!links || links.length === 0) return null;
  return (
    <Box
      sx={{
        gridArea: 'resources',
      }}
    >
      <Heading4
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          marginTop: { xs: '0.5rem', md: '1rem' }, // TODO - Update Heading4 margin top
        }}
      >
        Más información
      </Heading4>
      <List dense>
        {links.map((link) => {
          if (!link) return null;
          return (
            <ListItem
              sx={{
                padding: '0',
              }}
              key={link}
            >
              <Link href={link}>
                <ListItemText
                  primary={<Paragraph sx={{ overflowWrap: 'break-word' }}>{link}</Paragraph>}
                />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Resources;
