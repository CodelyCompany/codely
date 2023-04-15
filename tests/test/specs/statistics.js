const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const StatisticsPage = require('../pageobjects/statistics.page');
require('dotenv').config();

const cExerciseData = {
  title: 'Substraction two numbers',
  description: 'test description',
  difficult: '3',
  language: 'C',
  functionName: 'sub',
  argumentsQuantity: '2',
  argumentTypes: ['int', 'int'],
  argumentNames: ['a', 'b'],
  outputType: 'int',
  testsQuantity: '3',
  inputValues: [
    ['3', '1'],
    ['6', '3'],
    ['2', '2'],
  ],
  outputValues: ['2', '3', '0'],
  hintsQuantity: '2',
  hints: ['hint 1', 'hint 2'],
  exampleSolution:
    '#include <stdio.h>\n  \nint sub(int a, int b) {\n    printf("%d", a-b);\n}',
};
const javascriptExerciseData = {
  title: 'Multiply two numbers',
  description: 'test description',
  difficult: '4',
  language: 'JavaScript',
  functionName: 'multiply',
  argumentsQuantity: '2',
  argumentNames: ['x', 'y'],
  outputType: 'int',
  testsQuantity: '3',
  inputValues: [
    ['2', '3'],
    ['1', '1'],
    ['3', '3'],
  ],
  outputValues: ['6', '1', '9'],
  hintsQuantity: '2',
  hints: ['hint 1 - new', 'hint 2 - new'],
  exampleSolution: 'const multiply=(x,y)=>{\nreturn x*y',
};

const randomLogin =
  'testusercodelycomment' + new Date().toLocaleString().replace(/[/:\s,]/g, '');
const randomEmail = randomLogin + '@gmail.example.com';
const data = process.env;

const solveAndCheckExercise = async (exercise) => {
  await ExercisePage.solveExercise(exercise.exampleSolution);
  expect(await ExercisePage.getSnackbarResult()).toBe(true);
  expect(
    parseInt((await ExercisePage.testsResult.getText()).split('/')[0]) ===
      parseInt(exercise.testsQuantity)
  ).toBe(true);
};

describe('Statisitcs Test', () => {
  it('Should register and login new user', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.clickRegister();
    await LoginPage.register(randomEmail, data.USER_PASSWORD);
    await LoginPage.clickAcceptRegister();
    expect(await MainPage.getUsernameInfo()).toBe(randomLogin);
  });

  it('Should not have any stats', async () => {
    const statsData = await StatisticsPage.getStatisticsInfo();
    const expectedTexts =
      (await MainPage.getNavTexts()).editorButton === 'EDYTOR'
        ? {
            solved: 'Nie rozwiązałeś żadnych zadań',
            exercise: 'Nie przygotowałeś żadnych zadań',
            pending: 'Nie masz żadnych zadań oczekujących na zatwierdzenie',
            reviews: 'Nie napisałeś żadnych recenzji',
            versus: 'Nie rozegrałeś żadnego trybu versus',
          }
        : {
            solved: "You didn't finish any exercises",
            exercise: "You didn't prepare any exercises",
            pending: "You don't have any exercises waiting for approval",
            reviews: "You didn't write any reviews",
            versus: "You didn't play any versuses",
          };
    expect(statsData.solvedExercises).toBe(expectedTexts.solved);
    expect(statsData.preparedExercises).toBe(expectedTexts.exercise);
    expect(statsData.pendingExercises).toBe(expectedTexts.pending);
    expect(statsData.writtenReviews).toBe(expectedTexts.reviews);
    expect(statsData.playedVersus).toBe(expectedTexts.versus);
  });

  it('Should add exercise Substraction two numbers - C', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.addExercise(cExerciseData);
  });

  it('Should add exercise Multiply two numbers - JavaScript', async () => {
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.addExercise(javascriptExerciseData);
  });

  it('Should logout user', async () => {
    await MainPage.logout();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });

  it('Should login with valid credentials - admin', async () => {
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  it('Should accept exercise Substraction two numbers - C', async () => {
    await AdminPage.acceptExercise('Substraction two numbers - C');
    expect(
      await $(
        '//div[@id="checked-exercises-table-container"]//div[text()="Substraction two numbers - C"]'
      )
    ).toBeDisplayed();
  });

  it('Should logout admin', async () => {
    await MainPage.logoutAdmin();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });

  it('Should login user', async () => {
    await TitlePage.clickLoginButton();
    await LoginPage.login(randomEmail, data.USER_PASSWORD);
    expect(await MainPage.getUsernameInfo()).toBe(randomLogin);
  });

  it('Should open created exercise', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.searchExercise('Substraction two numbers - C');
    await ExercisesPage.clickExercise('Substraction two numbers - C');
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
  });

  it('Should solve exercise Substraction two numbers - C', async () => {
    await solveAndCheckExercise(cExerciseData);
  });

  it('Should add comment', async () => {
    await ExercisePage.addComment('Test comment stats', 2);
    expect(await ExercisePage.commentField).toBeDisplayed();
    expect(await ExercisePage.userCommentAuthor.getText()).toBe(randomLogin);
    expect(await ExercisePage.userCommentText.getText()).toBe(
      'Test comment stats'
    );
    expect(await ExercisePage.userCommentRating.length).toBe(3);
  });

  it('Should open statistics page', async () => {
    await MainPage.goToStatisticsPage();
    expect(await MainPage.getUsernameInfo()).toBe(randomLogin);
  });

  it('Should have valid stats', async () => {
    const expectedPendingExerciseText =
      (await (await MainPage.getNavTexts()).editorButton) === 'EDYTOR'
        ? 'Zadania czekające na potwierdzenie administratora: 1'
        : 'Exercises waiting for admin approval: 1';
    expect(
      await StatisticsPage.getDoneExercises('Substraction two numbers - C')
    ).toBeDisplayed();
    expect(
      await StatisticsPage.getPreparedExercises('Substraction two numbers - C')
    ).toBeDisplayed();
    expect(await StatisticsPage.getPendingExercisesInfo()).toBe(
      expectedPendingExerciseText
    );
    expect(
      await StatisticsPage.getWrittenReview('Substraction two numbers - C')
    ).toBeDisplayed();
  });

  it('Should open done exercise', async () => {
    await (
      await StatisticsPage.getDoneExercises('Substraction two numbers - C')
    ).click();
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
    await browser.back();
  });

  it('Should open prepared exercise', async () => {
    await (
      await StatisticsPage.getPreparedExercises('Substraction two numbers - C')
    ).click();
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
    await browser.back();
  });

  it('Should open exercise with written comment', async () => {
    await (
      await StatisticsPage.getWrittenReview('Substraction two numbers - C')
    ).click();
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
    await browser.back();
  });
});
