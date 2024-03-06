import { GetCareerQuery } from '@/gql/graphql';
import getAcademicGrade from '@/utils/getAcademicGrade';
import getEducationalField from '@/utils/getEducationalField';

const format = (data: GetCareerQuery | undefined) => {
  const careerData = data?.careers?.data?.[0]?.attributes;
  const curriculumData = careerData?.curriculum?.data[0]?.attributes;
  const universityData = careerData?.university?.data?.attributes;
  const universityLogoData = universityData?.logo.data?.attributes;

  if (!careerData) return null;

  return {
    name: careerData?.name,
    title: careerData?.title,
    academicDegree: getAcademicGrade(careerData?.academic_grade),
    educationalField: getEducationalField(careerData?.educational_field),
    modality: careerData?.modality,
    duration: careerData?.duration,
    curriculum: curriculumData?.url,
    description: careerData?.description,
    studyAreas: careerData?.study_areas?.map((studyArea) => studyArea?.text),
    jobAreas: careerData?.job_areas?.map((jobArea) => jobArea?.text),
    costs: careerData?.costs,
    discounts: careerData?.discounts,
    links: careerData?.links?.map((link) => link?.text),
    universityName: universityData?.name,
    universityAcronym: universityData?.acronym,
    universityLogo: universityLogoData?.url,
    universityLogoWidth: universityLogoData?.width,
    universityLogoHeight: universityLogoData?.height,
    universityWebsites: universityData?.websites?.map((website) => website?.text),
    universityEmails: universityData?.emails?.map((email) => email?.text),
    universityPhones: universityData?.phones?.map((phone) => phone?.text),
    universityAddresses: universityData?.addresses?.map((address) => ({
      lat: address?.map.coordinates.lat,
      lng: address?.map.coordinates.lng,
      address: address?.map.address,
      addressDescription: address?.address,
    })),
  };
};

export default format;
