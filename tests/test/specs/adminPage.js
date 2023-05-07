const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const {
  loginAdmin,
  createExercise,
  acceptExercise,
  openExercise,
} = require('../testtemplates/helpFunctions');
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
  loginAdmin();

  createExercise(pythonExerciseData);

  createExercise(cppExerciseData);

  it('Should open admin page', async () => {
    await MainPage.goToAdminPage();
    expect(await AdminPage.exercisesToCheckTable).toBeDisplayed();
  });

  acceptExercise(pythonExerciseData);

  openExercise(pythonExerciseData);

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
