const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const { loginAdmin } = require('../testtemplates/helpFunctions');
const javaScriptExerciseData = require('../testdata/exampleExercises.json')
  .exercises[4];
const javaExerciseData = require('../testdata/exampleExercises.json')
  .exercises[5];

const checkFirstForm = async (exercise) => {
  expect(await ExerciseFormPage.inputTitle.getValue()).toBe(
    `${exercise.title} - ${exercise.language}`
  );
  expect(await ExerciseFormPage.inputDescription.getValue()).toBe(
    exercise.description
  );
  expect(await ExerciseFormPage.inputDifficult.getText()).toBe(
    exercise.difficult
  );
  expect(await ExerciseFormPage.inputProgrammingLanguage.getText()).toBe(
    exercise.language
  );
};

const checkSecondForm = async (exercise) => {
  expect(await ExerciseFormPage.inputFunctionName.getValue()).toBe(
    exercise.functionName
  );
  expect(await ExerciseFormPage.inputArgumentsQuantity.getValue()).toBe(
    exercise.argumentsQuantity
  );
  for (let i = 0; i < exercise.argumentsQuantity; i++) {
    expect(await $(`#arg-${i}`).getValue()).toBe(exercise.argumentNames[i]);
  }
  if (['Java', 'C', 'C++'].includes(exercise.language)) {
    expect(await $('#outputType').getText()).toBe(exercise.outputType);
    for (let i = 0; i < exercise.argumentsQuantity; i++) {
      expect(await $(`#arg-${i}`).getValue()).toBe(exercise.argumentNames[i]);
      expect(await $(`#type-${i}`).getText()).toBe(exercise.argumentTypes[i]);
    }
  } else {
    for (let i = 0; i < exercise.argumentsQuantity; i++) {
      expect(await $(`#arg-${i}`).getValue()).toBe(exercise.argumentNames[i]);
    }
  }
};

const checkThirdForm = async (exercise) => {
  expect(await ExerciseFormPage.inputTestsQuantity.getText()).toBe(
    exercise.testsQuantity
  );
  for (let i = 0; i < exercise.testsQuantity; i++) {
    for (let j = 0; j < exercise.argumentsQuantity; j++) {
      expect(await $(`#input-${i}-${j}`).getValue()).toBe(
        exercise.inputValues[i][j]
      );
    }
    expect(await $(`#output-${i}`).getValue()).toBe(exercise.outputValues[i]);
  }
};

const checkFourthForm = async (exercise) => {
  expect(await ExerciseFormPage.inputHintsQuantity.getText()).toBe(
    exercise.hintsQuantity
  );
  for (let i = 0; i < exercise.hintsQuantity; i++) {
    expect(await $(`#hint-${i}`).getValue()).toBe(exercise.hints[i]);
  }
};

