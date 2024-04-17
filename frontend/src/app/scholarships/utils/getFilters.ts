interface GetFiltersProps {
  type: string;
  category: string;
  country: string;
  entity: string;
  order: string;
}

const getFilters = ({ type, category, country, entity, order }: GetFiltersProps) => [
  // "Parcial",
  // "Completa"
  {
    value: type,
    id: 'type',
    items: [
      {
        label: 'Completa',
        id: 'Completa',
      },
      {
        label: 'Parcial',
        id: 'Parcial',
      },
    ],
    label: 'Tipo',
  },
  //   "Becas por mérito",
  //   "Becas basadas en necesidades",
  //   "Becas para todos los estudiantes internacionales",
  //   "Becas para grupos subrepresentados",
  //   "Becas con un enfoque especial",
  //   "Becas por institución otorgante",
  //   "Becas por monto de financiación ofrecida"
  {
    value: category,
    id: 'category',
    items: [
      {
        label: 'Becas por mérito',
        id: 'Becas por mérito',
      },
      {
        label: 'Becas basadas en necesidades',
        id: 'Becas basadas en necesidades',
      },
      {
        label: 'Becas para todos los estudiantes internacionales',
        id: 'Becas para todos los estudiantes internacionales',
      },
      {
        label: 'Becas para grupos subrepresentados',
        id: 'Becas para grupos subrepresentados',
      },
      {
        label: 'Becas con un enfoque especial',
        id: 'Becas con un enfoque especial',
      },
      {
        label: 'Becas por institución otorgante',
        id: 'Becas por institución otorgante',
      },
      {
        label: 'Becas por monto de financiación ofrecida',
        id: 'Becas por monto de financiación ofrecida',
      },
    ],
    label: 'Categoría',
  },
  {
    value: country,
    id: 'country',
    items: [
      {
        label: 'El Salvador',
        id: 'El Salvador',
      },
    ],
    label: 'Lugar',
  },
  {
    value: entity,
    id: 'entity',
    items: [
      {
        label: 'Becas Presidenciales Roque Dalton',
        id: 'Becas Presidenciales Roque Dalton',
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
