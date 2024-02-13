import Stack from '@mui/material/Stack/Stack';
import Box from '@mui/material/Box/Box';

import FiltersToogleButton from '@/components/filters-toogle-button';
import Search from '@/components/search';
import Filters from '@/components/filters';

interface ComplexSearchProps {
  query: string;
  fetchOptions: () => Promise<string[]>;
  filters: {
    value: string;
    id: string;
    items: string[];
    label: string;
  }[];
  showFilters: string;
}

const ComplexSearch = ({ query, fetchOptions, filters, showFilters }: ComplexSearchProps) => (
  <Stack direction="column" width="100%">
    <Stack direction="row" gap={3} width="100%" alignItems="center">
      <Search value={query} placeholder="Ingeniería Informática" fetch={fetchOptions} />
      <Box height="100%">
        <FiltersToogleButton selected={showFilters} />
      </Box>
    </Stack>
    <Filters filters={filters} show={showFilters.toLowerCase() === 'true'} />
  </Stack>
);

export default ComplexSearch;
