import { defineConfig } from "cypress"
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://localhost:4173/' : 'http://localhost:5173/',
  },
  env: {
    routes: {
      front: {
        home: '/',
        signin: '/login',
        signup: '/register',
        settings: 'settings'
      },
      back: {}
    }
  },
  video: false,
});