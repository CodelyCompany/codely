import React, { useMemo, useState } from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { VscDebugStart } from 'react-icons/vsc';
import { connect } from 'react-redux';

import { getToken } from '../../ducks/token/selectors';
import RunAlert from '../popups/RunAlert';
import GetToken from '../user/GetToken';

const RunButton = ({ code, setOutput, language, token, isFinishedLoading, setIsFinishedLoading }) => {
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  const style = {
    borderColor: color,
    color,
    height: '40px',
    width: 180,
    marginTop: '8px',
    marginLeft: '8px',
  };

  const [triggerAlert, setTriggerAlert] = useState(false);
  const [status, setStatus] = useState(null);
  const { t } = useTranslation();

  const runCode = (code) => {
    setIsFinishedLoading(false);
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
        setStatus(response.status);
        setTriggerAlert(true);
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFinishedLoading(true));
  };

  return (
    <>
      <GetToken />
      <RunAlert
        triggered={triggerAlert}
        setTriggered={setTriggerAlert}
        code={status}
      />
      <Button
        disabled={!isFinishedLoading}
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
  isFinishedLoading: PropTypes.bool.isRequired,
  setIsFinishedLoading: PropTypes.func.isRequired,
};
