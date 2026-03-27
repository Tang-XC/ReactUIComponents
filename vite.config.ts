// import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react(), tailwindcss(), svgr({
    svgrOptions: {
      svgo: true,
      svgoConfig: {
        plugins: [{
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            }
          }
        }]
      },
      exportType: 'default',
    },
    include: '**/*.svg?react'
  })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'MyLibrary',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'index.css';
          }
          return assetInfo.name!;
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    postcss: './postcss.config.js'
  }
})