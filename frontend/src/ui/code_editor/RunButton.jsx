import React, { useMemo } from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import useToken from "helpers/useToken";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { VscDebugStart } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';

const RunButton = ({ code, setOutput, language, loadingFinished, setLoadingFinished }) => {
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  const dispatch = useDispatch();

  const style = {
    borderColor: color,
    color,
    height: '40px',
    width: 180,
    marginTop: '8px',
    marginLeft: '8px',
  };

  const { t } = useTranslation();
  const { token } = useToken();

  const runCode = (code) => {
    setLoadingFinished(false);
    axios
      .post(
        `${
          import.meta.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
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
          ? dispatch(addPopup(
              'Your code ran successfully',
              'success'
          ))
          : dispatch(addPopup(
              'Your code ran with errors',
              'error'
          ));
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingFinished(true));
  };

  return (
    <>
      <Button
        disabled={!loadingFinished}
        variant='outlined'
        sx={style}
        onClick={() => runCode(code)}
      >
        <VscDebugStart style={{ position: 'relative', bottom: '3px' }} />
        {t('Run')}
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
