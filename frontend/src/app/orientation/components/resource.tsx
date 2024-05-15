'use client';

import Link from 'next/link';
import { Box, Card, IconButton, Typography, alpha, styled, useTheme } from '@mui/material';
import { RiFilePdf2Fill } from '@remixicon/react';
import { spacing1 } from '@/styles/spacing';

interface ResourceProps {
  title: string;
  description: string;
  type: string;
  url: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

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
        style={{ display: 'flex', color: theme.palette.text.primary, textDecoration: 'none' }}
      >
        <Box sx={{ paddingRight: spacing1 }}>
          <RiFilePdf2Fill size={80} />
        </Box>
        <Box
          sx={{
            ':hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: spacing1,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Link>
    </StyledCard>
  );
};

export default Resource;
