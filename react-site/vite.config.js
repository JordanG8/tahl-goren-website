import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    lightningcss: {
      targets: {
        chrome: (100 << 16),
        safari: (14 << 16),
      },
    },
  },
  build: {
    cssMinify: 'lightningcss',
    target: 'es2020',
  },
})
