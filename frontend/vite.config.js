import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true,
        secure: false,
      },
      '/webhook': {
        target: 'http://localhost:8080', // Proxy the webhook route
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
