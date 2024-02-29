import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';

const NotFoundPage = () => (
  <Container
    component="main"
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
      Oops! The page you&apos;re looking for isn&apos;t here.
    </Typography>
    <Typography variant="body1" gutterBottom>
      You might have the wrong address, or the page may have moved.
    </Typography>
    <Box mt={4}>
      <Link href="/">
        <Button variant="contained" color="primary">
          Go to Homepage
        </Button>
      </Link>
    </Box>
  </Container>
);

export default NotFoundPage;
