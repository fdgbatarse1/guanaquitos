import { type KeyboardEvent, type ChangeEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface PromptProps {
  prompt: string;
  handlePromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  placeHolderText?: string;
  buttonText?: string;
  error?: string;
  disableButton?: boolean;
  labelText?: string;
}

const Prompt = ({
  prompt,
  handlePromptChange,
  handleSubmit,
  placeHolderText,
  buttonText,
  error,
  disableButton,
  labelText,
}: PromptProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {labelText && (
          <label htmlFor="prompt">
            <Typography variant="body1" sx={{ marginRight: '1rem' }}>
              {labelText}
            </Typography>
          </label>
        )}

        <TextField
          id="prompt"
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder={placeHolderText || 'Escribe tu prompt'}
          className="w-full mr-4 py-2 px-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded shadow"
          sx={{ width: '100%', marginTop: '1rem', paddingY: '0.5rem' }}
        />

        {!disableButton && (
          <Button
            type="button"
            onClick={handleSubmit}
            sx={{
              padding: '1rem 1.5rem',
              marginTop: '1rem',
            }}
          >
            {buttonText || 'Enviar'}
          </Button>
        )}
      </Box>
      <p className={`${error ? 'block' : 'hidden'}`} style={{ color: 'rgb(239 68 68)' }}>
        {error}
      </p>
    </>
  );
};

export default Prompt;
