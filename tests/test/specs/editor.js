const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const EditorPage = require('../pageobjects/editor.page.js');
const editorData = require('../testdata/editor.json');

const runCode = async (code, successful, expectedResult = null) => {
  await EditorPage.inputCode(code);
  await EditorPage.clickLaunchCode();
  expectedResult && expect(await EditorPage.getResult()).toBe(expectedResult);
  expect(await EditorPage.getSnackbarResult()).toBe(successful);
};

const languages = ['JavaScript', 'Python', 'Bash', 'C++', 'C', 'R', 'Java'];

describe('Editor Test - open editor', () => {
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
});

for (const language of languages) {
  describe(`Editor Test - ${language}`, async () => {
    for (const element of editorData[language]) {
      it(`${element.title} - ${language}`, async () => {
        if ((await EditorPage.languageSelector.getText()) !== language) {
          await EditorPage.selectLanguage(language);
        }
        await runCode(element.code, element.successful, element.expectedResult);
      });
    }
  });
}
