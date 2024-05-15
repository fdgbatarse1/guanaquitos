'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Download, LinkedIn } from '@mui/icons-material';

import { spacing1, spacing2 } from '@/styles/spacing';

interface AdvisorProps {
  name: string;
  description: string;
  picture: {
    width: number;
    height: number;
    url: string | StaticImageData;
  };
  resume: string;
  linkedIn: string;
  left: boolean;
}

const Advisor = ({ name, description, picture, resume, linkedIn, left }: AdvisorProps) => {
  const { url, width, height } = picture;
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: {
          xs: 'flex-start',
          md: `flex-${left ? 'start' : 'end'}`,
        },
        alignItems: 'center',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={url}
          alt={name}
          width={width}
          height={height}
          style={{ borderRadius: '100%' }}
        />
        {hover && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '100%',
            }}
          >
            <IconButton href={resume} target="_blank" download sx={{ color: 'white' }}>
              <Download />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          marginLeft: spacing2,
        }}
      >
        <Typography variant="h5">{name}</Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: spacing1,
          }}
        >
          {description}
        </Typography>
        <Link style={{ textDecoration: 'none' }} href={linkedIn} target="_blank">
          <Box
            sx={{
              marginTop: spacing1,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              appearance: 'none',
              color: theme.palette.primary.main,
            }}
          >
            <LinkedIn />
            <Box
              sx={{
                marginLeft: spacing1,
              }}
            >
              <Typography sx={{ wordBreak: 'break-all' }} variant="body1">
                LinkedIn
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Advisor;
