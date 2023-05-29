class StatisticsPage {
  get statisticsInfo() {
    return $$('//div[@class="user-section-wrapper MuiBox-root css-qe3hii"]/h6');
  }

  async getStatisticsInfo() {
    await this.statisticsInfo[0].waitForDisplayed();
    return {
      solvedExercises: await this.statisticsInfo[0].getText(),
      preparedExercises: await this.statisticsInfo[1].getText(),
      pendingExercises: await this.statisticsInfo[2].getText(),
      writtenReviews: await this.statisticsInfo[3].getText(),
      playedVersus: await this.statisticsInfo[4].getText(),
    };
  }

  async getDoneExercises(exerciseTitle) {
    return await $(`//div[@id="done"]//span/div[text()="${exerciseTitle}"]`);
  }

  async getPreparedExercises(exerciseTitle) {
    return await $(
      `//div[@id="prepared"]//span/div[text()="${exerciseTitle}"]`
    );
  }

  async getPendingExercisesInfo() {
    return await this.statisticsInfo[0].getText();
  }

  async getWrittenReview(exerciseTitle) {
    return await $(
      `//div[@id="written-reviews"]//span[text()="${exerciseTitle}"]`
    );
  }
}

module.exports = new StatisticsPage();
