import { useMemo, useState } from 'react';
import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CodeField from 'ui/code_editor/CodeField';
import LanguageSelector from 'ui/code_editor/LanguageSelector';
import OutputField from 'ui/code_editor/OutputField';
import RunButton from 'ui/code_editor/RunButton';

const Editor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState('JavaScript');
  const [loadingFinished, setLoadingFinished] = useState(true);

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const { t } = useTranslation();

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
        {t('Write your code here!')}
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
        <Box id='editor' >
          <Box
            id='code-editor-buttons'
          >
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <RunButton
              code={code}
              setOutput={setOutput}
              language={language}
              loadingFinished={loadingFinished}
              setLoadingFinished={setLoadingFinished}
            />
          </Box>
          <br />
          <CodeField language={language} code={code} setCode={setCode} />
        </Box>
        {(output || !loadingFinished) && (
          <OutputField output={output} loadingFinished={loadingFinished} />
        )}
      </Box>
    </Container>
  );
};

export default Editor;
