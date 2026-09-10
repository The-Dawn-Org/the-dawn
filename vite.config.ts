import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const API_TARGET = 'http://localhost:3000'

// Keep this list in sync with the proxy block in nginx.conf.template, so a URL
// that resolves in dev also resolves in the built image.
const API_PREFIXES = ['/finance', '/events', '/ai-analysis', '/report']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: Object.fromEntries(
      API_PREFIXES.map((prefix) => [
        prefix,
        { target: API_TARGET, changeOrigin: true },
      ]),
    ),
  },
})
