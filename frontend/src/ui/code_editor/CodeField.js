import { useEffect, useState, useRef } from 'react';
import { TextField, Box } from '@mui/material';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

const CodeField = () => {
  const [code, setCode] = useState('');
  const [lineNumbering, setLineNumbering] = useState('');

  const textAreaStyles = {
    resize: 'none',
  };

  useEffect(() => {
    if (code !== '')
      setLineNumbering(
        Array.from({ length: code.split('\n').length }, (v, k) => k + 1).join(
          '\n'
        )
      );
  }, [code]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // const formatCode = (code) => {
  //   return code
  //     .split('\n')
  //     .map((line, index) => `${(he)}: ${line.slice(3)}`)
  //     .join('\n');
  // };

  return (
    <ScrollSync>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <ScrollSyncPane>
          <textarea
            id='line-numbering'
            style={textAreaStyles}
            name='line-numbering'
            cols='3'
            rows='20'
            value={lineNumbering}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          <textarea
            style={textAreaStyles}
            name='code'
            cols='120'
            rows='20'
            value={code}
            onChange={handleCodeChange}
          />
        </ScrollSyncPane>
      </Box>
    </ScrollSync>
  );
};

export default CodeField;
