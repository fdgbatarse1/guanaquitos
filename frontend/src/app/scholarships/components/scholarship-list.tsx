'use client';

import { useSearchParams } from 'next/navigation';

import { Grid } from '@mui/material';

import ComplexSearch from '@/components/complex-search';
import Pagination from '@/components/pagination';
import BaseLayout from '@/layouts/BaseLayout';
import getTotalPages from '@/utils/getTotalPages/getTotalPages';
import matches from '@/utils/matches';
import unique from '@/utils/unique';

import getFilters from '../utils/getFilters';
import ScholarshipCard from './scholarship-card';

export interface ScholarshipItem {
  id: string;
  name: string;
  country: string | null;
  type: string | null;
  category: string | null;
  applicationStartDate: string | null;
  applicationFinalDate: string | null;
  entity: { id: string; name: string; logo: string | null };
}

const PAGE_SIZE = 9;

const ScholarshipList = ({ scholarships }: { scholarships: ScholarshipItem[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const showFilters = searchParams.get('filters') || '';
  const type = searchParams.get('type') || '';
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || '';
  const entity = searchParams.get('entity') || '';
  const order = searchParams.get('order') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const found = scholarships
    .filter(
      (scholarship) =>
        matches(scholarship.name, query) &&
        (!type || scholarship.type === type) &&
        (!category || scholarship.category === category) &&
        (!country || scholarship.country === country) &&
        (!entity || scholarship.entity.id === entity),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'es') * (order === 'name:desc' ? -1 : 1));

  const filters = getFilters({
    type,
    category,
    country,
    entity,
    order,
    types: unique(scholarships.map((scholarship) => scholarship.type)),
    categories: unique(scholarships.map((scholarship) => scholarship.category)),
    countries: unique(scholarships.map((scholarship) => scholarship.country)),
    entities: unique(scholarships.map((scholarship) => scholarship.entity.id)).map((id) => ({
      id,
      name: scholarships.find((scholarship) => scholarship.entity.id === id)?.entity.name || id,
    })),
  });

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
          options={unique(found.map((scholarship) => scholarship.name))}
          filters={filters}
          showFilters={showFilters}
        />
        <Grid container spacing={2}>
          {found
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((scholarship) => (
              <Grid key={`${scholarship.entity.id}/${scholarship.id}`} item xs={12} md={6} lg={4}>
                <ScholarshipCard
                  href={`/scholarships/${scholarship.entity.id}/${scholarship.id}`}
                  scholarship_name={scholarship.name}
                  scholarship_country={scholarship.country}
                  scholarship_application_start_date={scholarship.applicationStartDate}
                  scholarship_application_final_date={scholarship.applicationFinalDate}
                  entity_name={scholarship.entity.name}
                  entity_logo={scholarship.entity.logo || undefined}
                  entity_logo_width={40}
                  entity_logo_height={40}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={getTotalPages({ total: found.length, pageSize: PAGE_SIZE })}
          page={currentPage}
        />
      </Grid>
    </BaseLayout>
  );
};

export default ScholarshipList;
