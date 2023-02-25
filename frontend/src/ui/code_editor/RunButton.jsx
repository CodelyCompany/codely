import React, { useMemo } from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import { getToken } from 'ducks/token/selectors';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { VscDebugStart } from 'react-icons/vsc';
import { connect, useDispatch } from 'react-redux';
import GetToken from 'ui/user/GetToken';

const RunButton = ({ code, setOutput, language, token, loadingFinished, setLoadingFinished }) => {
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
      <GetToken />
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

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(RunButton);

RunButton.propTypes = {
  code: PropTypes.string.isRequired,
  setOutput: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  token: PropTypes.string,
  loadingFinished: PropTypes.bool.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
};
