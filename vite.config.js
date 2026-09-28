import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (CheenaJain03.github.io) is served from the root, so base stays '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
