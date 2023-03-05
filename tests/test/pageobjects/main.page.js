class MainPage {
  get usernameInfo() {
    return $('h2');
  }

  get editorButton() {
    return $('//a[@href="/editor"]');
  }

  get exerciseButton() {
    return $('//a[@href="/exercises"]');
  }

  get versusButton() {
    return $('//a[@href="/versus"]');
  }

  async getUsernameInfo() {
    await this.usernameInfo.waitForDisplayed();
    return await this.usernameInfo.getText();
  }

  async clickEditorButton() {
    await this.editorButton.waitForDisplayed();
    await this.editorButton.click();
  }

  async clickExerciseButton() {
    await this.exerciseButton.waitForDisplayed();
    await this.exerciseButton.click();
  }

  async clickVersusButton() {
    await this.versusButton.waitForDisplayed();
    await this.versusButton.click();
  }
}

module.exports = new MainPage();
