import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
