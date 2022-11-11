import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';

const CustomizeExercise = ({ step, setStep }) => {
  const [argumentsName, setArgumentsName] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
  }, [argumentsName]);

  const prev = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: 1,
      dataFromStep2: {
        functionName: formik.values.functionName,
        argumentsQuantity: formik.values.argumentsQuantity,
        argumentsName,
      },
    }));
  };

  yup.addMethod(yup.array, 'unique', function (message, mapper = (a) => a) {
    return this.test('unique', message, function (list) {
      return list.length === new Set(list.map(mapper)).size;
    });
  });

  yup.addMethod(yup.mixed, 'uniqueIn', function (array = [], message) {
    return this.test('uniqueIn', message, function (value) {
      return array.filter((item) => item === value).length < 2;
    });
  });

  const argumentSchema = yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/)
    .uniqueIn(argumentsName);

  const argumentsNameSchema = yup.object({
    argumentsName: yup
      .array('Eneter all arguments name')
      .of(
        yup
          .string('Enter all arguments name')
          .required('All arguments are required')
          .matches(
            /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
            'Arguments name should consist only of letters and numbers'
          )
      )
      .required('All arguments are required')
      .unique('All arguments should be unique'),
  });

  const validationSchema = yup.object({
    functionName: yup
      .string('Enter a function name')
      .min(1, 'Function name should be of minimum 1 character length')
      .max(50, 'Function name should be of maximum 50 characters length')
      .required('Function name is required')
      .matches(
        /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
        'Function name should consist of letters and numbers only'
      ),
    argumentsQuantity: yup
      .number('Enter arguments quantity')
      .min(1, 'Arguments quantity should be higher than 0')
      .max(5, "Arguments quantity shouldn't be higher than 5")
      .required('Arguments quantity are required'),
  });

  const formik = useFormik({
    initialValues: {
      functionName: step.dataFromStep2?.functionName || '',
      argumentsQuantity: step.dataFromStep2?.argumentsQuantity || '',
    },
    validationSchema,
    onSubmit: (values) => {
      argumentsNameSchema
        .validate({ argumentsName })
        .then((valid) => {
          if (valid) {
            setError({});
            setStep((prev) => ({
              ...prev,
              currentStep: 3,
              dataFromStep2: { ...values, argumentsName },
            }));
          }
        })
        .catch((err) => {
          setError({ error: err.errors });
        });
    },
  });

  useEffect(() => {
    if (step.dataFromStep2.argumentsName && !checked) {
      setArgumentsName(step.dataFromStep2.argumentsName);
      setChecked(true);
      return;
    }
    setArgumentsName((prev) =>
      [...Array(formik.values.argumentsQuantity).keys()].map((el) => {
        if (prev[el]) return prev[el];
        return '';
      })
    );
  }, [formik.values.argumentsQuantity]);

  const handleArgumentName = (e, argNumber) => {
    setArgumentsName((prev) =>
      prev.map((arg, index) => {
        if (index === argNumber) return e.target.value;
        return arg;
      })
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
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
            sx={{ marginBottom: '10px' }}
            id='functionName'
            name='functionName'
            label='Function name'
            value={formik.values.functionName}
            onChange={formik.handleChange}
            error={
              formik.touched.functionName && Boolean(formik.errors.functionName)
            }
            helperText={
              formik.touched.functionName && formik.errors.functionName
            }
          />
          <TextField
            sx={{ marginBottom: '10px' }}
            type='number'
            id='argumentsQuantity'
            name='argumentsQuantity'
            label='Function arguments quantity'
            InputProps={{ inputProps: { min: 0 } }}
            value={formik.values.argumentsQuantity}
            onChange={formik.handleChange}
            error={
              formik.touched.argumentsQuantity &&
              Boolean(formik.errors.argumentsQuantity)
            }
            helperText={
              formik.touched.argumentsQuantity &&
              formik.errors.argumentsQuantity
            }
          />
          {formik.values.argumentsQuantity &&
          formik.values.argumentsQuantity > 0
            ? [...Array(formik.values.argumentsQuantity).keys()].map(
                (argNumber) => (
                  <TextField
                    key={argNumber}
                    sx={{ marginTop: '10px' }}
                    label={`${argNumber + 1}. Argument name`}
                    value={argumentsName[argNumber] || ''}
                    onChange={(e) => handleArgumentName(e, argNumber)}
                    error={
                      error.error &&
                      !argumentSchema.isValidSync(
                        argumentsName[argNumber] || ''
                      )
                    }
                    helperText={
                      error &&
                      !argumentSchema.isValidSync(
                        argumentsName[argNumber] || ''
                      ) &&
                      error.error
                    }
                  />
                )
              )
            : ''}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              color='primary'
              variant='contained'
              onClick={prev}
              sx={{ margin: '10px 0' }}
            >
              Previous
            </Button>

            <Button color='primary' variant='contained' type='submit'>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CustomizeExercise;

CustomizeExercise.propTypes = {
  step: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
};
