'use client';

import { Fragment } from 'react';
import { Paper, useMediaQuery, useTheme, Typography } from '@mui/material';

import { Enum_Career_Educational_Field } from '@/gql/graphql';
import { spacing1, spacing2 } from '@/styles/spacing';

interface DetailsProps {
  title?: string;
  modality?: string;
  academicDegree?: string;
  educationalField?: Enum_Career_Educational_Field | null | undefined;
  duration?: string;
}

const Details = ({ title, modality, academicDegree, educationalField, duration }: DetailsProps) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const details = [
    { title: 'Título obtenido', paragraph: title },
    { title: 'Modalidad', paragraph: modality },
    { title: 'Grado Académico', paragraph: academicDegree },
    { title: 'Campo educacional', paragraph: educationalField },
    { title: 'Duración', paragraph: duration },
  ];

  return (
    <Paper
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
                marginTop: index === 0 ? '0' : spacing2, // TODO - Update Heading4 margin top
              }}
            >
              {detail.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: spacing1, // TODO - Update paragraph margin top
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
