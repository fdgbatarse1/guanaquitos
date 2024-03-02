import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import Map from '@/components/map';
import Paragraph from '@/styles/p';
import { spacing1, spacing2, spacing3 } from '@/styles/spacing';

interface UniversityProps {
  universityLogo?: string;
  universityName?: string;
  universityLogoWidth?: number | null;
  universityLogoHeight?: number | null;
  universityAddresses?: {
    lat: any;
    lng: any;
    address: any;
    addressDescription: string | null | undefined;
  }[];
  universityWebsites?: (string | null | undefined)[];
  universityPhones?: (string | null | undefined)[];
  universityEmails?: (string | null | undefined)[];
  universityAcronym?: string;
}

const University = ({
  universityLogo,
  universityName,
  universityLogoWidth,
  universityLogoHeight,
  universityAddresses,
  universityWebsites,
  universityPhones,
  universityEmails,
  universityAcronym,
}: UniversityProps) => {
  const contactInformation = [
    {
      singularTitle: 'Sitio web',
      pluralTitle: 'Sitios web',
      content: universityWebsites,
    },
    {
      singularTitle: 'Teléfono',
      pluralTitle: 'Teléfonos',
      content: universityPhones,
    },
    {
      singularTitle: 'Correo electrónico',
      pluralTitle: 'Correos electrónicos',
      content: universityEmails,
    },
  ];

  if (universityAddresses) {
    contactInformation.push({
      singularTitle: 'Dirección',
      pluralTitle: 'Direcciones',
      content: universityAddresses.map((address) => address.addressDescription),
    });
  }

  const hasImage = universityLogo && universityName && universityLogoWidth && universityLogoHeight;

  return (
    <Box
      sx={{
        gridArea: 'university',
        display: 'flex',
        flexDirection: 'column',
        marginTop: spacing3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        {/* {hasImage && (
          <Image
            style={{ width: '60px', height: 'auto' }}
            src={universityLogo}
            alt={universityName}
            width={universityLogoWidth}
            height={universityLogoHeight}
          />
        )} */}
        {universityName && universityAcronym && (
          <Typography
            variant="h3"
            sx={{
              marginLeft: '0',
              weight: '900',
            }}
          >
            {`${universityName} (${universityAcronym})`}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          marginTop: spacing3, // TODO - Update Box university margin top
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        {universityAddresses && <Map locations={universityAddresses} />}
        <Box>
          {contactInformation.map((information, index) => {
            if (!information.content || information.content.length === 0) return null;
            return (
              <Box
                sx={{
                  marginLeft: { xs: '0', md: '2rem' },
                  marginTop: { xs: '1rem', md: '0' }, // TODO - Update Box list margin top
                }}
                key={information.singularTitle}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: index === 0 ? 0 : spacing2, // TODO - Update Heading5 margin top
                  }}
                >
                  {information.content.length > 1
                    ? information.pluralTitle
                    : information.singularTitle}
                </Typography>
                {information.content.map((content) => {
                  if (!content) return null;
                  return (
                    <Paragraph
                      sx={{
                        marginTop: spacing1, // TODO - Update Heading5 margin top
                      }}
                      key={content}
                    >
                      {content}
                    </Paragraph>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default University;
