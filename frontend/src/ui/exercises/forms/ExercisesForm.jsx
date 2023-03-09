import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getUserByUsername } from 'ducks/user/selectors';
import { useFormik } from 'formik';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

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

  const validationSchema = yup.object({
    title: yup
      .string(t('Enter a title'))
      .min(3, t('Title should be of minimum 3 characters length'))
      .max(50, t('Title should be of maximum 50 characters length'))
      .required(t('Title is required')),
    description: yup
      .string(t('Enter a description'))
      .max(5000, t('Description should be of maximum 5000 characters length'))
      .required(t('Description is required')),
    difficulty: yup
      .number(t('Enter a difficulty level'))
      .min(1, t('The minimum difficulty level is 1'))
      .max(5, t('The maximum difficulty level is 5'))
      .required(t('Difficulty level is required')),
    programmingLanguage: yup
      .string(t('Enter a programming language'))
      .required(t('Programming language is required')),
  });

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
    validationSchema,
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
          color={color.split('.')[0]}
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
          color={color.split('.')[0]}
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
          color={color.split('.')[0]}
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
          color={color.split('.')[0]}
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
            <MenuItem color={color.split('.')[0]} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button color={color.split('.')[0]} variant='contained' type='submit'>
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
