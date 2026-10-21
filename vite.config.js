import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// dev.html is the development entry (npm run dev).
// npm run build bundles it and scripts/build-standalone.mjs turns the result
// into a single self-contained index.html that opens with a double click.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { open: '/dev.html' },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 100000,
    cssCodeSplit: false,
    rollupOptions: { input: 'dev.html' },
  },
});
