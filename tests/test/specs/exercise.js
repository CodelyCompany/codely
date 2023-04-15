const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
require('dotenv').config();

const bashExerciseData = {
  title: 'Substraction two numbers',
  description: 'test description',
  difficult: '3',
  language: 'Bash',
  functionName: 'sub',
  argumentsQuantity: '2',
  argumentNames: ['a', 'b'],
  testsQuantity: '3',
  inputValues: [
    ['3', '1'],
    ['6', '3'],
    ['2', '2'],
  ],
  outputValues: ['2', '3', '0'],
  hintsQuantity: '2',
  hints: ['hint 1', 'hint 2'],
  exampleSolution: 'sub () {\necho $(($1 - $2))',
};
const rExerciseData = {
  title: 'Multiply two numbers',
  description: 'test description',
  difficult: '4',
  language: 'R',
  functionName: 'multiply',
  argumentsQuantity: '2',
  argumentNames: ['x', 'y'],
  argumentTypes: ['int', 'int'],
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
  exampleSolution: 'multiply <- function(x,y){\nreturn(x*y)',
};
const randomLogin =
  'testusercodelycomment' + new Date().toLocaleString().replace(/[/:\s,]/g, '');
const randomEmail = randomLogin + '@gmail.example.com';
const data = process.env;

const checkExerciseData = async (exercise) => {
  expect(await ExercisePage.exerciseTitle.getText()).toBe(exercise.title);
  expect(await ExercisePage.authorInfo.getText()).toBe(exercise.author);
  expect(await ExercisePage.languageInfo.getText()).toBe(exercise.language);
  expect(await ExercisePage.difficultyInfo.length).toBe(exercise.difficulty);
  expect(await ExercisePage.descriptionInfo.getText()).toBe(
    exercise.description
  );
  expect(await ExercisePage.ratingInfo.length).toBe(exercise.rating);
};

