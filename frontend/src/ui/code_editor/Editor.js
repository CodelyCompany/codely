import { Container, Box } from '@mui/material';
import React from 'react';
import LanguageSelector from './LanguageSelector';
import CodeField from './CodeField';
import RunButton from './RunButton';

const Editor = () => {
  return (
    <Container
      sx={{
        border: '3px solid rgb(25, 118, 210)',
        marginTop: '20px',
        padding: '50px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LanguageSelector /> <RunButton />
      </Box>{' '}
      <br />
      <CodeField />
    </Container>
  );
};

export default Editor;
