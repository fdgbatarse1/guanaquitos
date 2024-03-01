'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import Card from '@mui/material/Card/Card';
import { Grid, alpha, useTheme } from '@mui/material';
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
        elevation={2}
        sx={{
          minHeight: 120,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          ':hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer',
            transform: 'scale(1.005)',
            boxShadow: `0px 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={3} sm={1} md={2}>
            <Image
              src={university_logo || placeholder}
              width={university_logo_width}
              height={university_logo_height}
              alt={university_name}
              objectFit="contain"
              layout="responsive"
            />
          </Grid>
          <Grid item xs={9} sm={11} md={10}>
            <Stack direction="column" spacing={1}>
              <Typography sx={{ fontSize: 18 }}>{career_name}</Typography>
              <Typography sx={{ fontSize: 16 }} color="text.secondary">
                {university_name} {university_acronym ? `(${university_acronym})` : ''}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </StyledCard>
    </Link>
  );
};

export default CareerCard;
