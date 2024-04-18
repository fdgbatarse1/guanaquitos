'use client';

import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';

import Loading from '@/components/loading';
import Pagination from '@/components/pagination';
import scholarshipsQuery from '@/services/gql/scholarshipsQuery';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';

import getFilters from './utils/getFilters';
import ScholarshipCard from './components/scholarship-card';

interface CareersProps {
  searchParams?: {
    query?: string;
    filters?: string;
    page?: string;
    type?: string;
    category?: string;
    country?: string;
    entity?: string;
    order?: string;
  };
}

const Scholarships = ({ searchParams }: CareersProps) => {
  const query = searchParams?.query || '';
  const showFilters = searchParams?.filters || '';
  const type = searchParams?.type || '';
  const category = searchParams?.category || '';
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
      page_size: 10,
    },
  });

  if (loading) return <Loading />;
  if (error) throw new Error(`Error: ${error.message}`);

  const totalPages = getTotalPages({
    total: data?.careers?.meta?.pagination?.total,
    pageSize: data?.careers?.meta?.pagination?.pageSize,
  });

  const filters = getFilters({ type, category, country, entity, order });

  return (
    <Grid container padding={4} gap={4} direction="column" alignItems="center">
      <Grid container spacing={2}>
        {data?.scholarships.data.map((scholarship: any) => (
          <Grid key={scholarship.id} item xs={12} md={6} lg={4}>
            <ScholarshipCard
              scholarship_name={scholarship.attributes.name}
              scholarship_country={scholarship.attributes.country}
              scholarship_application_start_date={scholarship.attributes.application_start_date}
              scholarship_application_end_date={scholarship.attributes.application_end_date}
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
  );
};

export default Scholarships;
