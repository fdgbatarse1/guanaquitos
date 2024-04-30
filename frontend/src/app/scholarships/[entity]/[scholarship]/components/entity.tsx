import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import Map from '@/components/map';
import { spacing1, spacing2, spacing3 } from '@/styles/spacing';

interface EntityProps {
  entityLogo?: string;
  entityName?: string;
  entityLogoWidth?: number | null;
  entityLogoHeight?: number | null;
  entityAddresses?: {
    lat: any;
    lng: any;
    address: any;
    addressDescription: string | null | undefined;
  }[];
  entityWebsites?: (string | null | undefined)[];
  entityPhones?: (string | null | undefined)[];
  entityEmails?: (string | null | undefined)[];
  entityAcronym: string | null | undefined;
}

const Entity = ({
  entityLogo,
  entityName,
  entityLogoWidth,
  entityLogoHeight,
  entityAddresses,
  entityWebsites,
  entityPhones,
  entityEmails,
  entityAcronym,
}: EntityProps) => {
  const contactInformation = [
    {
      singularTitle: 'Sitio web',
      pluralTitle: 'Sitios web',
      content: entityWebsites,
    },
    {
      singularTitle: 'Teléfono',
      pluralTitle: 'Teléfonos',
      content: entityPhones,
    },
    {
      singularTitle: 'Correo electrónico',
      pluralTitle: 'Correos electrónicos',
      content: entityEmails,
    },
  ];

  if (entityAddresses) {
    contactInformation.push({
      singularTitle: 'Dirección',
      pluralTitle: 'Direcciones',
      content: entityAddresses.map((address) => address.addressDescription),
    });
  }

  const hasImage = entityLogo && entityName && entityLogoWidth && entityLogoHeight;

  return (
    <Box
      sx={{
        gridArea: 'entity',
        display: 'flex',
        flexDirection: 'column',
        marginTop: spacing3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        {/* {hasImage && (
          <Image
            style={{ width: '60px', height: 'auto' }}
            src={entityLogo}
            alt={entityName}
            width={entityLogoWidth}
            height={entityLogoHeight}
          />
        )} */}
        {entityName && entityAcronym && (
          <Typography
            variant="h3"
            sx={{
              marginLeft: '0',
              weight: '900',
            }}
          >
            {`${entityName} (${entityAcronym})`}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          marginTop: spacing3,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        {entityAddresses && <Map locations={entityAddresses} />}
        <Box>
          {contactInformation.map((information, index) => {
            if (!information.content || information.content.length === 0) return null;
            return (
              <Box
                sx={{
                  marginLeft: { xs: '0', md: '2rem' },
                  marginTop: { xs: '1rem', md: '0' },
                }}
                key={information.singularTitle}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: index === 0 ? 0 : spacing2,
                  }}
                >
                  {information.content.length > 1
                    ? information.pluralTitle
                    : information.singularTitle}
                </Typography>
                {information.content.map((content) => {
                  if (!content) return null;
                  return (
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: spacing1,
                      }}
                      key={content}
                    >
                      {content}
                    </Typography>
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

export default Entity;
