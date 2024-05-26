'use client';

import { type ChangeEvent, useState } from 'react';

import { Box, Typography } from '@mui/material';
import theme from '@/styles/theme';

import Streaming from './components/streaming';
import Prompt from './components/prompt';

const Chat = () => {
  const [prompt, setPrompt] = useState('');

  const messages = [
    {
      output:
        'Este servicio está diseñado para proporcionar recomendaciones. Sin embargo, es importante recordar que solo es una herramienta de apoyo y no debe ser utilizado como el único recurso para sus decisiones. No podemos asegurar la precisión completa de las recomendaciones por lo que es aconsejable también acudir a un orientador vocacional.',
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
    {
      output: 'This is a test output',
      sourceDocuments: [
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
        {
          pageContent: 'This is a test page content',
          metadata: {
            source: 'This is a test source',
          },
        },
      ],
    },
  ];

  const handleSubmit = () => {
    console.log('Submitted');
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const error = '';

  return (
    <Box
      sx={{
        display: 'flex',
        height: {
          xs: 'calc(100vh - 64px)',
          md: 'calc(100vh - 80px)',
        },
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '640px',
        }}
      >
        <Streaming messages={messages} />
        <Prompt
          prompt={prompt}
          handlePromptChange={handlePromptChange}
          handleSubmit={handleSubmit}
          placeHolderText="Escribe..."
          error={error}
        />
      </Box>
    </Box>
  );
};

export default Chat;
