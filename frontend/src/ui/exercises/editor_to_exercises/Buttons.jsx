import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import { GetUsers } from 'ducks/user/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import useToken from "helpers/useToken";
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
          import.meta.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
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
        dispatch(addPopup(
          response.status === 200 ? 'Your code ran successfully' : 'Your code ran with errors',
          response.status === 200 ? 'success' : 'error'));
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
          import.meta.env.REACT_APP_BACKEND || 'http://localhost:5000'
        }/exercises/checkSolution/${id}`,
        { solution: code, user: foundUser._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setTests(response.data);
        dispatch(addPopup(
          response.data.tests === response.data.correct ?
              'Congratulation! Your code passed all tests' :
              "Unfortunately, your code didn't pass tests",
          response.data.tests === response.data.correct ? 'success' : 'error'
        ));
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
            color={color}
            onClick={() => runCode(code)}
            sx={{ margin: '5px', width: '100px' }}
            variant='contained'
          >
            {t('Run')}
          </Button>
          <Button
            disabled={!loadingFinished}
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
