class AdminPage {
  get exercisesToCheckTable() {
    return $('#exercises-to-check-table-container');
  }

  get acceptExerciseButton() {
    return $('#accept');
  }

  get rejectExerciseButton() {
    return $('#reject');
  }

  get undoExerciseButton() {
    return $('#undo');
  }

  async acceptExercise(exercise) {
    await $(
      `//div[@id="exercises-to-check-table-container"]//div[text()="${exercise.title} - ${exercise.language}"]`
    ).waitForClickable();
    await $(`//div[text()="${exercise.title} - ${exercise.language}"]`).click();
    await this.acceptExerciseButton.waitForClickable();
    await this.acceptExerciseButton.click();
  }
}

module.exports = new AdminPage();
