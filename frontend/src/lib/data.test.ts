/** @jest-environment node */
import { getCareers, getEntities, getScholarships, getUniversities } from './data';

describe('data files', () => {
  it('match the schema and point to an existing organization', () => {
    const universities = getUniversities().map((university) => university.id);
    const entities = getEntities().map((entity) => entity.id);

    getCareers().forEach((career) => expect(universities).toContain(career.university));
    getScholarships().forEach((scholarship) => expect(entities).toContain(scholarship.entity));
  });
});
