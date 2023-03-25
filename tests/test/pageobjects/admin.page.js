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

  async acceptExercise(title) {
    await $(
      `//div[@id="exercises-to-check-table-container"]//div[text()="${title}"]`
    ).waitForClickable();
    await $(`//div[text()="${title}"]`).click();
    await this.acceptExerciseButton.waitForClickable();
    await this.acceptExerciseButton.click();
  }
}

module.exports = new AdminPage();
