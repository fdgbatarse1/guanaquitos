interface GetFiltersProps {
  degree: string;
  category: string;
  institution: string;
  order: string;
  degrees: string[];
  categories: string[];
  institutions: { id: string; name: string }[];
}

const toItems = (values: string[]) => values.map((value) => ({ label: value, id: value }));

const getFilters = ({
  degree,
  category,
  institution,
  order,
  degrees,
  categories,
  institutions,
}: GetFiltersProps) => [
  { value: degree, id: 'degree', items: toItems(degrees), label: 'Grado académico' },
  { value: category, id: 'category', items: toItems(categories), label: 'Categoría' },
  {
    value: institution,
    id: 'institution',
    items: institutions.map(({ id, name }) => ({ label: name, id })),
    label: 'Institución',
  },
  {
    value: order,
    id: 'order',
    items: [
      { label: 'Nombre (Ascendente)', id: 'name:asc' },
      { label: 'Nombre (Descendente)', id: 'name:desc' },
    ],
    label: 'Ordenar por',
  },
];

export default getFilters;
