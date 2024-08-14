import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/graphql/', // Use '/' in development and '/graphql/' in production
    plugins: [react()],
  }
})