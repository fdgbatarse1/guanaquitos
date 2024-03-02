'use client';

import { Grid } from '@mui/material';

import Pagination from '@/components/pagination';
import ComplexSearch from '@/components/complex-search';
import CareerCard from '@/components/career-card';
import careersSearchQuery from '@/services/gql/careersSearchQuery';
import careersQuery from '@/services/gql/careersQuery';
import { useQuery } from '@apollo/client';
import Loading from '@/components/loading';
import getFilters from './utils/getFilters';
import getTotalPages from './utils/getTotalPages';
import getFetchOptions from './utils/getFetchOptions';

const Home = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filters?: string;
    page?: string;
    degree?: string;
    category?: string;
    institution?: string;
    order?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const showFilters = searchParams?.filters || '';
  const degree = searchParams?.degree || '';
  const category = searchParams?.category || '';
  const institution = searchParams?.institution || '';
  const order = searchParams?.order || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { loading, error, data } = useQuery(careersQuery, {
    variables: {
      query,
      academic_grade: degree,
      educational_field: category,
      university_acronym: institution,
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

  const fetchOptions = getFetchOptions({
    careersSearchQuery,
    degree,
    category,
    institution,
    order,
  });

  const filters = getFilters({ degree, category, institution, order });

  return (
    <Grid container padding={4} gap={4} direction="column" alignItems="center">
      <ComplexSearch
        query={query}
        fetchOptions={fetchOptions}
        filters={filters}
        showFilters={showFilters}
      />
      <Grid container spacing={2}>
        {data?.careers.data.map((career: any) => (
          <Grid key={career.id} item xs={12} md={6} lg={4}>
            <CareerCard
              career_name={career.attributes.name}
              university_name={career.attributes.university.data.attributes.name}
              university_acronym={career.attributes.university.data.attributes.acronym}
              university_logo={
                career?.attributes?.university?.data?.attributes?.logo?.data?.attributes?.url
              }
              university_logo_width={
                career?.attributes?.university?.data?.attributes?.logo?.data?.attributes?.width
              }
              university_logo_height={
                career?.attributes?.university?.data?.attributes?.logo?.data?.attributes?.height
              }
            />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={currentPage} />
    </Grid>
  );
};

export default Home;
