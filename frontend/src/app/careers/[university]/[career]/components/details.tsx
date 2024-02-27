'use client';

import { Fragment } from 'react';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

import Heading4 from '@/styles/h4';
import Paragraph from '@/styles/p';
import { Enum_Career_Educational_Field } from '@/gql/graphql';

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
        backgroundColor: { xs: '#F0F0F0', sm: '#FAFAFA' },
        padding: { xs: '0', sm: '1rem' },
        borderRadius: { xs: '0', sm: '4px' },
      }}
      elevation={isMediumScreen ? 0 : 1}
    >
      {details.map((detail, index) => {
        if (!detail.paragraph) return null;
        return (
          <Fragment key={detail.title}>
            <Heading4
              sx={{
                marginTop: index === 0 ? '0' : { xs: '0.5rem', md: '1rem' }, // TODO - Update Heading4 margin top
              }}
            >
              {detail.title}
            </Heading4>
            <Paragraph
              sx={{
                marginTop: { xs: '0.25rem', md: '0.5rem' }, // TODO - Update paragraph margin top
              }}
            >
              {detail.paragraph}
            </Paragraph>
          </Fragment>
        );
      })}
    </Paper>
  );
};

export default Details;
