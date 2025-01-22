import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/playwright-tests",
  timeout: 30000,
  retries: 0,
  reporter: "html",
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: "http://localhost:5173",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Chromium-Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox-Desktop",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "WebKit-Desktop",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Chromium-Mobile",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Firefox-Mobile",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "WebKit-Mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
