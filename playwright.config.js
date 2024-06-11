// @ts-check
import { defineConfig, devices } from "@playwright/test";

module.exports = defineConfig({
  // timeout: 40000,
  // globalTimeout: 60000,
  // expect: { timeout: 2000 },
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    //["allure-playwright"],
    ["html"],
  ],

  //globalSetup: require.resolve("./tests/setup/globalSetup"),

  use: {
    baseURL: "https://buggy.justtestit.org/",
    trace: "on-first-retry",
    //add this parameter, using the process env that you create in the auth.setup.js for use the TOKEN globally in all test cases you will run and you don't will need to create this again per test and also the API that you call inside will call them
    // actionTimeout: 5000,
    // navigationTimeout: 5000,
    video: { mode: "on", size: { width: 1920, height: 1080 } },
  },

  projects: [
    {
      name: "RegisterUser",
      testMatch: "setup/registerUser.setup.js",
    },

    {
      name: "Authentication",
      testMatch: "setup/auth.setup.js",
      dependencies: ["RegisterUser"],
    },

    {
      name: "BuggyTestUsingAPI",
      testMatch: "testBuggyByAPI.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buggy.justtestit.org/",
        storageState: ".auth/user.json",
      },
      dependencies: ["Authentication"],
    },

    {
      name: "BuggyTestByFE",
      testMatch: "testBuggy.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buggy.justtestit.org/",
      },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "Mobile",
      testMatch: "",
      use: { ...devices["iPhone 14 Pro"] },
      //viewport: [width:1920, height:1080]
    },
  ],
});
