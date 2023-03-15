const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page.js');

describe('Exercises Test', () => {
  it('Should login with valid credentials', async () => {
    await TitlePage.open();
    await TitlePage.clickLoginButton();
    await LoginPage.login('admin@example.com', 'AdminAdmin123');
    expect(await MainPage.getUsernameInfo()).toBe('admin');
  });

  it('Should open exercise tab', async () => {
    await MainPage.clickExerciseButton();
    await ExercisesPage.createExerciseButton.waitForDisplayed();
    expect(await ExercisesPage.createExerciseButton).toBeDisplayed();
  });

  it('Should open exercise form', async () => {
    await ExercisesPage.clickCreateExerciseButton();
    await ExerciseFormPage.inputTitle.waitForDisplayed();
    expect(await ExerciseFormPage.inputTitle).toBeDisplayed();
  });

  it('Should add exercise', async () => {
    const exercise1 = {
      title: 'test title',
      description: 'test description',
      difficult: '3',
      language: 'JavaScript',
      functionName: 'sum',
      argumentsQuantity: '2',
      argumentNames: ['a', 'b'],
      testsQuantity: '3',
      inputValues: [
        ['1', '3'],
        ['4', '6'],
        ['2', '2'],
      ],
      outputValues: ['4', '10', '4'],
      hintsQuantity: '2',
      hints: ['hint 1', 'hint 2'],
      exampleSolution: 'const sum=(a,b)=>{\nreturn a+b \n',
    };
    await ExerciseFormPage.addExercise(exercise1);
    await ExercisesPage.searchExercise(exercise1.title);
  });
});
