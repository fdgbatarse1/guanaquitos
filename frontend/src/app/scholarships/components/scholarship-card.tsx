'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card/Card';
import { Box, alpha, useTheme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import placeholder from '@/assets/images/no_image_available.png';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

interface ScholarshipCardProps {
  scholarship_name?: string;
  scholarship_country?: string;
  scholarship_application_start_date?: Date;
  scholarship_application_end_date?: Date;
  entity_name?: string;
  entity_logo?: string | StaticImageData;
  entity_logo_width?: number;
  entity_logo_height?: number;
}

const ScholarshipCard = ({
  scholarship_name,
  scholarship_country,
  scholarship_application_start_date,
  scholarship_application_end_date,
  entity_name = 'Instituto no especificado',
  entity_logo,
  entity_logo_width,
  entity_logo_height,
}: ScholarshipCardProps) => {
  const theme = useTheme();
  return (
    <Link
      href={`/scholarships/${entity_name.toLowerCase()}/${scholarship_name}`}
      style={{ textDecoration: 'none' }}
    >
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
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Image
            src={entity_logo || placeholder}
            width={entity_logo_width}
            height={entity_logo_height}
            alt={entity_name}
            style={{
              height: '100%',
              minWidth: '40px',
              maxWidth: '0',
              objectFit: 'contain',
            }}
            layout="responsive"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '1rem',
            }}
          >
            <Typography variant="h5">{scholarship_name}</Typography>
            <Typography variant="body1">
              {entity_name} {scholarship_country ? `(${scholarship_country})` : ''}
            </Typography>
          </Box>
        </Box>
      </StyledCard>
    </Link>
  );
};

export default ScholarshipCard;
