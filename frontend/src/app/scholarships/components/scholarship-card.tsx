'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card/Card';
import { Box, useTheme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import placeholder from '@/assets/images/no_image_available.png';

import getStatus from '../utils/getStatus';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

interface ScholarshipCardProps {
  href: string;
  scholarship_name: string;
  scholarship_country: string | null;
  scholarship_application_start_date: string | null;
  scholarship_application_final_date: string | null;
  entity_name: string;
  entity_logo?: string | StaticImageData;
  entity_logo_width?: number;
  entity_logo_height?: number;
}

const ScholarshipCard = ({
  href,
  scholarship_name,
  scholarship_country,
  scholarship_application_start_date,
  scholarship_application_final_date,
  entity_name,
  entity_logo,
  entity_logo_width,
  entity_logo_height,
}: ScholarshipCardProps) => {
  const theme = useTheme();
  const status = getStatus(scholarship_application_start_date, scholarship_application_final_date);
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <StyledCard
        elevation={1}
        sx={{
          height: '100%',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          ':hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer',
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
            {status && (
              <Typography variant="body2" color={status.color}>
                {status.label}
              </Typography>
            )}
          </Box>
        </Box>
      </StyledCard>
    </Link>
  );
};

export default ScholarshipCard;
