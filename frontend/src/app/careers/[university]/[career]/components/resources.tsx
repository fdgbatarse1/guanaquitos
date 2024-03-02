import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

import Link from 'next/link';
import Paragraph from '@/styles/p';
import { spacing3 } from '@/styles/spacing';

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
      <Typography
        variant="h4"
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          marginTop: spacing3, // TODO - Update Heading4 margin top
        }}
      >
        Más información
      </Typography>
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
