interface GetFiltersProps {
  degree: string;
  category: string;
  institution: string;
  order: string;
}

const getFilters = ({ degree, category, institution, order }: GetFiltersProps) => [
  {
    value: degree,
    id: 'degree',
    items: [
      {
        label: 'Técnico',
        id: 'Técnico',
      },
      {
        label: 'Profesorado',
        id: 'Profesorado',
      },
      {
        label: 'Tecnólogo',
        id: 'Tecnólogo',
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
        label: 'Ingeniería',
        id: 'Ingeniería',
      },
      {
        label: 'Doctorado (grado)',
        id: 'Doctorado (grado)',
      },
      {
        label: 'Especialista',
        id: 'Especialista',
      },
      {
        label: 'Maestría',
        id: 'Maestría',
      },
      {
        label: 'Doctorado posgrado',
        id: 'Doctorado posgrado',
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
        id: 'Programas generales',
      },
      {
        label: 'Educación',
        id: 'Educación',
      },
      {
        label: 'Humanidades y artes',
        id: 'Humanidades y artes',
      },
      {
        label: 'Ciencias sociales, educación comercial y derecho',
        id: 'Ciencias sociales, educación comercial y derecho',
      },
      {
        label: 'Ciencias',
        id: 'Ciencias',
      },
      {
        label: 'Ingeniería, industria y construcción',
        id: 'Ingeniería, industria y construcción',
      },
      {
        label: 'Agricultura',
        id: 'Agricultura',
      },
      {
        label: 'Salud y servicios sociales',
        id: 'Salud y servicios sociales',
      },
      {
        label: 'Servicios',
        id: 'Servicios',
      },
      {
        label: 'Sectores desconocidos o no especificados',
        id: 'Sectores desconocidos o no especificados',
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

export default getFilters;
