import { Grid } from '@mui/material';

import Advisors from './components/advisors';
import Resources from './components/resources';

interface OrientationProps {
  searchParams?: {
    query?: string;
    filters?: string;
    type?: string;
    order?: string;
    page?: string;
  };
}

const Orientation = ({ searchParams }: OrientationProps) => (
  <Grid container padding={4}>
    <Resources searchParams={searchParams} />
    <Advisors />
  </Grid>
);

export default Orientation;
