import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import CodeEditor from '@uiw/react-textarea-code-editor';

const OutputField = ({ output }) => {
  const [lineNumbering, setLineNumbering] = useState('');

  const textAreaStyles = {
    resize: 'none',
  };

  useEffect(() => {
    if (output === '') setLineNumbering('');
    else
      setLineNumbering(
        Array.from({ length: output.split('\n').length }, (v, k) => k + 1).join(
          '\n'
        )
      );
  }, [output]);

  return (
    <ScrollSync>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          marginRigth: '5px',
          justifyContent: 'end',
          marginTop: '10px',
          maxHeight: '200px',
        }}
      >
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
            value={lineNumbering}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div
            style={{
              width: '100%',
              border: '3px solid rgb(25, 118, 210)',
              overflow: 'auto',
            }}
          >
            <CodeEditor
              id='code-area'
              style={{
                ...textAreaStyles,
                borderRadius: '5px',
                width: '100%',
                backgroundColor: 'white',
                fontFamily: 'JetBrains Mono',
                fontSize: '14px',
              }}
              padding={'2px'}
              disabled={true}
              name='code'
              value={output}
              language='js'
            />
          </div>
        </ScrollSyncPane>
      </Box>
    </ScrollSync>
  );
};

export default OutputField;
