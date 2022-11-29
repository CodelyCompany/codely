import { useState } from 'react';
import React from 'react';

import { Box, Container } from '@mui/material';

import CodeField from './CodeField';
import LanguageSelector from './LanguageSelector';
import OutputField from './OutputField';
import RunButton from './RunButton';

const Editor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState('JavaScript');

  return (
    <Container>
      <a className='editor-tag'>Write your code here!</a>
      <Box
        sx={{
          border: '3px solid rgb(25, 118, 210)',
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
