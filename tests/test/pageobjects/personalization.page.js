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

  // TODO fix to, zwraca JSON ale w string niewiadomo czm
  async getPageColours() {
    // const data = await this.pageBody.getCSSProperty('color');
    // console.log(data);
    // console.log(data.value);
    // console.log(JSON.parse(data.toString()).value);
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
}

module.exports = new PersonalizationPage();
