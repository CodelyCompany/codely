const yup = require('yup');

export const hintValidation = (t) => {
  const hintSchema = yup.string().required();

  const hintsSchema = yup
    .array(t('function-hints-requirement-warning'))
    .of(yup.string(t('exercise-hint-request')).required(t('exercise-hint-requirement-warning')));

  return {
    hintSchema,
    hintsSchema,
  };
};
