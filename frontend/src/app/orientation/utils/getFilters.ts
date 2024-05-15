interface GetFiltersProps {
  type: string;
  order: string;
}

const getFilters = ({ type, order }: GetFiltersProps) => [
  {
    value: type,
    id: 'type',
    items: [
      {
        label: 'Documento de Word',
        id: 'docx',
      },
      {
        label: 'Documento de PDF',
        id: 'pdf',
      },
      {
        label: 'Presentación de PowerPoint',
        id: 'pptx',
      },
      {
        label: 'Documento de Texto',
        id: 'txt',
      },
      {
        label: 'Documento de Excel',
        id: 'xlsx',
      },
    ],
    label: 'Tipo',
  },
  {
    value: order,
    id: 'order',
    items: [
      {
        label: 'Nombre (Ascendente)',
        id: 'title:asc',
      },
      {
        label: 'Nombre (Descendente)',
        id: 'title:desc',
      },
    ],
    label: 'Ordenar por',
  },
];

export default getFilters;
