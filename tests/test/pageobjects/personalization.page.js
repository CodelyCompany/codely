class PersonalizationPage {
  get uploadPhotoButton() {
    return $('//div[@id="upload-avatar"]//label');
  }

  get selectEnglishLanguage() {
    return $$('//div[@id="set-language-container"]//input')[0];
  }

  get selectPolishLanguage() {
    return $$('//div[@id="set-language-container"]//input')[1];
  }

  get whiteMagentaThemeButton() {
    return $$('//div[@id="theme-container"]//input')[0];
  }

  get blackMagentaThemeButton() {
    return $$('//div[@id="theme-container"]//input')[1];
  }

  get whiteBlueThemeButton() {
    return $$('//div[@id="theme-container"]//input')[2];
  }

  get setLanguageHeader() {
    return $('#set-language-typography');
  }

  get pageBody() {
    return $('body');
  }

  get pagesContainer() {
    return $('#pages-container');
  }

  get whiteMagentaThemeText() {
    return $$('//div[@id="theme-container"]//p')[0];
  }

  get blackMagentaThemeText() {
    return $$('//div[@id="theme-container"]//p')[1];
  }

  get whiteBlueThemeText() {
    return $$('//div[@id="theme-container"]//p')[2];
  }

  async getPageColours() {
    return {
      bodyColor: (await this.pageBody.getCSSProperty('color')).value,
      bodyBackground: (await this.pageBody.getCSSProperty('background-color'))
        .value,
      setLanguageHeader: (await this.setLanguageHeader.getCSSProperty('color'))
        .value,
      pickPhotoButtonFont: (
        await this.uploadPhotoButton.getCSSProperty('color')
      ).value,
      pagesContainerColor: (await this.pagesContainer.getCSSProperty('color'))
        .value,
    };
  }

  async getPageTexts() {
    return {
      setLanguageHeader: await this.setLanguageHeader.getText(),
      uploadPhotoButton: await this.uploadPhotoButton.getText(),
      whiteMagentaThemeText: await this.whiteMagentaThemeText.getText(),
      blackMagentaThemeText: await this.blackMagentaThemeText.getText(),
      whiteBlueThemeText: await this.whiteBlueThemeText.getText(),
    };
  }
}

module.exports = new PersonalizationPage();
