import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window' // Define global as window for browser environments
  },
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})