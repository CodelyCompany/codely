const Page = require('./page');

class TitlePage extends Page {
  get loginButton() {
    return $(
      '//p[@class="MuiTypography-root MuiTypography-body1 css-bwf836-MuiTypography-root"]'
    );
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new TitlePage();
