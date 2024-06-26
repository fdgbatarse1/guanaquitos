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

interface CareerCardProps {
  career_name?: string;
  university_name?: string;
  university_acronym?: string;
  university_logo?: string | StaticImageData;
  university_logo_width?: number;
  university_logo_height?: number;
}

const CareerCard = ({
  career_name,
  university_name = 'Centro de educación superior no especificado',
  university_acronym = '',
  university_logo,
  university_logo_width,
  university_logo_height,
}: CareerCardProps) => {
  const theme = useTheme();
  return (
    <Link
      href={`/careers/${university_acronym.toLowerCase()}/${career_name}`}
      style={{ textDecoration: 'none' }}
    >
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
            src={university_logo || placeholder}
            width={university_logo_width}
            height={university_logo_height}
            alt={university_name}
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
            <Typography variant="h5">{career_name}</Typography>
            <Typography variant="body1">
              {university_name} {university_acronym ? `(${university_acronym})` : ''}
            </Typography>
          </Box>
        </Box>
      </StyledCard>
    </Link>
  );
};

export default CareerCard;
