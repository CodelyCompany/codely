import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { AddExercise, UpdateExercise } from 'ducks/exercises/operations';
import { getUserByUsername } from 'ducks/user/selectors';
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { hintValidation } from 'ui/exercises/forms/validationSchemes/hintFormValidation';

// Fourth step of creating exercise
const HintsForms = ({ setStep, UpdateExercise }) => {
  const { t } = useTranslation();
  const { color } = useTheme();
  const [hintsQuantity, setHintsQuantity] = useState('');
  const [hints, setHints] = useState([]);
  const [error, setError] = useState({});
  const { user } = useAuth0();
  const { token } = useToken();
  const { id, exercise } = useExerciseData();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };
  const validation = hintValidation(t);
  const elementsColor = color.split('.')[0];

  useEffect(() => {
    if (exercise.hints) {
      const hintsZippedWithIndexes = exercise.hints.map((hint, index) => [index, hint]);
      setHintsQuantity(exercise.hints.length);
      setHints(hintsZippedWithIndexes);
    }
  }, [exercise]);

  const goToPreviousStage = () => {
    setStep(3);
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
          const hintsToSave = hints.map((hint) => hint[1]);
          UpdateExercise({ id, hints: hintsToSave, step: 5 }, token);
          setError({});
          setStep(5);
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
  setStep: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func.isRequired,
};
