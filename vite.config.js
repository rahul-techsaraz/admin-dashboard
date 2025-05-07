import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // required when using basename in router
  server: {
    port: 3000,
    fs: { allow: ['.'] }
  }
})
