const { Key } = require('webdriverio');

class EditorPage {
  get submitButton() {
    return $('.MuiButton-outlinedPrimary');
  }

  get inputCodeField() {
    return $('[class="view-line"]');
  }

  get resultField() {
    return $('//textarea[@name="code"]');
  }

  get languageSelector() {
    return $('#demo-select-small');
  }

  get snackbar() {
    return $('.SnackbarContent-root');
  }

  async clickLanguageSelector() {
    await this.languageSelector.waitForDisplayed();
    await this.languageSelector.click();
  }

  async selectLanguage(language) {
    await this.clickLanguageSelector();
    await $(`//li[text()="${language}"]`).waitForDisplayed();
    await $(`//li[text()="${language}"]`).click();
  }

  async clickLaunchCode() {
    await this.submitButton.waitForDisplayed();
    await this.submitButton.click();
  }

  async inputCode(code) {
    await this.inputCodeField.waitForClickable();
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(code);
  }

  async getResult() {
    await this.resultField.waitForDisplayed({ timeout: 16000 });
    return await this.resultField.getText();
  }

  async getSnackbarResult() {
    await this.snackbar.waitForDisplayed({ timeout: 16000 });
    const result = (await this.snackbar.getAttribute('class')).includes(
      'SnackbarItem-variantSuccess'
    );
    await this.snackbar.waitForDisplayed({ reverse: true });
    return result;
  }
}

module.exports = new EditorPage();
