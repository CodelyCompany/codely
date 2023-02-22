module.exports = class Page {
  open(path) {
    return browser.url(`http://localhost:3000/${path}`);
  }
};
