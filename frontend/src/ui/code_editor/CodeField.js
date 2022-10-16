import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeField = ({ code, setCode }) => {
  const [lineNumbering, setLineNumbering] = useState('');

  useEffect(() => {
    if (code[code.length - 1] === '(') setCode((prev) => prev + ')');
    if (code[code.length - 1] === '{') setCode((prev) => prev + '}');
  }, [code]);

  const textAreaStyles = {
    resize: 'none',
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
              borderRadius: '5px 0 0 5px',
              overflow: 'auto',
              border: '3px solid rgb(25, 118, 210)',
              borderRight: 0,
            }}
            name='line-numbering'
            disabled={true}
            cols='3'
            rows='20'
            value={lineNumbering}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div
            style={{
              height: '370px',
              width: '100%',
              overflow: 'auto',
              border: '3px solid rgb(25, 118, 210)',
            }}
          >
            <CodeEditor
              id='code-area'
              style={{
                ...textAreaStyles,
                borderRadius: '0 5px 5px 0px',
                width: '100%',
                backgroundColor: 'white',
                fontFamily: 'JetBrains Mono',
                fontSize: '14px',
                overflow: 'visible',
              }}
              padding={'2px'}
              name='code'
              value={code}
              language='js'
              onChange={handleCodeChange}
              rows='20'
            />
          </div>
        </ScrollSyncPane>
      </Box>
    </ScrollSync>
  );
};

export default CodeField;
