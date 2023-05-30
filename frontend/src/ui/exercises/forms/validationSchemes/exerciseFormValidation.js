const yup = require('yup');

yup.addMethod(yup.mixed, 'uniqueIn', function (array = [], message) {
  return this.test('uniqueIn', message, function (value) {
    return array.filter((item) => item === value).length < 1;
  });
});

export const exerciseFormValidation = (t, exercises) => {
  const exerciseValidationSchema = yup.object({
    title: yup
      .string(t('exercise-title-request'))
      .min(3, t('exercise-title-min-length-warning'))
      .max(50, t('exercise-title-max-length-warning'))
      .required(t('exercise-title-requirement-warning'))
      .uniqueIn(exercises, t('exercise-title-unique-requirement-warning')),
    description: yup
      .string(t('exercise-description-request'))
      .max(5000, t('exercise-description-max-length-warning'))
      .required(t('exercise-description-requirement-warning')),
    difficulty: yup
      .number(t('exercise-difficulty-request'))
      .min(1, t('exercise-difficulty-min-value-warning'))
      .max(5, t('exercise-difficulty-max-value-warning'))
      .required(t('exercise-difficulty-requirement-warning')),
    programmingLanguage: yup
      .string(t('exercise-language-request'))
      .required(t('exercise-language-requirement-warning')),
  });

  return {
    exerciseValidationSchema,
  };
};
