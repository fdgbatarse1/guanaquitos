'use client';

import { useQuery } from '@apollo/client';

import Loading from '@/components/loading';
import scholarshipsQuery from '@/services/gql/scholarshipsQuery';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';

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

  console.log(data, totalPages);

  return (
    <div>
      <h1>Scholarships</h1>
      <p>Under construction...</p>
    </div>
  );
};

export default Scholarships;
