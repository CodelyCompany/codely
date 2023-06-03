module.exports = class Page {
  open(path) {
    browser.setWindowSize(1920, 1080);
    return browser.url(`http://localhost:3000/${path}`);
  }
};
