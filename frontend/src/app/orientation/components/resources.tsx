'use client';

import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';

import Pagination from '@/components/pagination';
import Loading from '@/components/loading';
import getTotalPages from '@/utils/getTotalPages';
import resourcesQuery from '@/services/gql/resourcesQuery';
import resourcesSearchQuery from '@/services/gql/resourcesSearchQuery';
import { GetResourcesQuery } from '@/gql/graphql';
import ComplexSearch from '@/components/complex-search';

import getFilters from '../utils/getFilters';
import getFetchOptions from '../utils/getFetchOptions';

interface OrientationProps {
  searchParams?: {
    query?: string;
    filters?: string;
    type?: string;
    order?: string;
    page?: string;
  };
}

const Resources = ({ searchParams }: OrientationProps) => {
  const query = searchParams?.query || '';
  const showFilters = searchParams?.filters || '';
  const type = searchParams?.type || '';
  const order = searchParams?.order || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { loading, error, data } = useQuery<GetResourcesQuery>(resourcesQuery, {
    variables: {
      query,
      type,
      sort: order || 'title:asc',
      page: currentPage,
      page_size: 10,
    },
  });

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const totalPages = getTotalPages({
    total: data?.resources?.meta?.pagination?.total,
    pageSize: data?.resources?.meta?.pagination?.pageSize,
  });

  const filters = getFilters({ type, order });
  const fetchOptions = getFetchOptions({
    resourcesSearchQuery,
    type,
    order,
  });

  return (
    <Grid container gap={4} direction="column" alignItems="center">
      <ComplexSearch
        query={query}
        fetchOptions={fetchOptions}
        filters={filters}
        showFilters={showFilters}
      />
      <Grid container spacing={2}>
        {data?.resources?.data.map((resource: any) => (
          <Grid key={resource.id} item xs={12} md={4}>
            {resource?.attributes?.title}
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={currentPage} />
    </Grid>
  );
};

export default Resources;
