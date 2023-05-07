const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const {
  generateRandomUserData,
  solveAndCheckExercise,
  loginAdmin,
  checkExerciseData,
} = require('../testtemplates/helpFunctions.js');
const {
  createExercise,
  acceptExercise,
  registerAndLoginUser,
  openExercise,
  logoutUser,
  logoutAdmin,
} = require('../testtemplates/helpFunctions');
require('dotenv').config();

const bashExerciseData = {
  title: 'Substraction two numbers',
  author: 'admin',
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
  author: 'admin',
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
  exampleSolution: 'multiply <- function(x,y){\nreturn(x*',
};
const { login: randomLogin, email: randomEmail } = generateRandomUserData();
const data = process.env;

describe('Exercise Test', () => {
  loginAdmin();

  createExercise(bashExerciseData);

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  acceptExercise(bashExerciseData);

  openExercise(bashExerciseData);

  checkExerciseData(bashExerciseData);

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

  acceptExercise(rExerciseData);

  openExercise(rExerciseData);

  checkExerciseData({
    title: 'Multiply two numbers',
    author: 'admin',
    language: rExerciseData.language,
    difficult: '4',
    description: rExerciseData.description,
    rating: '0',
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

  solveAndCheckExercise(rExerciseData);

  it('Should add comment', async () => {
    await ExercisePage.addComment('New test comment', 2);
    expect(await ExercisePage.commentField).toBeDisplayed();
    expect(await ExercisePage.userCommentAuthor.getText()).toBe('admin');
    expect(await ExercisePage.userCommentText.getText()).toBe(
      'New test comment'
    );
    expect(await ExercisePage.userCommentRating.length).toBe(3);
  });

  logoutAdmin();

  registerAndLoginUser(randomLogin, randomEmail, data.USER_PASSWORD);

  openExercise(rExerciseData);

  solveAndCheckExercise(rExerciseData);

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

  logoutUser();

  loginAdmin();

  openExercise(rExerciseData);

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
