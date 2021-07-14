module.exports = {
  baseUrl: 'http://localhost:3000/',

  gridUrl: 'http://127.0.0.1:4444/wd/hub',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },

  sets: {
    desktop: {
      files: [
        'hermione/SettingsPage.hermione.js',
        'hermione/MainPage.hermione.js',
      ],
    },
  },
};
