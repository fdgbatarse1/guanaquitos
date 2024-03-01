'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card/Card';
import { Box, alpha, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import placeholder from '@/assets/images/no_image_available.png';
import Paragraph from '@/styles/p';
import Heading5 from '@/styles/h5';

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
            <Heading5>{career_name}</Heading5>
            <Paragraph>
              {university_name} {university_acronym ? `(${university_acronym})` : ''}
            </Paragraph>
          </Box>
        </Box>
      </StyledCard>
    </Link>
  );
};

export default CareerCard;
