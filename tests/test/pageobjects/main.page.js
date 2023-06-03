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

  get iconButton() {
    return $('#icon-button');
  }

  get menuItems() {
    return $$(
      '//li[@class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1snngmp-MuiButtonBase-root-MuiMenuItem-root"]'
    );
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

  async logout() {
    await this.iconButton.waitForDisplayed();
    await this.iconButton.click();
    await this.menuItems[5].click();
  }

  async logoutAdmin() {
    await this.iconButton.waitForDisplayed();
    await this.iconButton.click();
    await this.menuItems[6].click();
  }

  async goToAdminPage() {
    await this.iconButton.waitForDisplayed();
    await this.iconButton.click();
    await this.menuItems[4].click();
  }

  async goToPersonalizationPage() {
    await this.logout();
  }

  async goToStatisticsPage() {
    await this.iconButton.waitForDisplayed();
    await this.iconButton.click();
    await this.menuItems[3].click();
  }

  async getNavTexts() {
    await this.editorButton.waitForDisplayed();
    return {
      editorButton: await this.editorButton.getText(),
      exerciseButton: await this.exerciseButton.getText(),
      versusButton: await this.versusButton.getText(),
    };
  }
}

module.exports = new MainPage();
