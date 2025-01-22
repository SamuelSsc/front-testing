import { defineConfig } from "@playwright/test";

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
});
