import { Container, Box } from '@mui/material';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import CodeField from './CodeField';
import RunButton from './RunButton';
import OutputField from './OutputField';

const Editor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);

  return (
    <Container
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
          <LanguageSelector /> <RunButton code={code} setOutput={setOutput} />
        </Box>{' '}
        <br />
        <CodeField code={code} setCode={setCode} />
      </Box>
      {output && <OutputField output={output} />}
    </Container>
  );
};

export default Editor;
