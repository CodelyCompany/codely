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
    .string(t('Enter all arguments type'))
    .required(t('Argument type is required'));

  const argumentsNameSchema = yup.object({
    argumentsName: yup
      .array(t('Eneter all arguments name'))
      .of(
        yup
          .string(t('Enter all arguments name'))
          .required(t('All arguments are required'))
          .matches(
            /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
            t('Arguments name should consist only of letters and numbers')
          )
      )
      .required(t('All arguments are required'))
      .unique(t('All arguments should be unique')),
    types: yup
      .array(t('Enter all argument types'))
      .of(
        yup
          .string(t('Enter all arguments type'))
          .required(t('Argument type is required'))
      )
      .notRequired(),
  });

  const customizeExerciseValidationSchema = yup.object({
    functionName: yup
      .string(t('Enter a function name'))
      .min(1, t('Function name should be of minimum 1 character length'))
      .max(50, t('Function name should be of maximum 50 characters length'))
      .required(t('Function name is required'))
      .matches(
        /^[a-zA-Z0-9]*[a-z][a-zA-Z0-9]*$/,
        t('Function name should consist of letters and numbers only')
      ),
    argumentsQuantity: yup
      .number(t('Enter arguments quantity'))
      .min(1, t('Arguments quantity should be higher than 0'))
      .max(5, t("Arguments quantity shouldn't be higher than 5"))
      .required(t('Arguments quantity are required')),
  });
  return {
    argumentSchema,
    typesSchema,
    argumentsNameSchema,
    customizeExerciseValidationSchema,
  };
};
