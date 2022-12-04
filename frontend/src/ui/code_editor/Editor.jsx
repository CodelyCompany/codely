import { useMemo, useState } from 'react';
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import CodeField from './CodeField';
import LanguageSelector from './LanguageSelector';
import OutputField from './OutputField';
import RunButton from './RunButton';

const Editor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState('JavaScript');
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  return (
    <Container>
      <Typography
        className='editor-tag'
        sx={{
          color,
          fontWeight: 'bolder',
          fontSize: '50px',
          position: 'relative',
          top: '20px',
        }}
      >
        Write your code here!
      </Typography>
      <Box
        sx={{
          borderColor: color,
          border: '3px solid',
          marginTop: '20px',
          padding: '50px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box style={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LanguageSelector language={language} setLanguage={setLanguage} />{' '}
            <RunButton code={code} setOutput={setOutput} language={language} />
          </Box>{' '}
          <br />
          <CodeField language={language} code={code} setCode={setCode} />
        </Box>
        {output && <OutputField output={output} />}
      </Box>
    </Container>
  );
};

export default Editor;
