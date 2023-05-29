const yup = require('yup');

export const hintValidation = (t) => {
  const hintSchema = yup.string().required();

  const hintsSchema = yup
    .array(t('Enter all hints'))
    .of(yup.string(t('Enter the hint')).required(t('This hint is required')));

  return {
    hintSchema,
    hintsSchema,
  };
};
