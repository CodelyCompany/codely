import React, { useEffect, useMemo, useState } from 'react';

import { Box, Button, MenuItem, TextField } from '@mui/material';
import { GetExercise, UpdateExercise } from 'ducks/exercises/operations';
import { useFormik } from 'formik';
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CustomTypes from 'ui/exercises/forms/CustomTypes';
import { getDataTypes } from 'ui/exercises/forms/utils/dataTypes';
// eslint-disable-next-line max-len
import { customizeExerciseValidation } from 'ui/exercises/forms/validationSchemes/customizeExerciseValidation';

// Second step of creating exercise
const CustomizeExercise = ({ setStep, UpdateExercise }) => {
  const { t } = useTranslation();
  const [argumentsName, setArgumentsName] = useState([]);
  const [error, setError] = useState({});
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [customTypes, setCustomTypes] = useState([]);
  const { color } = useTheme();
  const elementsColor = color.split('.')[0];
  const validation = customizeExerciseValidation(t, argumentsName);

  const additionalOption = t('Other types / Custom types');
  const languagesWithTypes = ['Java', 'C++', 'C'];
  const { id, exercise } = useExerciseData();

  const formWithTypes = useMemo(
    () => false, //languagesWithTypes.includes(step.dataFromStep1?.programmingLanguage),
    [] //step.dataFromStep1]
  );
  const dropdownOptions = useMemo(
    () => 'javascript', // getDataTypes(step.dataFromStep1?.programmingLanguage || 'java'),
    [] //step.dataFromStep1]
  );

  useEffect(() => {
    if (exercise.argumentsName) {
      setArgumentsName(exercise.argumentsName);
    }
  }, [exercise]);

  useEffect(() => {
    if (types.includes(additionalOption)) setOpen(true);
  }, [types]);

  useEffect(() => {
    setError({});
  }, [argumentsName]);

  //it changes additionOption to recently added type
  useEffect(() => {
    setTypes((prev) =>
      prev.reduce((prev, curr) => {
        if (curr === additionalOption)
          return [...prev, customTypes[customTypes.length - 1]];
        return [...prev, curr];
      }, [])
    );
  }, [customTypes]);

  // it changes additionOption to first of
  // the types list (in case of closing dialog without adding new type)
  useEffect(() => {
    if (!open)
      setTypes((prev) =>
        prev.reduce((prev, curr) => {
          if (curr === additionalOption) return [...prev, dropdownOptions[0]];
          return [...prev, curr];
        }, [])
      );
  }, [open]);

  const prev = () => {
    setStep(1);
  };

  const setType = (index, value) => {
    setTypes((prev) =>
      prev.map((type, typeIndex) => {
        if (index === typeIndex) return value;
        return type;
      })
    );
  };

  const onSubmit = (values) => {
    argumentsNameSchema
      .validate({ argumentsName, types: formWithTypes ? types : [] })
      .then((valid) => {
        if (valid) {
          setError({});
          UpdateExercise({ id, ...values, argumentsName, step: 3 });
          setStep(3);
        }
      })
      .catch((err) => {
        setError({ error: err.errors });
      });
  };

  const formik = useFormik({
    initialValues: {
      functionName: exercise.functionName || '',
      argumentsQuantity: exercise.argumentsName?.length || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
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
    <Box id='customize-exercise-container'>
      <CustomTypes
        open={open}
        setOpen={setOpen}
        setCustomTypes={setCustomTypes}
      />
      <Box id='customize-exercise-wrapper'>
        <form id='customize-exercise-form' onSubmit={formik.handleSubmit}>
          <TextField
            className='customize-exercise-field'
            color={elementsColor}
            focused
            sx={{ color, input: { color } }}
            id='functionName'
            name='functionName'
            label={t('Function name')}
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
            color={elementsColor}
            focused
            className='customize-exercise-field'
            sx={{ input: { color } }}
            type='number'
            id='argumentsQuantity'
            name='argumentsQuantity'
            label={t('Function arguments quantity')}
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
                      className='customize-exercise-field-2'
                      color={elementsColor}
                      focused
                      sx={{
                        width: `${formWithTypes ? 'calc(50% - 5px)' : '100%'}`,
                        marginRight: `${formWithTypes ? '5px' : '0'}`,
                        input: { color },
                      }}
                      id={`arg-${argNumber}`}
                      label={`${argNumber + 1}. ${t('Argument name')}`}
                      value={argumentsName[argNumber] || ''}
                      onChange={(e) => handleArgumentName(e, argNumber)}
                      error={
                        error.error &&
                        !validation.argumentSchema.isValidSync(
                          argumentsName[argNumber] || ''
                        )
                      }
                      helperText={
                        error &&
                        !validation.argumentSchema.isValidSync(
                          argumentsName[argNumber] || ''
                        ) &&
                        error.error
                      }
                    />
                    {formWithTypes && (
                      <TextField
                        className='customize-exercise-field-2'
                        color={elementsColor}
                        select
                        sx={{
                          width: `${
                            formWithTypes ? 'calc(50% - 5px)' : '100%'
                          }`,
                          marginLeft: `${formWithTypes ? '5px' : '0'}`,
                        }}
                        label={`${argNumber + 1}. ${t('Argument type')}`}
                        id={`type-${argNumber}`}
                        value={types[argNumber] || ''}
                        onChange={(e) => setType(argNumber, e.target.value)}
                        error={
                          error.error &&
                          !validation.typesSchema.isValidSync(
                            types[argNumber] || ''
                          )
                        }
                        helperText={
                          error &&
                          !validation.typesSchema.isValidSync(
                            types[argNumber] || ''
                          ) &&
                          error.error
                        }
                      >
                        {[
                          ...dropdownOptions,
                          ...customTypes,
                          additionalOption,
                        ].map((opt) => (
                          <MenuItem
                            key={opt}
                            value={opt}
                            id={
                              [
                                'Inny typ / Własny typ',
                                'Other types / Custom types',
                              ].includes(opt)
                                ? `other-type-${argNumber}`
                                : `${opt}-${argNumber}`
                            }
                          >
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
              className='customize-exercise-field-2'
              color={elementsColor}
              select
              fullWidth
              id={'outputType'}
              label={t(`Output type`)}
              value={types[formik.values.argumentsQuantity] || ''}
              onChange={(e) =>
                setType(formik.values.argumentsQuantity, e.target.value)
              }
              error={
                error.error &&
                !validation.typesSchema.isValidSync(
                  types[formik.values.argumentsQuantity] || ''
                )
              }
              helperText={
                error &&
                !validation.typesSchema.isValidSync(
                  types[formik.values.argumentsQuantity] || ''
                ) &&
                error.error
              }
            >
              {[...dropdownOptions, ...customTypes, additionalOption].map(
                (opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    id={
                      [
                        'Inny typ / Własny typ',
                        'Other types / Custom types',
                      ].includes(opt)
                        ? 'other-type'
                        : opt
                    }
                  >
                    {opt}
                  </MenuItem>
                )
              )}
            </TextField>
          )}
          <Box id='buttons-wrapper'>
            <Button
              id='customize-exercise-button'
              color={elementsColor}
              variant='contained'
              onClick={prev}
              className={'cancel-2'}
            >
              {t('Previous')}
            </Button>

            <Button
              color={elementsColor}
              variant='contained'
              type='submit'
              id={'submit-2'}
            >
              {t('Next')}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  GetExercise,
  UpdateExercise,
};

export default connect(null, mapDispatchToProps)(CustomizeExercise);

CustomizeExercise.propTypes = {
  setStep: PropTypes.func.isRequired,
  GetExercise: PropTypes.func.isRequired,
  UpdateExercise: PropTypes.func.isRequired,
};
