import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack/Stack';

import StyledFilter from './filter';

interface StyledFiltersProps {
  filters: {
    value: string;
    id: string;
    items: string[];
    label: string;
  }[];
  show: boolean;
}

const StyledFilters = ({ filters, show }: StyledFiltersProps) => (
  <Collapse in={show}>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={{ xs: 2, md: 3 }}
      paddingTop={{ xs: 2, md: 3 }}
      width="100%"
      alignItems="center"
    >
      {filters.map((filter) => (
        <StyledFilter key={filter.id} {...filter} />
      ))}
    </Stack>
  </Collapse>
);

export default StyledFilters;
