class LoginPage {
  get loginInput() {
    return $('#username');
  }

  get passwordInput() {
    return $('#password');
  }

  get submitButton() {
    return $('//button[@name="action"]');
  }

  async login(username, password) {
    await this.loginInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }
}

module.exports = new LoginPage();
