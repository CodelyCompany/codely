module.exports = class Page {
  open(path) {
    browser.maximizeWindow();
    return browser.url(`http://localhost:3000/${path}`);
  }
};
