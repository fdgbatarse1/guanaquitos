interface GetFiltersProps {
  type: string;
  category: string;
  country: string;
  entity: string;
  order: string;
  types: string[];
  categories: string[];
  countries: string[];
  entities: { id: string; name: string }[];
}

const toItems = (values: string[]) => values.map((value) => ({ label: value, id: value }));

const getFilters = ({
  type,
  category,
  country,
  entity,
  order,
  types,
  categories,
  countries,
  entities,
}: GetFiltersProps) => [
  { value: type, id: 'type', items: toItems(types), label: 'Tipo' },
  { value: category, id: 'category', items: toItems(categories), label: 'Categoría' },
  { value: country, id: 'country', items: toItems(countries), label: 'Lugar' },
  {
    value: entity,
    id: 'entity',
    items: entities.map(({ id, name }) => ({ label: name, id })),
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
