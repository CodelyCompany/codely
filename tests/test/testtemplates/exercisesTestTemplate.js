const MainPage = require('../pageobjects/main.page');
const {
  loginAdmin,
  createExercise,
  acceptExercise,
  openExercise,
  solveAndCheckExercise,
} = require('./helpFunctions');
module.exports = (language) => {
  const exercisesData =
    require(`../testdata/exercises/exercises${language}.json`).exercises;
  describe(`Exercises Test - ${language}`, () => {
    loginAdmin();

    for (const exercise of exercisesData) {
      createExercise(exercise);
    }

    it('Should open administrator page', async () => {
      await MainPage.goToAdminPage();
    });

    for (const exercise of exercisesData) {
      acceptExercise(exercise);
    }

    for (const exercise of exercisesData) {
      openExercise(exercise);
      solveAndCheckExercise(exercise);
    }
  });
};
