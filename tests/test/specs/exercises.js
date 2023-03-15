const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page.js');
const exercisesData = require('../testdata/exercises.json').exercises;

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

  /*
  Pisząc te testy w pliku exercise.json, należy pamiętać, że przykładowe rozwiązanie trzeba wpisać tak
  jakby się wpisywało je w edytor ręcznie np. klamry {} samę utworzą po wciśnięciu enter (tzn po
  znaku \n). Przykładowo po wpisaniu w przykładowym rozwiązaniu:
  {\n
  Automatycznie w edytorze utworzy się takie coś:
  {

  }
   */

  for (const exercise of exercisesData) {
    it(`Should add exercise - ${exercise.title} - ${exercise.language}`, async () => {
      await ExerciseFormPage.addExercise(exercise);
      // await ExercisesPage.searchExercise(exercise.title);
      await ExercisesPage.clickCreateExerciseButton();
      await ExerciseFormPage.inputTitle.waitForDisplayed();
      expect(await ExerciseFormPage.inputTitle).toBeDisplayed();
    });
  }
});
