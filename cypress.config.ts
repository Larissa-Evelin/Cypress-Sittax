import { defineConfig } from "cypress";

const failFast = require("cypress-fail-fast/plugin");

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      failFast(on, config); // adiciona o plugin fail-fast
      return config;
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://localhost:4200",
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'spec',
    retries: {
      runMode: 0, // Não tentar novamente em modo de execução
      openMode: 0 // Não tentar novamente em modo de abertura
    },
    env: {
      apiUrl: "https://localhost:5001/",
      autenticacaoUrl: "https://localhost:6021/api/auth/login"
    },
    testIsolation: false,
    requestTimeout: 15000, 
    defaultCommandTimeout: 15000
  },
});
