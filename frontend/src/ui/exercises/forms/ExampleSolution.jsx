import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Editor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { AddExercise } from '../../../ducks/exercises/operations';
import { ChangeAddStatus } from '../../../ducks/popups/actions';
import { getUserByUsername } from '../../../ducks/user/selectors';

import { getSignature } from './functionSignatures';

const ExampleSolution = ({ step, setStep, AddExercise, ChangeAddStatus }) => {
  const [code, setCode] = useState('');
  const [tests, setTests] = useState(null);
  const { user } = useAuth0();

  const foundUser = useSelector((state) =>
    getUserByUsername(state, user.nickname)
  );

  useEffect(() => {
    step.dataFromStep1.programmingLanguage &&
      step.dataFromStep2.functionName &&
      step.dataFromStep2.argumentsName &&
      setCode(
        getSignature(
          step.dataFromStep1.programmingLanguage.toLowerCase(),
          step.dataFromStep2.functionName,
          step.dataFromStep2.argumentsName
        )
      );
  }, []);

  const prev = () => {
    setStep((prev) => ({ ...prev, currentStep: 4 }));
  };

  const handleCodeChange = (e) => {
    setCode(e);
  };

  // add validation
  // add checking exercise by admin

  const submit = () => {
    axios
      .post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_CONTAINERS_CLIENT_ID,
        client_secret: process.env.REACT_APP_CONTAINERS_CLIENT_SECRET,
        audience: `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }`,
        grant_type: 'client_credentials',
      })
      .then((token) => {
        AddExercise(
          {
            author: foundUser._id,
            ...step.dataFromStep1,
            ...step.dataFromStep2,
            tests: step.dataFromStep3,
            hints: step.dataFromStep4.map((el) => el[1]),
            exampleSolution: code,
          },
          token
        );
      });
    ChangeAddStatus();
  };

  const verifySolution = () => {
    axios
      .post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_CONTAINERS_CLIENT_ID,
        client_secret: process.env.REACT_APP_CONTAINERS_CLIENT_SECRET,
        audience: `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }`,
        grant_type: 'client_credentials',
      })
      .then((token) => {
        axios
          .post(
            'http://localhost:5000/exercises/checkBeforeAddExercise',
            {
              exampleSolution: code,
              tests: step.dataFromStep3,
              ...step.dataFromStep2,
              ...step.dataFromStep1,
            },
            {
              headers: {
                Authorization: `Bearer ${token.data.access_token}`,
              },
            }
          )
          .then((response) => {
            setTests(response.data);
          });
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: 'calc(900px - 10px)',
          height: '200px',
          border: '3px solid rgb(25, 118, 210)',
          borderRadius: '5px',
          margin: '10px',
          padding: '5px',
        }}
      >
        {' '}
        <Editor
          loading={<CircularProgress />}
          height='100%'
          language={
            step.dataFromStep1
              ? step.dataFromStep1.programmingLanguage === 'C++'
                ? 'cpp'
                : step.dataFromStep1.programmingLanguage.toLowerCase()
              : 'javascript'
          }
          value={code}
          onChange={handleCodeChange}
          width='100%'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '900px',
        }}
      >
        <Button
          sx={{ marginBottom: '10px' }}
          variant='contained'
          onClick={prev}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            tests
              ? tests.correct !== tests.tests
                ? verifySolution()
                : submit()
              : verifySolution()
          }
        >
          {tests
            ? tests.correct !== tests.tests
              ? `Submit (Last run: ${tests.correct} / ${tests.tests})`
              : `Your solution passed all tests.
               Click again to pass your exercise for admin verification.`
            : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  AddExercise,
  ChangeAddStatus,
};

export default connect(null, mapDispatchToProps)(ExampleSolution);

ExampleSolution.propTypes = {
  step: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  AddExercise: PropTypes.func,
  ChangeAddStatus: PropTypes.func,
};
