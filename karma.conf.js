module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend-app'),
      subdir: '.', // Keeps the files in the same directory
      reporters: [
        { type: 'html' }, // Generates HTML reports
        { type: 'lcov' }  // Generates the lcov.info file
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
};