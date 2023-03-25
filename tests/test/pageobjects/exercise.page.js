const { Key } = require('webdriverio');

class ExercisePage {
  get exerciseTitle() {
    return $('#exercise-title');
  }

  get inputCodeField() {
    return $('[class="view-line"]');
  }

  get runButton() {
    return $$('//div[@id="run-buttons"]/button')[0];
  }

  get confirmButton() {
    return $$('//div[@id="run-buttons"]/button')[1];
  }

  get snackbar() {
    return $('#notistack-snackbar');
  }

  get testsResult() {
    return $$('//div[@id="tests-wrapper"]//h6')[1];
  }

  async solveExercise(solution) {
    await this.inputCodeField.waitForClickable();
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(solution);
    await this.confirmButton.click();
    await this.snackbar.waitForDisplayed();
  }
}

module.exports = new ExercisePage();
