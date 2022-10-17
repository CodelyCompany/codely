import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import CodeEditor from '@uiw/react-textarea-code-editor';
import autocompleteData from '.././../languages-syntax/javascript.json';
import * as _ from 'lodash';

const CodeField = ({ code, setCode }) => {
  const [lineNumbering, setLineNumbering] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);

  useEffect(() => {
    if (code.length > 0 && code.split(' ')[code.split(' ').length - 1]) {
      console.log(
        autocompleteData['functions'].filter((el) =>
          _.startsWith(el, code.split(' ')[code.split(' ').length - 1])
        )
      );
    }
  }, [code]);

  const textAreaStyles = {
    resize: 'none',
  };

  useEffect(() => {
    // if (code === '') setLineNumbering('');
    // else
    // setLineNumbering(
    //   Array.from({ length: code.split('\n').length }, (v, k) => k + 1).join(
    //     '\n'
    //   )
    // );
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
                borderRadius: '0 5px 5px 0',
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
