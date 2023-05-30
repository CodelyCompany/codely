const yup = require('yup');

export const testFormValidation = (t) => {
  const inputValidation = yup
    .string(t('input-request'))
    .required(t('input-requirement-warning'));

  const outputValidation = yup
    .string(t('output-request'))
    .required(t('output-requirement-warning'));

  const testsValidationSchema = yup.object({
    tests: yup.array(t('tests-request')).of(
      yup.object({
        input: yup
          .array(t('fill-field-request'))
          .of(
            yup
              .string(t('fill-field-request'))
              .required(t('fill-field-requirement-warning'))
          ),
        output: yup
          .string(t('fill-field-request'))
          .required(t('fill-field-requirement-warning')),
      })
    ),
  });

  return {
    inputValidation,
    outputValidation,
    testsValidationSchema,
  };
};
