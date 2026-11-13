import { z } from 'zod';

export const academicGrades = [
  'Técnico',
  'Profesorado',
  'Tecnólogo',
  'Licenciatura',
  'Arquitectura',
  'Ingeniería',
  'Doctorado (grado)',
  'Especialista',
  'Maestría',
  'Doctorado posgrado',
] as const;

export const educationalFields = [
  'Programas generales',
  'Educación',
  'Humanidades y artes',
  'Ciencias sociales, educación comercial y derecho',
  'Ciencias',
  'Ingeniería, industria y construcción',
  'Agricultura',
  'Salud y servicios sociales',
  'Servicios',
  'Sectores desconocidos o no especificados',
] as const;

export const scholarshipCategories = [
  'Becas por mérito',
  'Becas basadas en necesidades',
  'Becas para todos los estudiantes internacionales',
  'Becas para grupos subrepresentados',
  'Becas con un enfoque especial',
  'Becas por institución otorgante',
  'Becas por monto de financiación ofrecida',
] as const;

export const scholarshipTypes = ['Parcial', 'Completa'] as const;

// A value the page states, with the exact text it was copied from.
const quoted = z.object({
  value: z.string().nullable(),
  evidence: z.string(),
});

export const extractedOrganizationSchema = z.object({
  name: z.string(),
  acronym: z.string().nullable(),
  addresses: z.array(z.string()),
  phones: z.array(z.string()),
  emails: z.array(z.string()),
  websites: z.array(z.string()),
});

export const organizationSchema = extractedOrganizationSchema.extend({
  id: z.string(),
  logo: z.string().nullable(),
  addresses: z.array(
    z.object({
      address: z.string(),
      lat: z.number().nullable(),
      lng: z.number().nullable(),
    }),
  ),
  source_urls: z.array(z.string()),
});

export const extractedCareerSchema = z.object({
  name: z.string(),
  title: z.string().nullable(),
  academic_grade: z.enum(academicGrades).nullable(),
  educational_field: z.enum(educationalFields).nullable(),
  modality: z.string().nullable(),
  duration: quoted,
  description: z.string().nullable(),
  study_areas: z.array(z.string()),
  job_areas: z.array(z.string()),
  costs: quoted,
  discounts: z.string().nullable(),
  curriculum_url: z.string().nullable(),
  links: z.array(z.string()),
});

export const careerSchema = extractedCareerSchema.extend({
  id: z.string(),
  university: z.string(),
  source_urls: z.array(z.string()),
});

export const extractedScholarshipSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  category: z.enum(scholarshipCategories).nullable(),
  type: z.enum(scholarshipTypes).nullable(),
  country: z.string().nullable(),
  modality: z.string().nullable(),
  study_areas: z.array(z.string()),
  application_start_date: quoted,
  application_final_date: quoted,
  studies_start_date: quoted,
  studies_final_date: quoted,
  goals: z.array(z.string()),
  benefits: z.array(z.string()),
  requirements: z.array(z.string()),
  conditions: z.array(z.string()),
  required_documents: z.array(z.string()),
  selection_criteria: z.array(z.string()),
  how_to_apply: z.array(z.string()),
  documents: z.array(z.string()),
  links: z.array(z.string()),
});

export const scholarshipSchema = extractedScholarshipSchema.extend({
  id: z.string(),
  entity: z.string(),
  source_urls: z.array(z.string()),
});

export type Organization = z.infer<typeof organizationSchema>;
export type Career = z.infer<typeof careerSchema>;
export type Scholarship = z.infer<typeof scholarshipSchema>;
