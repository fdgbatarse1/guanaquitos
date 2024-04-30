import { GetScholarshipQuery } from '@/gql/graphql';
import getType from './getType';
import getCategory from './getCategory';

const format = (data: GetScholarshipQuery | undefined) => {
  const scholarshipData = data?.scholarships?.data?.[0]?.attributes;
  const documentsData = scholarshipData?.documents?.data[0]?.attributes;
  const entityData = scholarshipData?.entities?.data[0]?.attributes;
  const entityLogoData = entityData?.logo?.data[0]?.attributes;

  if (!scholarshipData) return null;

  return {
    name: scholarshipData?.name,
    country: scholarshipData?.country,
    type: getType(scholarshipData?.type),
    category: getCategory(scholarshipData?.category),
    modality: scholarshipData?.modality,
    applicationStartDate: scholarshipData?.application_start_date,
    applicationFinalDate: scholarshipData?.application_final_date,
    studiesStartDate: scholarshipData?.studies_start_date,
    studiesFinalDate: scholarshipData?.studies_final_date,
    documents: documentsData?.url,
    description: scholarshipData?.description,
    goals: scholarshipData?.goals,
    studyAreas: scholarshipData?.study_areas?.map((studyArea) => studyArea?.text),
    benefits: scholarshipData?.benefits,
    requirements: scholarshipData?.requirements,
    conditions: scholarshipData?.conditions,
    howToApply: scholarshipData?.how_to_apply,
    requiredDocuments: scholarshipData?.required_documents,
    selectionCriteria: scholarshipData?.selection_criteria,
    links: scholarshipData?.links?.map((link) => link?.text),
    entityName: entityData?.name,
    entityAcronym: entityData?.acronym,
    entityLogo: entityLogoData?.url,
    entityLogoWidth: entityLogoData?.width,
    entityLogoHeight: entityLogoData?.height,
    entityWebsites: entityData?.websites?.map((website) => website?.text),
    entityEmails: entityData?.emails?.map((email) => email?.text),
    entityPhones: entityData?.phones?.map((phone) => phone?.text),
    entityAddresses: entityData?.addresses?.map((address) => ({
      lat: address?.map.coordinates.lat,
      lng: address?.map.coordinates.lng,
      address: address?.map.address,
      addressDescription: address?.address,
    })),
  };
};

export default format;
