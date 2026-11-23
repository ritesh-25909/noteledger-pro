
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repository path
  base: '/noteledger-pro/',

  // Production build settings
  build: {
    outDir: 'dist',
    sourcemap: false,
  },

  // Local development server
  server: {
    port: 5173,
    open: true,
  },
});
