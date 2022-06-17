const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl : 'https://cypress.vivifyscrum-stage.com'
  },
  env: {
    'VALID_USER_EMAIL': 'milicanikolic123@gmail.com',
    'VALID_USER_PASSWORD': 'Samarkomsve1'
  }
});