describe('Exercises Form Test', () => {
  loginAdmin();

  it('Should open exercise tab', async () => {
    await MainPage.clickExerciseButton();
    expect(await ExercisesPage.createExerciseButton).toBeDisplayed();
  });

  it('Should open exercise form', async () => {
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.inputTitle.waitForDisplayed();
    expect(await ExerciseFormPage.inputTitle).toBeDisplayed();
  });

  it('Should complete first exercise form', async () => {
    await ExerciseFormPage.completeFirstExerciseForm(
      javaScriptExerciseData,
      true
    );
    expect(await ExerciseFormPage.inputFunctionName).toBeDisplayed();
  });

  it('Should be completed first exercise form', async () => {
    await ExerciseFormPage.clickCancelButtonSecond();
    await ExerciseFormPage.inputTitle.waitForClickable();
    await checkFirstForm(javaScriptExerciseData);
  });

  it('Should complete second exercise form', async () => {
    await ExerciseFormPage.submitButtonFirst.click();
    await ExerciseFormPage.completeSecondExerciseForm(
      javaScriptExerciseData,
      true
    );
    expect(await ExerciseFormPage.inputTestsQuantity).toBeDisplayed();
  });

  it('Should be completed second exercise form', async () => {
    await ExerciseFormPage.clickCancelButtonThird();
    await ExerciseFormPage.inputFunctionName.waitForDisplayed();
    await checkSecondForm(javaScriptExerciseData);
  });

  it('Should complete third exercise form', async () => {
    await ExerciseFormPage.submitButtonSecond.click();
    await ExerciseFormPage.completeThirdExerciseForm(
      javaScriptExerciseData,
      true
    );
    expect(await ExerciseFormPage.inputHintsQuantity).toBeDisplayed();
  });

  it('Should be completed third exercise form', async () => {
    await ExerciseFormPage.clickCancelButtonFourth();
    await ExerciseFormPage.inputTestsQuantity.waitForDisplayed();
    await checkThirdForm(javaScriptExerciseData);
  });

  it('Should complete fourth exercise form', async () => {
    await ExerciseFormPage.submitButtonThird.click();
    await ExerciseFormPage.completeFourthExerciseForm(
      javaScriptExerciseData,
      true
    );
    expect(await ExerciseFormPage.inputCodeField).toBeDisplayed();
  });

  it('Should be completed fourth exercise form', async () => {
    await ExerciseFormPage.clickCancelButtonFifth();
    await ExerciseFormPage.inputHintsQuantity.waitForDisplayed();
    await checkFourthForm(javaScriptExerciseData);
  });

  it('Should complete fifth exercise form', async () => {
    await ExerciseFormPage.submitButtonFourth.click();
    expect(await ExerciseFormPage.getFirstLineCodeField()).toBe(
      'const sub = (a, b) => {'
    );
    await ExerciseFormPage.completeFifthExerciseForm(javaScriptExerciseData);
  });

  it('Should back to first form', async () => {
    await ExerciseFormPage.clickCancelButtonFifth();
    await ExerciseFormPage.clickCancelButtonFourth();
    await ExerciseFormPage.clickCancelButtonThird();
    await ExerciseFormPage.clickCancelButtonSecond();
    expect(await ExerciseFormPage.inputTitle).toBeDisplayed();
  });

  it('Should complete first form with new exercise data', async () => {
    await checkFirstForm(javaScriptExerciseData);
    await ExerciseFormPage.completeFirstExerciseForm(javaExerciseData);
    await checkFirstForm(javaExerciseData);
    await ExerciseFormPage.submitButtonFirst.click();
  });

  it('Should complete second form with new exercise data', async () => {
    await checkSecondForm(javaScriptExerciseData);
    await ExerciseFormPage.completeSecondExerciseForm(javaExerciseData);
    await checkSecondForm(javaExerciseData);
    await ExerciseFormPage.submitButtonSecond.click();
  });

  it('Should complete third form with new exercise data', async () => {
    await checkThirdForm(javaScriptExerciseData);
    await ExerciseFormPage.completeThirdExerciseForm(javaExerciseData);
    await checkThirdForm(javaExerciseData);
    await ExerciseFormPage.submitButtonThird.click();
  });

  it('Should complete fourth form with new exercise data', async () => {
    await checkFourthForm(javaScriptExerciseData);
    await ExerciseFormPage.completeFourthExerciseForm(javaExerciseData);
    await checkFourthForm(javaExerciseData);
    await ExerciseFormPage.submitButtonFourth.click();
  });

  it('Should complete fifth form with new exercise data', async () => {
    expect(await ExerciseFormPage.getFirstLineCodeField()).toBe(
      'public class Main {'
    );
    await ExerciseFormPage.completeFifthExerciseForm(javaExerciseData);
  });

  it('Should submit Java exercise', async () => {
    await ExerciseFormPage.completeFifthExerciseForm(javaExerciseData, true);
    expect(await ExercisesPage.createExerciseButton).toBeDisplayed();
  });
});
