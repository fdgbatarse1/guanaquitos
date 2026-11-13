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
import CareerCard from './career-card';

export interface CareerItem {
  id: string;
  name: string;
  academicGrade: string | null;
  educationalField: string | null;
  university: { id: string; name: string; acronym: string | null; logo: string | null };
}

const PAGE_SIZE = 9;

const CareerList = ({ careers }: { careers: CareerItem[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const showFilters = searchParams.get('filters') || '';
  const degree = searchParams.get('degree') || '';
  const category = searchParams.get('category') || '';
  const institution = searchParams.get('institution') || '';
  const order = searchParams.get('order') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const found = careers
    .filter(
      (career) =>
        matches(career.name, query) &&
        (!degree || career.academicGrade === degree) &&
        (!category || career.educationalField === category) &&
        (!institution || career.university.id === institution),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'es') * (order === 'name:desc' ? -1 : 1));

  const filters = getFilters({
    degree,
    category,
    institution,
    order,
    degrees: unique(careers.map((career) => career.academicGrade)),
    categories: unique(careers.map((career) => career.educationalField)),
    institutions: unique(careers.map((career) => career.university.id)).map((id) => {
      const university = careers.find((career) => career.university.id === id)?.university;
      return { id, name: university?.acronym || university?.name || id };
    }),
  });

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
          options={unique(found.map((career) => career.name))}
          filters={filters}
          showFilters={showFilters}
        />
        <Grid container spacing={2}>
          {found.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((career) => (
            <Grid key={`${career.university.id}/${career.id}`} item xs={12} md={6} lg={4}>
              <CareerCard
                href={`/careers/${career.university.id}/${career.id}`}
                career_name={career.name}
                university_name={career.university.name}
                university_acronym={career.university.acronym}
                university_logo={career.university.logo || undefined}
                university_logo_width={40}
                university_logo_height={40}
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

export default CareerList;
