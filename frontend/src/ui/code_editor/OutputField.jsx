import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

const OutputField = ({ output, loadingFinished }) => {
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [lineNumbering, setLineNumbering] = useState('');
  const { color } = useTheme();

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
      <Box className={`theme-${foundUser.theme}`} id='output-field-wrapper'>
        {loadingFinished ? (
          <>
            <ScrollSyncPane>
              <textarea
                className={`theme-${foundUser.theme}`}
                id='line-numbering'
                style={{
                  ...textAreaStyles,
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
                id='text-area-wrapper'
              >
                <textarea
                  className={`theme-${foundUser.theme}`}
                  id='output-text-area'
                  style={{
                    ...textAreaStyles,
                    borderColor: color,
                  }}
                  disabled={true}
                  name='code'
                  value={output}
                />
              </div>
            </ScrollSyncPane>
          </>
        ) : (
          <ThreeDots
            height='80'
            width='80'
            radius='9'
            color='gray'
            ariaLabel='three-dots-loading'
            wrapperStyle={{
              textAlign: 'center',
            }}
            wrapperClassName=''
            visible={true}
          />
        )}
      </Box>
    </ScrollSync>
  );
};

export default OutputField;

OutputField.propTypes = {
  output: PropTypes.string,
  loadingFinished: PropTypes.bool.isRequired,
};
