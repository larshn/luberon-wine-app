import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'anthropic-vendor': ['@anthropic-ai/sdk'],
          'leaflet-vendor': ['leaflet', 'react-leaflet'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
