const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const { logoutUser, logoutAdmin } = require('../testtemplates/helpFunctions');
require('dotenv').config();

const randomLogin =
  'testusercodely' +
  new Date()
    .toLocaleString()
    .replace(/[/:\s,]/g, '')
    .toLowerCase();
const randomEmail = randomLogin + '@gmail.example.com';
const data = process.env;

describe('Login Test', () => {
  it('Should not login without credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('', '');
    expect(await browser.getTitle()).toBe('Log in | Codely-Frontend');
  });

  it('Should not login with only login', async () => {
    await LoginPage.login(data.ADMIN_LOGIN, '');
    expect(await browser.getTitle()).toBe('Log in | Codely-Frontend');
  });

  it('Should not login with only password', async () => {
    await LoginPage.login('', data.ADMIN_PASSWORD);
    expect(await browser.getTitle()).toBe('Log in | Codely-Frontend');
  });

  it('Should login with valid credentials', async () => {
    await LoginPage.login(data.ADMIN_LOGIN, data.ADMIN_PASSWORD);
    expect(await MainPage.getUsernameInfo()).toBe('admin');
    await MainPage.logout();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });

  logoutAdmin();

  it('Should not register without credentials', async () => {
    await TitlePage.clickLoginButton();
    await LoginPage.clickRegister();
    await LoginPage.register('', '');
    expect(await browser.getTitle()).toBe('Sign up | Codely-Frontend');
  });

  it('Should not register with only login', async () => {
    await LoginPage.register(randomEmail, '');
    expect(await browser.getTitle()).toBe('Sign up | Codely-Frontend');
  });

  it('Should not register with only password', async () => {
    await LoginPage.register('', data.USER_PASSWORD);
    expect(await browser.getTitle()).toBe('Sign up | Codely-Frontend');
  });

  it('Should register with valid credentials', async () => {
    await LoginPage.register(randomEmail, data.USER_PASSWORD);
    await LoginPage.clickAcceptRegister();
    expect(await MainPage.getUsernameInfo()).toBe(randomLogin);
  });

  logoutUser();

  it('Should login with valid credentials - created user', async () => {
    await TitlePage.clickLoginButton();
    await LoginPage.login(randomEmail, data.USER_PASSWORD);
    expect((await MainPage.getUsernameInfo()).toLowerCase()).toBe(randomLogin);
  });

  logoutUser();

  // Testy z logowaniem Google są niemożliwe, ponieważ strona Google wykrywa logowanie za pomocą Selenium i blokuje dostęp
});
