import React, { useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getToken } from '../../../ducks/token/selectors';
import { GetUsers } from '../../../ducks/user/operations';
import { getUserByUsername } from '../../../ducks/user/selectors';
import ExerciseHints from '../../popups/ExerciseHints';
import RunAlert from '../../popups/RunAlert';
import SubmitAlert from '../../popups/SubmitAlert';
import GetToken from '../../user/GetToken';

const Buttons = ({
  setOutput,
  code,
  language,
  setTests,
  tests,
  token,
  argumentValues,
  functionName,
  setLoadingFinished,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [triggerSubmitAlert, setTriggerSubmitAlert] = useState(false);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  const { t } = useTranslation();
  const runCode = (code) => {
    setLoadingFinished(false);
    axios
      .post(
        `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }/${language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()}`,
        {
          toExecute: code,
          func: functionName,
          args: argumentValues,
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
      .finally(() => setLoadingFinished(true));
  };

  const submitExercise = () => {
    axios
      .post(
        `${
          process.env.REACT_APP_BACKEND || 'http://localhost:5000'
        }/exercises/checkSolution/${id}`,
        { solution: code, user: foundUser._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setTriggerSubmitAlert(true);
        setTests(response.data);
        dispatch(GetUsers(token));
      });
  };

  return (
    <>
      <GetToken />
      <Box id='exercises-buttons'>
        <Box id='run-buttons'>
          {' '}
          <Button
            color={color}
            onClick={() => runCode(code)}
            sx={{ margin: '5px', width: '100px' }}
            variant='contained'
          >
            {t('Run')}
          </Button>
          <Button
            color={color}
            onClick={() => submitExercise()}
            sx={{ width: '100px' }}
            variant='contained'
          >
            {t('Submit')}
          </Button>
        </Box>
        <Box id='tools-buttons'>
          <ExerciseHints />
          <Button
            color={color}
            onClick={() => navigate(-1)}
            sx={{ width: '100px', margin: '5px' }}
            variant='contained'
          >
            {t('Undo')}
          </Button>
        </Box>
      </Box>
      <RunAlert
        triggered={triggerAlert}
        setTriggered={setTriggerAlert}
        code={status}
      />
      <SubmitAlert
        triggered={triggerSubmitAlert}
        setTriggered={setTriggerSubmitAlert}
        passed={tests.tests === tests.correct}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(Buttons);

Buttons.propTypes = {
  setOutput: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  setTests: PropTypes.func,
  tests: PropTypes.object,
  token: PropTypes.string,
  argumentValues: PropTypes.array.isRequired,
  functionName: PropTypes.string.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
};
