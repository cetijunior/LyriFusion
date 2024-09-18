import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer'; // Add visualizer to analyze bundle size

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // Generate stats in dist folder
      open: true, // Automatically open the stats report after build
    }),
  ],
  define: {
    global: 'window', // Define global as window for browser environments
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split vendor chunks for optimization
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
      chunkSizeWarningLimit: 500, // Adjust the size warning limit for chunks (default 500 KB)
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    historyApiFallback: true, // Ensure Vite handles fallback for client-side routing
    port: 3000, // Optionally define a port if needed
    open: true, // Automatically open the app in the browser on start
  },
});
