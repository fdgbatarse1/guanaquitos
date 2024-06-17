'use client';

import { Fragment } from 'react';

import { Paper, Typography } from '@mui/material';

import { spacing1, spacing2 } from '@/styles/spacing';

interface DetailsProps {
  type?: string;
  category?: string;
  modality?: string;
  applicationStartDate?: string;
  applicationFinalDate?: string;
  studiesStartDate?: string;
  studiesFinalDate?: string;
}

const Details = ({
  type,
  category,
  modality,
  applicationStartDate,
  applicationFinalDate,
  studiesStartDate,
  studiesFinalDate,
}: DetailsProps) => {
  const details = [
    { title: 'Tipo', paragraph: type },
    { title: 'Categoría', paragraph: category },
    { title: 'Modalidad', paragraph: modality },
    { title: 'Fecha inicio de aplicación', paragraph: applicationStartDate },
    { title: 'Fecha fin de aplicación', paragraph: applicationFinalDate },
    { title: 'Fecha inicio de estudios', paragraph: studiesStartDate },
    { title: 'Fecha fin de estudios', paragraph: studiesFinalDate },
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        gridArea: 'details',

        boxShadow: '0px 4px 20px rgba(0, 20, 40, 0.25)',
        padding: { xs: '1rem' },
        borderRadius: { xs: '4px' },
      }}
    >
      {details.map((detail, index) => {
        if (!detail.paragraph) return null;
        return (
          <Fragment key={detail.title}>
            <Typography
              variant="h4"
              sx={{
                marginTop: index === 0 ? '0' : spacing2,
              }}
            >
              {detail.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: spacing1,
              }}
            >
              {detail.paragraph}
            </Typography>
          </Fragment>
        );
      })}
    </Paper>
  );
};

export default Details;
