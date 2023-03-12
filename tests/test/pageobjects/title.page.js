const Page = require('./page');

class TitlePage extends Page {
  get loginButton() {
    return $('#login-typography');
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new TitlePage();
