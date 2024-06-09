'use client';

import { type ChangeEvent, useState } from 'react';

import { Box } from '@mui/material';

import Streaming from './components/streaming';
import Prompt from './components/prompt';
import { MessagesProps } from './types';

const BACKEND_API_URL = process.env.BACKEND_API_URL || '';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const [messages, setMessages] = useState<MessagesProps>([
    {
      type: 'system',
      text: 'Este servicio está diseñado para proporcionar recomendaciones. Sin embargo, es importante recordar que solo es una herramienta de apoyo y no debe ser utilizado como el único recurso para sus decisiones. No podemos asegurar la precisión completa de las recomendaciones por lo que es aconsejable también acudir a un orientador vocacional.',
      sourceDocuments: null,
    },
  ]);

  const handleSubmit = async () => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: 'user', sourceDocuments: null },
      ]);
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: '...', type: 'bot', sourceDocuments: null },
      // ]);
      const sessionId = sessionStorage.getItem('sessionId');
      const response = await fetch(`${BACKEND_API_URL}api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, sessionId }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setPrompt('');
    } catch (e) {
      console.log(e);
      setError('Something went wrong! 🤯');
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

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
