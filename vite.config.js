import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — loaded once and cached
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'lenis': ['lenis'],
        }
      }
    }
  },
  // Optimize deps upfront so first load is faster
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lenis']
  }
})
