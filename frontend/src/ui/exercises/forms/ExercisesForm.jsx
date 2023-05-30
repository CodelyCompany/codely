import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { AddExercise, UpdateExercise } from 'ducks/exercises/operations';
import { getAllCreatedExercises } from 'ducks/exercises/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import { useFormik } from 'formik';
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { exerciseFormValidation }
  from 'ui/exercises/forms/validationSchemes/exerciseFormValidation';

import ProgrammingLanguage from 'consts/programmingLanguage';

// First step of creating exercise
const ExercisesForm = ({ setStep, AddExercise, UpdateExercise }) => {
  const { t } = useTranslation();
  const programmingLanguages = Object.values(ProgrammingLanguage);
  const { token } = useToken();
  const { user } = useAuth0();
  const { color } = useTheme();
  const navigate = useNavigate();
  const { id, exercise } = useExerciseData();
  const exercises = useSelector(getAllCreatedExercises).filter((ex) => ex._id !== id);
  const elementsColor = color.split('.')[0];
  const validation = exerciseFormValidation(t, _.map(exercises, 'title'));
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  const onSubmit = (values) => {
    setStep(2);
    if (id) {
      UpdateExercise({ id, ...values }, token);
      return;
    }
    AddExercise({ ...values, author: foundUser._id }, token, navigate);
  };


  const formik = useFormik({
    initialValues: {
      title:  exercise.title || '',
      description: exercise.description || '',
      difficulty: exercise.difficulty || '',
      programmingLanguage: exercise.programmingLanguage || '',
    },
    enableReinitialize: true,
    validationSchema: validation.exerciseValidationSchema,
    onSubmit,
  });

  return (
    <Box id='exercise-form-wrapper'>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          color={elementsColor}
          sx={{ input: { color } }}
          focused={true}
          id='title'
          name='title'
          label={t('title-label')}
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          color={elementsColor}
          sx={{ input: { color } }}
          focused={true}
          id='description'
          name='description'
          label={t('description-label')}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          className={`dropdown-${foundUser.theme}`}
          color={elementsColor}
          focused={true}
          id={`difficulty-${foundUser.theme}`}
          name='difficulty'
          label={t('difficulty-label')}
          select
          value={formik.values.difficulty}
          onChange={formik.handleChange}
          error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
          helperText={formik.touched.difficulty && formik.errors.difficulty}
        >
          {[...Array(5).keys()].map((option) => (
            <MenuItem sx={{ color }} key={option + 1} value={option + 1}>
              {option + 1}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          color={elementsColor}
          focused={true}
          id={`programmingLanguage-${foundUser.theme}`}
          name='programmingLanguage'
          label={t('programming-language-label')}
          select
          value={formik.values.programmingLanguage}
          onChange={formik.handleChange}
          error={
            formik.touched.programmingLanguage &&
            Boolean(formik.errors.programmingLanguage)
          }
          helperText={
            formik.touched.programmingLanguage &&
            formik.errors.programmingLanguage
          }
        >
          {programmingLanguages.map((option) => (
            <MenuItem color={elementsColor} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button
          id={'submit-1'}
          color={elementsColor}
          variant='contained'
          type='submit'
        >
          {t('next-label')}
        </Button>
      </form>
    </Box>
  );
};

const mapDispatchToProps = {
  AddExercise,
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(ExercisesForm);

ExercisesForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  AddExercise: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func.isRequired,
};
