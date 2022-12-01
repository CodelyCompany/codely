import { useEffect, useState } from 'react';
import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { getUserByUsername } from '../../ducks/user/selectors';

const OutputField = ({ output }) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [lineNumbering, setLineNumbering] = useState('');

  const textAreaStyles = {
    resize: 'none',
  };

  useEffect(() => {
    if (!output) {
      setLineNumbering('');
      return;
    }
    setLineNumbering(
      Array.from({ length: output.split('\n').length }, (v, k) => k + 1).join(
        '\n'
      )
    );
  }, [output]);

  return (
    <ScrollSync>
      <Box
        className={`theme-${foundUser.theme}`}
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
            className={`theme-${foundUser.theme}`}
            id='line-numbering'
            style={{
              ...textAreaStyles,
              borderRadius: '5px 0 0 5px',
              overflow: 'auto',
              border: '3px solid',
              borderColor: 'primary.main',
              borderRight: 0,
              paddingTop: '2px',
            }}
            name='line-numbering'
            disabled={true}
            cols='3'
            value={lineNumbering}
          />
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div
            className={`theme-${foundUser.theme}`}
            style={{
              width: '100%',
              overflow: 'auto',
              height: '100%',
            }}
          >
            <textarea
              className={`theme-${foundUser.theme}`}
              style={{
                ...textAreaStyles,
                borderRadius: '0 5px 5px 0',
                backgroundColor: 'white',
                fontFamily: 'JetBrains Mono',
                borderColor: 'primary.main',
                border: '3px solid',
                fontSize: '14px',
                width: 'calc(100% - 10px)',
              }}
              disabled={true}
              name='code'
              value={output}
            />
          </div>
        </ScrollSyncPane>
      </Box>
    </ScrollSync>
  );
};

export default OutputField;

OutputField.propTypes = {
  output: PropTypes.string,
};
