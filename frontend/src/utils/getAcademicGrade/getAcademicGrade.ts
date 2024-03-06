import { type Enum_Career_Academic_Grade } from '@/gql/graphql';

const getAcademicDegree = (academic_grade: Enum_Career_Academic_Grade) =>
  ({
    Arquitectura: 'Arquitectura',
    Doctorado_grado: 'Doctorado Grado',
    Doctorado_posgrado: 'Doctorado Posgrado',
    Especialista: 'Especialista',
    Ingenieria: 'Ingeniería',
    Licenciatura: 'Licenciatura',
    Maestria: 'Maestría',
    Profesorado: 'Profesorado',
    Tecnico: 'Técnico',
    Tecnologo: 'Tecnólogo',
  })[academic_grade];

export default getAcademicDegree;
