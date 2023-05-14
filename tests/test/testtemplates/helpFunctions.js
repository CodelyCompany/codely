const ExercisePage = require('../pageobjects/exercise.page');
const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const AdminPage = require('../pageobjects/admin.page');
require('dotenv').config();

const generateRandomUserData = () => {
  const login =
    'testusercodelycomment' +
    new Date().toLocaleString().replace(/[/:\s,]/g, '');
  return {
    login,
    email: login + '@gmail.example.com',
    password: process.env.USER_PASSWORD,
  };
};

const solveAndCheckExercise = async (exercise) => {
  it(`Should solve exercise ${exercise.title} - ${exercise.language}`, async () => {
    await ExercisePage.solveExercise(exercise.exampleSolution);
    expect(await ExercisePage.getSnackbarResult()).toBe(true);
    expect(
      parseInt((await ExercisePage.testsResult.getText()).split('/')[0]) ===
        parseInt(exercise.testsQuantity)
    ).toBe(true);
  });
};

const loginAdmin = () => {
  it('Should login with valid credentials - Admin', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login(process.env.ADMIN_LOGIN, process.env.ADMIN_PASSWORD);
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });
};

const registerAndLoginUser = async (login, email, password) => {
  it(`Should register and login new user - ${login}`, async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.clickRegister();
    await LoginPage.register(email, password);
    await LoginPage.clickAcceptRegister();
    expect(await MainPage.getUsernameInfo()).toBe(login);
  });
};

const logoutUser = () => {
  it('Should logout normal user', async () => {
    await MainPage.logout();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });
};

const logoutAdmin = () => {
  it('Should logout admin', async () => {
    await MainPage.logoutAdmin();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });
};

const checkExerciseData = async (exercise) => {
  it(`Should exercise ${exercise.title} - ${exercise.language} has valid data`, async () => {
    expect(await ExercisePage.exerciseTitle.getText()).toBe(
      `${exercise.title} - ${exercise.language}`
    );
    expect(await ExercisePage.authorInfo.getText()).toBe(exercise.author);
    expect(await ExercisePage.languageInfo.getText()).toBe(exercise.language);
    expect((await ExercisePage.difficultyInfo.length).toString()).toBe(
      exercise.difficult
    );
    expect(await ExercisePage.descriptionInfo.getText()).toBe(
      exercise.description
    );
    exercise.rating
      ? expect((await ExercisePage.ratingInfo.length).toString()).toBe(
          exercise.rating
        )
      : null;
  });
};

const openExercise = async (exercise) => {
  it(`Should open exercise ${exercise.title} - ${exercise.language}`, async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.searchExercise(
      `${exercise.title} - ${exercise.language}`
    );
    await ExercisesPage.clickExercise(
      `${exercise.title} - ${exercise.language}`
    );
    await ExercisePage.exerciseTitle.waitForDisplayed();
    expect(await ExercisePage.exerciseTitle.getText()).toBe(
      `${exercise.title} - ${exercise.language}`
    );
  });
};

const createExercise = async (exercise) => {
  it(`Should add exercise ${exercise.title} - ${exercise.language}`, async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.completeExerciseForm(exercise);
  });
};

const acceptExercise = async (exercise) => {
  it(`Should accept exercise ${exercise.title} - ${exercise.language}`, async () => {
    await AdminPage.acceptExercise(`${exercise.title} - ${exercise.language}`);
    expect(
      await $(
        `//div[@id="checked-exercises-table-container"]//div[text()="${exercise.title} - ${exercise.language}"]`
      )
    ).toBeDisplayed();
  });
};

module.exports = {
  generateRandomUserData,
  solveAndCheckExercise,
  loginAdmin,
  checkExerciseData,
  openExercise,
  createExercise,
  acceptExercise,
  logoutUser,
  logoutAdmin,
  registerAndLoginUser,
};
