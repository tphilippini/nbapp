import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), pluginRewriteAll()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/globals";
        `,
      },
    },
  },
});
