import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeField = () => {
  const [code, setCode] = useState('');
  const [lineNumbering, setLineNumbering] = useState('');

  const textAreaStyles = {
    resize: 'none',
    border: '3px solid rgb(25, 118, 210)',
  };

  useEffect(() => {
    if (code === '') setLineNumbering('');
    else
      setLineNumbering(
        Array.from({ length: code.split('\n').length }, (v, k) => k + 1).join(
          '\n'
        )
      );
  }, [code]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <ScrollSync>
      <Box sx={{ display: 'flex', width: '100%', marginLeft: '7px' }}>
        <ScrollSyncPane>
          <textarea
            id='line-numbering'
            style={{
              ...textAreaStyles,
              borderRight: 0,
              borderRadius: '5px 0 0 5px',
            }}
            name='line-numbering'
            disabled={true}
            cols='3'
            rows='20'
            value={lineNumbering}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          {/* <textarea
            id='code-area'
            style={{
              ...textAreaStyles,
              borderRadius: '0 5px 5px 0px',
              width: '100%',
            }}
            name='code'
            rows='20'
            value={code}
            onChange={handleCodeChange}
          /> */}
          <CodeEditor
            id='code-area'
            style={{
              ...textAreaStyles,
              borderRadius: '0 5px 5px 0px',
              width: '100%',
              backgroundColor: 'white',
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
            }}
            padding={'2px'}
            // fontFamily='JetBrains Mono'
            name='code'
            value={code}
            language='js'
            onChange={handleCodeChange}
            rows='20'
          />
        </ScrollSyncPane>
      </Box>
    </ScrollSync>
  );
};

export default CodeField;
