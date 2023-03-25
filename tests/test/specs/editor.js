// const TitlePage = require('../pageobjects/title.page');
// const LoginPage = require('../pageobjects/login.page');
// const MainPage = require('../pageobjects/main.page');
// const EditorPage = require('../pageobjects/editor.page.js');
//
// const runCode = async (code, successful, expectedResult = null) => {
//   await EditorPage.inputCode(code);
//   await EditorPage.clickLaunchCode();
//   expectedResult && expect(await EditorPage.getResult()).toBe(expectedResult);
//   expect(await EditorPage.getSnackbarResult()).toBe(successful);
// };
//
// describe('Editor Test', () => {
//   it('Should login with valid credentials', async () => {
//     await TitlePage.open();
//     await TitlePage.clickLoginButton();
//     await LoginPage.login('admin@example.com', 'AdminAdmin123');
//     expect(await MainPage.getUsernameInfo()).toBe('admin');
//   });
//
//   it('Should open editor', async () => {
//     await MainPage.clickEditorButton();
//     expect((await driver.getUrl()).slice(-7)).toBe('/editor');
//   });
//
//   it('Should run code successful python', async () => {
//     await EditorPage.selectPythonLanguage();
//     await runCode('print("LOL")', true, 'LOL');
//   });
//
//   it('Should run code successful javascript multiline', async () => {
//     await EditorPage.selectJavascriptLanguage();
//     await runCode(
//       'console.log("TEST");\nconsole.log("LINE");',
//       true,
//       'TEST\nLINE'
//     );
//   });
//
//   it('Should fail javascript', async () => {
//     await runCode('console.log())', false);
//   });
//
//   it('Should run code successful, without text to check', async () => {
//     await runCode('console.log("T")', true);
//   });
// });
