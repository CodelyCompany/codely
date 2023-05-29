import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ExerciseHints from 'ui/popups/ExerciseHints';

const Buttons = ({
  setOutput,
  code,
  language,
  setTests,
  argumentValues,
  functionName,
  setLoadingFinished,
  loadingFinished,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth0();
  const { token } = useToken();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const dispatch = useDispatch();
  const { theme } = useTheme();
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
        dispatch(
          addPopup(
            response.status === 200
              ? 'code-ran-message'
              : 'code-failed-message',
            response.status === 200 ? 'success' : 'error'
          )
        );
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingFinished(true));
  };

  const submitExercise = () => {
    setLoadingFinished(false);
    axios
      .post(
        `${
          process.env.REACT_APP_BACKEND || 'http://localhost:5000'
        }/exercises/checkSolution/${id}`,
        { solution: code, user: foundUser._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setTests(response.data);
        dispatch(
          addPopup(
            response.data.tests === response.data.correct
              ? 'tests-passed-message'
              : 'tests-not-passed-message',
            response.data.tests === response.data.correct ? 'success' : 'error'
          )
        );
        dispatch(GetUsers(token));
      })
      .finally(() => setLoadingFinished(true));
  };

  return (
    <>
      <Box id='exercises-buttons'>
        <Box id='run-buttons'>
          <Button
            disabled={!loadingFinished}
            color={theme}
            onClick={() => runCode(code)}
            variant='contained'
          >
            {t('run-label')}
          </Button>
          <Button
            disabled={!loadingFinished}
            color={theme}
            onClick={() => submitExercise()}
            variant='contained'
          >
            {t('submit-label')}
          </Button>
        </Box>
        <Box id='tools-buttons'>
          <ExerciseHints />
          <Button
            color={theme}
            onClick={() => navigate(-1)}
            variant='contained'
          >
            {t('undo-label')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Buttons;

Buttons.propTypes = {
  setOutput: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  setTests: PropTypes.func,
  argumentValues: PropTypes.array.isRequired,
  functionName: PropTypes.string.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
  loadingFinished: PropTypes.bool.isRequired,
};