const solveAndCheckExercise = async (exercise) => {
  await ExercisePage.solveExercise(exercise.exampleSolution);
  expect(await ExercisePage.getSnackbarResult()).toBe(true);
  expect(
    parseInt((await ExercisePage.testsResult.getText()).split('/')[0]) ===
      parseInt(exercise.testsQuantity)
  ).toBe(true);
};
describe('Exercise Test', () => {
  it('Should login with valid credentials - admin', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should add exercise Substraction two numbers - Bash', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.addExercise(bashExerciseData);
  });

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  it('Should accept exercise Substraction two numbers - Bash', async () => {
    await AdminPage.acceptExercise('Substraction two numbers - Bash');
    expect(
      await $(
        '//div[@id="checked-exercises-table-container"]//div[text()="Substraction two numbers - Bash"]'
      )
    ).toBeDisplayed();
  });

  it('Should open created exercise', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.searchExercise('Substraction two numbers - Bash');
    await ExercisesPage.clickExercise('Substraction two numbers - Bash');
    await ExercisePage.exerciseTitle.waitForDisplayed();
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
  });

  it('Should exercise has valid data', async () => {
    expect(await ExercisePage.exerciseTitle.getText()).toBe(
      'Substraction two numbers - Bash'
    );
    expect(await ExercisePage.authorInfo.getText()).toBe('admin');
    expect(await ExercisePage.languageInfo.getText()).toBe('Bash');
    expect(await ExercisePage.difficultyInfo.length).toBe(3);
    expect(await ExercisePage.descriptionInfo.getText()).toBe(
      bashExerciseData.description
    );
    expect(await ExercisePage.ratingInfo.length).toBe(0);
  });

  it('Should exercise has valid hints', async () => {
    await ExercisePage.helpIcon.click();
    await ExercisePage.hintText.waitForDisplayed();
    expect(await ExercisePage.hintText.getText()).toBe(
      bashExerciseData.hints[0]
    );
    await ExercisePage.nextHintButton.click();
    await ExercisePage.hintText.waitForDisplayed();
    expect(await ExercisePage.hintText.getText()).toBe(
      bashExerciseData.hints[1]
    );
    await ExercisePage.nextHintButton.click();
  });

  it('Should edit exercise data', async () => {
    await ExercisePage.editButton.waitForDisplayed();
    await ExercisePage.editButton.click();
    await ExerciseFormPage.addExercise(rExerciseData);
  });

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  it('Should accept edited exercise Multiply two numbers - R', async () => {
    await AdminPage.acceptExercise('Multiply two numbers - R');
    expect(
      await $(
        '//div[@id="checked-exercises-table-container"]//div[text()="Multiply two numbers - R"]'
      )
    ).toBeDisplayed();
  });

  it('Should exercise has edited data', async () => {
    await AdminPage.clickExercise('Multiply two numbers - R');
    await checkExerciseData({
      title: 'Multiply two numbers - R',
      author: 'admin',
      language: rExerciseData.language,
      difficulty: 4,
      description: rExerciseData.description,
      rating: 0,
    });
  });

  it('Should run code without args - fail', async () => {
    await ExercisePage.runCode([], 'multiply <- function(x,y){\nreturn(x*y)');
    expect(await ExercisePage.getResultCodeField()).toBe(
      'Error in multiply(, ) : argument "x" is missing, with no default\n' +
        'Calls: cat -> multiply\n' +
        'Execution halted'
    );
    expect(await ExercisePage.getSnackbarResult()).toBe(false);
  });

  it('Should run code - fail', async () => {
    await ExercisePage.runCode([2, 7], 'multiply <- function(x,y){\nren(x*y)');
    expect(await ExercisePage.getResultCodeField()).toBe(
      'Error in ren(x * y) : could not find function "ren"\n' +
        'Calls: cat -> multiply\n' +
        'Execution halted'
    );
    expect(await ExercisePage.getSnackbarResult()).toBe(false);
  });

  it('Should run code - success', async () => {
    await ExercisePage.runCode([2, 7], rExerciseData.exampleSolution);
    expect(await ExercisePage.getResultCodeField()).toBe('14');
    expect(await ExercisePage.getSnackbarResult()).toBe(true);
  });

  it('Should not be allowed to add comment', async () => {
    expect(await ExercisePage.reviewInfo).toBeDisplayed();
  });

  it('Should solve exercise', async () => {
    await solveAndCheckExercise(rExerciseData);
  });

  it('Should add comment', async () => {
    await ExercisePage.addComment('New test comment', 2);
    expect(await ExercisePage.commentField).toBeDisplayed();
    expect(await ExercisePage.userCommentAuthor.getText()).toBe('admin');
    expect(await ExercisePage.userCommentText.getText()).toBe(
      'New test comment'
    );
    expect(await ExercisePage.userCommentRating.length).toBe(3);
  });

  it('Should logout admin', async () => {
    await MainPage.logoutAdmin();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });

  it('Should register and login new user', async () => {
    await TitlePage.clickLoginButton();
    await LoginPage.clickRegister();
    await LoginPage.register(randomEmail, data.USER_PASSWORD);
    await LoginPage.clickAcceptRegister();
    expect(await MainPage.getUsernameInfo()).toBe(randomLogin);
  });

  it('Should open exercise Multiply two numbers - R', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.searchExercise('Multiply two numbers - R');
    await ExercisesPage.clickExercise('Multiply two numbers - R');
    await checkExerciseData({
      title: 'Multiply two numbers - R',
      author: 'admin',
      language: rExerciseData.language,
      difficulty: 4,
      description: rExerciseData.description,
      rating: 3,
    });
  });

  it('Should solve exercise Multiply two numbers - R', async () => {
    await solveAndCheckExercise(rExerciseData);
  });

  it('Should exercise has admin comment', async () => {
    const commentData = await ExercisePage.getCommentDataByIndex('0');
    expect(commentData.author).toBe('admin');
    expect(commentData.content).toBe('New test comment');
    expect(commentData.rating).toBe(3);
    expect(commentData.votes).toBe(0);
  });

  it('Should change like amount', async () => {
    const commentId = '0';
    await ExercisePage.likeComment(commentId);
    expect(await ExercisePage.getCommentLikes(commentId)).toBe(1);
    await ExercisePage.dislikeComment(commentId);
    expect(await ExercisePage.getCommentLikes(commentId)).toBe(-1);
    await ExercisePage.dislikeComment(commentId);
    expect(await ExercisePage.getCommentLikes(commentId)).toBe(0);
    await ExercisePage.dislikeComment(commentId);
    expect(await ExercisePage.getCommentLikes(commentId)).toBe(-1);
  });

  it('Should add normal user comment', async () => {
    await ExercisePage.addComment('Normal user comment', 1);
    expect(await ExercisePage.commentField).toBeDisplayed();
    expect(await ExercisePage.userCommentAuthor.getText()).toBe(randomLogin);
    expect(await ExercisePage.userCommentText.getText()).toBe(
      'Normal user comment'
    );
    expect(await ExercisePage.userCommentRating.length).toBe(2);
  });

  it('Should logout normal user', async () => {
    await MainPage.logout();
    expect(await TitlePage.loginButton).toBeDisplayed();
  });

  it('Should login admin', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open exercise Multiply two numbers - R', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.searchExercise('Multiply two numbers - R');
    await ExercisesPage.clickExercise('Multiply two numbers - R');
    await checkExerciseData({
      title: 'Multiply two numbers - R',
      author: 'admin',
      language: rExerciseData.language,
      difficulty: 4,
      description: rExerciseData.description,
      rating: 3,
    });
  });

  it('Should comment has valid votes number', async () => {
    expect(parseInt(await ExercisePage.userCommentVotes.getText())).toBe(-1);
  });

  it('Should exercise has normal user comment', async () => {
    const commentData = await ExercisePage.getCommentDataByIndex('0');
    expect(commentData.author).toBe(randomLogin);
    expect(commentData.content).toBe('Normal user comment');
    expect(commentData.rating).toBe(2);
    expect(commentData.votes).toBe(0);
  });

  it('Should edit comment', async () => {
    await ExercisePage.editCommentButton.click();
    await ExercisePage.editComment('Edited comment', 4);
    expect(await ExercisePage.userCommentAuthor.getText()).toBe('admin');
    expect(await ExercisePage.userCommentText.getText()).toBe('Edited comment');
    expect(await ExercisePage.userCommentRating.length).toBe(5);
  });

  it('Should delete exercise Multiply two numbers - R', async () => {
    await ExercisePage.deleteExercise();
    await ExercisesPage.snackbar.waitForDisplayed();
    await ExercisesPage.searchExercise('Multiply two numbers - R');
    expect(
      await $('//h4[text()="Multiply two numbers - R"]')
    ).not.toBeDisplayed();
  });
});
