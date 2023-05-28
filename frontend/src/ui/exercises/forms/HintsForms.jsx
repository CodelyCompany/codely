import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { AddExercise, UpdateExercise } from 'ducks/exercises/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { hintValidation } from 'ui/exercises/forms/validationSchemes/hintFormValidation';

const HintsForms = ({ step, dataToEdit, setStep }) => {
  const { t } = useTranslation();
  const { color } = useTheme();
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
  const validation = hintValidation(t);
  const elementsColor = color.split('.')[0];

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

  const goToNextStage = () => {
    validation.hintsSchema
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
    <Box id='hints-form-container'>
      <Box id='hints-quantity-wrapper'>
        <TextField
          color={elementsColor}
          focused
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
      <form>
        {hintsQuantity !== '' &&
          [...Array(hintsQuantity).keys()].map((number) => (
            <div key={number}>
              <TextField
                className='hints-input'
                color={elementsColor}
                focused
                id={`hint-${number}`}
                sx={{ input: { color } }}
                label={number === 0 ? t('Hints') : ''}
                name='hint'
                value={getValue(number)}
                error={
                  error.error &&
                  !validation.hintSchema.isValidSync(getValue(number))
                }
                helperText={
                  error &&
                  !validation.hintSchema.isValidSync(getValue(number)) &&
                  error.error
                }
                onChange={(e) => handleValue(e, number)}
              />
            </div>
          ))}

        <Button
          color={elementsColor}
          fullWidth
          type='button'
          onClick={() => goToPreviousStage()}
          variant='contained'
          className={'cancel-4'}
        >
          {t('Previous')}
        </Button>
        <Button
          color={elementsColor}
          fullWidth
          type='button'
          onClick={() => goToNextStage()}
          variant='contained'
          id={'submit-4'}
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
