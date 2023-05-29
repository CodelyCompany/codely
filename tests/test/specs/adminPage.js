const MainPage = require('../pageobjects/main.page');
const AdminPage = require('../pageobjects/admin.page');
const ExercisePage = require('../pageobjects/exercise.page');
const {
  loginAdmin,
  createExercise,
  acceptExercise,
  openExercise,
} = require('../testtemplates/helpFunctions');
const pythonExerciseData = require('../testdata/exampleExercises.json')
  .exercises[0];
const cppExerciseData = require('../testdata/exampleExercises.json')
  .exercises[1];
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
