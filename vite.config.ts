// import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { defineConfig } from 'vitest/config'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react(), tailwindcss(), AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    ],
    dirs: ['./src/components/**'],
    dts: './src/auto-imports.d.ts'
  }), createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[name]',
    svgoOptions: true
  })],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})