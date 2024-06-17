'use client';

import { useQuery } from '@apollo/client';
import { Grid, Typography, useTheme } from '@mui/material';

import Pagination from '@/components/pagination';
import Loading from '@/components/loading';
import getTotalPages from '@/utils/getTotalPages';
import resourcesQuery from '@/services/gql/resourcesQuery';
import resourcesSearchQuery from '@/services/gql/resourcesSearchQuery';
import { GetResourcesQuery } from '@/gql/graphql';
import ComplexSearch from '@/components/complex-search';
import { spacing3 } from '@/styles/spacing';

import Resource from './resource';
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
  const theme = useTheme();

  const { loading, error, data } = useQuery<GetResourcesQuery>(resourcesQuery, {
    variables: {
      query,
      type,
      sort: order || 'title:asc',
      page: currentPage,
      page_size: 9,
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
    <div style={{ width: '100%' }}>
      <Typography variant="h3" color={theme.palette.primary.main}>
        Recursos
      </Typography>
      <Grid container gap={4} direction="column" alignItems="center" sx={{ marginTop: spacing3 }}>
        <ComplexSearch
          query={query}
          fetchOptions={fetchOptions}
          filters={filters}
          showFilters={showFilters}
        />
        <Grid container spacing={2}>
          {data?.resources?.data.map((resource) => {
            const title = resource?.attributes?.title || '';
            const description = resource?.attributes?.description || '';
            const url = resource?.attributes?.media?.data?.attributes?.url
              ? resource.attributes.media.data.attributes.url
              : resource?.attributes?.link || '';
            const itemType = resource?.attributes?.type || '';
            return (
              <Grid key={resource.id} item xs={12} md={4}>
                <Resource title={title} description={description} url={url} type={itemType} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination count={totalPages} page={currentPage} />
      </Grid>
    </div>
  );
};

export default Resources;
