'use client';

import Link from 'next/link';
import { Box, Card, IconButton, Typography, alpha, styled, useTheme } from '@mui/material';
import {
  RiFileExcel2Fill,
  RiFilePdf2Fill,
  RiFilePpt2Fill,
  RiFileTextFill,
  RiFileWord2Fill,
} from '@remixicon/react';
import { spacing1 } from '@/styles/spacing';
import { type Enum_Resource_Type } from '@/gql/graphql';

interface ResourceProps {
  title: string;
  description: string;
  type: Enum_Resource_Type | '';
  url: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

const ResourceLogo = ({ type }: { type: Enum_Resource_Type | '' }) =>
  ({
    docx: <RiFileWord2Fill size={80} />,
    pdf: <RiFilePdf2Fill size={80} />,
    pptx: <RiFilePpt2Fill size={80} />,
    txt: <RiFileTextFill size={80} />,
    xlsx: <RiFileExcel2Fill size={80} />,
  })[type || 'txt'];

const Resource = ({ title, description, type, url }: ResourceProps) => {
  const theme = useTheme();
  return (
    <StyledCard
      elevation={2}
      sx={{
        minHeight: { xs: '0', md: '125px' },
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        ':hover': {
          color: theme.palette.primary.main,
          cursor: 'pointer',
          transform: 'scale(1.005)',
          boxShadow: `0px 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <Link
        href={url}
        target="_blank"
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: theme.palette.text.primary,
          textDecoration: 'none',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ paddingRight: spacing1 }}>
            <ResourceLogo type={type} />
          </Box>
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            marginTop: spacing1,
          }}
        >
          {description}
        </Typography>
      </Link>
    </StyledCard>
  );
};

export default Resource;
