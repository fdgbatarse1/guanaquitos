import { Enum_Career_Academic_Grade } from '@/gql/graphql';

import getAcademicDegree from './getAcademicGrade';

describe('getAcademicDegree', () => {
  it('should return the correct academic degree for each educational field', () => {
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Arquitectura)).toBe('Arquitectura');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.DoctoradoGrado)).toBe('Doctorado Grado');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.DoctoradoPosgrado)).toBe(
      'Doctorado Posgrado',
    );
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Especialista)).toBe('Especialista');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Ingenieria)).toBe('Ingeniería');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Licenciatura)).toBe('Licenciatura');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Maestria)).toBe('Maestría');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Profesorado)).toBe('Profesorado');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Tecnico)).toBe('Técnico');
    expect(getAcademicDegree(Enum_Career_Academic_Grade.Tecnologo)).toBe('Tecnólogo');
  });
});
