'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';

interface AnnouncementProps {
  title: string;
  description: string;
  url: string;
}

const Announcement = ({ title, description, url }: AnnouncementProps) => {
  const theme = useTheme();
  const handleAddToCalendar = () => {};
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: { xs: '1fr', md: 'auto fit-content' },
        gridTemplateRows: 'min-content 1fr',
        gridTemplateAreas: {
          xs: '"title" "description" "button"',
          md: '"title button" "description description"',
        },
        padding: '1.5rem',
        borderRadius: '0.25rem',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Typography
        sx={{
          gridArea: 'title',
        }}
        variant="h2"
        color={theme.palette.primary.main}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          gridArea: 'description',
        }}
        variant="body1"
      >
        {description}
      </Typography>
      <Button
        sx={{
          gridArea: 'button',
        }}
        variant="contained"
        color="primary"
        onClick={handleAddToCalendar}
        href={url}
        target="blank"
      >
        Añadir al calendario
      </Button>
    </Box>
  );
};

export default Announcement;
