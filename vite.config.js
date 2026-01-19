import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/webhook': {
                target: 'https://emanueleserra.app.n8n.cloud',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
