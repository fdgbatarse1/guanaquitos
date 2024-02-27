import { Box, List, ListItem, ListItemText } from '@mui/material';

import Heading4 from '@/styles/h4';
import Link from 'next/link';
import Paragraph from '@/styles/p';

interface ResourcesProps {
  links?: (string | null | undefined)[];
}

const Resources = ({ links }: ResourcesProps) => {
  if (!links) return null;
  return (
    <Box
      sx={{
        gridArea: 'resources',
      }}
    >
      <Heading4
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          marginTop: '1rem',
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
                <ListItemText primary={<Paragraph>{link}</Paragraph>} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Resources;
