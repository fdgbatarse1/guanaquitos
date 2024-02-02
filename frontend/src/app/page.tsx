'use client';

import Grid from '@mui/material/Grid/Grid';
import Stack from '@mui/material/Stack/Stack';

import StyledFiltersToogleButton from '@/components/styled-filters-toogle-button';
import StyledPagination from '@/components/styled-pagination';
import StyledSearch from '@/components/styled-search';
import Box from '@mui/material/Box/Box';

const Home = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filters?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const filters = searchParams?.filters || '';
  const currentPage = Number(searchParams?.page) || 1;

  const fetchOptions = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return [
      'Ingeniería de Alimentos',
      'Ingeniería Civil',
      'Ingeniería Eléctrica',
      'Ingeniería Energética',
      'Ingeniería Industrial',
      'Ingeniería Informática',
      'Ingeniería Mecánica',
      'Ingeniería Química',
    ];
  };

  return (
    <Grid container padding={4} gap={4} direction="column" alignItems="center">
      <Stack direction="row" gap={3} width="100%" alignItems="center">
        <StyledSearch value={query} placeholder="Ingeniería Informática" fetch={fetchOptions} />
        <Box height="100%">
          <StyledFiltersToogleButton selected={filters} />
        </Box>
      </Stack>
      <StyledPagination count={20} page={currentPage} />
    </Grid>
  );
};

export default Home;
