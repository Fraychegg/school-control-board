import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';
import prettier from 'vite-plugin-prettier';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      fix: true, // Автоматически исправлять ошибки
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // Проверяемые файлы
    }),
    prettier({
      configFile: '.prettierrc.json', // Указываем конфиг Prettier
    })
  ],
}); 