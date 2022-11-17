import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';

import { getDataTypes } from './utils/dataTypes';

const CustomizeExercise = ({ step, setStep, dataToEdit }) => {
  const [argumentsName, setArgumentsName] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState({});
  const [types, setTypes] = useState([]);

  const languagesWithTypes = ['Java', 'C++', 'C'];
  const formWithTypes = useMemo(
    () => languagesWithTypes.includes(step.dataFromStep1?.programmingLanguage),
    [step.dataFromStep1]
  );

  const dropdownOptions = useMemo(
    () => getDataTypes(step.dataFromStep1?.programmingLanguage || 'java'),
    [step.dataFromStep1]
  );

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
        types,
      },
    }));
  };

  const setType = (index, value) => {
    setTypes((prev) =>
      prev.map((type, typeIndex) => {
        if (index === typeIndex) return value;
        return type;
      })
    );
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

  const typesSchema = yup
    .string('Enter all arguments type')
    .required('Argument type is required');

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
    types: yup
      .array('Enter all argument types')
      .of(
        yup
          .string('Enter all arguments type')
          .required('Argument type is required')
      )
      .notRequired(),
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
      functionName:
        step.dataFromStep2?.functionName || dataToEdit?.functionName || '',
      argumentsQuantity:
        step.dataFromStep2?.argumentsQuantity ||
        dataToEdit?.argumentsName.length ||
        '',
    },
    validationSchema,
    onSubmit: (values) => {
      argumentsNameSchema
        .validate({ argumentsName, types: formWithTypes ? types : [] })
        .then((valid) => {
          if (valid) {
            setError({});
            setStep((prev) => ({
              ...prev,
              currentStep: 3,
              dataFromStep2: { ...values, argumentsName, types },
            }));
          }
        })
        .catch((err) => {
          setError({ error: err.errors });
        });
    },
  });

  useEffect(() => {
    if (step.dataFromStep2?.argumentsName && !checked) {
      setArgumentsName(step.dataFromStep2.argumentsName);
      setTypes(step.dataFromStep2.types);
      setChecked(true);
      return;
    }
    if (dataToEdit && !checked) {
      setArgumentsName(dataToEdit.argumentsName);
      setTypes(dataToEdit.types);
      setChecked(true);
      return;
    }
    setArgumentsName((prev) =>
      [...Array(formik.values.argumentsQuantity).keys()].map((el) => {
        if (prev[el]) return prev[el];
        return '';
      })
    );
    types &&
      setTypes((prev) =>
        [...Array(formik.values.argumentsQuantity + 1).keys()].map((el) => {
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
            id="functionName"
            name="functionName"
            label="Function name"
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
            type="number"
            id="argumentsQuantity"
            name="argumentsQuantity"
            label="Function arguments quantity"
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
                  <Box key={argNumber}>
                    <TextField
                      sx={{
                        marginTop: '10px',
                        width: `${formWithTypes ? 'calc(50% - 5px)' : '100%'}`,
                        marginRight: `${formWithTypes ? '5px' : '0'}`,
                      }}
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
                    {formWithTypes && (
                      <TextField
                        select
                        sx={{
                          marginTop: '10px',
                          width: `${
                            formWithTypes ? 'calc(50% - 5px)' : '100%'
                          }`,
                          marginLeft: `${formWithTypes ? '5px' : '0'}`,
                        }}
                        label={`${argNumber + 1}. Argument type`}
                        value={types[argNumber] || ''}
                        onChange={(e) => setType(argNumber, e.target.value)}
                        error={
                          error.error &&
                          !typesSchema.isValidSync(types[argNumber] || '')
                        }
                        helperText={
                          error &&
                          !typesSchema.isValidSync(types[argNumber] || '') &&
                          error.error
                        }
                      >
                        {dropdownOptions.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Box>
                )
              )
            : ''}
          {formWithTypes && (
            <TextField
              select
              fullWidth
              label={`Output type`}
              value={types[formik.values.argumentsQuantity] || ''}
              sx={{ marginTop: '10px' }}
              onChange={(e) =>
                setType(formik.values.argumentsQuantity, e.target.value)
              }
              error={
                error.error &&
                !typesSchema.isValidSync(
                  types[formik.values.argumentsQuantity] || ''
                )
              }
              helperText={
                error &&
                !typesSchema.isValidSync(
                  types[formik.values.argumentsQuantity] || ''
                ) &&
                error.error
              }
            >
              {dropdownOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={prev}
              sx={{ margin: '10px 0' }}
            >
              Previous
            </Button>

            <Button color="primary" variant="contained" type="submit">
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
  dataToEdit: PropTypes.object,
};
