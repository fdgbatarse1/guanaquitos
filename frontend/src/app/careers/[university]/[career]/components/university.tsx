import Image from 'next/image';

import { Box } from '@mui/material';

import Map from '@/components/map';
import Heading2 from '@/styles/h2';
import Heading5 from '@/styles/h5';
import Paragraph from '@/styles/p';

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
}: UniversityProps) => {
  const contactInformation = [
    {
      title: 'Sitios web',
      content: universityWebsites,
    },
    {
      title: 'Telefono',
      content: universityPhones,
    },
    {
      title: 'Correo electronico',
      content: universityEmails,
    },
  ];

  if (universityAddresses) {
    contactInformation.push({
      title: 'Dirección',
      content: universityAddresses.map((address) => address.addressDescription),
    });
  }

  const hasImage = universityLogo && universityName && universityLogoWidth && universityLogoHeight;

  return (
    <Box sx={{ gridArea: 'university', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        {hasImage && (
          <Image
            style={{ width: '60px', height: 'auto' }}
            src={universityLogo}
            alt={universityName}
            width={universityLogoWidth}
            height={universityLogoHeight}
          />
        )}
        {universityName && (
          <Heading2
            sx={{
              marginLeft: hasImage ? '2rem' : '0',
            }}
          >
            {universityName}
          </Heading2>
        )}
      </Box>
      <Box
        sx={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        {universityAddresses && <Map locations={universityAddresses} />}
        <Box>
          {contactInformation.map((information) => {
            if (!information.content || information.content.length === 0) return null;
            return (
              <Box
                sx={{
                  marginLeft: { xs: '0', md: '1rem' },
                  marginTop: { xs: '1rem', md: '0' },
                }}
              >
                <Heading5
                  sx={{
                    marginTop: '1rem',
                  }}
                >
                  {information.title}
                </Heading5>
                {information.content.map((content) => {
                  if (!content) return null;
                  return (
                    <Paragraph
                      sx={{
                        marginTop: '0.5rem',
                      }}
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
