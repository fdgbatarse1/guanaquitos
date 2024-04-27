import { type Enum_Scholarship_Category } from '@/gql/graphql';

const getCategory = (category: Enum_Scholarship_Category) =>
  ({
    Becas_basadas_en_necesidades: 'Becas basadas en necesidades',
    Becas_con_un_enfoque_especial: 'Becas con un enfoque especial',
    Becas_para_grupos_subrepresentados: 'Becas para grupos subrepresentados',
    Becas_para_todos_los_estudiantes_internacionales:
      'Becas para todos los estudiantes internacionales',
    Becas_por_institucion_otorgante: 'Becas por institución otorgante',
    Becas_por_merito: 'Becas por mérito',
    Becas_por_monto_de_financiacion_ofrecida: 'Becas por monto de financiación ofrecida',
  })[category];

export default getCategory;
