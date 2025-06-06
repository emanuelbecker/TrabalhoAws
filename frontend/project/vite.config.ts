import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://18.221.67.44:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding
      },
    },
  },
});
