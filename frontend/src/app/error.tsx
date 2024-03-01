'use client';

import { Button, Typography, Container } from '@mui/material';

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => (
  <Container
    component="main"
    maxWidth="xs"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: { xs: 'calc(100vh - 4rem)', sm: 'calc(100vh - 80px)' },
    }}
  >
    <Typography variant="h4" component="h1" gutterBottom>
      {statusCode
        ? `Ocurrió un error ${statusCode} en el servidor`
        : 'Ocurrió un error en el cliente'}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Lo sentimos, algo salió mal.
    </Typography>
    <Button variant="contained" color="primary" href="/">
      Volver al inicio
    </Button>
  </Container>
);

export default Error;
