import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/playwright-tests', // Pasta onde os testes estão
  timeout: 30000, // Tempo limite padrão dos testes
  retries: 0, // Número de tentativas em caso de falha
  use: {
    headless: false, // Modo headless (sem interface gráfica)
    viewport: { width: 1280, height: 720 }, // Dimensão padrão da viewport
    baseURL: 'http://localhost:5173', // URL base
    video: 'retain-on-failure', // Gravar vídeo apenas em falhas
    screenshot: 'only-on-failure', // Tirar screenshot apenas em falhas
  },
});
