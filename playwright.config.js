// @ts-check
import { defineConfig, devices } from "@playwright/test";

module.exports = defineConfig({
  // timeout: 40000,
  // globalTimeout: 60000,
  // expect: { timeout: 2000 },
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    //["allure-playwright"],
    ["html"],
  ],

  use: {
    baseURL: "https://buggy.justtestit.org/",
    trace: "on-first-retry",
    // actionTimeout: 5000,
    // navigationTimeout: 5000,
    video: { mode: "on", size: { width: 1920, height: 1080 } },
  },

  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://dev.buggy.justtestit.org/",
      },
    },
    {
      name: "qa",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buggy.justtestit.org/",
      },
    },
    {
      name: "staging",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://staging.buggy.justtestit.org/",
      },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
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
