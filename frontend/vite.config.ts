import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import config from './src/core/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: ['0.0.0.0', config.host],
    proxy: {
      '/api': {
        target: config.backend.httpApiUrl,
        changeOrigin: true
      },
      '/ws': {
        target: config.backend.wsApiUrl,
        changeOrigin: true,
        ws: true
      }
    }
  }
})
