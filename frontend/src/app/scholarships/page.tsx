import { Suspense } from 'react';

import Loading from '@/components/loading';
import { getEntities, getScholarships } from '@/lib/data';

import ScholarshipList from './components/scholarship-list';

const Scholarships = () => {
  const entities = getEntities();
  const scholarships = getScholarships().flatMap((scholarship) => {
    const entity = entities.find(({ id }) => id === scholarship.entity);
    if (!entity) return [];
    return [
      {
        id: scholarship.id,
        name: scholarship.name,
        country: scholarship.country,
        type: scholarship.type,
        category: scholarship.category,
        applicationStartDate: scholarship.application_start_date.value,
        applicationFinalDate: scholarship.application_final_date.value,
        entity: { id: entity.id, name: entity.name, logo: entity.logo },
      },
    ];
  });

  return (
    <Suspense fallback={<Loading />}>
      <ScholarshipList scholarships={scholarships} />
    </Suspense>
  );
};

export default Scholarships;
