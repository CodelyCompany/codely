import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import {
  AddExercise,
  UpdateExercise,
} from '../../../ducks/exercises/operations';
import {
  ChangeAddStatus,
  ChangeUpdateStatus,
} from '../../../ducks/popups/actions';

const HintsForms = ({
  step,
  // AddExercise,
  dataToEdit,
  // UpdateExercise,
  setStep,
  // ChangeAddStatus,
  // ChangeUpdateStatus,
}) => {
  const [hintsQuantity, setHintsQuantity] = useState('');
  // const navigate = useNavigate();
  const [hints, setHints] = useState([]);
  const [triggered, setTriggered] = useState(false);
  // const { user, getAccessTokenSilently } = useAuth0();
  // const { id } = useParams();
  const [triggeringChangeQuantity, setTriggeringChangeQuantity] =
    useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (step.dataFromStep4) {
      setHintsQuantity(step.dataFromStep4.length);
      return;
    }
    dataToEdit && setHintsQuantity(dataToEdit.hints.length);
  }, []);

  useEffect(() => {
    if (dataToEdit && !triggered && !step.dataFromStep4) {
      dataToEdit &&
        setHints(dataToEdit.hints.map((hint, index) => [index, hint]));
      setTriggered((prev) => !prev);
    }
  }, [hintsQuantity]);

  useEffect(() => {
    if (!triggeringChangeQuantity) {
      step.dataFromStep4 && setHints(step.dataFromStep4);
      setTriggeringChangeQuantity((prev) => !prev);
    }
  }, [hintsQuantity]);

  const goToPreviousStage = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: 3,
      dataFromStep4: hints,
    }));
  };

  // It should be changed in the future
  // const submitValues = () => {
  //   let userId;
  //   if (canSubmit()) {
  //     (async () => {
  //       try {
  //         const token = await getAccessTokenSilently({
  //           audience: `${
  //             process.env.REACT_APP_BACKEND || 'http://localhost:5000'
  //           }`,
  //         });
  //         axios
  //           .get(
  //             `${
  //               process.env.REACT_APP_BACKEND || 'http://localhost:5000'
  //             }/users/`,
  //             {
  //               headers: {
  //                 authorization: `Bearer ${token}`,
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             userId = response.data.find(
  //               (us) => us.username === user.nickname
  //             );

  //             const data = {
  //               author: userId._id,
  //               ...step.dataFromStep1,
  //               tests: step.dataFromStep2.reduce(
  //                 (prev, curr) => [
  //                   ...prev,
  //                   {
  //                     input: curr[1],
  //                     output: curr[2],
  //                   },
  //                 ],
  //                 []
  //               ),
  //               hints: hints.map((el) => el[1]),
  //             };
  //             if (dataToEdit) {
  //               UpdateExercise({ id, ...data }, token);
  //               ChangeUpdateStatus();
  //             } else {
  //               AddExercise({ ...data }, token);
  //               ChangeAddStatus();
  //             }
  //             navigate('/Exercises');
  //           });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     })();
  //   }
  // };

  // const canSubmit = () => {
  //   let submit = true;
  //   if (hintsQuantity === '') return false;
  //   hints.forEach((el) => {
  //     if (el[1] === '') submit = false;
  //   });
  //   return submit;
  // };

  useEffect(() => {
    setHints((prev) =>
      [...Array(hintsQuantity).keys()].map((number) => {
        const found = prev.find((el) => el[0] === number);
        if (!found) return [number, ''];
        return found;
      })
    );
  }, [hintsQuantity]);

  const getValue = (number) => {
    const found = hints.find((el) => el[0] === number);
    if (!found) return '';
    return found[1];
  };

  const handleValue = (event, number) => {
    setHints((prev) =>
      prev.map((el) => {
        if (el[0] === number) {
          return [el[0], event.target.value];
        }
        return el;
      })
    );
  };

  const hintSchema = yup.string().required();

  const hintsSchema = yup
    .array('Enter all hints')
    .of(yup.string('Enter the hint').required('This hint is required'));

  const goToNextStage = () => {
    hintsSchema
      .validate(hints.map((el) => el[1]))
      .then((valid) => {
        if (valid) {
          setError({});
          setStep((prev) => ({
            ...prev,
            currentStep: 5,
            dataFromStep4: hints,
          }));
        }
      })
      .catch((err) => setError({ error: err.errors }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'start',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <TextField
          sx={{ marginBottom: '10px', width: '900px' }}
          id='hintsQuantity'
          name='hintsQuantity'
          label='Choose hints quantity'
          value={hintsQuantity}
          onChange={(e) => setHintsQuantity(parseInt(e.target.value))}
          select
        >
          {[...Array(20).keys()].map((option) => (
            <MenuItem key={option + 1} value={option + 1}>
              {option + 1}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '900px',
          margin: '10px',
        }}
      >
        {hintsQuantity !== '' &&
          [...Array(hintsQuantity).keys()].map((number) => (
            <div key={number} style={{ width: '100%' }}>
              <TextField
                sx={{
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '100%',
                }}
                label={number === 0 ? 'Hints' : ''}
                name='hint'
                value={getValue(number)}
                error={error.error && !hintSchema.isValidSync(getValue(number))}
                helperText={
                  error &&
                  !hintSchema.isValidSync(getValue(number)) &&
                  error.error
                }
                onChange={(e) => handleValue(e, number)}
              />
            </div>
          ))}

        <Button
          fullWidth
          sx={{ marginBottom: '10px' }}
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
        >
          Previous
        </Button>
        <Button
          fullWidth
          type='button'
          onClick={() => goToNextStage()}
          variant='contained'
        >
          Next
        </Button>
      </form>
    </Box>
  );
};

const mapDispatchToProps = {
  AddExercise,
  UpdateExercise,
  ChangeAddStatus,
  ChangeUpdateStatus,
};

export default connect(null, mapDispatchToProps)(HintsForms);

HintsForms.propTypes = {
  // AddExercise: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  dataToEdit: PropTypes.object,
  setStep: PropTypes.func.isRequired,
  // UpdateExercise: PropTypes.func,
  // ChangeAddStatus: PropTypes.func,
  // ChangeUpdateStatus: PropTypes.func,
};
