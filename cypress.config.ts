import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 15000,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
