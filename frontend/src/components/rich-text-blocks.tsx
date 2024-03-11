/* eslint-disable react/no-unstable-nested-components */
import { ReactNode } from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

import { Box, ListItem, ListItemText, Typography } from '@mui/material';

interface ListItemProps {
  children: ReactNode;
  format?: 'ordered' | 'unordered';
}

const ListChildren = ({ children, format }: ListItemProps): ReactNode => {
  if (!children) return null;
  if (!Array.isArray(children)) return null;
  return children.map((child: any) => {
    if (child.props.content.type === 'list-item') {
      let text = '';
      child.props.content.children.forEach((element: any) => {
        text += element.text;
      });
      return (
        <ListItem
          sx={{
            padding: '0',
            display: 'list-item',
          }}
          key={child.key}
        >
          <ListItemText
            sx={{
              padding: '0',
              fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
              lineHeight: { xs: '1.5rem', md: '1.75rem', lg: '1.75' },
              letterSpacing: { xs: '0' },
            }}
            primary={
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                  lineHeight: { xs: '1.5rem', md: '1.75rem', lg: '1.75' },
                  letterSpacing: { xs: '0' },
                }}
              >
                {text}
              </Typography>
            }
          />
        </ListItem>
      );
    }

    return (
      <ListItem
        sx={{
          padding: '0',
          display: 'list-item',
        }}
        key={child.key}
      >
        <Box
          component={format === 'ordered' ? 'ol' : 'ul'}
          sx={{
            marginLeft: { xs: '1rem', md: '1rem' },
            padding: '0',
            listStyleType: `${format === 'ordered' ? 'decimal' : 'disc'}`,
            fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
            lineHeight: { xs: '1.5rem', md: '1.75rem', lg: '1.75' },
            letterSpacing: { xs: '0' },
          }}
        >
          <ListChildren format={child.format}>{child}</ListChildren>
        </Box>
      </ListItem>
    );
  });
};

const RichTextBlocks = ({ content }: { content: BlocksContent }) => (
  <Box
    sx={{
      marginTop: { xs: '0.5rem', md: '1rem' },
      display: 'grid',
      gap: { xs: '0.25rem', md: '0.5rem' },
    }}
  >
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <Typography variant="body1">{children}</Typography>,
        heading: ({ children }) => <Typography variant="h5">{children}</Typography>,
        list: ({ children, format }) => (
          <Box
            component={format === 'ordered' ? 'ol' : 'ul'}
            sx={{
              marginLeft: { xs: '1rem', md: '1rem' },
              padding: '0',
              listStyleType: `${format === 'ordered' ? 'decimal' : 'disc'}`,
              fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
              lineHeight: { xs: '1.5rem', md: '1.75rem', lg: '1.75' },
              letterSpacing: { xs: '0' },
            }}
          >
            <ListChildren format={format}>{children}</ListChildren>
          </Box>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <span style={{ fontWeight: 500 }}>{children}</span>,
        italic: ({ children }) => <span style={{ fontStyle: 'italic' }}>{children}</span>,
        underline: ({ children }) => (
          <span style={{ textDecoration: 'underline' }}>{children}</span>
        ),
      }}
    />
  </Box>
);

export default RichTextBlocks;
