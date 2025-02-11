import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
        port: 61851,
        open: true, // Автоматическое открытие браузера
    },
    base: '/cv/', // Это для GitHub Pages, если нужно
});
