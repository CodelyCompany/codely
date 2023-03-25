const { Key } = require('webdriverio');

class ExercisesPage {
  get createExerciseButton() {
    return $('#createExercise');
  }

  get searchExerciseInput() {
    return $('#combo-box');
  }

  async clickCreateExerciseButton() {
    await this.createExerciseButton.waitForDisplayed();
    await this.createExerciseButton.click();
  }

  async searchExercise(exerciseTitle) {
    await this.searchExerciseInput.waitForDisplayed();
    await this.searchExerciseInput.setValue(exerciseTitle);
    await browser.keys(Key.ArrowDown);
    await browser.keys(Key.ArrowDown);
    await browser.keys(Key.Enter);
  }

  async clickExercise(exerciseTitle) {
    await $(`//h4[text()="${exerciseTitle}"]`).waitForClickable();
    await $(`//h4[text()="${exerciseTitle}"]`).click();
  }
}

module.exports = new ExercisesPage();
