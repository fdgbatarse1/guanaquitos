import Image, { StaticImageData } from 'next/image';

import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import Card from '@mui/material/Card/Card';
import { Grid } from '@mui/material';
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
}

const CareerCard = ({
  career_name,
  university_name = 'Centro de educación superior no especificado',
  university_acronym = '',
  university_logo,
}: CareerCardProps) => (
  <StyledCard
    elevation={2}
    sx={{
      minHeight: 90,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      ':hover': {
        color: 'rgba(25, 118, 210, 1)',
        cursor: 'pointer',
        transform: 'scale(1.005)',
        boxShadow: '0px 4px 20px rgba(25, 118, 210, 0.25)',
      },
    }}
  >
    <Grid container spacing={3}>
      <Grid item xs={12} sm={1} md={2}>
        <Image
          src={university_logo || placeholder}
          width={100}
          height={100}
          alt={university_name}
          objectFit="contain"
          layout="responsive"
        />
      </Grid>
      <Grid item xs={12} sm={11} md={10}>
        <Stack direction="column" spacing={1}>
          <Typography sx={{ fontSize: 18 }}>{career_name}</Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            {university_name} {university_acronym ? `(${university_acronym})` : ''}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  </StyledCard>
);

export default CareerCard;
