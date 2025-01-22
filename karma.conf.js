module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'], // Use headless Chrome
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-extensions', '--disable-dev-shm-usage'],
      },
    },
    singleRun: true, // Ensures Karma exits after tests
    // other configurations...
  });
};