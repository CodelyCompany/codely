const { Key } = require('webdriverio');

class ExercisePage {
  get exerciseTitle() {
    return $('#exercise-title');
  }

  get inputCodeField() {
    return $('[class="view-line"]');
  }

  get runButton() {
    return $$('//div[@id="run-buttons"]/button')[0];
  }

  get confirmButton() {
    return $$('//div[@id="run-buttons"]/button')[1];
  }

  get testsResult() {
    return $$('//div[@id="tests-wrapper"]//h6')[1];
  }

  get deleteButton() {
    return $$('//div[@id="manage-exercise"]/button')[0];
  }

  get editButton() {
    return $$('//div[@id="manage-exercise"]/button')[1];
  }

  get confirmDeleteButton() {
    return $$(
      '//div[@class="MuiDialogActions-root MuiDialogActions-spacing css-hlj6pa-MuiDialogActions-root"]/button'
    )[1];
  }

  get authorInfo() {
    return $('//div[@id="author"]/p');
  }

  get languageInfo() {
    return $('//div[@id="language"]/p');
  }

  get difficultyInfo() {
    return $$('//div[@id="difficulty"]/p/*[local-name() = \'svg\']');
  }

  get descriptionInfo() {
    return $('//div[@id="description"]/p');
  }

  get ratingInfo() {
    return $$('//div[@id="rating"]/p/*[local-name() = \'svg\']');
  }

  get reviewInfo() {
    return $('#review-no-access');
  }

  get outputField() {
    return $('#output-text-area');
  }

  get snackbar() {
    return $('.SnackbarContent-root');
  }

  get commentInput() {
    return $('#comment-input');
  }

  get addCommentButton() {
    return $('//div[@id="review"]//button');
  }

  get commentField() {
    return $('//div[@id="review"]//div[@class="MuiBox-root css-0"]');
  }

  get userCommentAuthor() {
    return $('#comment-author');
  }

  get userCommentRating() {
    return $$(
      '//span[@id="comment-rating"]//span[@class="MuiRating-icon MuiRating-iconFilled css-7qmtgc-MuiRating-icon"]'
    );
  }

  get userCommentText() {
    return $('#comment-text');
  }

  get userCommentVotes() {
    return $('#comment-votes');
  }

  get editCommentButton() {
    return $('#edit-button');
  }

  get helpIcon() {
    return $('#help-icon');
  }

  get hintText() {
    return $('#alert-dialog-description');
  }

  get nextHintButton() {
    return $$(
      '//div[@class="MuiDialogActions-root MuiDialogActions-spacing css-hlj6pa-MuiDialogActions-root"]//button'
    )[0];
  }

  get closeHintButton() {
    return $$(
      '//div[@class="MuiDialogActions-root MuiDialogActions-spacing css-hlj6pa-MuiDialogActions-root"]//button'
    )[1];
  }

  async solveExercise(solution) {
    await this.inputCodeField.waitForClickable();
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(solution);
    await this.confirmButton.click();
    await this.snackbar.waitForDisplayed();
  }

  async runCode(args, code) {
    await this.inputCodeField.waitForClickable();
    for (let i = 0; i < args.length; i++) {
      await $(`//input[@id="arg-${i}"]`).setValue(args[i]);
    }
    await this.inputCodeField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys(Key.Backspace);
    await browser.keys(code);
    await this.runButton.click();
  }

  async getResultCodeField() {
    await this.outputField.waitForDisplayed();
    return await this.outputField.getText();
  }

  async getSnackbarResult() {
    await this.snackbar.waitForDisplayed({ timeout: 16000 });
    const result = (await this.snackbar.getAttribute('class')).includes(
      'SnackbarItem-variantSuccess'
    );
    await this.snackbar.waitForDisplayed({ reverse: true });
    return result;
  }

  async addComment(comment, rate) {
    await this.commentInput.waitForDisplayed();
    await this.commentInput.setValue(comment);
    await $$('//span[@id="comment-rating"]//label')[rate].click();
    await this.addCommentButton.click();
  }

  async editComment(comment, rate) {
    await this.commentInput.waitForDisplayed();
    await this.commentInput.setValue(comment);
    await $$('//span[@id="comment-rating"]//label')[rate].click();
    await this.editCommentButton.click();
  }

  async getCommentDataByIndex(index) {
    const baseXpath = `//div[@id="rev-${index}"]`;
    return {
      author: await $(`${baseXpath}//h5`).getText(),
      content: await $(`${baseXpath}//p[@id="content"]`).getText(),
      rating: await $$(
        `${baseXpath}//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 rating css-1osj8n2-MuiGrid-root"]/span//span[@class="MuiRating-icon MuiRating-iconFilled css-7qmtgc-MuiRating-icon"]`
      ).length,
      votes: await this.getCommentLikes(index),
    };
  }

  async getCommentLikes(index) {
    return parseInt(
      await $(`//div[@id="rev-${index}"]//p[@id="votes"]`).getText()
    );
  }

  async likeComment(index) {
    const xpath = `//div[@id="rev-${index}"]//*[local-name() = 'svg'][@id="up"]`;
    await $(xpath).waitForDisplayed();
    await $(xpath).click();
  }

  async dislikeComment(index) {
    const xpath = `//div[@id="rev-${index}"]//*[local-name() = 'svg'][@id="down"]`;
    await $(xpath).waitForDisplayed();
    await $(xpath).click();
  }

  async deleteExercise() {
    await this.deleteButton.waitForDisplayed();
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
  }
}

module.exports = new ExercisePage();
