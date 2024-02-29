import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: { xs: 'calc(100vh - 4rem)', sm: 'calc(100vh - 80px)' } }}
    >
      <CircularProgress variant="indeterminate" />
    </Box>
  );
}

export default Loading;
