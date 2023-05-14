const yup = require('yup');

export const exerciseFormValidation = (t) => {
  const exerciseValidationSchema = yup.object({
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

  return {
    exerciseValidationSchema,
  };
};
