import { Container, Box } from '@mui/material';
import React from 'react';
import LanguageSelector from './LanguageSelector';
import CodeField from './CodeField';
import RunButton from './RunButton';
import OutputField from './OutputField';

const Editor = () => {
  return (
    <Container
      sx={{
        border: '3px solid rgb(25, 118, 210)',
        marginTop: '20px',
        padding: '50px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box style={{ display: 'flex' }}>
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
      </Box>
      <OutputField />
    </Container>
  );
};

export default Editor;
