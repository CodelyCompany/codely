import React, { useEffect, useMemo, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { AddExercise, UpdateExercise } from 'ducks/exercises/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import * as yup from 'yup';

const HintsForms = ({ step, dataToEdit, setStep }) => {
  const { t } = useTranslation();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  const [hintsQuantity, setHintsQuantity] = useState('');
  const [hints, setHints] = useState([]);
  const [triggered, setTriggered] = useState(false);
  const [triggeringChangeQuantity, setTriggeringChangeQuantity] =
    useState(false);
  const [error, setError] = useState({});
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

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
    .array(t('Enter all hints'))
    .of(yup.string(t('Enter the hint')).required(t('This hint is required')));

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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextField
          color={color.split('.')[0]}
          focused
          sx={{
            marginBottom: '10px',
            width: '100%',
            maxWidth: '900px',
          }}
          id={`hintsQuantity-${foundUser.theme}`}
          name='hintsQuantity'
          label={t('Choose hints quantity')}
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
          width: '100%',
          maxWidth: '900px',
          margin: '10px',
        }}
      >
        {hintsQuantity !== '' &&
          [...Array(hintsQuantity).keys()].map((number) => (
            <div key={number} style={{ width: '100%' }}>
              <TextField
                color={color.split('.')[0]}
                focused
                sx={{
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '100%',
                  input: { color },
                }}
                label={number === 0 ? t('Hints') : ''}
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
          color={color.split('.')[0]}
          fullWidth
          sx={{ marginBottom: '10px' }}
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
        >
          {t('Previous')}
        </Button>
        <Button
          color={color.split('.')[0]}
          fullWidth
          type='button'
          onClick={() => goToNextStage()}
          variant='contained'
        >
          {t('Next')}
        </Button>
      </form>
    </Box>
  );
};

const mapDispatchToProps = {
  AddExercise,
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(HintsForms);

HintsForms.propTypes = {
  step: PropTypes.object.isRequired,
  dataToEdit: PropTypes.object,
  setStep: PropTypes.func.isRequired,
};
