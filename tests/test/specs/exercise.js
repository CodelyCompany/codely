const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
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

describe('Admin Page Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should add exercise Substraction two numbers - Bash', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.createExerciseButton.waitForDisplayed();
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.inputTitle.waitForDisplayed();
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

  it('Should exercise have valid data', async () => {
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

  it('Should exercise have valid hints', async () => {
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

  it('Should exercise have edited data', async () => {
    await AdminPage.clickExercise('Multiply two numbers - R');
    expect(await ExercisePage.exerciseTitle.getText()).toBe(
      'Multiply two numbers - R'
    );
    expect(await ExercisePage.authorInfo.getText()).toBe('admin');
    expect(await ExercisePage.languageInfo.getText()).toBe('R');
    expect(await ExercisePage.difficultyInfo.length).toBe(4);
    expect(await ExercisePage.descriptionInfo.getText()).toBe(
      rExerciseData.description
    );
    expect(await ExercisePage.ratingInfo.length).toBe(0);
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
    await ExercisePage.solveExercise(rExerciseData.exampleSolution);
    expect(await ExercisePage.getSnackbarResult()).toBe(true);
    expect(
      parseInt((await ExercisePage.testsResult.getText()).split('/')[0]) ===
        parseInt(rExerciseData.testsQuantity)
    ).toBe(true);
  });

  // it('Should add comment ', async () => {
  //   await ExercisePage.addComment('New test comment', 4);
  //   expect(await ExercisePage.commentField).toBeDisplayed();
  //   expect(await ExercisePage.userCommentAuthor.getText()).toBe('admin');
  //   expect(await ExercisePage.userCommentText.getText()).toBe(
  //     'New test comment'
  //   );
  //   expect(await ExercisePage.userCommentRating.length).toBe(4);
  // });

  // TODO - dodaj id do komentarzy i kontynuuj testowanie, testnij hintsy
});
