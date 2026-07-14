import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// isSsrBuild: true durante el build de servidor de vite-react-ssg.
// manualChunks solo aplica al build de cliente — en SSR React se externaliza
// y no puede incluirse en manualChunks.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    rollupOptions: isSsrBuild
      ? {}
      : {
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
}))
