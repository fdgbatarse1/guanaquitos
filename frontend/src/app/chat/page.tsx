'use client';

import { type ChangeEvent, useState, useEffect } from 'react';

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
      text: 'Cargando...',
      sourceDocuments: null,
    },
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const chatHistory = window.sessionStorage.getItem('chatHistory');

    if (!chatHistory) return;

    setMessages(() => JSON.parse(chatHistory));
  }, []);

  const handleSubmit = async () => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: 'user', sourceDocuments: null },
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '...', type: 'bot', sourceDocuments: null, animate: true },
      ]);

      const sessionId = sessionStorage.getItem('sessionId');

      const response = await fetch(`${BACKEND_API_URL}api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, sessionId }),
      });
      const data = await response.json();

      setMessages((prevMessages) => prevMessages.slice(0, -1));

      setMessages((prevMessages) => {
        const newMessages: MessagesProps = [
          ...prevMessages,
          {
            text: data?.response?.output,
            type: 'bot',
            sourceDocuments: null,
          },
        ];
        window.sessionStorage.setItem('chatHistory', JSON.stringify(newMessages));
        return newMessages;
      });

      setPrompt('');
    } catch (e) {
      console.log(e);
      setError('Algo ha salido mal! 🤯');
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
          width: '800px',
          maxWidth: '800px',
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
