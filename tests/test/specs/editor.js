const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const EditorPage = require('../pageobjects/editor.page.js');
// const { Builder, By, Key, until } = require('selenium-webdriver')
const { key } = require('webdriverio');

describe('Editor Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open editor', async () => {
    await MainPage.clickEditorButton();
    expect((await driver.getUrl()).slice(-7)).toBe('/editor');
  });

  it('Should run code', async () => {
    await EditorPage.selectPythonLanguage();
    // {
    //   const element = await driver.findElement(By.css(".MuiButton-outlined"))
    //   await driver.actions({ bridge: true }).moveToElement(element).perform()
    // }
    // await driver.moveToElement($('.MuiButton-outlined'))
    // await $('.view-lines').click()
    // await browser.execute('window.scrollTo(0,0)');

    await EditorPage.inputCode('print("LOL")');
    await EditorPage.clickLaunchCode();
    expect(await EditorPage.getResult()).toBe('LOL');
  });
});
