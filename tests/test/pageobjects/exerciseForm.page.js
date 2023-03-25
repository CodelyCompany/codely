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

  get snackbar() {
    return $('#notistack-snackbar');
  }

  async addExercise(exercise) {
    // First stage - main info
    await this.inputTitle.waitForDisplayed();
    await this.inputTitle.setValue(`${exercise.title} - ${exercise.language}`);
    await this.inputDescription.setValue(exercise.description);
    await this.inputDifficult.click();
    await $(`//li[@data-value="${exercise.difficult}"]`).click();
    await this.inputProgrammingLanguage.click();
    await $(`//li[@data-value="${exercise.language}"]`).click();
    await this.submitButtonFirst.waitForClickable();
    await this.submitButtonFirst.click();
    // Second stage - function data
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
    await this.submitButtonSecond.click();
    // Third stage - tests
    await this.inputTestsQuantity.waitForDisplayed();
    await this.inputTestsQuantity.click();
    await $(`//li[@data-value="${exercise.testsQuantity}"]`).click();
    for (let i = 0; i < exercise.testsQuantity; i++) {
      for (let j = 0; j < exercise.argumentsQuantity; j++) {
        await $(`#input-${i}-${j}`).setValue(exercise.inputValues[i][j]);
      }
      await $(`#output-${i}`).setValue(exercise.outputValues[i]);
    }
    await this.submitButtonThird.click();
    // Fourth stage - hints
    await this.inputHintsQuantity.waitForDisplayed();
    await this.inputHintsQuantity.click();
    await $(`//li[@data-value="${exercise.hintsQuantity}"]`).click();
    for (let i = 0; i < exercise.hintsQuantity; i++) {
      await $(`#hint-${i}`).setValue(exercise.hints[i]);
    }
    await this.submitButtonFourth.click();
    // Fifth stage - example solution
    await this.inputCodeField.waitForDisplayed();
    await this.inputCodeField.waitForClickable();
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(exercise.exampleSolution);
    await this.checkExerciseButton.click();
    await this.snackbar.waitForDisplayed({ timeout: 16000 });
    await this.snackbar.waitForDisplayed({ reverse: true });
    await this.checkExerciseButton.click();
  }
}

module.exports = new ExerciseFormPage();
