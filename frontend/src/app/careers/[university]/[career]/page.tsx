'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import Map from '@/components/map';

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
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  School,
  Work,
  Circle,
  AccessTime,
  Description,
  Web,
  Email,
  Phone,
  Home,
  Link as LinkIcon,
} from '@mui/icons-material';

import { GetCareerQuery } from '@/gql/graphql';
import { ReactNode } from 'react';
import RichTextBlocks from '@/components/rich-text-blocks';

interface CareerPageProps {
  params: {
    university: string;
    career: string;
  };
}

const CareerPage = ({ params }: CareerPageProps) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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

  return (
    // main wrapper
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#F0F0F0',
      }}
    >
      {/* content wrapper */}
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '768px', lg: '1024px', xl: '1280px' },
        }}
      >
        {/* name and curriculum wrapper */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
          }}
        >
          {/* career name */}
          <Typography
            variant="h1"
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' },
              lineHeight: { xs: '2.25rem', md: '2.5rem', lg: '3rem' },
              letterSpacing: { xs: '0' },
            }}
          >
            {career.name}
          </Typography>
          {/* curriculum button, link to curriculum */}
          <Link href={career.curriculum} target="_blank">
            <Button
              sx={{
                marginTop: { xs: '1rem', md: '0' },
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
              variant="contained"
              color="primary"
              startIcon={<School />}
            >
              Malla curricular
            </Button>
          </Link>
        </Box>
        {/* divider */}
        <Divider
          sx={{
            marginTop: '1rem',
          }}
        />
        {/* career info wrapper */}
        <Box
          sx={{
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gridTemplateRows: 'min-content 1fr',
            gridTemplateAreas: {
              xs: '"shortInfo" "longInfo" "costs" "university" "moreInfo"',
              md: '"longInfo shortInfo" "longInfo moreInfo" "costs costs" "university university"',
            },
            gridGap: { xs: '1rem', md: '2rem' },
          }}
        >
          <Box
            sx={{
              gridArea: 'longInfo',
            }}
          >
            {/* career description title */}
            <Typography
              variant="h3"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
                lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Descripción
            </Typography>
            {/* career description content */}
            <RichTextBlocks content={career.description} />
            {/* career study areas title */}
            <Typography
              variant="h3"
              sx={{
                marginTop: '1rem',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
                lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Áreas de estudio
            </Typography>
            {/* career study areas content */}
            <Box
              component="ul"
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
                padding: '0',
                listStyleType: 'disc',
              }}
            >
              {career.studyAreas.map((studyArea) => (
                <ListItem
                  sx={{
                    padding: '0',
                    display: 'list-item',
                  }}
                  key={studyArea}
                >
                  <ListItemText
                    sx={{
                      padding: '0',
                    }}
                    primary={
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: { xs: '1.5rem', md: '1.75rem' },
                          letterSpacing: { xs: '0' },
                        }}
                      >
                        {studyArea}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </Box>
            {/* career job areas title */}
            <Typography
              variant="h3"
              sx={{
                marginTop: '1rem',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
                lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Áreas de desempeño laboral
            </Typography>
            {/* career job areas content */}
            <Box
              component="ul"
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
                padding: '0',
                listStyleType: 'disc',
              }}
            >
              {career.jobAreas.map((jobArea) => (
                <ListItem
                  sx={{
                    padding: '0',
                    display: 'list-item',
                  }}
                  key={jobArea}
                >
                  <ListItemText
                    sx={{
                      padding: '0',
                    }}
                    primary={
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: { xs: '1.5rem', md: '1.75rem' },
                          letterSpacing: { xs: '0' },
                        }}
                      >
                        {jobArea}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </Box>
          </Box>
          <Paper
            sx={{
              gridArea: 'shortInfo',
              backgroundColor: { xs: '#F0F0F0', md: '#FAFAFA' },
              padding: { xs: '0', md: '1rem' },
              borderRadius: { xs: '0', md: '4px' },
            }}
            elevation={isMediumScreen ? 0 : 1}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Titulo obtenido
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '0.5rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              {career.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '1rem',
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Modalidad
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '0.5rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              {career.modality}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '1rem',
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Grado Academico
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '0.5rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              {career.academicDegree}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '1rem',
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Campo educacional
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '0.5rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              {career.educationalField}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '1rem',
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Duración
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '0.5rem',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              {career.duration}
            </Typography>
          </Paper>
          <Box
            sx={{
              gridArea: 'moreInfo',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                marginTop: '1rem',
                fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                lineHeight: { xs: '1.75rem', md: '1.75rem', lg: '2rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Más información
            </Typography>
            <List dense>
              {career.links.map((link) => (
                <ListItem
                  sx={{
                    padding: '0',
                  }}
                  key={link}
                >
                  <Link href={link}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            lineHeight: { xs: '1.5rem', md: '1.75rem' },
                            letterSpacing: { xs: '0' },
                          }}
                        >
                          {link}
                        </Typography>
                      }
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ gridArea: 'costs' }}>
            {/* career costs title */}
            <Typography
              variant="h3"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
                lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Costos
            </Typography>
            {/* career costs content */}
            <RichTextBlocks content={career.costs} />
            {/* career discounts title */}
            <Typography
              variant="h3"
              sx={{
                marginTop: '1rem',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
                lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                letterSpacing: { xs: '0' },
              }}
            >
              Descuentos
            </Typography>
            {/* career discounts content */}
            <RichTextBlocks content={career.discounts} />
          </Box>
          <Box sx={{ gridArea: 'university', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Image
                style={{ width: '60px', height: 'auto' }}
                src={career.universityLogo}
                alt={career.universityName}
                width={career.universityLogoWidth}
                height={career.universityLogoHeight}
              />
              <Typography
                variant="h2"
                sx={{
                  marginLeft: '2rem',
                  fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' },
                  lineHeight: { xs: '2rem', md: '2.25rem', lg: '2.5rem' },
                  letterSpacing: { xs: '0' },
                }}
              >
                {career.universityName}
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '1rem',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              }}
            >
              <Map
                locations={[
                  {
                    lat: career?.universityAddresses[0]?.lat,
                    lng: career?.universityAddresses[0]?.lng,
                  },
                ]}
              />
              <Box>
                <Box
                  sx={{
                    marginLeft: { xs: '0', md: '1rem' },
                    marginTop: { xs: '1rem', md: '0' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: '1rem',
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      lineHeight: { xs: '1.75rem', md: '2rem' },
                      letterSpacing: { xs: '0' },
                    }}
                  >
                    Sitios web
                  </Typography>
                  {career?.universityWebsites.map((website) => (
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: '0.5rem',
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        lineHeight: { xs: '1.5rem', md: '1.75rem' },
                        letterSpacing: { xs: '0' },
                      }}
                    >
                      {website}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    marginLeft: { xs: '0', md: '1rem' },
                    marginTop: { xs: '1rem', md: '0' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: '1rem',
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      lineHeight: { xs: '1.75rem', md: '2rem' },
                      letterSpacing: { xs: '0' },
                    }}
                  >
                    Telefonos
                  </Typography>
                  {career?.universityPhones.map((phone) => (
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: '0.5rem',
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        lineHeight: { xs: '1.5rem', md: '1.75rem' },
                        letterSpacing: { xs: '0' },
                      }}
                    >
                      {phone}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    marginLeft: { xs: '0', md: '1rem' },
                    marginTop: { xs: '1rem', md: '0' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: '1rem',
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      lineHeight: { xs: '1.75rem', md: '2rem' },
                      letterSpacing: { xs: '0' },
                    }}
                  >
                    Correos electronicos
                  </Typography>
                  {career?.universityEmails.map((email) => (
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: '0.5rem',
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        lineHeight: { xs: '1.5rem', md: '1.75rem' },
                        letterSpacing: { xs: '0' },
                      }}
                    >
                      {email}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    marginLeft: { xs: '0', md: '1rem' },
                    marginTop: { xs: '1rem', md: '0' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: '1rem',
                      fontSize: { xs: '1.125rem', md: '1.5rem' },
                      lineHeight: { xs: '1.75rem', md: '2rem' },
                      letterSpacing: { xs: '0' },
                    }}
                  >
                    Dirección
                  </Typography>
                  {career?.universityAddresses.map((address) => (
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: '0.5rem',
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        lineHeight: { xs: '1.5rem', md: '1.75rem' },
                        letterSpacing: { xs: '0' },
                      }}
                    >
                      {address.addressDescription}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerPage;
