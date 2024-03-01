import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';

const NotFoundPage = () => (
  <Container
    maxWidth="sm"
    sx={{
      mt: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: { xs: 'calc(100vh - 4rem)', sm: 'calc(100vh - 80px)' },
    }}
  >
    <Typography component="h1" variant="h2" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      ¡Ups! La página que buscas no está aquí.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Podrías tener la dirección incorrecta o quizás la página se haya movido.
    </Typography>
    <Box mt={4}>
      <Link href="/">
        <Button variant="contained" color="primary">
          Volver a la página principal
        </Button>
      </Link>
    </Box>
  </Container>
);

export default NotFoundPage;
