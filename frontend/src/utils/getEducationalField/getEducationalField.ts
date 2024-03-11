import { type Enum_Career_Educational_Field } from '@/gql/graphql';

const getAcademicDegree = (educational_field: Enum_Career_Educational_Field) =>
  ({
    Agricultura: 'Agricultura',
    Ciencias: 'Ciencias',
    Ciencias_sociales_educacion_comercial_y_derecho:
      'Ciencias sociales, educacion comercial y derecho',
    Educacion: 'Educacion',
    Humanidades_y_artes: 'Humanidades y artes',
    Ingenieria_industria_y_construccion: 'Ingeniería industria y construcción',
    Programas_generales: 'Programas generales',
    Salud_y_servicios_sociales: 'Salud y servicios sociales',
    Sectores_desconocidos_o_no_especificados: 'Sectores desconocidos o no especificados',
    Servicios: 'Servicios',
  })[educational_field];

export default getAcademicDegree;
