import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': `http://18.221.67.44:3001/api`,
    },
  },
});
