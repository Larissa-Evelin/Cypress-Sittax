import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://localhost:4200",
    env: {
      apiUrl: "https://localhost:5001/",
      autenticacaoUrl: "https://localhost:6021/api/auth/login"
    },
    testIsolation: false
  },
});
