'use client';

import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';

import ComplexSearch from '@/components/complex-search';
import Loading from '@/components/loading';
import Pagination from '@/components/pagination';
import scholarshipsQuery from '@/services/gql/scholarshipsQuery';
import scholarshipsSearchQuery from '@/services/gql/scholarshipsSearchQuery';
import BaseLayout from '@/layouts/BaseLayout';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';

import getFilters from './utils/getFilters';
import ScholarshipCard from './components/scholarship-card';
import getFetchOptions from './utils/getFetchOptions';

interface CareersProps {
  searchParams?: {
    query?: string;
    filters?: string;
    page?: string;
    type?: string;
    category?: string;
    country?: string;
    status?: string;
    entity?: string;
    order?: string;
  };
}

const Scholarships = ({ searchParams }: CareersProps) => {
  const query = searchParams?.query || '';
  const showFilters = searchParams?.filters || '';
  const type = searchParams?.type || '';
  const category = searchParams?.category || '';
  const status = searchParams?.status || '';
  const country = searchParams?.country || '';
  const entity = searchParams?.entity || '';
  const order = searchParams?.order || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { loading, error, data } = useQuery(scholarshipsQuery, {
    variables: {
      query,
      type,
      category,
      country,
      entity_name: entity,
      sort: order || 'name:asc',
      page: currentPage,
      page_size: 9,
    },
  });

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const totalPages = getTotalPages({
    total: data?.careers?.meta?.pagination?.total,
    pageSize: data?.careers?.meta?.pagination?.pageSize,
  });

  const fetchOptions = getFetchOptions({
    scholarshipsSearchQuery,
    type,
    category,
    country,
    entity,
    order,
  });

  const filters = getFilters({ type, category, country, entity, order });

  return (
    <BaseLayout>
      <Grid
        height="100%"
        container
        gap={4}
        direction="column"
        alignItems="center"
        sx={{ padding: { xs: '2rem', md: '2rem 4rem' } }}
      >
        <ComplexSearch
          query={query}
          fetchOptions={fetchOptions}
          filters={filters}
          showFilters={showFilters}
        />
        <Grid container spacing={2}>
          {data?.scholarships.data.map((scholarship: any) => (
            <Grid key={scholarship.id} item xs={12} md={6} lg={4}>
              <ScholarshipCard
                scholarship_name={scholarship.attributes.name}
                scholarship_country={scholarship.attributes.country}
                scholarship_application_start_date={scholarship.attributes.application_start_date}
                scholarship_application_final_date={scholarship.attributes.application_final_date}
                entity_name={scholarship?.attributes?.entities?.data[0]?.attributes?.name}
                entity_logo={
                  scholarship?.attributes?.entities?.data[0]?.attributes?.logo?.data[0]?.attributes
                    ?.url
                }
                entity_logo_width={
                  scholarship?.attributes?.entities?.data[0]?.attributes?.logo?.data[0]?.attributes
                    ?.width
                }
                entity_logo_height={
                  scholarship?.attributes?.entities?.data[0]?.attributes?.logo?.data[0]?.attributes
                    ?.height
                }
              />
            </Grid>
          ))}
        </Grid>
        <Pagination count={totalPages} page={currentPage} />
      </Grid>
    </BaseLayout>
  );
};

export default Scholarships;
