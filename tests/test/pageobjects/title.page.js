const Page = require('./page');

class TitlePage extends Page {
  get loginButton() {
    return $('//p[text()="ZALOGUJ"]');
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new TitlePage();
