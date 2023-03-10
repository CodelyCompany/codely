const { Key } = require('webdriverio');

class EditorPage {
  get javascriptLanguage() {
    return $('//li[text()="JavaScript"]');
  }

  get bashLanguage() {
    return $('//li[text()="Bash"]');
  }

  get cLanguage() {
    return $('//li[text()="C"]');
  }

  get cppLanguage() {
    return $('//li[text()="C++"]');
  }

  get javaLanguage() {
    return $('//li[text()="Java"]');
  }

  get pythonLanguage() {
    return $('//li[text()="Python"]');
  }

  get rLanguage() {
    return $('//li[text()="R"]');
  }

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

  async selectJavascriptLanguage() {
    await this.clickLanguageSelector();
    await this.javascriptLanguage.waitForDisplayed();
    await this.javascriptLanguage.click();
  }

  async selectBashLanguage() {
    await this.clickLanguageSelector();
    await this.bashLanguage.waitForDisplayed();
    await this.bashLanguage.click();
  }

  async selectCLanguage() {
    await this.clickLanguageSelector();
    await this.cLanguage.waitForDisplayed();
    await this.cLanguage.click();
  }

  async selectCppLanguage() {
    await this.clickLanguageSelector();
    await this.cppLanguage.waitForDisplayed();
    await this.cppLanguage.click();
  }

  async selectJavaLanguage() {
    await this.clickLanguageSelector();
    await this.javaLanguage.waitForDisplayed();
    await this.javaLanguage.click();
  }

  async selectPythonLanguage() {
    await this.clickLanguageSelector();
    await this.pythonLanguage.waitForDisplayed();
    await this.pythonLanguage.click();
  }

  async selectRLanguage() {
    await this.clickLanguageSelector();
    await this.rLanguage.waitForDisplayed();
    await this.rLanguage.click();
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
    await this.resultField.waitForDisplayed({ timeout: 16 });
    return await this.resultField.getText();
  }

  async getSnackbarResult() {
    await this.snackbar.waitForDisplayed({ timeout: 16 });
    const result = (await this.snackbar.getAttribute('class')).includes(
      'SnackbarItem-variantSuccess'
    );
    await this.snackbar.waitForDisplayed({ reverse: true });
    return result;
  }
}

module.exports = new EditorPage();
