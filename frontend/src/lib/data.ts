import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

import { careerSchema, organizationSchema, scholarshipSchema } from '@/schema';

const DATA = path.join(process.cwd(), 'data');

const read = <T>(folder: string, schema: z.ZodType<T>) => {
  const dir = path.join(DATA, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((name) => name.endsWith('.json'))
    .map((name) => schema.parse(JSON.parse(readFileSync(path.join(dir, name), 'utf8'))));
};

export const getUniversities = () => read('universities', organizationSchema);
export const getEntities = () => read('entities', organizationSchema);
export const getCareers = () => read('careers', careerSchema);
export const getScholarships = () => read('scholarships', scholarshipSchema);

// The date the pipeline last read a record's source page.
export const getVerifiedDate = (sourceUrl: string) => {
  const file = path.join(DATA, 'state.json');
  if (!existsSync(file)) return null;
  const state = z
    .record(z.string(), z.object({ checked: z.string() }))
    .parse(JSON.parse(readFileSync(file, 'utf8')));
  return state[sourceUrl]?.checked ?? null;
};
