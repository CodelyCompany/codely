const yup = require('yup');

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

export const customizeExerciseValidation = (t, argumentsName) => {
  const argumentSchema = yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/)
    .uniqueIn(argumentsName);

  const typesSchema = yup
    .string(t('arguments-type-request'))
    .required(t('arguments-type-required-warning'));

  const argumentsNameSchema = yup.object({
    argumentsName: yup
      .array(t('function-arguments-name-request'))
      .of(
        yup
          .string(t('Enter all arguments name'))
          .required(t('arguments-name-requirement-warning'))
          .matches(
            /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
            t('arguments-name-invalid-warning')
          )
      )
      .required(t('arguments-name-requirement-warning'))
      .unique(t('arguments-name-unique-warning')),
    types: yup
      .array(t('arguments-type-request'))
      .of(
        yup
          .string(t('arguments-type-request'))
          .required(t('arguments-type-required-warning'))
      )
      .notRequired(),
  });

  const customizeExerciseValidationSchema = yup.object({
    functionName: yup
      .string(t('function-name-request'))
      .min(1, t('function-name-min-length-warning'))
      .max(50, t('function-name-max-length-warning'))
      .required(t('function-name-requirement-warning'))
      .matches(
        /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
        t('function-name-characters-warning')
      ),
    argumentsQuantity: yup
      .number(t('Enter arguments quantity'))
      .min(1, t('Arguments quantity should be higher than 0'))
      .max(5, t('arguments-max-quantity-warning'))
      .required(t('arguments-quantity-required-warning')),
  });
  return {
    argumentSchema,
    typesSchema,
    argumentsNameSchema,
    customizeExerciseValidationSchema,
  };
};
