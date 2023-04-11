const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const PersonalizationPage = require('../pageobjects/personalization.page.js');

describe('Exercises Form Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open personalization tab', async () => {
    await MainPage.goToPersonalizationPage();
    expect(await PersonalizationPage.setLanguageHeader).toBeDisplayed();
  });

  it('Should change theme to blue and white', async () => {
    await PersonalizationPage.whiteBlueThemeButton.click();
    const pageColours = await PersonalizationPage.getPageColours();
    expect(await pageColours.bodyColor).toBe('rgb(25,118,210)');
    expect(await pageColours.bodyBackground).toBe('rgba(0,0,0,0)'); // no color
    expect(await pageColours.setLanguageHeader).toBe('rgb(25,118,210)');
    expect(await pageColours.pickPhotoButtonFont).toBe('rgb(255,255,255)');
    expect(await pageColours.pagesContainerColor).toBe('rgb(255,255,255)');
  });

  it('Should change theme to black and magenta', async () => {
    await PersonalizationPage.blackMagentaThemeButton.click();
    const pageColours = await PersonalizationPage.getPageColours();
    expect(await pageColours.bodyColor).toBe('rgb(154,33,80)');
    expect(await pageColours.bodyBackground).toBe('rgb(25,25,25)'); // gray color
    expect(await pageColours.setLanguageHeader).toBe('rgb(154,33,80)');
    expect(await pageColours.pickPhotoButtonFont).toBe('rgb(255,255,255)');
    expect(await pageColours.pagesContainerColor).toBe('rgb(255,255,255)');
  });

  it('Should change theme to white and magenta', async () => {
    await PersonalizationPage.whiteMagentaThemeButton.click();
    const pageColours = await PersonalizationPage.getPageColours();
    expect(await pageColours.bodyColor).toBe('rgb(0,0,0)');
    expect(await pageColours.bodyBackground).toBe('rgba(0,0,0,0)'); // no color
    expect(await pageColours.setLanguageHeader).toBe('rgb(154,33,80)');
    expect(await pageColours.pickPhotoButtonFont).toBe('rgb(255,255,255)');
    expect(await pageColours.pagesContainerColor).toBe('rgb(255,255,255)');
  });
});
