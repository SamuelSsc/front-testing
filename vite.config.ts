import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@atomic": path.resolve(__dirname, "./src/atomic"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@components": path.resolve(__dirname, "./src/app/components"),
    },
  },
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: 'dist/public',
    commonjsOptions: {
      include: ['tailwind.config.ts', 'node_modules/**'],
    },
  },
  optimizeDeps: {
    include: ['tailwind-config'],
  },
});