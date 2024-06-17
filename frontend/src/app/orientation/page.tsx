import { Grid } from '@mui/material';

import BaseLayout from '@/layouts/BaseLayout';

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
  <BaseLayout>
    <Grid container sx={{ padding: { xs: '2rem', md: '2rem 4rem' } }}>
      <Resources searchParams={searchParams} />
      <Advisors />
    </Grid>
  </BaseLayout>
);

export default Orientation;
