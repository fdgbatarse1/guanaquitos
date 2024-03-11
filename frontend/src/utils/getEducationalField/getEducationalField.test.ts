import { Enum_Career_Educational_Field } from '@/gql/graphql';

import getEducationalField from './getEducationalField';

describe('getEducationalField', () => {
  it('should return the correct academic degree for each educational field', () => {
    expect(getEducationalField(Enum_Career_Educational_Field.Agricultura)).toBe('Agricultura');
    expect(getEducationalField(Enum_Career_Educational_Field.Ciencias)).toBe('Ciencias');
    expect(
      getEducationalField(Enum_Career_Educational_Field.CienciasSocialesEducacionComercialYDerecho),
    ).toBe('Ciencias sociales, educacion comercial y derecho');
    expect(getEducationalField(Enum_Career_Educational_Field.Educacion)).toBe('Educacion');
    expect(getEducationalField(Enum_Career_Educational_Field.HumanidadesYArtes)).toBe(
      'Humanidades y artes',
    );
    expect(
      getEducationalField(Enum_Career_Educational_Field.IngenieriaIndustriaYConstruccion),
    ).toBe('Ingeniería industria y construcción');
    expect(getEducationalField(Enum_Career_Educational_Field.ProgramasGenerales)).toBe(
      'Programas generales',
    );
    expect(getEducationalField(Enum_Career_Educational_Field.SaludYServiciosSociales)).toBe(
      'Salud y servicios sociales',
    );
    expect(
      getEducationalField(Enum_Career_Educational_Field.SectoresDesconocidosONoEspecificados),
    ).toBe('Sectores desconocidos o no especificados');
    expect(getEducationalField(Enum_Career_Educational_Field.Servicios)).toBe('Servicios');
  });
});
