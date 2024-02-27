'use client';

import client from '@/lib/apollo-client';
import Grid from '@mui/material/Grid/Grid';

import Pagination from '@/components/pagination';
import ComplexSearch from '@/components/complex-search';
import CareerCard from '@/components/career-card';
import careersSearchQuery from '@/services/gql/careersSearchQuery';
import careersQuery from '@/services/gql/careersQuery';
import { useQuery } from '@apollo/client';

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

  const totalPages = Math.ceil(
    (data?.careers?.meta?.pagination?.total || 0) /
      (data?.careers?.meta?.pagination?.pageSize || 1),
  );

  const fetchOptions = async (newInputValue: string) => {
    const { data: newData } = await client.query({
      query: careersSearchQuery,
      variables: {
        query: newInputValue,
        academic_grade: degree,
        educational_field: category,
        university_acronym: institution,
        sort: order || 'name:asc',
        page: 1,
        page_size: 10,
      },
    });

    const names = newData.careers.data.map((career: any) => career.attributes.name);

    return names;
  };

  const filters = [
    {
      value: degree,
      id: 'degree',
      items: [
        {
          label: 'Tecnico',
          id: 'Tecnico',
        },
        {
          label: 'Profesorado',
          id: 'Profesorado',
        },
        {
          label: 'Tecnologo',
          id: 'Tecnologo',
        },
        {
          label: 'Licenciatura',
          id: 'Licenciatura',
        },
        {
          label: 'Arquitectura',
          id: 'Arquitectura',
        },
        {
          label: 'Ingenieria',
          id: 'Ingenieria',
        },
        {
          label: 'Doctorado (grado)',
          id: 'Doctorado_grado',
        },
        {
          label: 'Especialista',
          id: 'Especialista',
        },
        {
          label: 'Maestria',
          id: 'Maestria',
        },
        {
          label: 'Doctorado posgrado',
          id: 'Doctorado_posgrado',
        },
      ],
      label: 'Grado académico',
    },
    {
      value: category,
      id: 'category',
      items: [
        {
          label: 'Programas generales',
          id: 'Programas_generales',
        },
        {
          label: 'Educacion',
          id: 'Educacion',
        },
        {
          label: 'Humanidades y artes',
          id: 'Humanidades_y_artes',
        },
        {
          label: 'Ciencias sociales, educación comercial y derecho',
          id: 'Ciencias_sociales_educacion_comercial_y_derecho',
        },
        {
          label: 'Ciencias',
          id: 'Ciencias',
        },
        {
          label: 'Ingeniería industria y construcción',
          id: 'Ingenieria_industria_y_construccion',
        },
        {
          label: 'Agricultura',
          id: 'Agricultura',
        },
        {
          label: 'Salud y servicios sociales',
          id: 'Salud_y_servicios_sociales',
        },
        {
          label: 'Servicios',
          id: 'Servicios',
        },
        {
          label: 'Sectores desconocidos o no especificados',
          id: 'Sectores_desconocidos_o_no_especificados',
        },
      ],
      label: 'Categoría',
    },
    {
      value: institution,
      id: 'institution',
      items: [
        {
          label: 'UCA',
          id: 'UCA',
        },
        {
          label: 'UDB',
          id: 'UDB',
        },
      ],
      label: 'Institución',
    },
    {
      value: order,
      id: 'order',
      items: [
        {
          label: 'Nombre (Ascendente)',
          id: 'name:asc',
        },
        {
          label: 'Nombre (Descendente)',
          id: 'name:desc',
        },
      ],
      label: 'Ordenar por',
    },
  ];

  return (
    <Grid container bgcolor="#f0f0f0" padding={4} gap={4} direction="column" alignItems="center">
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
            />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={currentPage} />
    </Grid>
  );
};

export default Home;
