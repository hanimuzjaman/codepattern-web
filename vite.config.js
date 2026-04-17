import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
  },
  build: {
    // Code splitting configuration for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules/react')) {
            return 'react'
          }
          if (id.includes('node_modules/react-dom')) {
            return 'react'
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router'
          }
          if (id.includes('node_modules/axios')) {
            return 'http'
          }
          if (id.includes('node_modules/monaco-editor') || id.includes('node_modules/@monaco-editor')) {
            return 'monaco'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    // Compression and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Report final bundle size
    reportCompressedSize: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
    // Source maps in production for error tracking
    sourcemap: true,
  },
})

