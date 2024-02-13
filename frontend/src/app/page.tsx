'use client';

import Grid from '@mui/material/Grid/Grid';

import Pagination from '@/components/pagination';
import ComplexSearch from '@/components/complex-search';
import CareerCard from '@/components/career-card';

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

  const fetchOptions = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return [
      'Ingeniería de Alimentos',
      'Ingeniería Civil',
      'Ingeniería Eléctrica',
      'Ingeniería Energética',
      'Ingeniería Industrial',
      'Ingeniería Informática',
      'Ingeniería Mecánica',
      'Ingeniería Química',
    ];
  };

  const filters = [
    {
      value: degree,
      id: 'degree',
      items: ['Ingeniería', 'Licenciatura', 'Doctorado'],
      label: 'Grado académico',
    },
    {
      value: category,
      id: 'category',
      items: ['Ciencias', 'Matematicas', 'Humanistica'],
      label: 'Categoría',
    },
    {
      value: institution,
      id: 'institution',
      items: ['UNAM', 'IPN', 'UAM'],
      label: 'Institución',
    },
    {
      value: order,
      id: 'order',
      items: ['Nombre', 'Fecha'],
      label: 'Ordenar por',
    },
  ];

  return (
    <Grid container padding={4} gap={4} direction="column" alignItems="center">
      <ComplexSearch
        query={query}
        fetchOptions={fetchOptions}
        filters={filters}
        showFilters={showFilters}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CareerCard
            career_name="Ingeniería Informática"
            university_name="Universidad Centroamericana José Simeón Cañas"
            university_acronym="UCA"
            university_logo="/assets/images/placeholder.webp"
          />
        </Grid>
      </Grid>
      <Pagination count={20} page={currentPage} />
    </Grid>
  );
};

export default Home;
