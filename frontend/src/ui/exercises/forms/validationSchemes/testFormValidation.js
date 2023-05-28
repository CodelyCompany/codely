const yup = require('yup');

export const testFormValidation = (t) => {
  const inputValidation = yup
    .string(t('Enter an input'))
    .required(t('Input is required'));

  const outputValidation = yup
    .string(t('Enter an output'))
    .required(t('Output is required'));

  const testsValidationSchema = yup.object({
    tests: yup.array(t('Enter all tests')).of(
      yup.object({
        input: yup
          .array(t('Enter this field'))
          .of(
            yup
              .string(t('Enter this field'))
              .required(t('This field is required'))
          ),
        output: yup
          .string(t('Enter this field'))
          .required(t('This field is required')),
      })
    ),
  });

  return {
    inputValidation,
    outputValidation,
    testsValidationSchema,
  };
};
