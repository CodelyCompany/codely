const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const pythonExerciseData = {
  title: 'Substraction two numbers',
  description: 'test description',
  difficult: '3',
  language: 'Python',
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
  exampleSolution: 'def sub(a,b):\n return a-b',
};
const cppExerciseData = {
  title: 'Multiply two numbers',
  description: 'test description',
  difficult: '4',
  language: 'C++',
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
  exampleSolution:
    '#include <iostream>\nusing namespace std;\n          \nint multiply(int x, int y) {\n    return x*y;\n}',
};
describe('Admin Page Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should add two exercises', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.createExerciseButton.waitForDisplayed();
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.inputTitle.waitForDisplayed();
    await ExerciseFormPage.addExercise(pythonExerciseData);
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.addExercise(cppExerciseData);
  });

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  it('Should accept exercise Substraction two numbers - Python', async () => {
    await AdminPage.acceptExercise('Substraction two numbers - Python');
    expect(
      await $(
        '//div[@id="checked-exercises-table-container"]//div[text()="Substraction two numbers - Python"]'
      )
    ).toBeDisplayed();
  });

  it('Should open exercise Substraction two numbers - Python', async () => {
    await AdminPage.clickExercise('Substraction two numbers - Python');
    expect(await ExercisePage.exerciseTitle).toBeDisplayed();
    expect(await ExercisePage.exerciseTitle.getText()).toBe(
      'Substraction two numbers - Python'
    );
  });

  it('Should delete exercise Substraction two numbers - Python', async () => {
    await ExercisePage.deleteButton.waitForDisplayed();
    await ExercisePage.deleteButton.click();
    await ExercisePage.confirmDeleteButton.waitForDisplayed();
    await ExercisePage.confirmDeleteButton.click();
  });

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  it('Should abort exercise Multiply two numbers - C++', async () => {
    await AdminPage.exercisesToCheckTable.waitForDisplayed();
    await AdminPage.abortExercise('Multiply two numbers - C++');
    expect(
      await $('//div[text()="Multiply two numbers - C++"]')
    ).not.toBeDisplayed();
  });
});
