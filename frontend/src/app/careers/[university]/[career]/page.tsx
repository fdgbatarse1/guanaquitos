'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client';

import careerQuery from '@/services/gql/careerQuery';

import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Button,
  ListItemIcon,
  Divider,
  Paper,
  Grid,
  Card,
  ListItemText,
  Chip,
  CardContent,
} from '@mui/material';

import {
  School,
  Work,
  AccessTime,
  Description,
  Web,
  Email,
  Phone,
  Home,
  Link as LinkIcon,
} from '@mui/icons-material';

import { GetCareerQuery } from '@/gql/graphql';

interface CareerPageProps {
  params: {
    university: string;
    career: string;
  };
}

const CareerPage = ({ params }: CareerPageProps) => {
  const { university: universityAcronym, career: careerName } = params;

  const { loading, error, data } = useQuery<GetCareerQuery>(careerQuery, {
    variables: {
      career: decodeURIComponent(careerName),
      university: decodeURIComponent(universityAcronym),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const careerData = data?.careers?.data?.[0]?.attributes;
  const curriculumData = careerData?.curriculum?.data[0]?.attributes;
  const universityData = careerData?.university?.data?.attributes;
  const universityLogoData = universityData?.logo.data?.attributes;

  if (!careerData) return <p>No career data found</p>;

  const career = {
    name: careerData?.name,
    title: careerData?.title,
    academicDegree: careerData?.academic_grade,
    educationalField: careerData?.educational_field,
    modality: careerData?.modality,
    duration: careerData?.duration,
    curriculum: curriculumData?.url,
    // description: careerData?.description?.split('\n'),
    studyAreas: careerData?.study_areas?.map((studyArea) => studyArea?.text),
    jobAreas: careerData?.job_areas?.map((jobArea) => jobArea?.text),
    // costs: careerData?.costs?.split('\n'),
    links: careerData?.links?.map((link) => link?.text),
    universityName: universityData?.name,
    universityAcronym: universityData?.acronym,
    universityLogo: universityLogoData?.url,
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

  console.log(career);

  return <div>hello</div>;
};

export default CareerPage;
