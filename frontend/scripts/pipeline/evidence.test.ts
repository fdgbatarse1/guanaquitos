import { supported } from './evidence';

const page = 'Convocatoria 2026.\nFecha límite:   4 de septiembre de 2026.';

describe('supported', () => {
  it('keeps a value whose evidence is in the page', () => {
    const quoted = { value: '2026-09-04', evidence: 'Fecha límite: 4 de septiembre de 2026' };
    expect(supported(quoted, page)).toEqual(quoted);
  });

  it('drops a value whose evidence is not in the page', () => {
    const quoted = { value: '2026-10-15', evidence: 'Fecha límite: 15 de octubre de 2026' };
    expect(supported(quoted, page)).toEqual({ value: null, evidence: '' });
  });

  it('drops a value that comes with no evidence', () => {
    expect(supported({ value: '2026-09-04', evidence: '' }, page)).toEqual({
      value: null,
      evidence: '',
    });
  });
});
