const { Key } = require('webdriverio');

class ExerciseFormPage {
  get inputTitle() {
    return $('#title');
  }

  get inputDescription() {
    return $('#description');
  }

  get inputDifficult() {
    return $('#difficulty-0');
  }

  get inputProgrammingLanguage() {
    return $('#programmingLanguage-0');
  }

  get inputFunctionName() {
    return $('#functionName');
  }

  get inputArgumentsQuantity() {
    return $('#argumentsQuantity');
  }

  get inputTestsQuantity() {
    return $('#testsQuantity-0');
  }

  get inputHintsQuantity() {
    return $('#hintsQuantity-0');
  }

  get inputCodeField() {
    return $('[class="view-line"]');
  }

  get checkExerciseButton() {
    return $('#submit');
  }

  get submitButtonFirst() {
    return $('#submit-1');
  }

  get submitButtonSecond() {
    return $('#submit-2');
  }

  get submitButtonThird() {
    return $('#submit-3');
  }

  get submitButtonFourth() {
    return $('#submit-4');
  }

  get cancelButtonSecond() {
    return $('.cancel-2');
  }

  get cancelButtonThird() {
    return $('.cancel-3');
  }

  get cancelButtonFourth() {
    return $('.cancel-4');
  }

  get cancelButtonFifth() {
    return $('.cancel');
  }

  get snackbar() {
    return $('#notistack-snackbar');
  }

  get inputCodeAllLines() {
    return $('//div[@class="view-lines monaco-mouse-cursor-text"]');
  }

  async inputCode(exercise) {
    await this.inputCodeField.waitForDisplayed();
    await this.inputCodeField.waitForClickable();
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(exercise.exampleSolution);
  }

  async completeFirstExerciseForm(exercise, submit = false) {
    await this.inputTitle.waitForDisplayed();
    await this.inputTitle.setValue(`${exercise.title} - ${exercise.language}`);
    await this.inputDescription.setValue(exercise.description);
    await this.inputDifficult.click();
    await $(`//li[@data-value="${exercise.difficult}"]`).click();
    await this.inputProgrammingLanguage.click();
    await $(`//li[@data-value="${exercise.language}"]`).click();
    submit &&
      (await (async () => {
        await this.submitButtonFirst.waitForClickable();
        await this.submitButtonFirst.click();
      })());
  }

  async completeSecondExerciseForm(exercise, submit = false) {
    await this.inputFunctionName.waitForDisplayed();
    await this.inputFunctionName.setValue(exercise.functionName);
    await this.inputArgumentsQuantity.setValue(exercise.argumentsQuantity);
    if (['Java', 'C', 'C++'].includes(exercise.language)) {
      await $('#outputType').click();
      await $(`#${exercise.outputType}`).waitForClickable();
      await $(`#${exercise.outputType}`).click();
      for (let i = 0; i < exercise.argumentsQuantity; i++) {
        await $(`#arg-${i}`).setValue(exercise.argumentNames[i]);
        await $(`#type-${i}`).click();
        await $(`#${exercise.argumentTypes[i]}-${i}`).waitForClickable();
        await $(`#${exercise.argumentTypes[i]}-${i}`).click();
      }
      await this.submitButtonSecond.click({ x: 0, y: -200 });
    } else {
      for (let i = 0; i < exercise.argumentsQuantity; i++) {
        await $(`#arg-${i}`).setValue(exercise.argumentNames[i]);
      }
    }
    submit &&
      (await (async () => {
        await this.submitButtonSecond.click();
      })());
  }

  async completeThirdExerciseForm(exercise, submit = false) {
    await this.inputTestsQuantity.waitForDisplayed();
    await this.inputTestsQuantity.click();
    await $(`//li[@data-value="${exercise.testsQuantity}"]`).click();
    for (let i = 0; i < exercise.testsQuantity; i++) {
      for (let j = 0; j < exercise.argumentsQuantity; j++) {
        await $(`#input-${i}-${j}`).setValue(exercise.inputValues[i][j]);
      }
      await $(`#output-${i}`).setValue(exercise.outputValues[i]);
    }
    submit &&
      (await (async () => {
        await this.submitButtonThird.click();
      })());
  }

  async completeFourthExerciseForm(exercise, submit = false) {
    await this.inputHintsQuantity.waitForDisplayed();
    await this.inputHintsQuantity.click();
    await $(`//li[@data-value="${exercise.hintsQuantity}"]`).click();
    for (let i = 0; i < exercise.hintsQuantity; i++) {
      await $(`#hint-${i}`).setValue(exercise.hints[i]);
    }

    submit &&
      (await (async () => {
        await this.submitButtonFourth.click();
      })());
  }

  async completeFifthExerciseForm(exercise, submit = false) {
    await this.inputCode(exercise);
    submit &&
      (await (async () => {
        await this.checkExerciseButton.click();
        await this.snackbar.waitForDisplayed({ timeout: 16000 });
        await this.snackbar.waitForDisplayed({ reverse: true });
        await this.checkExerciseButton.click();
      })());
  }

  async addExercise(exercise) {
    // First stage - main info
    await this.completeFirstExerciseForm(exercise, true);
    // Second stage - function data
    await this.completeSecondExerciseForm(exercise, true);
    // Third stage - tests
    await this.completeThirdExerciseForm(exercise, true);
    // Fourth stage - hints
    await this.completeFourthExerciseForm(exercise, true);
    // Fifth stage - example solution
    await this.completeFifthExerciseForm(exercise, true);
  }

  async clickCancelButtonSecond() {
    await this.cancelButtonSecond.waitForDisplayed();
    await this.cancelButtonSecond.click();
  }

  async clickCancelButtonThird() {
    await this.cancelButtonThird.waitForDisplayed();
    await this.cancelButtonThird.click();
  }

  async clickCancelButtonFourth() {
    await this.cancelButtonFourth.waitForDisplayed();
    await this.cancelButtonFourth.click();
  }

  async clickCancelButtonFifth() {
    await this.cancelButtonFifth.waitForDisplayed();
    await this.cancelButtonFifth.click();
  }
}

module.exports = new ExerciseFormPage();
