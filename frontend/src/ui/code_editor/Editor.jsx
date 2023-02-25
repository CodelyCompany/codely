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
      <Typography id='editor-tag'>
        {t('Write your code here!')}
      </Typography>
      <Box id="editor-wrapper" borderColor={color}>
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
