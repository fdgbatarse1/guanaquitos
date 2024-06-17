'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import BlackCap from '@/assets/pngs/black_cap.png';
import BlackTorogoz from '@/assets/pngs/black_torogoz.png';
import theme from '@/styles/theme';

import { MessageItemProps, StreamingProps } from '../types';
import DotFlashing from './dot-flashing';

const MessageItem = ({ message }: MessageItemProps) => {
  const [showSources, setShowSources] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {message.type === 'user' ? (
        <Image
          style={{ marginTop: '0.25rem' }}
          src={BlackCap}
          alt="black cap"
          height="24"
          width="24"
        />
      ) : (
        <Image
          style={{ marginTop: '0.25rem' }}
          src={BlackTorogoz}
          alt="black torogoz"
          height="24"
          width="24"
        />
      )}
      <Box
        sx={{
          marginBottom: '1rem',
          marginLeft: '0.5rem',
          width: '100%',
        }}
      >
        {typeof message === 'object' && (
          <Typography variant="body1" sx={{ fontWeight: '600', marginBottom: '0.25rem' }}>
            {message.type === 'user' ? 'Vos' : 'Guanaquitos bot (Inteligencia Artificial)'}
          </Typography>
        )}
        {typeof message === 'string' && (
          <Typography variant="body2" sx={{ marginBottom: '0.25rem' }}>
            <pre>{message}</pre>
          </Typography>
        )}
        {typeof message === 'object' && (
          <Typography variant="body2" sx={{ marginBottom: '0.25rem' }}>
            {message.animate ? (
              <Box sx={{ marginTop: '0.25rem', marginLeft: '1rem' }}>
                <DotFlashing />
              </Box>
            ) : (
              message?.text
            )}
          </Typography>
        )}
        {typeof message === 'object' && message.sourceDocuments && showSources ? (
          <div>
            <Box>
              {message.sourceDocuments.map((doc, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sx={{
                    paddingLeft: '1rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <Typography variant="body2">
                    Fuente {index + 1}: {doc.pageContent}
                  </Typography>
                  <Typography variant="body2">De: {doc.metadata.source}</Typography>
                </Box>
              ))}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                cursor: 'pointer',
                marginLeft: '1rem',
                width: 'fit-content',
              }}
              onClick={() => setShowSources(false)}
            >
              Cerrar
            </Typography>
          </div>
        ) : (
          message?.sourceDocuments && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                cursor: 'pointer',
                marginLeft: '1rem',
                width: 'fit-content',
              }}
              onClick={() => setShowSources(true)}
            >
              Fuentes
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

const Streaming = ({ messages, maxMsgs }: StreamingProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const maxMsgToScroll = maxMsgs || 5;

  return (
    <Box
      ref={messagesContainerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        overflowY: 'auto',
        height: {
          xs: 'calc(100vh - 218px)',
          md: 'calc(100vh - 234px)',
        },
        justifyContent: messages && messages.length < maxMsgToScroll ? 'justify-end' : 'default',
      }}
    >
      {messages &&
        messages.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageItem key={index} message={message} />
        ))}
    </Box>
  );
};

export default Streaming;
