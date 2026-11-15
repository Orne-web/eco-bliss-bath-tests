
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",

    env: {
      apiUrl: "http://localhost:8081"
    },

    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      // Configuration des événements Cypress
    }
  }
});
