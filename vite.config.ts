import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Replace 'amitim-activity-finder' with your GitHub repository name
  // This is crucial for GitHub Pages deployment.
  base: '/amitim-activity-finder/',
  plugins: [react()],
})