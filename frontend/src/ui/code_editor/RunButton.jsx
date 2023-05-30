import React from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { VscDebugStart } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';

const RunButton = ({
  code,
  setOutput,
  language,
  loadingFinished,
  setLoadingFinished,
}) => {
  const { color } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = useToken();

  const runCode = (code) => {
    setLoadingFinished(false);
    axios
      .post(
        `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }/${language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()}`,
        {
          toExecute: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        response.status === 200
          ? dispatch(addPopup('code-ran-message', 'success'))
          : dispatch(addPopup('code-failed-message', 'error'));
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingFinished(true));
  };

  return (
    <>
      <Button
        disabled={!loadingFinished}
        id='run-button'
        sx={{ borderColor: color, color }}
        variant='outlined'
        onClick={() => runCode(code)}
      >
        <VscDebugStart id='run-button-icon' />
        {t('run-label')}
      </Button>
    </>
  );
};

export default RunButton;

RunButton.propTypes = {
  code: PropTypes.string.isRequired,
  setOutput: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  loadingFinished: PropTypes.bool.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
};
