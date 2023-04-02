const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const javaScriptExerciseData =
  require('../testdata/exercises/exercisesJavascript.json').exercises[0];

describe('Exercises Form Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open exercise tab', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.createExerciseButton.waitForDisplayed();
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
    expect(await ExerciseFormPage.inputTitle.getValue()).toBe(
      `${javaScriptExerciseData.title} - ${javaScriptExerciseData.language}`
    );
    expect(await ExerciseFormPage.inputDescription.getValue()).toBe(
      javaScriptExerciseData.description
    );
    expect(await ExerciseFormPage.inputDifficult.getText()).toBe(
      javaScriptExerciseData.difficult
    );
    expect(await ExerciseFormPage.inputProgrammingLanguage.getText()).toBe(
      javaScriptExerciseData.language
    );
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
    expect(await ExerciseFormPage.inputFunctionName.getValue()).toBe(
      javaScriptExerciseData.functionName
    );
    expect(await ExerciseFormPage.inputArgumentsQuantity.getValue()).toBe(
      javaScriptExerciseData.argumentsQuantity
    );
    for (let i = 0; i < javaScriptExerciseData.argumentsQuantity; i++) {
      expect(await $(`#arg-${i}`).getValue()).toBe(
        javaScriptExerciseData.argumentNames[i]
      );
    }
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
    expect(await ExerciseFormPage.inputTestsQuantity.getText()).toBe(
      javaScriptExerciseData.testsQuantity
    );
    for (let i = 0; i < javaScriptExerciseData.testsQuantity; i++) {
      for (let j = 0; j < javaScriptExerciseData.argumentsQuantity; j++) {
        expect(await $(`#input-${i}-${j}`).getValue()).toBe(
          javaScriptExerciseData.inputValues[i][j]
        );
      }
      expect(await $(`#output-${i}`).getValue()).toBe(
        javaScriptExerciseData.outputValues[i]
      );
    }
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
    expect(await ExerciseFormPage.inputHintsQuantity.getText()).toBe(
      javaScriptExerciseData.hintsQuantity
    );
    for (let i = 0; i < javaScriptExerciseData.hintsQuantity; i++) {
      expect(await $(`#hint-${i}`).getValue()).toBe(
        javaScriptExerciseData.hints[i]
      );
    }
  });

  it('Should complete fifth exercise form', async () => {
    await ExerciseFormPage.submitButtonFourth.click();
    expect(await ExerciseFormPage.getFirstLineCodeField()).toBe(
      'const sum = (a, b) => {'
    );
    await ExerciseFormPage.completeFifthExerciseForm(
      javaScriptExerciseData,
      false
    );
  });

  it('Should be completed fifth exercise form', async () => {
    await ExerciseFormPage.clickCancelButtonFifth();
    await ExerciseFormPage.submitButtonFourth.click();
    expect(await ExerciseFormPage.getFirstLineCodeField()).toBe(
      'const sum=(a,b)=>{'
    );
  });
});
