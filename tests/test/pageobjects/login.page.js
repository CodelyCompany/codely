class LoginPage {
  get loginInput() {
    return $('#username');
  }

  get passwordInput() {
    return $('#password');
  }

  get emailInput() {
    return $('#email');
  }

  get submitButton() {
    return $(
      '//div[not(contains(@class,\'ulp-button-bar-hidden\'))]/button[@name="action"]'
    );
  }

  get registerButton() {
    return $('//a[text()="Sign up"]');
  }

  get googleLoginButton() {
    return $('//button[@data-provider="google"]');
  }

  get acceptRegister() {
    return $('//button[@value="accept"]');
  }

  async login(username, password) {
    await this.loginInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async register(username, password) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }

  async clickAcceptRegister() {
    await this.acceptRegister.waitForDisplayed();
    await this.acceptRegister.click();
  }

  async clickContinueWithGoogle() {
    await this.googleLoginButton.waitForDisplayed();
    await this.googleLoginButton.click();
  }
}

module.exports = new LoginPage();
