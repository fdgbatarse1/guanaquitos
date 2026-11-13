import { Suspense } from 'react';

import Loading from '@/components/loading';
import { getCareers, getUniversities } from '@/lib/data';

import CareerList from './components/career-list';

const Careers = () => {
  const universities = getUniversities();
  const careers = getCareers().flatMap((career) => {
    const university = universities.find(({ id }) => id === career.university);
    if (!university) return [];
    return [
      {
        id: career.id,
        name: career.name,
        academicGrade: career.academic_grade,
        educationalField: career.educational_field,
        university: {
          id: university.id,
          name: university.name,
          acronym: university.acronym,
          logo: university.logo,
        },
      },
    ];
  });

  return (
    <Suspense fallback={<Loading />}>
      <CareerList careers={careers} />
    </Suspense>
  );
};

export default Careers;
