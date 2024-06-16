'use client';

import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';

import ComplexSearch from '@/components/complex-search';
import Loading from '@/components/loading';
import Pagination from '@/components/pagination';
import careersQuery from '@/services/gql/careersQuery';
import careersSearchQuery from '@/services/gql/careersSearchQuery';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';
import BaseLayout from '@/layouts/BaseLayout';

import CareerCard from './components/career-card';
import getFetchOptions from './utils/getFetchOptions';
import getFilters from './utils/getFilters';

interface CareersProps {
  searchParams?: {
    query?: string;
    filters?: string;
    page?: string;
    degree?: string;
    category?: string;
    institution?: string;
    order?: string;
  };
}

const Careers = ({ searchParams }: CareersProps) => {
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
    <BaseLayout>
      <Grid
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
    </BaseLayout>
  );
};

export default Careers;
