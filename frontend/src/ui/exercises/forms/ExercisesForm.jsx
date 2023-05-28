import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getUserByUsername } from 'ducks/user/selectors';
import { useFormik } from 'formik';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { exerciseFormValidation } from 'ui/exercises/forms/validationSchemes/exerciseFormValidation';

const ExercisesForm = ({ setStep, dataToEdit, step }) => {
  const { t } = useTranslation();
  const programmingLanguages = [
    'JavaScript',
    'Bash',
    'C',
    'C++',
    'Java',
    'Python',
    'R',
  ];

  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };
  const { color } = useTheme();
  const elementsColor = color.split('.')[0];
  const validation = exerciseFormValidation(t);

  const formik = useFormik({
    initialValues: {
      title: step.dataFromStep1?.title || dataToEdit?.title || '',
      description:
        step.dataFromStep1?.description || dataToEdit?.description || '',
      difficulty:
        step.dataFromStep1?.difficulty || dataToEdit?.difficulty || '',
      programmingLanguage:
        step.dataFromStep1?.programmingLanguage ||
        dataToEdit?.programmingLanguage ||
        '',
    },
    validationSchema: validation.exerciseValidationSchema,
    onSubmit: (values) => {
      setStep((prev) => ({
        ...prev,
        currentStep: 2,
        dataFromStep1: values,
      }));
    },
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
          label={t('Title')}
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
          label={t('Description')}
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
          label={t('Difficulty')}
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
          label={t('Programming language')}
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
          {t('Next')}
        </Button>
      </form>
    </Box>
  );
};

export default ExercisesForm;

ExercisesForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  dataToEdit: PropTypes.object,
  step: PropTypes.object.isRequired,
};
