import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { getUserByUsername } from '../../../ducks/user/selectors';

const ExercisesForm = ({ setStep, dataToEdit, step }) => {
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

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  const validationSchema = yup.object({
    title: yup
      .string('Enter a title')
      .min(3, 'Title should be of minimum 3 characters length')
      .max(50, 'Title should be of maximum 50 characters length')
      .required('Title is required'),
    description: yup
      .string('Enter a description')
      .max(5000, 'Description should be of maximum 5000 characters length')
      .required('Description is required'),
    difficulty: yup
      .number('Enter a difficulty level')
      .min(1, 'The minimum difficulty level is 1')
      .max(5, 'The maximum difficulty level is 5')
      .required('Difficulty level is required'),
    programmingLanguage: yup
      .string('Enter a programming language')
      .required('Programming language is required'),
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'start',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '900px',
          margin: '10px',
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          color={color.split('.')[0]}
          sx={{ input: { color }, marginBottom: '10px' }}
          focused={true}
          id='title'
          name='title'
          label='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          color={color.split('.')[0]}
          sx={{ input: { color }, marginBottom: '10px' }}
          focused={true}
          id='description'
          name='description'
          label='Description'
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
          sx={{
            marginBottom: '10px',
          }}
          id={`difficulty-${foundUser.theme}`}
          name='difficulty'
          label='Difficulty'
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
          sx={{ marginBottom: '10px' }}
          focused={true}
          id={`programmingLanguage-${foundUser.theme}`}
          name='programmingLanguage'
          label='Programming language'
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
          Next
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
