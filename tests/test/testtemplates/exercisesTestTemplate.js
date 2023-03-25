const axios = require('axios');
const TitlePage = require('../pageobjects/title.page');
const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const ExercisesPage = require('../pageobjects/exercises.page');
const ExerciseFormPage = require('../pageobjects/exerciseForm.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
module.exports = (language) => {
  const exercisesData =
    require(`../testdata/exercises${language}.json`).exercises;
  axios
    .delete('http://localhost:5000/exercises/deleteAllExercises')
    .then((response) => {
      console.log(response.data.message);
    });
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
        await ExercisesPage.clickCreateExerciseButton();
        await ExerciseFormPage.inputTitle.waitForDisplayed();
        expect(await ExerciseFormPage.inputTitle).toBeDisplayed();
      });
    }

    it(`Should open administrator page`, async () => {
      await MainPage.goToAdminPage();
    });

    for (const exercise of exercisesData) {
      it(`Should accept exercise - ${exercise.title} - ${exercise.language}`, async () => {
        await AdminPage.exercisesToCheckTable.waitForDisplayed();
        await AdminPage.acceptExercise(
          `${exercise.title} - ${exercise.language}`
        );
        expect(
          await $(
            '//div[@id="checked-exercises-table-container"]//div[text()="${exercise.title} - ${exercise.language}"]'
          )
        ).toBeDisplayed();
      });
    }

    for (const exercise of exercisesData) {
      it('Should open exercise tab', async () => {
        await MainPage.clickExerciseButton();
        await ExercisesPage.createExerciseButton.waitForDisplayed();
        expect(await ExercisesPage.createExerciseButton).toBeDisplayed();
      });
      // TODO - z niewiadomego powodu strona nie dziala w przypadku zadan z jezykami C i C++
      it(`Should go to exercise - ${exercise.title} - ${exercise.language}`, async () => {
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
      it(`Should solve exercise - ${exercise.title} - ${exercise.language}`, async () => {
        await ExercisePage.solveExercise(exercise.exampleSolution);
        await ExercisePage.testsResult;
        expect(
          parseInt((await ExercisePage.testsResult.getText()).split('/')[0]) ===
            parseInt(exercise.testsQuantity)
        ).toBe(true);
      });
    }
  });
};
