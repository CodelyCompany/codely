const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const EditorPage = require('../pageobjects/editor.page.js');

const runCode = async (code, expectedResult) => {
  await EditorPage.inputCode(code);
  await EditorPage.clickLaunchCode();
  expect(await EditorPage.getResult()).toBe(expectedResult);
};

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
    await runCode('print("LOL")', 'LOL');
  });

  it('Should run code 2', async () => {
    await EditorPage.selectJavascriptLanguage();
    await runCode('console.log("TEST");\nconsole.log("LINE");', 'TEST\nLINE');
  });
});
